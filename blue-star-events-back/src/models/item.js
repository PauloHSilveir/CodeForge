const database = require('../config/database');//Importa a instância de configuração do banco de dados


//Define a classe Iten para gerenciar o modelo da tabela "users" no banco de dados
class Item {
    constructor() {
        this.model = database.db.define("itens", {

            idItem: {
                type: database.db.Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            name: {
                type: database.db.Sequelize.STRING,
                allowNull: false,

            },

            description: {
                type: database.db.Sequelize.STRING,
                allowNull: false,
            },

            preco: {
                type: database.db.Sequelize.DECIMAL,
                allowNull: false,
            },

            quantidade: {
                type: database.db.Sequelize.INTEGER,
                allowNull: false,
            },
        })
    }
}


// Exporta a instância do modelo users
module.exports = new Item().model;