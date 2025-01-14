const passwordService = require('../services/passwordService');

module.exports = {
    // Função para enviar o link de redefinição de senha
    async forgot_password(req, res) {
        const { email } = req.body;

        try {
            const { token, email: userEmail } = await passwordService.forgotPassword(email);

            return res.status(200).send({
                status: 1,
                message: 'E-mail enviado com sucesso!',
                user: { email: userEmail },
                token,
            });
        } catch (error) {
            console.error('Erro ao tentar redefinir a senha:', error);
            return res.status(400).send({
                status: 0,
                message: error.message,
                user: {},
            });
        }
    },

    // Função para redefinir a senha
    async reset_password(req, res) {
        const { token, email } = req.query;
        const { password } = req.body;

        try {
            const message = await passwordService.resetPassword(token, email, password);

            return res.status(200).send({
                status: 1,
                message,
            });
        } catch (error) {
            console.error('Erro ao redefinir a senha:', error);
            return res.status(400).send({
                status: 0,
                message: error.message,
            });
        }
    }
};
