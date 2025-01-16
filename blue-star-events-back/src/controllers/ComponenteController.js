const componenteService = require('../services/ComponenteService');//Importa os serviços do componente

class ComponenteController {
     //metodo para cadastrar um novo componente
     async Create(req, res) {
        try {
            const { name, description, preco, quantidade, pacote_id, categoria, imagem } = req.body;
            const componenteData = { name, description, preco, quantidade, pacote_id, categoria, imagem };

            const componente = await componenteService.create(componenteData);
            res.status(200).send({componente});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //Atualizar dados do componente
    async Update(req, res) {
        try {
            const {id} = req.params;
            const componenteData = req.body; // Todos os campos vêm no corpo da requisição
        
            const componente = await componenteService.Update(id, componenteData);

            res.status(200).send({componente});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //encontrar apenas um componente
    async FindById(req, res) {
        try {
            const {id} = req.params;
            const componente = await componenteService.FindById(id);

            res.status(200).send({componente});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //encotrar todos os itens 
    async FindAll(req, res) {
        try {
            const componente = await componenteService.FindAll();

            res.status(200).send({componente});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //deletar um componente
    async DeleteComponente(req, res) {
        try {
            const {id} = req.params;
            const {packageStatus} = false;
            
            const componente = await componenteService.DeleteComponente(id, packageStatus);

            res.status(200).send({componente});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }
}

module.exports = new ComponenteController();
