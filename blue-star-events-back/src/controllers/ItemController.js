const ItemService = require('../services/ItemService');

module.exports = {

    // Função para listar todos os itens
    async index(req, res) {
        try {
            const items = await ItemService.getAll();
            return res.status(200).json(items);
        } catch (error) {
            console.error('Erro ao buscar itens:', error);
            return res.status(500).json({ message: 'Erro ao buscar itens.' });
        }
    },

    // Função para criar um item
    async store(req, res) {
        const { name, price } = req.body;

        if (!name || !price) {
            return res.status(400).json({
                status: 0,
                message: 'Dados incompletos. Nome e preço são obrigatórios.',
            });
        }

        try {
            const item = await ItemService.create({ name, price });
            return res.status(201).json({
                status: 1,
                message: 'Item cadastrado com sucesso!',
                item,
            });
        } catch (error) {
            console.error('Erro ao cadastrar item:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao cadastrar item.',
            });
        }
    },

    // Função para atualizar um item
    async update(req, res) {
        const { itemId } = req.params;
        const { name, price } = req.body;

        try {
            await ItemService.update(itemId, { name, price });
            return res.status(200).json({
                status: 1,
                message: 'Item atualizado com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao atualizar item:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao atualizar item.',
            });
        }
    },

    // Função para excluir um item
    async delete(req, res) {
        const { itemId } = req.params;

        try {
            await ItemService.delete(itemId);
            return res.status(200).json({
                status: 1,
                message: 'Item excluído com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao excluir item:', error);
            return res.status(500).json({
                status: 0,
                message: 'Erro ao excluir item.',
            });
        }
    }
};
