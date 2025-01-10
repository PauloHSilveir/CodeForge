const serviceUser = require('../services/user');//Importa os serviços do User

//Define a Classe que atua como controller do user
class UserController {

    //metodo para cadastrar um novo usuario
    async Create(req, res) {
        try {
            const {name, cpf, phone, email, password, rua, numero, complemento, bairro, cidade,
             estado, cep} = req.body;
            const user = await serviceUser.Create(name, cpf, phone, email, password, rua, numero, complemento, bairro, cidade,
            estado, cep);

            res.status(200).send({user});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }
}

//Exporta o controller do User
module.exports = new UserController();