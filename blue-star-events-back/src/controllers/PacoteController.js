const PacoteService = require('../services/PacoteService');

module.exports = {
    async getAll(req, res) {
        try {
            const pacotes = await PacoteService.getAll();
            return res.status(200).json(pacotes);
        } catch (error) {
            console.error('Erro em getAll:', error);
            return res.status(500).json({ error: error.message });
        }
    },

    async create(req, res) {
        try {
            const pacote = await PacoteService.create(req.body);
            return res.status(201).json({
                message: 'Pacote criado com sucesso',
                pacote
            });
        } catch (error) {
            console.error('Erro em create:', error);
            return res.status(400).json({ error: error.message });
        }
    },

    async getById(req, res) {
        try {
            const pacote = await PacoteService.getById(req.params.id);
            return res.status(200).json(pacote);
        } catch (error) {
            console.error('Erro em getById:', error);
            return res.status(404).json({ error: error.message });
        }
    },

    async update(req, res) {
        try {
            const pacote = await PacoteService.update(req.params.id, req.body);
            return res.status(200).json({
                message: 'Pacote atualizado com sucesso',
                pacote
            });
        } catch (error) {
            console.error('Erro em update:', error);
            return res.status(400).json({ error: error.message });
        }
    },

    async delete(req, res) {
        try {
            await PacoteService.delete(req.params.id);
            return res.status(200).json({
                message: 'Pacote deletado com sucesso'
            });
        } catch (error) {
            console.error('Erro em delete:', error);
            return res.status(400).json({ error: error.message });
        }
    }
};