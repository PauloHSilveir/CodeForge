const express = require('express');//Importa o express
const itemRouter = express.Router();//Cria a rota do item
const itemController = require('../controllers/item');//Importa o controller do item

itemRouter.get('/:id',itemController.FindById);//pegar um
itemRouter.get('/', itemController.FindAll);//pegar todos
itemRouter.post('/cadastrar', itemController.Create);//cadastrar
itemRouter.put('/update/:id', itemController.Update);//atualizar
itemRouter.delete('/delete/:id', itemController.DeleteItem);//deletar

module.exports = itemRouter;