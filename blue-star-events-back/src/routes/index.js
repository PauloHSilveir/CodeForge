const express = require('express');
const app = express();

const userRouter = require('./userRoute');
const loginRouter = require('./loginRoute');
const forgotPasswordRouter = require('./redefinirSenhaRoute');
const ComponenteRouter = require('./ComponenteRoute');
//const pacotePersRoute = require('./pacotePersRoute');

const authMiddleware = require('../middlewares/auth');

app.use(express.json());

app.use('/user', userRouter);
app.use('/user', loginRouter); 
app.use('/user', forgotPasswordRouter); 
app.use('/componente', ComponenteRouter);

module.exports = app;
