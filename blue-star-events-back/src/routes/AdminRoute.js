const express = require('express');
const AdminController = require('./controllers/AdminController');
const authMiddleware = require('./middlewares/auth');

const router = express.Router();

router.post('/admins', authMiddleware, AdminController.store);

module.exports = router;