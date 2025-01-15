const Pacote = require('../models/PacoteModel');

module.exports = {

    // Função para buscar todos os pacotes
    async getAll() {
        try {
            const pacotes = await Pacote.findAll();
            return pacotes;
        } catch (error) {
            throw new Error('Erro ao buscar pacotes');
        }
    },

    // Função para criar um pacote
    async create() {
        try {
            const pacote = await Pacote.create();
            return pacote;
        } catch (error) {
            throw new Error('Erro ao criar pacote');
        }
    },

    // Função para excluir um pacote
    async delete(pacote_id) {
        try {
            const pacote = await Pacote.destroy({
                where: { id: pacote_id }
            });
            return pacote;
        } catch (error) {
            throw new Error('Erro ao excluir pacote');
        }
    },
};
