const EventService = require('../services/EventService');

module.exports = {

    // Função para listar todos os eventos
    async index(req, res) {
        try {
            const events = await EventService.getAll();
            return res.status(200).json(events);
        } catch (error) {
            console.error('Erro ao buscar eventos:', error);
            return res.status(500).json({ message: 'Erro ao buscar eventos.' });
        }
    },

    // Função para criar um evento
    async store(req, res) {
        const eventData = req.body;

        try {
            const event = await EventService.create(eventData);
            return res.status(201).json({
                status: 1,
                message: 'Evento cadastrado com sucesso!',
                event
            });
        } catch (error) {
            console.error('Erro ao cadastrar evento:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao cadastrar evento.',
            });
        }
    },

    // Função para atualizar um evento
    async update(req, res) {
        const { eventId } = req.params;
        const eventData = req.body;

        try {
            await EventService.update(eventId, eventData);
            return res.status(200).json({
                status: 1,
                message: 'Evento atualizado com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao atualizar evento:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao atualizar evento.',
            });
        }
    },

    // Função para excluir um evento
    async delete(req, res) {
        const { eventId } = req.params;

        try {
            await EventService.delete(eventId);
            return res.status(200).json({
                status: 1,
                message: 'Evento excluído com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao excluir evento:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao excluir evento.',
            });
        }
    }
};
