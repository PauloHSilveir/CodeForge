const PacoteService = require('../services/PacoteService');

module.exports = {
    // Função para listar pacotes
    async index(req, res) {
        try {
            const pacotes = await PacoteService.getAll();
            return res.status(200).json(pacotes);
        } catch (error) {
            console.error('Erro ao buscar pacotes:', error);
            return res.status(500).json({ error: 'Erro ao buscar pacotes personalizados' });
        }
    },

    // Função para criar um pacote
    async store(req, res) {
        const { user_id, event_id } = req.body;

        try {
            const pacote = await PacoteService.create(user_id, event_id);
            return res.status(201).json({
                status: 1,
                message: 'Pacote criado com sucesso!',
                pacote,
            });
        } catch (error) {
            console.error('Erro ao criar pacote:', error);
            return res.status(500).json({ error: 'Erro ao criar pacote' });
        }
    },

    // Função para excluir um pacote
    async delete(req, res) {
        const { pacote_id } = req.params;

        try {
            const pacote = await PacoteService.delete(pacote_id);
            return res.status(200).json({
                status: 1,
                message: 'Pacote excluído com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao excluir pacote:', error);
            return res.status(500).json({ error: 'Erro ao excluir pacote' });
        }
    },
};
