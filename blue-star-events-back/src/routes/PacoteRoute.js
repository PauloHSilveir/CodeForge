const express = require('express');
const router = express.Router();
const pacoteController = require('../controllers/PacoteController'); 
const authMiddleware = require('../middlewares/auth');

router.get('/:id',  pacoteController.getById);
router.get('/', pacoteController.getAll);
router.post('/cadastrar', pacoteController.create);
router.delete('/delete/:id', pacoteController.delete);
router.put('/update/:id', pacoteController.update);

module.exports = router;
