const express = require('express');//Importa o express
const userRouter = express.Router();//Cria a rota do usuario
const UserController = require('../controllers/user');//importa o controller do user 

userRouter.post('/', UserController.Create);
 





module.exports = userRouter;