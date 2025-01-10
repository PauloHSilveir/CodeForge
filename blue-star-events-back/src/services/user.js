const bcrypt = require('bcrypt');//para criptografar a senha
const User = require('../models/user');

const salt = 13;//salts para hash

//Define a Classe que atua como services do user
class UserServices {
    async Create(name, cpf, phone, email, password, rua, numero, complemento, bairro, cidade,
        estado, cep) {
        try {
             // Verificações padrão
            if (!name) {
                throw new Error('O nome é obrigatório.');
            }else if (!cpf) {
                throw new Error('O CPF é obrigatório.');
            }else if (!phone) {
                throw new Error('O telefone é obrigatório.');
            }else if (!email) {
                throw new Error('O e-mail é obrigatório.');
            }else if (!password) {
                throw new Error('A senha é obrigatória.');
            }else if (!rua) {
                throw new Error('A rua é obrigatória.');
            }else if (!numero) {
                throw new Error('O número do endereço é obrigatório.');
            }else if (!bairro) {
                throw new Error('O bairro é obrigatório.');
            }else if (!cidade) {
                throw new Error('A cidade é obrigatória.');
            }else if (!estado) {
                throw new Error('O estado é obrigatório.');
            }else if (!cep) {
                throw new Error('O CEP é obrigatório.');
            }

            //Regras de negocio
            //Senha com no minimo 8 caracteres
            if(password.length < 8) {
                throw new Error("A senha deve conter no mínimo 8 caracteres.");
            }

            //E-mail único no sistema
            const emailExistente = await User.findOne({ where: { email } });//busca no bd se o cpf ja existe
            if (emailExistente) {
                throw new Error('O e-mail já está cadastrado no sistema.');
            }

            //CPF único no sistema
            const cpfExistente = await User.findOne({ where: { cpf } });//busca no bd se o cpf ja existe
            if (cpfExistente) {
                throw new Error('O CPF já está cadastrado no sistema.');
            }

            //Criptografar senha
            const hashPass = await bcrypt.hash(password, salt);

            //Criando usuario
             // Criar o usuário no banco de dados
             const user = await User.create({
                name,
                cpf,
                phone,
                email,
                password: hashPass,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
            });

            return {
                msg: "Cadastro efetuado com sucesso!",
                user
            }
        }catch(error) {
            // Captura e retorna o erro para o controller
            throw new Error(error.message);
        }
    }
}

//Exporta os services do User
module.exports = new UserServices();