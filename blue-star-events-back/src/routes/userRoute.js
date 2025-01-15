const express = require('express');//Importa o express
const router = express.Router();//Cria a rota do usuario
const UserController = require('../controllers/UserController');//importa o controller do user 

//Rotas do usuário
router.post('/cadastro', UserController.Create);
router.put('/update/personal/:id', UserController.UpdatePersonalData);
router.put('/update/adress/:id', UserController.UpdateAdress);
router.get('/:id', UserController.FindById);
router.delete('/delete/:id', UserController.DeleteUser); 

module.exports = router;