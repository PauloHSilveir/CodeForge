const Transacao = require('../models/TransacaoModel');
const TransacaoPacote = require('../models/TransacaoPacoteModel');
const Pacote = require('../models/PacoteModel');
const Pagamento = require('../models/PagamentoModel');
const User = require('../models/UserModel');
const { Op } = require('sequelize');
const sequelize = require('../config/database');


class TransacaoService {
    async create(transacaoData) {
        const transaction = await Transacao.sequelize.transaction();
        try {
            // Validar pagamento confirmado
            const pagamento = await Pagamento.findByPk(transacaoData.pagamento_id);
            if (pagamento.status !== 'pago') {
                throw new Error('Pagamento não confirmado');
            }

            // Verificar se pagamento já tem transação
            const existingTransacao = await Transacao.findOne({
                where: { pagamento_id: transacaoData.pagamento_id }
            });
            if (existingTransacao) {
                throw new Error('Pagamento já associado a uma transação');
            }

            // Calcular valor total
            let valorTotal = 0;
            const transacaoPacotes = await Promise.all(transacaoData.pacotes.map(async (pacoteItem) => {
                const pacote = await Pacote.findByPk(pacoteItem.pacote_id);
                const subtotal = pacote.preco * pacoteItem.quantidade_pacote;
                valorTotal += subtotal;

                return {
                    pacote_id: pacoteItem.pacote_id,
                    quantidade_pacote: pacoteItem.quantidade_pacote
                };
            }));

            // Criar transação
            const transacao = await Transacao.create({
                usuario_id: transacaoData.usuario_id,
                pagamento_id: transacaoData.pagamento_id,
                data: new Date(),
                valor: valorTotal,
                status: 'completa'
            }, { transaction });

            // Criar transação_pacote
            await Promise.all(transacaoPacotes.map(async (pacoteItem) => {
                await TransacaoPacote.create({
                    transacao_id: transacao.id,
                    pacote_id: pacoteItem.pacote_id,
                    quantidade_pacote: pacoteItem.quantidade_pacote
                }, { transaction });
            }));

            await transaction.commit();
            return { message: 'Transação criada com sucesso', transacao };
        } catch (error) {
            await transaction.rollback();
            throw new Error(error.message);
        }
    }

    async update(id, transacaoData) {
        const transaction = await Transacao.sequelize.transaction();
        try {
            const transacao = await Transacao.findByPk(id);
            if (!transacao) {
                throw new Error('Transação não encontrada');
            }

            // Recalcular valor
            let valorTotal = 0;
            await TransacaoPacote.destroy({
                where: { transacao_id: id },
                transaction
            });

            const transacaoPacotes = await Promise.all(transacaoData.pacotes.map(async (pacoteItem) => {
                const pacote = await Pacote.findByPk(pacoteItem.pacote_id);
                const subtotal = pacote.preco * pacoteItem.quantidade_pacote;
                valorTotal += subtotal;

                return {
                    pacote_id: pacoteItem.pacote_id,
                    quantidade_pacote: pacoteItem.quantidade_pacote
                };
            }));

            // Atualizar transação
            await transacao.update({
                valor: valorTotal
            }, { transaction });

            // Recriar transação_pacote
            await Promise.all(transacaoPacotes.map(async (pacoteItem) => {
                await TransacaoPacote.create({
                    transacao_id: transacao.id,
                    pacote_id: pacoteItem.pacote_id,
                    quantidade_pacote: pacoteItem.quantidade_pacote
                }, { transaction });
            }));

            await transaction.commit();
            return { message: 'Transação atualizada com sucesso', transacao };
        } catch (error) {
            await transaction.rollback();
            throw new Error(error.message);
        }
    }

