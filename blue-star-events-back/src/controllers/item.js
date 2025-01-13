const itemService = require('../services/item');//Importa os serviços do item

class ItemController {
     //metodo para cadastrar um novo item
     async Create(req, res) {
        try {
            const {name, description, preco, quantidade} = req.body;
            const item = await itemService.Create(name, description, preco, quantidade);

            res.status(200).send({item});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //Atualizar dados do item
    async Update(req, res) {
        try {
            const {id} = req.params;
            const {name, description, preco, quantidade} = req.body;
            const item = await itemService.Update(id, name, description, preco, quantidade);

            res.status(200).send({item});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //encontrar apenas um item
    async FindById(req, res) {
        try {
            const {id} = req.params;
            const item = await itemService.FindById(id);

            res.status(200).send({item});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //encotrar todos os itens 
    async FindAll(req, res) {
        try {
            const item = await itemService.FindAll();

            res.status(200).send({item});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //deletar um item
    async DeleteItem(req, res) {
        try {
            const {id} = req.params;
            const {packageStatus} = false;
            
            const item = await itemService.DeleteItem(id, packageStatus);

            res.status(200).send({item});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }
}

module.exports = new ItemController();