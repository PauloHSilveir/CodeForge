const bcrypt = require('bcrypt');//para criptografar a senha
const userModel = require('../models/user');
const { verificarEmailUnico, verificarCpfUnico } = require('../utils/funcoesAuxiliares');

const salt = 13;//salts para hash

//Define a Classe que atua como services do user
class UserServices {
    async Create(name, cpf, phone, email, password, rua, numero, complemento, bairro, cidade,
        estado, cep) {
        try {
            // Verificações padrão
            if (!name) {
                throw new Error('O nome é obrigatório.');
            } else if (!cpf) {
                throw new Error('O CPF é obrigatório.');
            } else if (!phone) {
                throw new Error('O telefone é obrigatório.');
            } else if (!email) {
                throw new Error('O e-mail é obrigatório.');
            } else if (!password) {
                throw new Error('A senha é obrigatória.');
            } else if (!rua) {
                throw new Error('A rua é obrigatória.');
            } else if (!numero) {
                throw new Error('O número do endereço é obrigatório.');
            } else if (!bairro) {
                throw new Error('O bairro é obrigatório.');
            } else if (!cidade) {
                throw new Error('A cidade é obrigatória.');
            } else if (!estado) {
                throw new Error('O estado é obrigatório.');
            } else if (!cep) {
                throw new Error('O CEP é obrigatório.');
            }

            //Regras de negocio
            //Senha com no minimo 8 caracteres
            if (password.length < 8) {
                throw new Error("A senha deve conter no mínimo 8 caracteres.");
            }

            //E-mail  e cpf únicos no sistema
            await verificarEmailUnico(email);
            await verificarCpfUnico(cpf);

            //Criptografar senha
            const hashPass = await bcrypt.hash(password, salt);

            //Criando usuario
            // Criar o usuário no banco de dados
            const user = await userModel.create({
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
        } catch (error) {
            // Captura e retorna o erro para o controller
            throw new Error(error.message);
        }
    }

    async UpdatePersonalData(id, name, cpf, phone, email) {
        try {
            //recupera usuario do banco de dados
            const user = await userModel.findByPk(id);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            //verificação padrão se os campos foram preenchidos
            if (!name) {
                throw new Error('O nome é obrigatório.');
            } else if (!cpf) {
                throw new Error('O CPF é obrigatório.');
            } else if (!phone) {
                throw new Error('O telefone é obrigatório.');
            } else if (!email) {
                throw new Error('O e-mail é obrigatório.');
            }

            //validações das regras de negócio
            if (email && email !== user.email) {
                await verificarEmailUnico(email, id);

            }

            if (cpf && cpf !== user.cpf) {
                await verificarCpfUnico(cpf, id);

            }

            // Atualiza os campos
            user.email = email;
            user.cpf = cpf;
            if (name) user.name = name;
            if (phone) user.phone = phone;


            //salvar alterações
            await user.save();

            return {
                msg: "Alterações realizadas com sucesso!",
                user,
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async UpdateAdress(id, rua, numero, complemento, bairro, cidade,
        estado, cep) {
        try {
            //recupera usuario do banco de dados
            const user = await userModel.findByPk(id);
            if (!user) {
                throw new Error('Usuário não encontrado');
            }

            //verificação padrão se os campos foram preenchidos
            if (!rua) {
                throw new Error('A rua é obrigatória.');
            } else if (!numero) {
                throw new Error('O número do endereço é obrigatório.');
            } else if (!bairro) {
                throw new Error('O bairro é obrigatório.');
            } else if (!cidade) {
                throw new Error('A cidade é obrigatória.');
            } else if (!estado) {
                throw new Error('O estado é obrigatório.');
            } else if (!cep) {
                throw new Error('O CEP é obrigatório.');
            }

            // Atualiza os campos
            if (rua) user.rua = rua;
            if (numero) user.numero = numero;
            if (complemento) user.complemento = complemento;
            if (bairro) user.bairro = bairro;
            if (cidade) user.cidade = cidade;
            if (estado) user.estado = estado;
            if (cep) user.cep = cep;

            //salvar alterações
            await user.save();

            return {
                msg: "Alterações realizadas com sucesso!",
                user,
            }

        } catch (error) {
            throw new Error(error.message);
        }
    }

    
    async FindById(id) {
        try {
            const user = await userModel.findOne({ where: { id } });
            if (!user) {
                throw new Error("Usuário não encontrado.");
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }
    
    
    async DeleteUser(id, transationStatus) {
        try {
            // Busca o usuário no banco
            const user = await this.FindById(id);
    
            // Valida se há transações pendentes
            if (transationStatus) {
                throw new Error("Não é possível excluir a conta pois existem transações pendentes.");
            }
    
            // Remove o usuário do banco de dados
            await user.destroy();
    
            return { msg: "Conta excluída com sucesso." };
        } catch (error) {
            throw new Error(error.message);
        }
    }


}
//Exporta os services do User
module.exports = new UserServices();