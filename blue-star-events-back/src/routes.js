const express = require('express');

const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/LoginController');
const RedefinirSenhaController = require('./controllers/RedefinirSenhaController');
const EventController = require('./controllers/EventController');
const ProfessionalController = require('./controllers/ProfessionalController');
const ItemController = require('./controllers/ItemController');
const FoodController = require('./controllers/FoodController');
const PacotePersonalizadoController = require('./controllers/PacotePersController');

const authMiddleware = require('./middlewares/auth');

const router = express.Router();

// Rotas de Usuários
router.get('/users', authMiddleware, UserController.index);
router.post('/users', UserController.store);
router.put('/users/:user_id', UserController.update);
router.delete('/users/:user_id', UserController.delete);

// Rotas de Autenticação
router.post('/users/login', AuthController.login);

// Rotas de Redefinição de Senha
router.post('/users/forgot_password', RedefinirSenhaController.forgot_password);
router.post('/users/reset_password', RedefinirSenhaController.reset_password);

// Rotas de Eventos
router.get('/events', EventController.index);
router.post('/events', EventController.store);

// Rotas de Profissionais
router.get('/professionals', ProfessionalController.index);
router.post('/professionals', ProfessionalController.store);

// Rotas de Itens
router.get('/items', ItemController.index);
router.post('/items', ItemController.store);

// Rotas de Comidas
router.get('/foods', FoodController.index);
router.post('/foods', FoodController.store);

// Rotas de Pacotes Personalizados
router.get('/pacotes/pacote_pers', PacotePersonalizadoController.index);
router.post('/pacotes/pacote_pers', authMiddleware, PacotePersonalizadoController.store);

module.exports = router;
