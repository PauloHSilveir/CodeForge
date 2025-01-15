const express = require('express');
const router = express.Router();
const PacotePersController = require('../controllers/pacotePersController'); 

const authMiddleware = require('../middlewares/auth');

router.get('/pacote_pers', PacotePersController.index);
router.post('/pacote_pers', authMiddleware, PacotePersController.store);

module.exports = router;