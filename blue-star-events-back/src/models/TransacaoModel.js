const {Model, DataTypes} = require('sequelize');
const TransacaoPacote = require('./TransacaoPacoteModel');  

class Transacao extends Model {
    static init(sequelize) {
        super.init({
            data : {
                type: DataTypes.DATE,
                allowNull: false,
                validade: {
                    isDate: {
                        msg: "A data deve ser válida"
                    }
                },
            },

            valor: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isDecimal: {
                        msg: "O Valor deve ser um número decimal"
                    } 
                },
            },

            status: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: {
                        msg: "O status não pode estar vazio"
                    },

                    isIn: {
                        args: [['pendente', 'completa', 'falha']],
                        msg: "O status da transação deve ser 'pendente', 'completa','falha' ou 'cancelada'",
                    },
                },
            },

        }, {
            sequelize,
            tableName: 'transacoes',
        });
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'usuario_id', as: 'usuario'
        });

        this.belongsTo(models.Pagamento, {
            foreignKey: 'pagamento_id', as: 'pagamento'
        });

        
        this.hasMany(models.TransacaoPacote, { as: 'transacao_pacotes', foreignKey: 'transacao_id' });
        

    }
}

module.exports = Transacao;