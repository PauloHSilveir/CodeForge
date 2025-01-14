const Food = require('../models/Food');

module.exports = {

    // Função para listar todas as comidas
    async getAll() {
        try {
            const foods = await Food.findAll();
            return foods;
        } catch (error) {
            throw new Error('Erro ao buscar comidas');
        }
    },

    // Função para criar uma comida
    async create(foodData) {
        try {
            const food = await Food.create(foodData);
            return food;
        } catch (error) {
            throw new Error('Erro ao criar comida');
        }
    },

    // Função para atualizar uma comida
    async update(foodId, foodData) {
        try {
            const food = await Food.update(foodData, {
                where: { id: foodId }
            });
            return food;
        } catch (error) {
            throw new Error('Erro ao atualizar comida');
        }
    },

    // Função para excluir uma comida
    async delete(foodId) {
        try {
            const food = await Food.destroy({
                where: { id: foodId }
            });
            return food;
        } catch (error) {
            throw new Error('Erro ao excluir comida');
        }
    }
};
