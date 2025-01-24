const {Model, DataTypes} = require('sequelize');

class Pagamento extends Model {
    static init(sequelize) {
        super.init({
            data: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    idDate: {
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

                    isIn: {
                        args:[['pago', 'processando', 'falhou']],
                        msg: "O status deve ser 'pago', 'pendente'ou 'falhou'",
                    }
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
    }
}

module.exports = Pagamento;