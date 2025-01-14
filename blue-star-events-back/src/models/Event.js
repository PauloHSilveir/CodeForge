const { Model, DataTypes } = require('sequelize');

class Event extends Model {
    static init(sequelize) {
        super.init({
            tamanho: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "O tamanho deve ser um número inteiro." },
                    min: { args: [1], msg: "O tamanho deve ser maior que zero." },
                },
            },
            tipo: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O tipo do evento não pode estar vazio." },
                },
            },
            data: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: { msg: "A data deve ser válida." },
                },
            },
        },
            {
                sequelize,
                tableName: 'events',
            }
        );
    }
    static associate(models) {
        this.hasOne(models.PacotePers, { foreignKey: 'event_id', as: 'pacote_pers' });
    }
}

module.exports = Event;
