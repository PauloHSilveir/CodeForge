const { Model, DataTypes } = require('sequelize');

class Componente extends Model {
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
            categoria: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: { msg: "A categoria não pode estar vazia" },
                },
            },
            quantidade: {
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
        }, {
            sequelize,
            tableName: 'componentes',
        });
    }
    static associate(models) {
        this.belongsToMany(models.Pacote, { foreignKey: 'componente_id', through: 'pacote_componentes', as: 'pacotes'});    }
}

module.exports = Componente;