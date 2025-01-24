const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/TransacaoController');

router.post('/create', transacaoController.create);//Criar transação
router.put('/update/:id', transacaoController.update);//Editar transação
router.get('/:id', transacaoController.findById);//Pegar dados de uma transação
router.get('/', transacaoController.findAll);//Listar todas as transações
router.get('/usuario/:usuarioId', transacaoController.findByUser);//listar todas de um determinado usuario
router.delete('/delete/:id', transacaoController.delete);//Deletar uma transação

module.exports = router;