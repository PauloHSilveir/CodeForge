const express = require('express');
const router = express.Router();
const EventoController = require('../controllers/EventoController');

// Rotas de manipulação
router.post('/create', EventoController.create);
router.put('/update/:id', EventoController.update);


module.exports = router;