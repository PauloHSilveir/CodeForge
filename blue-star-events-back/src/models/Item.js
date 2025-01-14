const { Model, DataTypes } = require('sequelize');

class Item extends Model {
    static init(sequelize) {
        super.init({
            pacote_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },  
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O nome do item não pode estar vazio." },
                    len: { args: [2, 50], msg: "O nome deve ter entre 2 e 50 caracteres." },
                },
            },
            price: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isDecimal: { msg: "O preço deve ser um número válido." },
                    min: { args: [0], msg: "O preço não pode ser negativo." },
                },
            },
        },
            {
                sequelize,
                tableName: 'items',
            }
        );
    }
    static associate(models) {
        this.belongsTo(models.PacotePers, { foreignKey: 'pacote_id', as: 'pacote_pers' });
    }
}

module.exports = Item;
