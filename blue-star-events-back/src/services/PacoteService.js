
const Pacote = require('../models/PacoteModel');
const Componente = require('../models/ComponenteModel');
const PacoteComponente = require('../models/PacoteComponenteModel');
const Transacao = require('../models/TransacaoModel');
const { Op } = require('sequelize');


module.exports = {
    async getAll() {
        try {
            return await Pacote.findAll({
                include: [{
                    model: Componente,
                    through: {
                        model: PacoteComponente,
                        attributes: ['quantidade_componente']
                    },
                    as: 'componentes'
                }]
            });
        } catch (error) {
            throw new Error(`Erro ao buscar pacotes: ${error.message}`);
        }
    },

    async create(data) {
        const { name, description, tipo, disponibilidade, imagem, tamanho, componentes } = data;
        const transaction = await Pacote.sequelize.transaction();

        try {
            // Validação básica dos dados
            if (!componentes || !Array.isArray(componentes) || componentes.length === 0) {
                throw new Error('É necessário fornecer ao menos um componente');
            }

            // Validação detalhada dos componentes
            componentes.forEach((comp, index) => {
                if (!comp.componente_id) {
                    throw new Error(`Componente na posição ${index} não possui um ID válido`);
                }
                if (!comp.quantidade_componente || comp.quantidade_componente <= 0) {
                    throw new Error(`Quantidade inválida para o componente ${comp.componente_id}`);
                }
            });

            // Verificar existência de todos os componentes antes de prosseguir
            await Promise.all(componentes.map(async (comp) => {
                const componenteExists = await Componente.findByPk(comp.componente_id);
                if (!componenteExists) {
                    throw new Error(`Componente com ID ${comp.componente_id} não encontrado`);
                }
            }));

            // Calcular preço total
            const precoTotal = await this._calcularPrecoTotal(componentes);

            // Criar o pacote
            const pacote = await Pacote.create({
                name,
                description,
                tipo,
                disponibilidade,
                imagem,
                tamanho,
                preco: precoTotal
            }, { transaction });

            // Criar as relações com componentes
            await this._criarRelacoesComponentes(pacote.id, componentes, transaction);

            await transaction.commit();
            return await this.getById(pacote.id);
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Erro ao criar pacote: ${error.message}`);
        }
    },

    async getById(id) {
        try {
            const pacote = await Pacote.findByPk(id, {
                include: [{
                    model: Componente,
                    through: {
                        model: PacoteComponente,
                        attributes: ['quantidade_componente']
                    },
                    as: 'componentes'
                }]
            });

            if (!pacote) {
                throw new Error('Pacote não encontrado');
            }

            return pacote;
        } catch (error) {
            throw new Error(`Erro ao buscar pacote: ${error.message}`);
        }
    },

    async update(id, data) {
        const { name, description, tipo, disponibilidade, imagem, tamanho, componentes } = data;
        const transaction = await Pacote.sequelize.transaction();

        try {
            const pacote = await Pacote.findByPk(id);
            if (!pacote) {
                throw new Error('Pacote não encontrado');
            }

            if (!componentes || !Array.isArray(componentes) || componentes.length === 0) {
                throw new Error('É necessário fornecer ao menos um componente');
            }

            // Calcular novo preço total
            const precoTotal = await this._calcularPrecoTotal(componentes);

            // Atualizar pacote
            await pacote.update({
                name,
                description,
                tipo,
                disponibilidade,
                imagem,
                tamanho,
                preco: precoTotal
            }, { transaction });

            // Atualizar componentes
            await PacoteComponente.destroy({
                where: { pacote_id: id },
                transaction
            });

            await this._criarRelacoesComponentes(id, componentes, transaction);

            await transaction.commit();
            return await this.getById(id);
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Erro ao atualizar pacote: ${error.message}`);
        }
    },

    async delete(id) {
        const transaction = await Pacote.sequelize.transaction();
    
        try {
            const pacote = await Pacote.findByPk(id);
            if (!pacote) {
                throw new Error('Pacote não encontrado');
            }
    
            // Verificar se o pacote está relacionado a transações ativas
            const transacaoExistente = await Transacao.findOne({
                where: {
                    pacote_id: id,
                    status: { [Op.ne]: 'completa' }  // Transações pendentes ou em andamento
                }
            });
    
            if (transacaoExistente) {
                throw new Error('Não é possível excluir um pacote que possui transações pendentes ou em andamento');
            }
    
            // Deletar as relações com componentes
            await PacoteComponente.destroy({
                where: { pacote_id: id },
                transaction
            });
    
            // Deletar o pacote
            await pacote.destroy({ transaction });
    
            await transaction.commit();
            return true;  // Retorna sucesso
        } catch (error) {
            // Caso ocorra algum erro, a transação é revertida
            await transaction.rollback();
            
            // Melhorando a mensagem de erro caso o modelo de Transacao não esteja disponível
            if (error.message.includes('findOne')) {
                throw new Error('Modelo de Transacao não está inicializado corretamente');
            }
    
            throw new Error(`Erro ao deletar pacote: ${error.message}`);
        }
    },

    // Métodos auxiliares privados
    async _calcularPrecoTotal(componentes) {
        let precoTotal = 0;
        for (const comp of componentes) {
            const componenteInfo = await Componente.findByPk(comp.componente_id);
            if (!componenteInfo) {
                throw new Error(`Componente com ID ${comp.componente_id} não encontrado`);
            }
            if (!componenteInfo.preco) {
                throw new Error(`Preço não definido para o componente ${comp.componente_id}`);
            }
            precoTotal += componenteInfo.preco * comp.quantidade_componente;
        }
        return precoTotal;
    },

    async _criarRelacoesComponentes(pacoteId, componentes, transaction) {
        const promises = componentes.map(comp => 
            PacoteComponente.create({
                pacote_id: pacoteId,
                componente_id: comp.componente_id,
                quantidade_componente: comp.quantidade_componente
            }, { transaction })
        );
        await Promise.all(promises);
    }
};