const Pacote = require('../models/PacoteModel');

module.exports = {

    // Listar todos os pacotes
    async getAll() {
        try {
            return await Pacote.findAll();
        } catch (error) {
            throw new Error('Erro ao buscar pacotes: ' + error.message);
        }
    },

    // Criar um novo pacote
    async create(data) {
        try {
            // Validação adicional se necessário
            if (data.preco <= 0) {
                throw new Error('O preço deve ser maior que zero.');
            }
            return await Pacote.create(data);
        } catch (error) {
            throw new Error('Erro ao criar pacote: ' + error.message);
        }
    },

    // Atualizar pacote existente
    async update(id, data) {
        try {
            const pacote = await Pacote.findByPk(id);

            if (!pacote) {
                throw new Error('Pacote não encontrado.');
            }

            if (data.preco <= 0) {
                throw new Error('O preço deve ser maior que zero.');
            }

            await pacote.update(data);
            return pacote;
        } catch (error) {
            throw new Error('Erro ao atualizar pacote: ' + error.message);
        }
    },

    // Excluir um pacote
    async delete(id) {
        try {
            const pacote = await Pacote.findByPk(id);

            if (!pacote) {
                throw new Error('Pacote não encontrado.');
            }

            // Verificar associações antes de excluir (regra de negócio)
            // Exemplo: if (await pacote.hasPendingTransactions()) { throw new Error('Não é possível excluir um pacote com transações pendentes.'); }

            await pacote.destroy();
        } catch (error) {
            throw new Error('Erro ao excluir pacote: ' + error.message);
        }
    },

    // Buscar um pacote por ID
    async getById(id) {
        try {
            const pacote = await Pacote.findByPk(id, {
                include: ['evento', 'componentes'],
            });

            if (!pacote) {
                throw new Error('Pacote não encontrado.');
            }

            return pacote;
        } catch (error) {
            throw new Error('Erro ao buscar pacote: ' + error.message);
        }
    },
};
