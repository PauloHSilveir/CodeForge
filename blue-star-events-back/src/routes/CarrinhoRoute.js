const express = require('express');
const CarrinhoController = require('../controllers/CarrinhoController');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/cadastrar', CarrinhoController.addToCart);
router.get('/:usuario_id', CarrinhoController.getCartItems);
router.delete('/delete/:usuario_id/:pacote_id', CarrinhoController.removeItem);
router.delete('/delete/:usuario_id', CarrinhoController.clearCart);

module.exports = router;