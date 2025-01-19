const { Model, DataTypes } = require('sequelize');

class PacoteComponente extends Model {
    static init(sequelize) {
        super.init({
            pacote_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            componente_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            quantidade_componente: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'pacote_componentes',
        });
    }

    static associate(models) {
        this.belongsTo(models.Pacote, { foreignKey: 'pacote_id', as: 'pacote' });
        this.belongsTo(models.Componente, { foreignKey: 'componente_id', as: 'componente' });
    }
}

module.exports = PacoteComponente;
