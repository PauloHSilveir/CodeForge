const express = require('express');
const router = express.Router();
const LoginController = require('../controllers/loginController'); 

router.post('/login', LoginController.login);
router.post('/logout', LoginController.logout);

module.exports = router;