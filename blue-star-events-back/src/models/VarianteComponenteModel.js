const { Model, DataTypes } = require('sequelize');

class VarianteComponente extends Model {
    static init(sequelize) {
        super.init({
            variante_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            componente_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            tableName: 'pacote_componentes',
        });
    }

    static associate(models) {
        this.belongsTo(models.Variante, { foreignKey: 'variante_id', as: 'variante' });
        this.belongsTo(models.Componente, { foreignKey: 'componente_id', as: 'componente' });
    }
}

module.exports = VarianteComponente;
