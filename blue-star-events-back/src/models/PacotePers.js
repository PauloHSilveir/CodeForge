const { Model, DataTypes } = require('sequelize');

class PacotePers extends Model {
    static init(sequelize) {
        super.init({
            user_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            event_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        },
            {
                sequelize,
                tableName: 'pacote_pers',
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
        this.belongsTo(models.Event, { foreignKey: 'event_id', as: 'event' });
        this.hasMany(models.Professional, { foreignKey: 'pacote_id', as: 'professionals' });
        this.hasMany(models.Item, { foreignKey: 'pacote_id', as: 'items' });
        this.hasMany(models.Food, { foreignKey: 'pacote_id', as: 'foods' });
    }
}

module.exports = PacotePers;
