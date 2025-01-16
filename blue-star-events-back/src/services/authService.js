const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');
const authConfig = require('../config/auth');

// Função para gerar o token JWT
function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 78300, // Tempo de expiração do token
    });
}

module.exports = {
    // Função para realizar o login
    async login(email, password, userType) {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            throw new Error('E-mail ou senha incorreto!');
        }

        if (!bcrypt.compareSync(password, user.password)) {
            throw new Error('E-mail ou senha incorreto!');
        }

        if (userType !== user.isAdmin) {
            throw new Error('Tipo de usuário inválido!');
        }

        const token = generateToken({ id: user.id });
        return { user, token };
    },

    // Função para atualizar o status do usuário para "logado"
    async setLoggedStatus(userId, islogged) {
        await User.update({ islogged }, {
            where: { id: userId },
        });
    },

    // Função para realizar o logout
    async logout(userId) {
        await User.update({ islogged: false }, {
            where: { id: userId },
        });
    }
};
