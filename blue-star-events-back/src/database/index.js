const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/UserModel');
const Pacote = require('../models/PacoteModel');
const Componente = require('../models/ComponenteModel');
const Event = require('../models/EventModel');

const connection = new Sequelize(dbConfig);

// Inicializa os modelos
User.init(connection);
Componente.init(connection);
Pacote.init(connection);
Event.init(connection);

// Configura as associações, se existirem
User.associate && User.associate(connection.models);
Pacote.associate && Pacote.associate(connection.models);
Componente.associate && Componente.associate(connection.models);
Event.associate && Event.associate(connection.models);

module.exports = connection;
