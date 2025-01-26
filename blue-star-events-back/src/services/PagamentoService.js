const Pagamento = require('../models/PagamentoModel');
const AsaasService = require('./AsaasService');
const User = require('../models/UserModel');

class PagamentoService {
  async criarPagamento(dadosPagamento) {
    try {
      // Função para remover caracteres não numéricos
      //const transformarEmNumeros = (texto) => texto.replace(/\D/g, '');
  
      // Primeiro, buscar informações do usuário
      const usuario = await User.findByPk(dadosPagamento.usuario_id, {
        attributes: [
          'name', 
          'cpf', 
          'phone', 
          'email', 
          'rua', 
          'numero', 
          'complemento', 
          'bairro', 
          'cidade', 
          'estado', 
          'cep'
        ]
      });
  
      if (!usuario) {
        throw new Error('Usuário não encontrado');
      }
  
      // Combinar dados do usuário com dados de pagamento
      const dadosCompletos = {
        ...dadosPagamento,
        nomeCliente: usuario.name,
        cpfCnpj: usuario.cpf,
        telefone: usuario.phone,
        email: usuario.email,
        endereco: usuario.rua,
        numero: usuario.numero,
        complemento: usuario.complemento,
        bairro: usuario.bairro,
        cidade: usuario.cidade,
        estado: usuario.estado,
        cep: usuario.cep
      };
      console.log('Dados Completos:', dadosCompletos);
  
      // Criar cliente no Asaas usando dadosCompletos
      const clienteId = await AsaasService.criarClienteAsaas(dadosCompletos);
  
      let resultadoAsaas;
      let statusPagamento = 'pendente';
  
      // Processar pagamento conforme método
      switch (dadosCompletos.metodo_pagamento) {
        case 'cartao_credito':
          resultadoAsaas = await AsaasService.processarPagamentoCartao({
            ...dadosCompletos,
            clienteId
          });
          break;
        case 'boleto':
          resultadoAsaas = await AsaasService.processarBoletoBancario({
            ...dadosCompletos,
            clienteId
          });
          break;
        case 'pix':
          resultadoAsaas = await AsaasService.processarPix({
            ...dadosCompletos,
            clienteId
          });
          break;
        default:
          throw new Error('Método de pagamento inválido');
      }
  
      // Determinar status do pagamento
      statusPagamento = this.mapearStatusPagamento(resultadoAsaas.status);
  
      // Salvar pagamento no banco de dados local
      const pagamento = await Pagamento.create({
        usuario_id: dadosCompletos.usuario_id,
        data: new Date(),
        metodo_pagamento: dadosCompletos.metodo_pagamento,
        valor: dadosCompletos.valor,
        status: statusPagamento,
        asaas_payment_id: resultadoAsaas.id
      });
  
      return {
        pagamento,
        dadosAsaas: resultadoAsaas
      };
    } catch (error) {
      throw new Error(`Erro ao processar pagamento: ${error.message}`);
    }
  }  

  // Método para mapear status do pagamento
  mapearStatusPagamento(statusAsaas) {
    const mapaStatus = {
      'PENDING': 'pendente',
      'RECEIVED': 'concluido',
      'CONFIRMED': 'concluido',
      'OVERDUE': 'atrasado',
      'REFUNDED': 'reembolsado',
      'RECEIVED_IN_CASH': 'concluido',
      'CANCELLED': 'cancelado'
    };

    return mapaStatus[statusAsaas] || 'pendente';
  }

  // Método para atualizar status do pagamento
  async atualizarStatusPagamento(asaasPaymentId) {
    try {
      // Consultar status atual no Asaas
      const dadosAsaas = await AsaasService.consultarPagamento(asaasPaymentId);
      const novoStatus = this.mapearStatusPagamento(dadosAsaas.status);

      const [linhasAfetadas] = await Pagamento.update(
        { status: novoStatus },
        { 
          where: { asaas_payment_id: asaasPaymentId },
          returning: true 
        }
      );

      if (linhasAfetadas === 0) {
        throw new Error(`Pagamento com ID ${asaasPaymentId} não encontrado`);
      }

      return {
        statusAnterior: dadosAsaas.status,
        novoStatus
      };
    } catch (error) {
      throw new Error(`Erro ao atualizar status do pagamento: ${error.message}`);
    }
  }

  async listarPagamentos(page, limit) {
    try {
      const offset = (page - 1) * limit;
      
      const { count, rows } = await Pagamento.findAndCountAll({
        limit: Number(limit),
        offset: Number(offset),
        order: [['created_at', 'DESC']]
      });

      return {
        total: count,
        pagina: page,
        registros: rows
      };
    } catch (error) {
      throw new Error(`Erro ao listar pagamentos: ${error.message}`);
    }
  }

  async buscarPagamentoPorId(id) {
    try {
      const pagamento = await Pagamento.findByPk(id);
      return pagamento;
    } catch (error) {
      throw new Error(`Erro ao buscar pagamento: ${error.message}`);
    }
  }
  /*
  async atualizarPagamento(id, dadosAtualizacao) {
    try {
      const [linhasAfetadas] = await Pagamento.update(dadosAtualizacao, {
        where: { id }
      });

      if (linhasAfetadas === 0) {
        throw new Error('Pagamento não encontrado');
      }

      return this.buscarPagamentoPorId(id);
    } catch (error) {
      throw new Error(`Erro ao atualizar pagamento: ${error.message}`);
    }
  }*/
}

module.exports = new PagamentoService(); 