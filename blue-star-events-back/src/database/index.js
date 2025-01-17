const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

const User = require('../models/UserModel');
const Pacote = require('../models/PacoteModel');
const Componente = require('../models/ComponenteModel');
const Event = require('../models/EventModel');
const Variante = require('../models/VarianteModel');
const Transacao = require('../models/TransacaoModel');
const Pagamento = require('../models/PagamentoModel');
const Admin = require('../models/AdminModel');
const VarianteComponente = require('../models/VarianteComponenteModel');

const sequelize = new Sequelize(dbConfig);

// Inicializa os modelos
User.init(sequelize);
Componente.init(sequelize);
Pacote.init(sequelize);
Event.init(sequelize);
Variante.init(sequelize);
VarianteComponente.init(sequelize);
//Transacao.init(sequelize);
//Pagamento.init(sequelize);
Admin.init(sequelize);

// Configura as associações, se existirem
User.associate && User.associate(sequelize.models);
Pacote.associate && Pacote.associate(sequelize.models);
Componente.associate && Componente.associate(sequelize.models);
Event.associate && Event.associate(sequelize.models);
Variante.associate && Variante.associate(sequelize.models);
VarianteComponente.associate && VarianteComponente.associate(sequelize.models);
//Transacao.associate && Transacao.associate(sequelize.models);
//Pagamento.associate && Pagamento.associate(sequelize.models);
Admin.associate && Admin.associate(sequelize.models);

module.exports = {User, Admin, sequelize};
