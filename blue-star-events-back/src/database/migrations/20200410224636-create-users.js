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
        defaultValue: '',
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
        defaultValue: '',
      },
      rua: {
        type: Sequelize.STRING(100),
        allowNull: false,
        defaultValue: '',

      },
      numero: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0, 
      },
      complemento: {
        type: Sequelize.STRING(20),
        allowNull: true,
        defaultValue: '',
      },
      bairro: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: '',
      },
      cidade: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: '',
      },
      estado: {
        type: Sequelize.STRING(40),
        allowNull: false,
        defaultValue: '',
      },
      cep: {
        type: Sequelize.STRING(8),
        allowNull: false,
        defaultValue: '',
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
        type: Sequelize.BOOLEAN
      }
    });

  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.dropTable('users');

  }
};
