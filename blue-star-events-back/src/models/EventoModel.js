const { Model, DataTypes } = require('sequelize');

class Evento extends Model {
    static init(sequelize) {
        super.init({
            data: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: { msg: "A data deve ser válida." },
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
                type: DataTypes.STRING(10),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O número não pode estar vazio" },
                },
            },
            complemento: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            bairro: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O bairro não pode estar vazio" },
                },
            },
            cidade: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "A cidade não pode estar vazia" },
                },
            },
            estado: {
                type: DataTypes.STRING(2),
                allowNull: false,
                validate: {
                    is: {
                        args: /^[A-Z]{2}$/,
                        msg: "O estado deve ser uma sigla de 2 letras maiúsculas",
                    },
                },
            },
            cep: {
                type: DataTypes.STRING(9),
                allowNull: false,
                validate: {
                    is: {
                        args: /^\d{5}-\d{3}$/,
                        msg: "O CEP deve estar no formato XXXXX-XXX",
                    },
                },
            }
        },
            {
                sequelize,
                tableName: 'eventos',
            }
        );
    }
    static associate(models) {
        this.hasOne(models.Transacao, { foreignKey: 'evento_id', as: 'transacao' });
    }
}

module.exports = Evento;
