const FoodService = require('../services/FoodService');

module.exports = {

    // Função para listar todas as comidas
    async index(req, res) {
        try {
            const foods = await FoodService.getAll();
            return res.status(200).json(foods);
        } catch (error) {
            console.error('Erro ao buscar comidas:', error);
            return res.status(500).json({ message: 'Erro ao buscar comidas.' });
        }
    },

    // Função para criar uma comida
    async store(req, res) {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                status: 0,
                message: 'Dados incompletos. Nome e preço são obrigatórios.',
            });
        }

        try {
            const food = await FoodService.create({ name, price });
            return res.status(201).json({
                status: 1,
                message: 'Comida cadastrada com sucesso!',
                food,
            });
        } catch (error) {
            console.error('Erro ao cadastrar comida:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao cadastrar comida.',
            });
        }
    },

    // Função para atualizar uma comida
    async update(req, res) {
        const { foodId } = req.params;
        const { name, price } = req.body;

        try {
            await FoodService.update(foodId, { name, price });
            return res.status(200).json({
                status: 1,
                message: 'Comida atualizada com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao atualizar comida:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao atualizar comida.',
            });
        }
    },

    // Função para excluir uma comida
    async delete(req, res) {
        const { foodId } = req.params;

        try {
            await FoodService.delete(foodId);
            return res.status(200).json({
                status: 1,
                message: 'Comida excluída com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao excluir comida:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao excluir comida.',
            });
        }
    }
};
