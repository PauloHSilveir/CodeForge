const express = require('express');
const router = express.Router();
const RedefinirSenhaController = require('../controllers/redefinirSenhaController');

router.post('/forgot_password', RedefinirSenhaController.forgot_password);
router.post('/reset_password', RedefinirSenhaController.reset_password);

module.exports = router;