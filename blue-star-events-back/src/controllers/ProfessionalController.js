const ProfessionalService = require('../services/ProfessionalService');

module.exports = {

    // Função para listar todos os profissionais
    async index(req, res) {
        try {
            const professionals = await ProfessionalService.getAll();
            return res.status(200).json(professionals);
        } catch (error) {
            console.error('Erro ao buscar profissionais:', error);
            return res.status(500).json({ message: 'Erro ao buscar profissionais.' });
        }
    },

    // Função para criar um profissional
    async store(req, res) {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                status: 0,
                message: 'Dados incompletos. Nome e preço são obrigatórios.',
            });
        }

        try {
            const professional = await ProfessionalService.create({ name, price });
            return res.status(201).json({
                status: 1,
                message: 'Profissional cadastrado com sucesso!',
                professional,
            });
        } catch (error) {
            console.error('Erro ao cadastrar profissional:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao cadastrar profissional.',
            });
        }
    },

    // Função para atualizar um profissional
    async update(req, res) {
        const { professionalId } = req.params;
        const { name, price } = req.body;

        try {
            await ProfessionalService.update(professionalId, { name, price });
            return res.status(200).json({
                status: 1,
                message: 'Profissional atualizado com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao atualizar profissional:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao atualizar profissional.',
            });
        }
    },

    // Função para excluir um profissional
    async delete(req, res) {
        const { professionalId } = req.params;

        try {
            await ProfessionalService.delete(professionalId);
            return res.status(200).json({
                status: 1,
                message: 'Profissional excluído com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao excluir profissional:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao excluir profissional.',
            });
        }
    }
};
