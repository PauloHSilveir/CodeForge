const User = require('../models/UserModel');
const { verificarEmailUnico, verificarCpfUnico } = require('../utils/funcoesAuxiliares');
const { Op } = require('sequelize');

class UserService {
  async create(userData) {
    try {
      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email: userData.email },
            { cpf: userData.cpf }
          ]
        }
      });

      if (existingUser) {
        throw new Error('Email ou CPF já cadastrado');
      }

      if (!userData.name || !userData.cpf || !userData.email || !userData.phone || !userData.password) {
        throw new Error('Todos os campos obrigatórios devem ser preenchidos');
      }

      const user = await User.create(userData);
      const userResponse = user.toJSON();
      delete userResponse.password;

      return {
        message: 'Usuário criado com sucesso',
        user: userResponse
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Atualiza os dados de endereço do usuário
  async UpdateAdress(id, rua, numero, complemento, bairro, cidade, estado, cep) {
    try {
      // Recupera o usuário do banco de dados
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Verificação padrão se os campos foram preenchidos
      if (!rua) throw new Error('A rua é obrigatória.');
      if (!numero) throw new Error('O número do endereço é obrigatório.');
      if (!bairro) throw new Error('O bairro é obrigatório.');
      if (!cidade) throw new Error('A cidade é obrigatória.');
      if (!estado) throw new Error('O estado é obrigatório.');
      if (!cep) throw new Error('O CEP é obrigatório.');

      // Atualiza os campos do endereço
      user.rua = rua;
      user.numero = numero;
      user.complemento = complemento || user.complemento; // Campo opcional
      user.bairro = bairro;
      user.cidade = cidade;
      user.estado = estado;
      user.cep = cep;

      // Salvar alterações
      await user.save();

      return {
        msg: "Endereço atualizado com sucesso!",
        user,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  // Atualiza os dados pessoais do usuário
  async UpdatePersonalData(id, name, cpf, phone, email) {
    try {
      // Recupera o usuário do banco de dados
      const user = await User.findByPk(id);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      // Verificação padrão se os campos foram preenchidos
      if (!name) throw new Error('O nome é obrigatório.');
      if (!cpf) throw new Error('O CPF é obrigatório.');
      if (!phone) throw new Error('O telefone é obrigatório.');
      if (!email) throw new Error('O e-mail é obrigatório.');

      // Validações de unicidade
      if (email && email !== user.email) {
        await verificarEmailUnico(email, id);
      }

      if (cpf && cpf !== user.cpf) {
        await verificarCpfUnico(cpf, id);
      }

      // Atualiza os campos pessoais
      user.name = name;
      user.cpf = cpf;
      user.phone = phone;
      user.email = email;

      // Salvar alterações
      await user.save();

      return {
        msg: "Dados pessoais atualizados com sucesso!",
        user,
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async DeleteUser(id) {
    try {
        // Busca o usuário pelo ID
        const user = await User.findByPk(id);

        if (!user) {
            throw new Error('Usuário não encontrado');
        }
        /*
        // Verifica se há transações pendentes associadas ao usuário
        const transacoesPendentes = await Transacao.findOne({
            where: {
                usuario_id: id, // Certifique-se de usar o nome correto do campo
                status: { [Op.ne]: 'completa' }, // Status diferente de "completa"
            },
        });

        if (transacoesPendentes) {
            throw new Error('Não é possível excluir o usuário pois há transações pendentes');
        }*/

        // Exclui o usuário
        await user.destroy();

        return {
            message: 'Usuário deletado com sucesso',
        };
    } catch (error) {
        throw new Error(error.message);
    }
  }


  async FindById(id) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const userResponse = user.toJSON();
      delete userResponse.password;
      return userResponse;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async FindAll() {
    try {
      const users = await User.findAll({
        attributes: { exclude: ['password'] }
      });
      return users;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = new UserService();