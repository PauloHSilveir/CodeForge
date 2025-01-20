const { Model, DataTypes } = require('sequelize');

class Carrinho extends Model {
    static init(sequelize) {
        super.init({
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id'
                }
            },
            pacote_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'pacotes',
                    key: 'id'
                }
            },
            quantidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "A quantidade deve ser um número inteiro" },
                    min: {
                        args: [1],
                        msg: "A quantidade deve ser maior que zero",
                    },
                },
            },
            preco_unitario: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    min: {
                        args: [0],
                        msg: "O preço não pode ser negativo"
                    }
                }
            },
            preco_total: {
                type: DataTypes.VIRTUAL,
                get() {
                    return parseFloat(this.preco_unitario * this.quantidade).toFixed(2);
                }
            }
        }, {
            sequelize,
            tableName: 'carrinho',
            timestamps: true
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { 
            foreignKey: 'usuario_id', 
            as: 'usuario',
            onDelete: 'CASCADE' 
        });
        this.belongsTo(models.Pacote, { 
            foreignKey: 'pacote_id', 
            as: 'pacote',
            onDelete: 'CASCADE' 
        });
    }
}

module.exports = Carrinho;