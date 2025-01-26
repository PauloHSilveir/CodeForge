const { body, param } = require('express-validator');

const pagamentoValidations = {
  criarPagamento: [
    body('transacao_id').isInt().withMessage('ID da transação inválido'),
    body('metodo_pagamento')
      .isIn(['cartao_credito', 'boleto', 'pix'])
      .withMessage('Método de pagamento inválido'),
    body('valor').isFloat({ min: 0 }).withMessage('Valor inválido')
  ]
};

module.exports = pagamentoValidations;