const Professional = require('../models/Professional');

module.exports = {

    // Função para listar todos os profissionais
    async getAll() {
        try {
            const professionals = await Professional.findAll();
            return professionals;
        } catch (error) {
            throw new Error('Erro ao buscar profissionais');
        }
    },

    // Função para criar um profissional
    async create(professionalData) {
        try {
            const professional = await Professional.create(professionalData);
            return professional;
        } catch (error) {
            throw new Error('Erro ao criar profissional');
        }
    },

    // Função para atualizar um profissional
    async update(professionalId, professionalData) {
        try {
            const professional = await Professional.update(professionalData, {
                where: { id: professionalId }
            });
            return professional;
        } catch (error) {
            throw new Error('Erro ao atualizar profissional');
        }
    },

    // Função para excluir um profissional
    async delete(professionalId) {
        try {
            const professional = await Professional.destroy({
                where: { id: professionalId }
            });
            return professional;
        } catch (error) {
            throw new Error('Erro ao excluir profissional');
        }
    }
};
