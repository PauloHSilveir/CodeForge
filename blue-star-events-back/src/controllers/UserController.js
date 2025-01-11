const User = require('../models/User');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { sendForgotPasswordEmail, generatePasswordResetLink } = require('../services/UserService');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 78300,
    });
}
/*function generateToken() {
    const token = crypto.randomBytes(20).toString('hex');
    const now = new Date();
    now.setHours(now.getHours() + 1);
    return { token, expires: now };
}*/
module.exports = {

    async login(req, res) {
        const { password, email, islogged } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto!',
                user: {}
            });
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return res.status(400).send({
                status: 0,
                message: 'E-mail ou senha incorreto!',
                user: {}
            });
        }

        const user_id = user.id;

        await User.update({
            islogged
        }, {
            where: {
                id: user_id
            }
        });

        user.password = undefined


        const token = generateToken({ id: user.id });

        return res.status(200).send({
            status: 1,
            message: "Usuário logado com sucesso!",
            user, token
        });


    },

    async forgot_password(req, res) {
        const { email } = req.body;

        try {
            const user = await User.findOne({ where: { email } });
            if (!user) {
                return res.status(400).send({
                    status: 0,
                    message: 'E-mail não encontrado!',
                    user: {}
                });
            }

            const token = crypto.randomBytes(20).toString('hex');
            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.update(
                {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }, { where: { email: user.email }, }
            );

            const resetLink = generatePasswordResetLink(token);
            const emailResponse = await sendForgotPasswordEmail(email, resetLink);

            if (emailResponse.success) {
                return res.status(200).send({
                    status: 1,
                    message: 'E-mail enviado com sucesso!',
                    user: { email: user.email },
                    token,
                });
            } else {
                return res.status(400).send({
                    status: 0,
                    message: 'Erro ao enviar e-mail, tente novamente!',
                    user: {}
                });
            }
        } catch (err) {
            console.error(err);
            return res.status(400).send({
                status: 0,
                message: 'Erro ao tentar redefinir a senha. Tente novamente!',
                user: {},
            });
        }
    },

    async reset_password(req, res) {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ where: { email } }).select('+passwordResetToken passwordResetExpires');

            if (!user) {
                return res.status(400).send({
                    status: 0,
                    message: 'Usuário não encontrado!',
                    user: {}
                });
            }
            if (token !== user.passwordResetToken) {
                return res.status(400).send({
                    status: 0,
                    message: 'Token inválido!',
                    user: {}
                });
            }
            const now = new Date();
            if (now > user.passwordResetExpires) {
                return res.status(400).send({
                    status: 0,
                    message: 'Token expirado, solicite uma nova recuperação de senha!',
                    user: {}
                });
            }
            user.password = password;
            await user.save();
            return res.status(200).send({
                status: 1,
                message: 'Senha alterada com sucesso!',
                user: {}
            });
        } catch (err) {
            return res.status(400).send({
                status: 0,
                message: 'Erro ao on forgot password, try again!',
                user: {}
            });
        }
    },

    async index(req, res) {

        const users = await User.findAll();

        if (users == "" || users == null) {
            return res.status(200).send({ message: "Nenhum usuário cadastrado" });

        }

        return res.status(200).send({ users });

    },

    async store(req, res) {

        //const { name, password, email } = req.body;

        const user = await User.create(req.body);

        const token = generateToken({ id: user.id });

        user.password = undefined

        return res.status(200).send({
            status: 1,
            message: 'usuário cadastrado com sucesso!',
            user, token

        });

    },

    async update(req, res) {

        const { name, password, email } = req.body;

        const { user_id } = req.params;

        await User.update({
            name, password, email
        }, {
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "Usuário atualizado com sucesso!",
        });

    },

    async delete(req, res) {

        const { user_id } = req.params;

        await User.destroy({
            where: {
                id: user_id
            }
        });

        return res.status(200).send({
            status: 1,
            message: "Usuário deletado com sucesso!",
        });

    }

};