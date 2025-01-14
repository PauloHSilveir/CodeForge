const authService = require('../services/authService');

module.exports = {
    // Função para realizar o login
    async login(req, res) {
        const { email, password, islogged } = req.body;

        try {
            // Realiza a autenticação do usuário
            const { user, token } = await authService.login(email, password);

            // Atualiza o status do usuário para "logado"
            await authService.setLoggedStatus(user.id, islogged);

            user.password = undefined; // Não retorna a senha na resposta

            return res.status(200).send({
                status: 1,
                message: "Usuário logado com sucesso!",
                user,
                token
            });
        } catch (error) {
            return res.status(400).send({
                status: 0,
                message: error.message,
                user: {}
            });
        }
    },

    // Função para realizar o logout
    async logout(req, res) {
        const { user_id } = req.params;

        try {
            // Realiza o logout do usuário
            await authService.logout(user_id);

            return res.status(200).send({
                status: 1,
                message: "Usuário deslogado com sucesso!"
            });
        } catch (error) {
            return res.status(400).send({
                status: 0,
                message: error.message
            });
        }
    }
};
