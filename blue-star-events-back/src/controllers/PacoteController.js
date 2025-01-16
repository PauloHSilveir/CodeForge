const PacoteService = require('../services/PacoteService');

module.exports = {
    async GetAll(req, res) {
        try {
            const pacotes = await PacoteService.getAll();
            return res.status(200).json(pacotes);
        } catch (error) {
            console.error('Erro ao buscar pacotes:', error);
            return res.status(500).json({ error: 'Erro ao buscar pacotes' });
        }
    },

    // Criar um novo pacote
    async Store(req, res) {
        const { name, description, preco, tamanho, tipo, disponibilidade, imagem } = req.body;

        try {
            const pacote = await PacoteService.create({ name, description, preco, tamanho, tipo, disponibilidade, imagem });
            return res.status(201).json({
                status: 1,
                message: 'Pacote criado com sucesso!',
                pacote,
            });
        } catch (error) {
            console.error('Erro ao criar pacote:', error);
            return res.status(400).json({ error: error.message });
        }
    },

    // Atualizar pacote existente
    async Update(req, res) {
        const { id } = req.params;
        const { name, description, preco, tamanho, tipo, disponibilidade, imagem } = req.body;

        try {
            const pacote = await PacoteService.update(id, { name, description, preco, tamanho, tipo, disponibilidade, imagem });
            return res.status(200).json({
                status: 1,
                message: 'Pacote atualizado com sucesso!',
                pacote,
            });
        } catch (error) {
            console.error('Erro ao atualizar pacote:', error);
            return res.status(400).json({ error: error.message });
        }
    },

    // Excluir um pacote
    async Delete(req, res) {
        const { id } = req.params;

        try {
            await PacoteService.delete(id);
            return res.status(200).json({
                status: 1,
                message: 'Pacote excluído com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao excluir pacote:', error);
            return res.status(400).json({ error: error.message });
        }
    },

    // Buscar um pacote por ID
    async GetOne(req, res) {
        const { id } = req.params;

        try {
            const pacote = await PacoteService.getById(id);
            return res.status(200).json(pacote);
        } catch (error) {
            console.error('Erro ao buscar pacote:', error);
            return res.status(400).json({ error: error.message });
        }
    },
};
