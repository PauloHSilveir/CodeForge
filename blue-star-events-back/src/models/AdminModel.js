const { Model, DataTypes } = require('sequelize');

class Admin extends Model {
    static init(sequelize) {
        super.init({
            usuario_id: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
            salario: {
                type: DataTypes.DECIMAL(10, 2),
                allowNull: false,
                validate: {
                    isDecimal: { msg: "O salario deve ser um número válido" },
                    min: {
                        args: [0.01],
                        msg: "O salario deve ser maior que zero",
                    },
                },
            },
            data_admissao: {
                type: DataTypes.DATE,
                allowNull: false,
                validate: {
                    isDate: { msg: "A data deve ser válida." },
                },
            },
        }, {
            sequelize,
            tableName: 'admin',
        });
    }

    static associate(models) {
        this.belongsTo(models.User, { foreignKey: 'usuario_id', as: 'user' });
    }
}

module.exports = Admin;