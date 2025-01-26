const { body, validationResult } = require('express-validator');
const { responseError } = require('../utils/responseHandler');

const validateCreatePagamento = [
  body('metodo_pagamento')
    .notEmpty()
    .withMessage('Método de pagamento é obrigatório')
    .isIn(['cartao_credito', 'boleto', 'pix'])
    .withMessage('Método de pagamento inválido'),
  
  body('valor')
    .notEmpty()
    .withMessage('Valor é obrigatório')
    .isFloat({ min: 0 })
    .withMessage('Valor deve ser um número positivo'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return responseError(res, errors.array(), 400);
    }
    next();
  }
];

module.exports = {
  validateCreatePagamento
};
