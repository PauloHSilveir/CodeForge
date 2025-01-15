const express = require('express');//Importa o express
const router = express.Router();//Cria a rota do item
const ComponenteController = require('../controllers/ComponenteController');//Importa o controller do item

router.get('/:id',ComponenteController.FindById);//pegar um
router.get('/', ComponenteController.FindAll);//pegar todos
router.post('/cadastrar', ComponenteController.Create);//cadastrar
router.put('/update/:id', ComponenteController.Update);//atualizar
router.delete('/delete/:id', ComponenteController.DeleteItem);//deletar

module.exports = router;