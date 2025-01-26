const express = require('express');
const PagamentoController = require('../controllers/PagamentoController');
const { validateCreatePagamento } = require('../middlewares/validationMiddleware');

const router = express.Router();

router.post('/', validateCreatePagamento, PagamentoController.criarPagamento);
router.get('/', PagamentoController.listarPagamentos);
router.get('/:id', PagamentoController.buscarPagamentoPorId);
//router.patch('/:id', PagamentoController.atualizarPagamento);
router.patch('/status/:asaasPaymentId', PagamentoController.atualizarStatus);

module.exports = router;