    async delete(id) {
        const transaction = await sequelize.transaction();
        try {
            const transacao = await Transacao.findByPk(id, {
                include: [{ model: Evento, as: 'evento' }]
            });

            // Verificar prazo de cancelamento
            const dataEvento = transacao.evento.data;
            const diasAteEvento = (dataEvento - new Date()) / (1000 * 60 * 60 * 24);

            if (diasAteEvento <= 7) {
                throw new Error('Cancelamento não permitido. Menos de 7 dias antes do evento.');
            }

            // Processar reembolso
            await this.processarReembolso(transacao.pagamento_id);

            // Atualizar status
            await transacao.update({
                status: 'cancelada'
            }, { transaction });

            await transaction.commit();
            return { message: 'Transação cancelada com sucesso' };
        } catch (error) {
            await transaction.rollback();
            throw new Error(error.message);
        }
    }

    async findById(id) {
        try {
            const transacao = await Transacao.findByPk(id, {
                include: [
                    {
                        model: Pagamento,
                        as: 'pagamento',
                        attributes: ['metodo_pagamento']
                    },
                    {
                        model: User,
                        as: 'usuario'
                    },
                    {
                        model: TransacaoPacote,
                        as: 'transacao_pacotes',
                        include: [{
                            model: Pacote,
                            as: 'pacote',
                            attributes: ['name', 'preco']
                        }]
                    }
                ]
            });

            return {
                id: transacao.id,
                usuario: {
                    nome: transacao.usuario.name,
                    email: transacao.usuario.email,
                    endereco: {
                        bairro: transacao.usuario.bairro,
                        rua: transacao.usuario.rua,
                        complemento: transacao.usuario.complemento,
                        cidade: transacao.usuario.cidade,
                        estado: transacao.usuario.estado
                    }
                },
                metodo_pagamento: transacao.pagamento.metodo_pagamento,
                data_criacao: transacao.createdAt,
                valor: transacao.valor,
                status: transacao.status,
                pacotes: transacao.transacao_pacotes.map(tp => ({
                    nome: tp.pacote.name,
                    preco: tp.pacote.preco,
                    quantidade: tp.quantidade_pacote
                }))
            };
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async findByUser(usuarioId) {
        try {
          const transacoes = await Transacao.findAll({
            where: { usuario_id: usuarioId },
            order: [['createdAt', 'DESC']],
            include: [
              {
                model: Pagamento,
                as: 'pagamento'
              },
              {
                model: User,
                as: 'usuario'
              },
              { 
                model: TransacaoPacote,
                as: 'transacao_pacotes',
                include: [{ 
                  model: Pacote, 
                  as: 'pacote' 
                }]
              }
            ]
          });
          return transacoes.map(transacao => ({
            id: transacao.id,
            usuario: {
              nome: transacao.usuario.name,
              email: transacao.usuario.email,
              endereco: {
                bairro: transacao.usuario.bairro,
                rua: transacao.usuario.rua,
                complemento: transacao.usuario.complemento,
                cidade: transacao.usuario.cidade,
                estado: transacao.usuario.estado
              }
            },
            metodo_pagamento: transacao.pagamento.metodo_pagamento,
            data_criacao: transacao.createdAt,
            valor: transacao.valor,
            status: transacao.status,
            pacotes: transacao.transacao_pacotes.map(tp => ({
              nome: tp.pacote.name,
              preco: tp.pacote.preco,
              quantidade: tp.quantidade_pacote
            }))
          }));
        } catch (error) {
          throw new Error(error.message);
        }
      }

    async findAll() {
        try {
            const transacoes = await Transacao.findAll({
                include: [
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['name', 'email']
                    },
                    {
                        model: TransacaoPacote,
                        as: 'transacao_pacotes',
                        include: [{
                            model: Pacote,
                            as: 'pacote'
                        }]
                    }
                ]
            });

            return transacoes;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async processarReembolso(pagamentoId) {
        // Lógica de reembolso a ser implementada de acordo com método de pagamento
        const pagamento = await Pagamento.findByPk(pagamentoId);
        // Implementar lógica específica de reembolso para cada método de pagamento
    }
}

module.exports = new TransacaoService();