const { Model, DataTypes } = require('sequelize');

class Pacote extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    notEmpty: { msg: "O nome não pode estar vazio" },
                    len: {
                        args: [2, 50],
                        msg: "O nome deve ter entre 2 e 50 caracteres",
                    },
                },
            },
            description: {
                type: DataTypes.STRING(200),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "A descrição não pode estar vazia" },
                    len: {
                        args: [10, 200],
                        msg: "A descrição deve ter entre 10 e 200 caracteres",
                    },
                },
            },
            tipo: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O tipo do evento não pode estar vazio." },
                },
            },
            disponibilidade: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    isInt: { msg: "A quantidade deve ser um número inteiro" },
                    min: {
                        args: [0],
                        msg: "A quantidade não pode ser negativa",
                    },
                },
            },
            imagem: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "A imagem deve ser válida" },
                },
            }
        },
            {
                sequelize,
                tableName: 'pacotes',
            }
        );
    }

    static associate(models) {
        this.hasOne(models.Event, { foreignKey: 'pacote_id', as: 'evento' });
        this.hasMany(models.Variante, { foreignKey: 'pacote_id', as: 'variante' });
        }
}

module.exports = Pacote;
