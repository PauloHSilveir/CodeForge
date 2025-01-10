const database = require('../config/database');// Importa a instância de configuração do banco de dados


// Define a classe User para gerenciar o modelo da tabela "users" no banco de dados
class User {
    constructor() {
        this.model = database.db.define("users", {
            id: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,

            },
            name: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            cpf: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
                uique: true,
            },
            phone: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
                uique: true,
            },
            password: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            rua: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            numero: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            complemento: {
                type: database.db.Sequelize.STRING,
                
            },
            bairro: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            cidade: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            estado: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
            cep: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },
        })
    }
}


// Exporta a instância do modelo users
module.exports = new User().model;