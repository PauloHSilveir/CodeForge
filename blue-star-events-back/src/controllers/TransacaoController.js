const transacaoService = require('../services/TransacaoService');

class TransacaoController {
    async create(req, res) {
        try {
            const transacaoData = req.body;
            const transacao = await transacaoService.create(transacaoData);
            res.status(201).send(transacao);
        } catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    async update(req, res) {
        try {
            const {id} = req.params;
            const transacaoData = req.body;
            const transacao = await transacaoService.update(id, transacaoData);
            res.status(200).send(transacao);
        } catch (error) {
            res.status(500).send({msg: error.message});
        }
    }

    async delete(req, res) {
        try {
            const {id} = req.params;
            const resultado = await transacaoService.cancelar(id);
            res.status(200).send(resultado);
        } catch (error) {
            res.status(500).send({msg: error.message});
        }
    }

    async findById(req, res) {
        try {
            const {id} = req.params;
            const transacao = await transacaoService.findById(id);
            res.status(200).send(transacao);
        } catch (error) {
            res.status(500).send({msg: error.message}); 
        }
    }

    async findByUser(req, res) {
        try {
            const {usuarioId} = req.params;
            const transacoes = await transacaoService.findByUser(usuarioId);
            res.status(200).send(transacoes);
        } catch (error) {
            res.status(500).send({msg: error.message}); 
        }
    }

    async findAll(req, res) {
        try {
            const transacoes = await transacaoService.findAll();
            res.status(200).send(transacoes);
        } catch (error) {
            res.status(500).send({msg: error.message}); 
        }
    }
}

module.exports = new TransacaoController();