const crypto = require('crypto');
const User = require('../models/UserModel');
const { sendForgotPasswordEmail, generatePasswordResetLink } = require('../utils/email');

module.exports = {
    // Função para gerar o token de redefinição e enviar o e-mail
    async forgotPassword(email) {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            throw new Error('E-mail não encontrado!');
        }

        const token = crypto.randomBytes(20).toString('hex');
        const now = new Date();
        now.setHours(now.getHours() + 1); // Token expira em 1 hora

        await User.update(
            {
                passwordResetToken: token,
                passwordResetExpires: now,
            },
            { where: { email } }
        );

        const resetLink = generatePasswordResetLink(token, email);
        const emailResponse = await sendForgotPasswordEmail(email, resetLink);

        if (!emailResponse.success) {
            throw new Error('Erro ao enviar e-mail, tente novamente!');
        }

        return { token, email: user.email };
    },

    // Função para redefinir a senha com base no token
    async resetPassword(token, email, newPassword) {
        const user = await User.findOne({
            where: { email },
            attributes: ['passwordResetToken', 'passwordResetExpires', 'id'],
        });

        if (!user) {
            throw new Error('Usuário não encontrado.');
        }

        if (token !== user.passwordResetToken) {
            throw new Error('Token inválido.');
        }

        if (new Date() > user.passwordResetExpires) {
            throw new Error('Token expirado. Solicite novamente.');
        }

        user.password = newPassword;
        user.passwordResetToken = null;
        user.passwordResetExpires = null;

        await user.save();

        return 'Senha alterada com sucesso!';
    }
};
