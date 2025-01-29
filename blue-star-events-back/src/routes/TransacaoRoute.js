const express = require('express');
const router = express.Router();
const transacaoController = require('../controllers/TransacaoController');

// Rotas de listagem
router.get('/', transacaoController.findAll);
router.get('/:id', transacaoController.findById);
router.get('/usuario/:usuarioId', transacaoController.findByUser);

// Rotas de manipulação
router.post('/create', transacaoController.create);
router.put('/update/:id', transacaoController.update);
router.delete('/delete/:id', transacaoController.delete);

module.exports = router;