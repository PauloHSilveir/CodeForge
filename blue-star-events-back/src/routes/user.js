const express = require('express');//Importa o express
const userRouter = express.Router();//Cria a rota do usuario
const UserController = require('../controllers/user');//importa o controller do user 

//Rotas do usuário
userRouter.post('/cadastro', UserController.Create);
//userRouter.put('info/:id', UserController.)
 





module.exports = userRouter;