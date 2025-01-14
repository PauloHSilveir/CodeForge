const User = require('../models/User');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 78300, // Tempo de expiração do token em segundos
    });
}

module.exports = {

    // Listar todos os usuários
    async index() {
        const users = await User.findAll();
        if (!users || users.length === 0) {
            return { message: "Nenhum usuário cadastrado" };
        }
        return users;
    },

    // Criar um novo usuário
    async store(userData) {
        try {
            const user = await User.create(userData);
            const token = generateToken({ id: user.id });
            user.password = undefined; // Não retorna a senha no objeto de resposta
            return { user, token };
        } catch (error) {
            throw new Error("Erro ao criar usuário: " + error.message);
        }
    },

    // Atualizar um usuário
    async update(user_id, userData) {
        try {
            const user = await User.update(userData, {
                where: {
                    id: user_id,
                },
            });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            return { message: "Usuário atualizado com sucesso!" };
        } catch (error) {
            throw new Error("Erro ao atualizar usuário: " + error.message);
        }
    },

    // Deletar um usuário
    async delete(user_id) {
        try {
            const user = await User.destroy({
                where: {
                    id: user_id,
                },
            });
            if (!user) {
                throw new Error("Usuário não encontrado");
            }
            return { message: "Usuário deletado com sucesso!" };
        } catch (error) {
            throw new Error("Erro ao deletar usuário: " + error.message);
        }
    },
};
