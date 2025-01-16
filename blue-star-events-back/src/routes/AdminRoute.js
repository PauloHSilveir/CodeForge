const express = require('express');
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/cadastrar', AdminController.create);

router.get('/', authMiddleware, AdminController.index);
router.get('/:id', authMiddleware, AdminController.show);


module.exports = router;