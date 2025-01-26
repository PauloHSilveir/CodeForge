const { Model, DataTypes } = require('sequelize');

class Pagamento extends Model {
    static init(sequelize) {
        super.init({
            usuario_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            asaas_payment_id: {
                type: DataTypes.STRING,
                allowNull: true
            },
            data: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: {
                        msg: "A data deve ser valida",
                    }
                },
            },
            metodo_pagamento: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "O metodo de pagamento não pode estar vazio",
                    },

                    isIn: {
                        args: [['pix', 'boleto', 'cartao_credito']],
                        msg: "O metodo de pagamento deve ser 'pix', 'boleto' ou 'cartao_credido'",
                    },
                },
            },

            valor: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        msg: "O valor deve ser um número decimal",
                    },
                },
            },

            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "Status não pode estar vazio",
                    },
                },
            },
        }, {
            sequelize, tableName: 'pagamentos',
        });
    }

    static associate(models) {
        this.hasOne(models.Transacao, {
            foreignKey: 'pagamento_id', as: 'transacao',
        });
        this.belongsTo(models.User, {
            foreignKey: 'usuario_id', as: 'user',
        });
    }
}

module.exports = Pagamento;