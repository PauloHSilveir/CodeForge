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
      telefone: {
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

    // Tabela de eventos
    await queryInterface.createTable('events', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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

    // Tabela de pacotes personalizados
    await queryInterface.createTable('pacote_pers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'events',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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

    // Tabela de profissionais
    await queryInterface.createTable('professionals', {
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
          model: 'pacote_pers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
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

    // Tabela de itens
    await queryInterface.createTable('items', {
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
          model: 'pacote_pers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
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

    // Tabela de comidas
    await queryInterface.createTable('foods', {
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
          model: 'pacote_pers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      price: {
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

    await queryInterface.bulkInsert('users', [
      {
        name: 'João Silva',
        cpf: '12345678901',
        password: 'password123',
        email: 'joao.silva@example.com',
        telefone: '11987654321',
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
        telefone: '21987654321',
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
        telefone: '31987654321',
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

    await queryInterface.bulkInsert('events', [
      {
        tamanho: 100,
        tipo: 'Casamento',
        data: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tamanho: 300,
        tipo: 'Aniversário',
        data: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        tamanho: 800,
        tipo: 'Casamento',
        data: new Date(),
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('pacote_pers', [
      {
        user_id: 1,
        event_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('professionals', [
      {
        pacote_id: 1,
        name: 'Pedro Almeida',
        price: 150.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 1,
        name: 'Ana Costa',
        price: 200.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 1,
        name: 'Roberto Lima',
        price: 180.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('items', [
      {
        pacote_id: 1,
        name: 'Cadeira de escritório',
        price: 150.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 1,
        name: 'Mesa Branca',
        price: 200.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 1,
        name: 'Sofá de Couro',
        price: 180.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('foods', [
      {
        pacote_id: 1,
        name: 'Arroz',
        price: 20.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 1,
        name: 'Costela ao bafo',
        price: 30.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        pacote_id: 1,
        name: 'Coxinha',
        price: 5.00,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('foods');
    await queryInterface.dropTable('items');
    await queryInterface.dropTable('professionals');
    await queryInterface.dropTable('pacote_pers');
    await queryInterface.dropTable('events');
    await queryInterface.dropTable('users');

  },
};
