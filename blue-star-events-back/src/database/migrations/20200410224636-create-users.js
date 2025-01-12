'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      telefone: {
        type: Sequelize.STRING(11),
        allowNull: false,
      },
      rua: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      complemento: {
        type: Sequelize.STRING(20),
        allowNull: true,
      },
      bairro: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      cidade: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      estado: {
        type: Sequelize.STRING(40),
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(8),
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
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('users');
  },
};
