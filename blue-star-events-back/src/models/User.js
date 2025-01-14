const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: DataTypes.STRING(50),
          allowNull: false,
          validate: {
            notEmpty: { msg: "O nome não pode estar vazio" },
            len: {
              args: [2, 50],
              msg: "O nome deve ter entre 2 e 50 caracteres",
            },
          },
        },
        cpf: {
          type: DataTypes.STRING(11),
          allowNull: false,
          unique: true,
          validate: {
            is: {
              args: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
              msg: "O CPF deve estar no formato válido",
            },
          },
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
          validate: {
            len: {
              args: [6, 8],
              msg: "A senha deve ter entre 6 e 8 caracteres",
            },
          },
        },
        email: {
          type: DataTypes.STRING(50),
          allowNull: false,
          unique: true,
          validate: {
            isEmail: { msg: "O email deve ser válido" },
          },
        },
        telefone: {
          type: DataTypes.STRING(11),
          allowNull: false,
          unique: true,
          validate: {
            is: {
              args: /^\(\d{2}\) \d{5}-\d{4}$/,
              msg: "O telefone deve estar no formato (XX) XXXXX-XXXX",
            },
          },
        },
        rua: {
          type: DataTypes.STRING(100),
          allowNull: false,
          validate: {
            notEmpty: { msg: "A rua não pode estar vazia" },
          },
        },
        numero: {
          type: DataTypes.INTEGER,
          allowNull: false,
          validate: {
            isInt: { msg: "O número deve ser um valor inteiro" },
          },
        },
        complemento: {
          type: DataTypes.STRING(20),
          allowNull: true,
        },
        bairro: {
          type: DataTypes.STRING(40),
          allowNull: false,
          validate: {
            notEmpty: { msg: "O bairro não pode estar vazio" },
          },
        },
        cidade: {
          type: DataTypes.STRING(40),
          allowNull: false,
          validate: {
            notEmpty: { msg: "A cidade não pode estar vazia" },
          },
        },
        estado: {
          type: DataTypes.STRING(40),
          allowNull: false,
          validate: {
            notEmpty: { msg: "O estado não pode estar vazio" },
          },
        },
        cep: {
          type: DataTypes.STRING(8),
          allowNull: false,
          validate: {
            is: {
              args: /^\d{5}-\d{3}$/,
              msg: "O CEP deve estar no formato XXXXX-XXX",
            },
          },
        },
        islogged: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
        passwordResetToken: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        passwordResetExpires: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
      sequelize,
      tableName: 'users',
      hooks: {
        beforeCreate: (user) => {
          const salt = bcrypt.genSaltSync();
          user.password = bcrypt.hashSync(user.password, salt);
        },
        beforeUpdate: (user) => {
          if (user.password) {
            const salt = bcrypt.genSaltSync();
            user.password = bcrypt.hashSync(user.password, salt);
          }
        }
      },
    });
  }
  static associate(models) {
    this.hasMany(models.PacotePers, { foreignKey: 'user_id', as: 'pacote_pers' });
  }
}

module.exports = User;