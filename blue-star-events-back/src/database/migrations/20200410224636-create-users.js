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
      is_admin: {
        type: Sequelize.BOOLEAN,
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
        unique: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco: {
        type: Sequelize.DECIMAL,
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
      tamanho: {
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

    // Tabela de componentes
    await queryInterface.createTable('componentes', {
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
      categoria: {
        type: Sequelize.STRING,
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

    // Tabela de pacote_componentes
    await queryInterface.createTable('pacote_componentes', {
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
      componente_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'componentes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      quantidade_componente: {
        type: Sequelize.INTEGER,
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

    // Tabela do carrinho
    await queryInterface.createTable('carrinho', {
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
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      preco_unitario: {
        type: Sequelize.DECIMAL(10, 2),
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
      asaas_payment_id: {
        type: Sequelize.STRING,
        allowNull: true,
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

    await queryInterface.createTable('transacoes', {
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
      pagamento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pagamentos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      evento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'eventos',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      data: {
        type: Sequelize.DATE,
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

    await queryInterface.createTable('transacao_pacote', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      transacao_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'transacoes',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
      
      quantidade_pacote: {
        type: Sequelize.INTEGER,
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
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      data_admissao: {
        type: Sequelize.DATE,
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
        cpf: '56600378018',
        password: 'password123',
        email: 'joao.silva@example.com',
        phone: '37998232727',
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
        is_admin: true,
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
        is_admin: true,
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
        is_admin: true,
        password_reset_token: null,
        password_reset_expires: null,
      },
    ]);

    await queryInterface.bulkInsert('pacotes', [
      {
        name: 'Pacote 1',
        description: 'Descrição do Pacote 1',
        tipo: 'Casamento',
        preco: 100.00,
        disponibilidade: 3,
        imagem: 'Aniversario.jpg',
        tamanho: 'grande',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pacote 2',
        description: 'Descrição do Pacote 2',
        tipo: 'Casamento',
        preco: 200.00,
        disponibilidade: 10,
        imagem: 'Aniversario.jpg',
        tamanho: 'medio',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Pacote 3',
        description: 'Descrição do Pacote 3',
        tipo: 'Casamento',
        preco: 300.00,
        disponibilidade: 30,
        imagem: 'Casamento.jpg',
        tamanho: 'pequeno',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('eventos', [
      {
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
        name: 'Cadeira de escritório',
        description: 'Cadeira de escritório confortável',
        preco: 150.00,
        categoria: 'Item',
        imagem: 'cadeira.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Cozinheira',
        description: 'Cozinheira de mão cheia',
        preco: 200.00,
        categoria: 'Funcionário',
        imagem: 'cozinheiro.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'Coxinha',
        description: 'Coxinha de frango',
        preco: 180.00,
        categoria: 'Comida',
        imagem: 'coxinha.jpg',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);


    await queryInterface.bulkInsert('pacote_componentes', [
      {
        pacote_id: 1,
        componente_id: 1,
        quantidade_componente: 90,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 1,
        componente_id: 2,
        quantidade_componente: 50,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 2,
        componente_id: 2,
        quantidade_componente: 30,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('carrinho', [
      {
        id: 1,
        usuario_id: 1,
        pacote_id: 1,
        quantidade: 1,
        preco_unitario: 150.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        usuario_id: 2,
        pacote_id: 2,
        quantidade: 1,
        preco_unitario: 200.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        usuario_id: 2,
        pacote_id: 3,
        quantidade: 1,
        preco_unitario: 200.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('pagamentos', [
      {
        id: 1,
        usuario_id: 1,
        data: new Date(),
        metodo_pagamento: 'cartao_credito',
        valor: 150.00,
        status: 'pendente',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        usuario_id: 1,
        data: new Date(),
        metodo_pagamento: 'cartao_credito',
        valor: 200.00,
        status: 'concluido',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        usuario_id: 2,
        data: new Date(),
        metodo_pagamento: 'pix',
        valor: 300.00,
        status: 'pendente',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 4,
        usuario_id: 3,
        data: new Date(),
        metodo_pagamento: 'pix',
        valor: 300.00,
        status: 'pendente',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('transacoes', [
      {
        id: 1,
        usuario_id: 1,
        pagamento_id: 1,
        evento_id: 1,
        data: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        usuario_id: 2,
        pagamento_id: 2,
        evento_id: 2,
        data: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        usuario_id: 3,
        pagamento_id: 3,
        evento_id: 3,
        data: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('transacao_pacote', [
      {
        transacao_id: 1,
        pacote_id: 1,
        quantidade_pacote: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        transacao_id: 2,
        pacote_id: 2,
        quantidade_pacote: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        transacao_id: 3,
        pacote_id: 3,
        quantidade_pacote: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    // Inserir dados na tabela "admin"
    await queryInterface.bulkInsert('admin', [
      {
        id: 1,
        usuario_id: 1,
        salario: 5000,
        data_admissao: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 2,
        usuario_id: 2,
        salario: 6000,
        data_admissao: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 3,
        usuario_id: 3,
        salario: 7000,
        data_admissao: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('admin');
    await queryInterface.dropTable('transacao_pacote');
    await queryInterface.dropTable('transacoes');
    await queryInterface.dropTable('pagamentos');
    await queryInterface.dropTable('carrinho');
    await queryInterface.dropTable('pacote_componentes');
    await queryInterface.dropTable('componentes');
    await queryInterface.dropTable('eventos');
    await queryInterface.dropTable('pacotes');
    await queryInterface.dropTable('users');

  },
};
