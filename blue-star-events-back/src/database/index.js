const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/User');
const Professional = require('../models/Professional');
const Event = require('../models/Event');
const PacotePers = require('../models/PacotePers');
const Item = require('../models/Item');
const Food = require('../models/Food');

const connection = new Sequelize(dbConfig);

// Inicializa os modelos
User.init(connection);
Professional.init(connection);
Event.init(connection);
PacotePers.init(connection);
Item.init(connection);
Food.init(connection);

// Configura as associações, se existirem
User.associate && User.associate(connection.models);
Professional.associate && Professional.associate(connection.models);
Event.associate && Event.associate(connection.models);
PacotePers.associate && PacotePers.associate(connection.models);
Item.associate && Item.associate(connection.models);
Food.associate && Food.associate(connection.models);

module.exports = connection;
