const express = require('express');
const app = express();

const userRouter = require('./userRoute');
const loginRouter = require('./loginRoute');
const forgotPasswordRouter = require('./redefinirSenhaRoute');
const ComponenteRouter = require('./ComponenteRoute');
const pacoteRouter = require('./pacoteRoute');
const AdminRouter = require('./AdminRoute');
const CarrinhoRouter = require('./CarrinhoRoute');
const TransacaoRouter = require('./TransacaoRoute');
const PagamentoRouter = require('./PagamentoRoute');

//const authMiddleware = require('../middlewares/auth');

app.use(express.json());

app.use('/user', userRouter);
app.use('/user', loginRouter); 
app.use('/user', forgotPasswordRouter); 
app.use('/componente', ComponenteRouter);
app.use('/pacote', pacoteRouter);
app.use('/admin', AdminRouter);
app.use('/carrinho', CarrinhoRouter);
app.use('/transacao', TransacaoRouter);
app.use('/pagamento', PagamentoRouter);
//app.use('/upload', UploadRoute);

module.exports = app;
