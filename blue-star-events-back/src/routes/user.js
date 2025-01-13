const express = require('express');//Importa o express
const userRouter = express.Router();//Cria a rota do usuario
const UserController = require('../controllers/User');//importa o controller do user 

//Rotas do usuário
userRouter.post('/cadastro', UserController.Create);
userRouter.put('/update/personal/:id', UserController.UpdatePersonalData);
userRouter.put('/update/adress/:id', UserController.UpdateAdress);
userRouter.get('/:id', UserController.FindById);
userRouter.delete('/delete/:id', UserController.DeleteUser);

 

module.exports = userRouter;