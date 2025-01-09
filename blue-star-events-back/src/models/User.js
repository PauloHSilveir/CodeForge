const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: DataTypes.STRING(50),
            cpf: DataTypes.STRING(11),
            password: DataTypes.STRING,
            email: DataTypes.STRING(50),
            telefone: DataTypes.STRING(11),
            rua: DataTypes.STRING(50),
            numero: DataTypes.INTEGER,
            complemento: DataTypes.STRING(20),
            bairro: DataTypes.STRING(50),
            cidade: DataTypes.STRING(50),
            estado: DataTypes.STRING(50),
            cep: DataTypes.STRING(8),
            islogged: DataTypes.BOOLEAN
        }, {
            sequelize,
            hooks: {
                beforeCreate: (user) => {
                    const salt = bcrypt.genSaltSync();
                    user.password = bcrypt.hashSync(user.password, salt);
                },
            },
        })
    }
}

module.exports = User;