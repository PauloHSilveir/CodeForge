const serviceUser = require('../services/user');//Importa os serviços do User

//Define a Classe que atua como controller do user
class UserController {

    //metodo para cadastrar um novo usuario
    async Create(req, res) {
        try {
            const {name, cpf, phone, email, password, rua, numero, complemento, bairro, cidade,
            estado, cep} = req.body;
            const user = await serviceUser.Create(name, cpf, phone, email, password, rua, numero, 
            complemento, bairro, cidade, estado, cep);

            res.status(200).send({user});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //Atualizar dados pessoais separadamente por causa dos dois formulário separados
    async UpdatePersonalData(req, res) {
        try {
            const {id} = req.params;
            const {name, cpf, phone, email} = req.body;
            const user = await serviceUser.UpdatePersonalData(id, name, cpf, phone, email);

            res.status(200).send({user});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    //Atualizar endereço separadamente por causa dos dois formulário separados
    async UpdateAdress(req, res) {
        try {
            const {id} = req.params;
            const {rua, numero, complemento, bairro, cidade,
            estado, cep} = req.body;
            const user = await serviceUser.UpdateAdress(id, rua, numero, 
            complemento, bairro, cidade, estado, cep);

            res.status(200).send({user});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }

    async FindById(req, res) {
        try {
            const {id} = req.params;
            
            const user = await serviceUser.FindById(id);

            res.status(200).send({user});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }
    
    async DeleteUser(req, res) {
        try {
            const {id} = req.params;
            const {transationStatus} = false;
            
            const user = await serviceUser.DeleteUser(id, transationStatus);

            res.status(200).send({user});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }
}

//Exporta o controller do User
module.exports = new UserController();