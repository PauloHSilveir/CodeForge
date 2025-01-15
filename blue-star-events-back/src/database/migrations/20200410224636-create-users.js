'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Tabela de usuários
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      phone: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      islogged: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      password_reset_token: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password_reset_expires: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });

    // Tabela de pacotes
    await queryInterface.createTable('pacotes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      tamanho: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      disponibilidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Tabela de eventos
    await queryInterface.createTable('eventos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pacote_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'pacotes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      rua: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      complemento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    // Tabela de itens
    await queryInterface.createTable('componentes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pacote_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'pacotes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      categoria: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      imagem: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('transacoes', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      pacote_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pacotes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('pagamentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      transacao_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'transacoes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      data: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      metodo_pagamento: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.createTable('admin', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      salario: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      data_admissao: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.bulkInsert('users', [
      {
        name: 'João Silva',
        cpf: '12345678901',
        password: 'password123',
        email: 'joao.silva@example.com',
        phone: '11987654321',
        rua: 'Rua A',
        numero: 10,
        complemento: 'Apto 101',
        bairro: 'Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01010001',
        created_at: new Date(),
        updated_at: new Date(),
        islogged: false,
        password_reset_token: null,
        password_reset_expires: null,
      },
      {
        name: 'Maria Oliveira',
        cpf: '23456789012',
        password: 'password456',
        email: 'maria.oliveira@example.com',
        phone: '21987654321',
        rua: 'Rua B',
        numero: 20,
        complemento: 'Casa',
        bairro: 'Vila Nova',
        cidade: 'Rio de Janeiro',
        estado: 'RJ',
        cep: '22020002',
        created_at: new Date(),
        updated_at: new Date(),
        islogged: false,
        password_reset_token: null,
        password_reset_expires: null,
      },
      {
        name: 'Carlos Pereira',
        cpf: '34567890123',
        password: 'password789',
        email: 'carlos.pereira@example.com',
        phone: '31987654321',
        rua: 'Rua C',
        numero: 30,
        complemento: 'Sala Comercial',
        bairro: 'Jardim América',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        cep: '30130003',
        created_at: new Date(),
        updated_at: new Date(),
        islogged: false,
        password_reset_token: null,
        password_reset_expires: null,
      },
    ]);

    await queryInterface.bulkInsert('pacotes', [
      {
        name: 'Pacote 1',
        description: 'Descrição do Pacote 1',
        preco: 100.0,
        tamanho: 100,
        tipo: 'Casamento',
        disponibilidade: 3, 
        imagem: 'pacote1.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pacote 2',
        description: 'Descrição do Pacote 2',
        preco: 300.0,
        tamanho: 300,
        tipo: 'Casamento',
        disponibilidade: 10,
        imagem: 'pacote2.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pacote 3',
        description: 'Descrição do Pacote 3',
        preco: 500.0,
        tamanho: 500,
        tipo: 'Casamento',
        disponibilidade: 30,
        imagem: 'pacote3.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('eventos', [
      {
        pacote_id: 1,
        data: new Date(),
        rua: 'Rua U',
        numero: 30,
        complemento: 'Sala Comercial',
        bairro: 'Jardim América',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        cep: '30130003',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 2,
        data: new Date(),
        rua: 'Rua V',
        numero: 36,
        complemento: 'Apto 101',
        bairro: 'Jardim América',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        cep: '30130003',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 3,
        data: new Date(),
        rua: 'Rua W',
        numero: 70,
        complemento: 'Sala Comercial',
        bairro: 'Jardim América',
        cidade: 'Belo Horizonte',
        estado: 'MG',
        cep: '30130003',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('componentes', [
      {
        pacote_id: 1,
        name: 'Cadeira de escritório',
        description: 'Cadeira de escritório confortável',
        preco: 150.00,
        categoria: 'Itens',
        quantidade: 10,
        imagem: 'cadeira.jpg',  
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 1,
        name: 'Cozinheira',
        description: 'Cozinheira de mão cheia',
        preco: 200.00,
        categoria: 'Funcionarios',
        quantidade: 5,
        imagem: 'cozinheiro.jpg',  
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 1,
        name: 'Coxinha',
        description: 'Coxinha de frango',
        preco: 180.00,
        categoria: 'Comidas',
        quantidade: 5,
        imagem: 'coxinha.jpg',  
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('transacoes', [
      {
        id: 1,
        pacote_id: 1,
        usuario_id: 1,
        data: new Date(),
        valor: 150.00,
        status: 'completo',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        pacote_id: 2,
        usuario_id: 2,
        data: new Date(),
        valor: 200.00,
        status: 'pendente',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        pacote_id: 3,
        usuario_id: 3,
        data: new Date(),
        valor: 300.00,
        status: 'falha',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Inserir dados na tabela "pagamentos"
    await queryInterface.bulkInsert('pagamentos', [
      {
        id: 1,
        transacao_id: 1,
        data: new Date(),
        metodo_pagamento: 'cartao_credito',
        valor: 150.00,
        status: 'pago',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        transacao_id: 2,
        data: new Date(),
        metodo_pagamento: 'cartao_credito',
        valor: 200.00,
        status: 'processando',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        transacao_id: 3,
        data: new Date(),
        metodo_pagamento: 'pix',
        valor: 300.00,
        status: 'falhou',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Inserir dados na tabela "admin"
    await queryInterface.bulkInsert('admin', [
      {
        id: 1,
        usuario_id: 1,
        salario: '5000',
        data_admissao: '2025-01-01',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        usuario_id: 2,
        salario: '6000',
        data_admissao: '2024-06-15',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        usuario_id: 3,
        salario: '7000',
        data_admissao: '2023-03-10',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin');
    await queryInterface.dropTable('pagamentos');
    await queryInterface.dropTable('transacoes');
    await queryInterface.dropTable('componentes');
    await queryInterface.dropTable('eventos');
    await queryInterface.dropTable('pacotes');
    await queryInterface.dropTable('users');

  },
};
