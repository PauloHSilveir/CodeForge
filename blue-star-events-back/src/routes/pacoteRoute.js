const express = require('express');
const router = express.Router();
const pacoteController = require('../controllers/PacoteController'); 
const authMiddleware = require('../middlewares/auth');

router.get('/:id',  pacoteController.GetOne);
router.get('/', pacoteController.GetAll);
router.post('/cadastrar', pacoteController.Store);
router.delete('/delete/:id', pacoteController.Delete);
router.put('/update/:id', pacoteController.Update);

module.exports = router;