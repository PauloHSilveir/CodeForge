const transacaoService = require('../services/TransacaoService');

class TransacaoController {
    async create(req, res) {
        try {
            const transacao = await transacaoService.create(req.body);
            return res.status(201).json(transacao);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const transacao = await transacaoService.update(id, req.body);
            return res.status(200).json(transacao);
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const resultado = await transacaoService.delete(id);
            return res.status(200).json(resultado);
        } catch (error) {
            if (error.message.includes('não encontrada')) {
                return res.status(404).json({ error: error.message });
            }
            return res.status(400).json({ error: error.message });
        }
    }

    async findById(req, res) {
        try {
            const { id } = req.params;
            const transacao = await transacaoService.findById(id);
            if (!transacao) {
                return res.status(404).json({ error: 'Transação não encontrada' });
            }
            return res.status(200).json(transacao);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async findByUser(req, res) {
        try {
            const { usuarioId } = req.params;
            const transacoes = await transacaoService.findByUser(usuarioId);
            return res.status(200).json(transacoes);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async findAll(req, res) {
        try {
            const transacoes = await transacaoService.findAll();
            return res.status(200).json(transacoes);
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = new TransacaoController();