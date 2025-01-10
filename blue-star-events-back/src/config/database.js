const {Sequelize } = require("sequelize");//Importa o modulo sequelize para interagir com o banco de dados


// Define a classe DataBase, responsável por configurar e gerenciar a conexão com o banco de dados
class DataBase {
    constructor() {
        this.init();
    }

    init() {
        this.db = new Sequelize({
            database: "bluestarevents",
            host: "localhost",
            username: "root",
            dialect: "mysql",
            password: "rz820603" 
        });
    }
}

// Exporta uma instância única da classe DataBase
module.exports = new DataBase();