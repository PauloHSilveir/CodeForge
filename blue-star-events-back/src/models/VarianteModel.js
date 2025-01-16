const { Model, DataTypes } = require('sequelize');

class Variante extends Model {
    static init(sequelize) {
        super.init({
            pacote_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            preco: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isDecimal: { msg: "O preço deve ser um número válido" },
                    min: {
                        args: [0.01],
                        msg: "O preço deve ser maior que zero",
                    },
                },
            },
            tamanho: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "O tamanho deve ser um número inteiro." },
                    min: { args: [1], msg: "O tamanho deve ser maior que zero." },
                },
            },
        },
            {
                sequelize,
                tableName: 'variantes',
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.Pacote, { foreignKey: 'pacote_id', as: 'pacote' });
        this.belongsToMany(models.Componente, { foreignKey: 'variante_id', through: 'pacote_componentes', as: 'componentes'});    
    }
}

module.exports = Variante;
