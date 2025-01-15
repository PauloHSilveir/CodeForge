/*const userService = require('../services/userService');

module.exports = {

    // Listar todos os usuários
    async index(req, res) {
        try {
            const users = await userService.index();
            if (users.message) {
                return res.status(200).json({ message: users.message });
            }
            return res.status(200).json({ users });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    

    // Atualizar um usuário
    async update(req, res) {
        try {
            const { user_id } = req.params;
            const { name, email, password, telefone, rua, numero, bairro, cidade, estado, cep } = req.body;
            const result = await userService.update(user_id, { name, email, password, telefone, rua, numero, bairro, cidade, estado, cep });
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },

    // Deletar um usuário
    async delete(req, res) {
        try {
            const { user_id } = req.params;
            const result = await userService.delete(user_id);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    },
};*/

const serviceUser = require('../services/userService');//Importa os serviços do User

//Define a Classe que atua como controller do user
class UserController {

    //metodo para cadastrar um novo usuario
    async Create(req, res) {
        try {
            const user = await serviceUser.create(req.body);
            return res.status(201).json(user);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ msg: error.message });
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
            const transationStatus = false;
            
            const user = await serviceUser.DeleteUser(id, transationStatus);
            console.log("usuário deletado com sucesso!");
            res.status(200).send({user});

        }catch(error) {
            res.status(500).send({msg: error.message});
        }
    }
}

//Exporta o controller do User
module.exports = new UserController();