const express = require('express');
const router = express.Router();
const PacoteController = require('../controllers/PacoteController'); 

const authMiddleware = require('../middlewares/auth');

//router.get('/pacote_pers', PacoteController.index);
//router.post('/pacote_pers', authMiddleware, PacoteController.store);

module.exports = router;