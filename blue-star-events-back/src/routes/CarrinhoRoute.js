const express = require('express');
const CarrinhoController = require('../controllers/CarrinhoController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/cadastrar', authMiddleware, CarrinhoController.addToCart);
router.get('/:usuario_id', authMiddleware, CarrinhoController.getCartItems);
router.delete('/delete/:usuario_id/:pacote_id', authMiddleware, CarrinhoController.removeItem);
router.delete('/delete/:usuario_id', authMiddleware, CarrinhoController.clearCart);

module.exports = router;