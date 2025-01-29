const EventoModel = require('../models/EventoModel');

module.exports = {

    // Função para listar todos os eventos
    async getAll() {
        try {
            const events = await EventoModel.findAll();
            return events;
        } catch (error) {
            throw new Error('Erro ao buscar eventos');
        }
    },

    // Função para criar um evento
    async create(eventData) {
        try {
            const event = await EventoModel.create(eventData);
            return event;
        } catch (error) {
            throw new Error('Erro ao criar evento');
        }
    },

    // Função para atualizar um evento
    async update(eventId, eventData) {
        try {
            console.log(eventData);
            console.log(eventId);
            const event = await EventoModel.update(eventData, {
                where: { id: eventId }
            });
            return event;
        } catch (error) {
            throw new Error('Erro ao atualizar evento');
        }
    },

    // Função para excluir um evento
    async delete(eventId) {
        try {
            const event = await EventoModel.destroy({
                where: { id: eventId }
            });
            return event;
        } catch (error) {
            throw new Error('Erro ao excluir evento');
        }
    }
};
