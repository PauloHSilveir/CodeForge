const Transacao = require('../models/TransacaoModel');
const TransacaoPacote = require('../models/TransacaoPacoteModel');
const Pacote = require('../models/PacoteModel');
const Pagamento = require('../models/PagamentoModel');
const Evento = require('../models/EventoModel');
const User = require('../models/UserModel');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

class TransacaoService {
    async create(transacaoData) {
        const transaction = await Transacao.sequelize.transaction();
        try {
            // Verificar se pagamento já tem transação
            const existingTransacao = await Transacao.findOne({
                where: { pagamento_id: transacaoData.pagamento_id }
            });
            if (existingTransacao) {
                throw new Error('Pagamento já associado a uma transação');
            }

            // Criar transação
            const transacao = await Transacao.create({
                usuario_id: transacaoData.usuario_id,
                pagamento_id: transacaoData.pagamento_id,
                evento_id: transacaoData.evento_id,
                data: new Date()
            }, { transaction });

            // Criar transação_pacote
            await Promise.all(transacaoData.pacotes.map(async (pacoteItem) => {
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
            const transacao = await Transacao.findByPk(id, {
                include: [{ model: Pagamento, as: 'pagamento' }]
            });
            
            if (!transacao) {
                throw new Error('Transação não encontrada');
            }

            // Verificar se o pagamento está pendente
            if (transacao.pagamento.status !== 'pendente') {
                throw new Error('Não é possível atualizar uma transação com pagamento já processado');
            }

            // Remover pacotes antigos
            await TransacaoPacote.destroy({
                where: { transacao_id: id },
                transaction
            });

            // Recriar transação_pacote
            await Promise.all(transacaoData.pacotes.map(async (pacoteItem) => {
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
                include: [{ model: Pagamento, as: 'pagamento' }]
            });

            if (!transacao) {
                throw new Error('Transação não encontrada');
            }

            if (transacao.pagamento.status !== 'pendente') {
                throw new Error('Só é possível deletar transações com pagamento pendente');
            }

            // Deletar primeiro os registros relacionados
            await TransacaoPacote.destroy({
                where: { transacao_id: id },
                transaction
            });

            // Deletar o pagamento
            await Pagamento.destroy({
                where: { id: transacao.pagamento_id },
                transaction
            });

            // Deletar a transação
            await transacao.destroy({ transaction });

            await transaction.commit();
            return { message: 'Transação e pagamento deletados com sucesso' };
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
                        attributes: ['valor', 'status', 'metodo_pagamento']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['name', 'email']
                    },
                    {
                        model: Evento,
                        as: 'evento',
                        attributes: ['data', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep']
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

            if (!transacao) {
                throw new Error('Transação não encontrada');
            }

            return {
                id: transacao.id,
                usuario: {
                    nome: transacao.usuario.name,
                    email: transacao.usuario.email
                },
                evento: {
                    data: transacao.evento.data,
                    rua: transacao.evento.rua,
                    numero: transacao.evento.numero,
                    complemento: transacao.evento.complemento,
                    bairro: transacao.evento.bairro,
                    cidade: transacao.evento.cidade,
                    estado: transacao.evento.estado,
                    cep: transacao.evento.cep
                },
                pagamento: {
                    valor: transacao.pagamento.valor,
                    status: transacao.pagamento.status,
                    metodo_pagamento: transacao.pagamento.metodo_pagamento
                },
                data_criacao: transacao.data,
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
                order: [['data', 'DESC']],
                include: [
                    {
                        model: Pagamento,
                        as: 'pagamento',
                        attributes: ['valor', 'status', 'metodo_pagamento']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['name', 'email']
                    },
                    {
                        model: Evento,
                        as: 'evento',
                        attributes: ['data', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep']
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

            return transacoes.map(transacao => ({
                id: transacao.id,
                usuario: {
                    nome: transacao.usuario.name,
                    email: transacao.usuario.email
                },
                evento: {
                    data: transacao.evento.data,
                    rua: transacao.evento.rua,
                    numero: transacao.evento.numero,
                    complemento: transacao.evento.complemento,
                    bairro: transacao.evento.bairro,
                    cidade: transacao.evento.cidade,
                    estado: transacao.evento.estado,
                    cep: transacao.evento.cep
                },
                pagamento: {
                    valor: transacao.pagamento.valor,
                    status: transacao.pagamento.status,
                    metodo_pagamento: transacao.pagamento.metodo_pagamento
                },
                data_criacao: transacao.data,
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
                        model: Pagamento,
                        as: 'pagamento',
                        attributes: ['valor', 'status', 'metodo_pagamento']
                    },
                    {
                        model: User,
                        as: 'usuario',
                        attributes: ['name', 'email']
                    },
                    {
                        model: Evento,
                        as: 'evento',
                        attributes: ['data', 'rua', 'numero', 'complemento', 'bairro', 'cidade', 'estado', 'cep']
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

            return transacoes;
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

module.exports = new TransacaoService();