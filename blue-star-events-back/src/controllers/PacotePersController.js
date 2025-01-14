const PacotePersService = require('../services/pacotePersService');

module.exports = {
    // Função para listar pacotes personalizados
    async index(req, res) {
        try {
            const pacotes = await PacotePersService.getAll();
            return res.status(200).json(pacotes);
        } catch (error) {
            console.error('Erro ao buscar pacotes:', error);
            return res.status(500).json({ error: 'Erro ao buscar pacotes personalizados' });
        }
    },

    // Função para criar um pacote personalizado
    async store(req, res) {
        const { user_id, event_id } = req.body;

        try {
            const pacote = await PacotePersService.create(user_id, event_id);
            return res.status(201).json({
                status: 1,
                message: 'Pacote personalizado criado com sucesso!',
                pacote,
            });
        } catch (error) {
            console.error('Erro ao criar pacote:', error);
            return res.status(500).json({ error: 'Erro ao criar pacote personalizado' });
        }
    },

    // Função para excluir um pacote personalizado
    async delete(req, res) {
        const { pacote_id } = req.params;

        try {
            const pacote = await PacotePersService.delete(pacote_id);
            return res.status(200).json({
                status: 1,
                message: 'Pacote personalizado excluído com sucesso!',
            });
        } catch (error) {
            console.error('Erro ao excluir pacote:', error);
            return res.status(500).json({ error: 'Erro ao excluir pacote personalizado' });
        }
    },
};
