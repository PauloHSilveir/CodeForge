const axios = require('axios');
const Pagamento = require('../models/PagamentoModel');

class AsaasService {
  constructor() {
    this.baseURL = 'https://sandbox.asaas.com/api/v3';
    this.apiKey = '$aact_MzkwODA2MWY2OGM3MWRlMDU2NWM3MzJlNzZmNGZhZGY6OmM1MDcwOWUzLTk3ODAtNDA2NS1hMDEzLTU4NjQwYTgxMDMwNDo6JGFhY2hfNjM0M2YxMTktZTNjZS00MWYxLTliYTgtOWU2YmRhOGE4MDc5';

    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
        'access_token': this.apiKey
      }
    });
  }

  async criarClienteAsaas(dadosCliente) {
    try {
      const existingCustomerResponse = await this.client.get('/customers', {
        params: {
          email: dadosCliente.email,
          cpfCnpj: dadosCliente.cpfCnpj
        }
      });

      if (existingCustomerResponse.data.data.length > 0) {
        return existingCustomerResponse.data.data[0].id;
      }

      // If no existing customer, create a new one
      const response = await this.client.post('/customers', {
        name: dadosCliente.nomeCliente,
        email: dadosCliente.email,
        cpfCnpj: dadosCliente.cpfCnpj,
        mobilePhone: dadosCliente.telefone,
        postalCode: dadosCliente.cep,
        address: dadosCliente.endereco,
        addressNumber: dadosCliente.numero,
        complement: dadosCliente.complemento || '',
        province: dadosCliente.bairro,
        city: dadosCliente.cidade,
        state: dadosCliente.estado
      });

      return response.data.id;
    } catch (error) {
      throw new Error(`Erro ao criar/buscar cliente no Asaas: ${error.response?.data?.errors?.[0]?.description || error.message}`);
    }
  }

  async processarPagamentoCartao(dadosPagamento) {
    try {
      const response = await this.client.post('/payments', {
        customer: dadosPagamento.clienteId,
        billingType: 'CREDIT_CARD',
        value: dadosPagamento.valor,
        dueDate: new Date().toISOString().split('T')[0],
        creditCard: {
          holderName: dadosPagamento.nomeCartao,
          number: dadosPagamento.numeroCartao,
          expiryMonth: dadosPagamento.mesValidade,
          expiryYear: dadosPagamento.anoValidade,
          ccv: dadosPagamento.cvv
        },
        creditCardHolderInfo: {
          name: dadosPagamento.nomeCartao,
          email: dadosPagamento.email,
          cpfCnpj: dadosPagamento.cpfCnpj,
          phone: dadosPagamento.telefone,

          // Adiciona informações de endereço
          postalCode: dadosPagamento.cep,
          address: dadosPagamento.endereco,
          addressNumber: dadosPagamento.numero,
          complement: dadosPagamento.complemento || '',
          province: dadosPagamento.bairro,
          city: dadosPagamento.cidade,
          uf: dadosPagamento.estado,
          country: 'Brasil'
        }
      });

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao processar pagamento no Asaas: ${error.response?.data?.errors?.[0]?.description || error.message}`);
    }
  }

  async processarBoletoBancario(dadosPagamento) {
    try {
      const response = await this.client.post('/payments', {
        customer: dadosPagamento.clienteId,
        billingType: 'BOLETO',
        value: dadosPagamento.valor,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
      });

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao gerar boleto no Asaas: ${error.response?.data?.errors?.[0]?.description || error.message}`);
    }
  }

  async processarPix(dadosPagamento) {
    try {
      const response = await this.client.post('/payments', {
        customer: dadosPagamento.clienteId,
        billingType: 'PIX',
        value: dadosPagamento.valor,
        dueDate: new Date().toISOString().split('T')[0]
      });

      return response.data;
    } catch (error) {
      throw new Error(`Erro ao gerar PIX no Asaas: ${error.response?.data?.errors?.[0]?.description || error.message}`);
    }
  }

  async consultarPagamento(pagamentoId) {
    try {
      const response = await this.client.get(`/payments/${pagamentoId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erro ao consultar pagamento no Asaas: ${error.message}`);
    }
  }
}

module.exports = new AsaasService();