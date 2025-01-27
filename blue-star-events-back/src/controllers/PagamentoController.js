const PagamentoService = require('../services/PagamentoService');
const { responseSuccess, responseError } = require('../utils/responseHandler');

class PagamentoController {
  async criarPagamento(req, res) {
    try {
      const {
        usuario_id,
        metodo_pagamento,
        valor,
        nomeCartao,
        numeroCartao,
        mesValidade,
        anoValidade,
        cvv
      } = req.body;

      if (!usuario_id || !metodo_pagamento || !valor) {
        return responseError(res, 'Campos obrigatórios não preenchidos', 400);
      }

      const dadosPagamento = {
        usuario_id,
        metodo_pagamento,
        valor,
        nomeCartao,
        numeroCartao,
        mesValidade,
        anoValidade,
        cvv
      };

      const resultado = await PagamentoService.criarPagamento(dadosPagamento);

      return responseSuccess(res, resultado, 201);
    } catch (error) {
      return responseError(res, error.message, 500);
    }
  }

  /*async atualizarStatus(req, res) {
    try {
      const { asaasPaymentId } = req.params;
      
      const resultado = await PagamentoService.atualizarStatusPagamento(asaasPaymentId);
      
      return responseSuccess(res, resultado);
    } catch (error) {
      return responseError(res, error.message, 500);
    }
  }*/

  /*async listarPagamentos(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;

      //Atualiza status antes de listar
      await PagamentoService.atualizarStatusPagamento(asaasPaymentId);

      const pagamentos = await PagamentoService.listarPagamentos(page, limit);
      return responseSuccess(res, pagamentos);
    } catch (error) {
      return responseError(res, error.message, 500);
    }
  }*/

  async findByUser(req, res) {
    try {
      const { id } = req.params;

      const pagamentos = await PagamentoService.findByUser(id);

      // Atualiza o status
      for (const pagamento of pagamentos) {
        await PagamentoService.atualizarStatusPagamento(pagamento.asaas_payment_id);
      }

      res.status(200).send(pagamentos);
    } catch (error) {
      res.status(500).send({ msg: error.message });
    }
  }


  async buscarPagamentoPorId(req, res) {
    try {
      const { id } = req.params;
      const pagamento = await PagamentoService.buscarPagamentoPorId(id);

      if (!pagamento) {
        return responseError(res, 'Pagamento não encontrado', 404);
      }

      return responseSuccess(res, pagamento);
    } catch (error) {
      return responseError(res, error.message, 500);
    }
  }
  /*
  async atualizarPagamento(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const pagamentoAtualizado = await PagamentoService.atualizarPagamento(id, { status });
      
      return responseSuccess(res, pagamentoAtualizado);
    } catch (error) {
      return responseError(res, error.message, 500);
    }
  }*/
}

module.exports = new PagamentoController();