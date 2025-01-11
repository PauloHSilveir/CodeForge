const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
          name: {
            type: DataTypes.STRING(50),
            allowNull: false,
          },
          cpf: {
            type: DataTypes.STRING(11),
            allowNull: false,
          },
          password: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          email: {
            type: DataTypes.STRING(50),
            allowNull: false,
          },
          telefone: {
            type: DataTypes.STRING(11),
            allowNull: false,
          },
          rua: {
            type: DataTypes.STRING(100),
            allowNull: false,
          },
          numero: {
            type: DataTypes.INTEGER,
            allowNull: false,
          },
          complemento: {
            type: DataTypes.STRING(20),
            allowNull: true, // Aceita null
          },
          bairro: {
            type: DataTypes.STRING(40),
            allowNull: false,
          },
          cidade: {
            type: DataTypes.STRING(40),
            allowNull: false,
          },
          estado: {
            type: DataTypes.STRING(40),
            allowNull: false,
          },
          cep: {
            type: DataTypes.STRING(8),
            allowNull: false,
          },
          islogged: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
        }, {
          sequelize,
          tableName: 'users',
          hooks: {
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                },
            },
        });
    }
}

module.exports = User;