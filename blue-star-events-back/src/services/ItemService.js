const Item = require('../models/Item');

module.exports = {

    // Função para listar todos os itens
    async getAll() {
        try {
            const items = await Item.findAll();
            return items;
        } catch (error) {
            throw new Error('Erro ao buscar itens');
        }
    },

    // Função para criar um item
    async create(itemData) {
        try {
            const item = await Item.create(itemData);
            return item;
        } catch (error) {
            throw new Error('Erro ao criar item');
        }
    },

    // Função para atualizar um item
    async update(itemId, itemData) {
        try {
            const item = await Item.update(itemData, {
                where: { id: itemId }
            });
            return item;
        } catch (error) {
            throw new Error('Erro ao atualizar item');
        }
    },

    // Função para excluir um item
    async delete(itemId) {
        try {
            const item = await Item.destroy({
                where: { id: itemId }
            });
            return item;
        } catch (error) {
            throw new Error('Erro ao excluir item');
        }
    }
};
