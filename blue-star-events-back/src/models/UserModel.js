const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');

class User extends Model {
    static init(sequelize) {
        super.init({
            name: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O nome não pode estar vazio" },
                    len: {
                        args: [2, 50],
                        msg: "O nome deve ter entre 2 e 50 caracteres",
                    },
                },
            },
            cpf: {
                type: DataTypes.STRING(14),
                allowNull: false,
                unique: true,
                validate: {
                    is: {
                        args: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
                        msg: "O CPF deve estar no formato XXX.XXX.XXX-XX",
                    },
                },
            },
            phone: { 
                type: DataTypes.STRING(15),
                allowNull: false,
                validate: {
                    is: {
                        args: /^\(\d{2}\) \d{5}-\d{4}$/,
                        msg: "O telefone deve estar no formato (XX) XXXXX-XXXX",
                    },
                },
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: { msg: "O email deve ser válido" },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    len: {
                        args: [8, 100],
                        msg: "A senha deve ter no mínimo 8 caracteres",
                    },
                },
            },
            rua: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "A rua não pode estar vazia" },
                },
            },
            numero: {
                type: DataTypes.STRING(10),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O número não pode estar vazio" },
                },
            },
            complemento: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            bairro: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "O bairro não pode estar vazio" },
                },
            },
            cidade: {
                type: DataTypes.STRING(50),
                allowNull: false,
                validate: {
                    notEmpty: { msg: "A cidade não pode estar vazia" },
                },
            },
            estado: {
                type: DataTypes.STRING(2),
                allowNull: false,
                validate: {
                    is: {
                        args: /^[A-Z]{2}$/,
                        msg: "O estado deve ser uma sigla de 2 letras maiúsculas",
                    },
                },
            },
            cep: {
                type: DataTypes.STRING(9),
                allowNull: false,
                validate: {
                    is: {
                        args: /^\d{5}-\d{3}$/,
                        msg: "O CEP deve estar no formato XXXXX-XXX",
                    },
                },
            },
            islogged: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            isAdmin: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
            },
            passwordResetToken: {
                type: DataTypes.STRING,
                allowNull: true
            },
            passwordResetExpires: {
                type: DataTypes.DATE,
                allowNull: true
            },
        }, {
            sequelize,
            tableName: 'users',
            modelName: 'User',
            hooks: {
                beforeSave: async (user) => {
                    if (user.changed('password')) {
                        const salt = await bcrypt.genSalt(10);
                        user.password = await bcrypt.hash(user.password, salt);
                    }
                }
            }
        });
        return this;
    }

    async checkPassword(password) {
        return bcrypt.compare(password, this.password);
    }

    static associate(models) {
        this.hasOne(models.Admin, { foreignKey: 'usuario_id', as: 'admin' });
        this.hasOne(models.Carrinho, { foreignKey: 'usuario_id', as: 'carrinho' });
        this.hasMany(models.Transacao, { foreignKey: 'usuario_id', as: 'transacoes' });
    }
}

module.exports = User;