const express = require('express');
const AdminController = require('../controllers/AdminController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/cadastrar', AdminController.create);
router.put('/update/personal/:id', AdminController.update);
router.get('/', AdminController.index);
router.get('/:id', AdminController.show);
router.delete('/delete/:id', AdminController.delete); 


module.exports = router;