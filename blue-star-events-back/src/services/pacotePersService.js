const PacotePers = require('../models/PacotePers');
const User = require('../models/User');
const Event = require('../models/Event');

module.exports = {

    // Função para buscar todos os pacotes
    async getAll() {
        try {
            const pacotes = await PacotePers.findAll({
                include: [
                    { model: User, as: 'user' },
                    { model: Event, as: 'event' },
                    { model: User, as: 'professionals' },
                    { model: User, as: 'items' },
                    { model: User, as: 'foods' }
                ]
            });
            return pacotes;
        } catch (error) {
            throw new Error('Erro ao buscar pacotes personalizados');
        }
    },

    // Função para criar um pacote personalizado
    async create(user_id, event_id) {
        try {
            const pacote = await PacotePers.create({
                user_id,
                event_id
            });
            return pacote;
        } catch (error) {
            throw new Error('Erro ao criar pacote personalizado');
        }
    },

    // Função para excluir um pacote personalizado
    async delete(pacote_id) {
        try {
            const pacote = await PacotePers.destroy({
                where: { id: pacote_id }
            });
            return pacote;
        } catch (error) {
            throw new Error('Erro ao excluir pacote personalizado');
        }
    },
};
