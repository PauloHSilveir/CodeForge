const userService = require('../services/userService');

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

    // Criar um novo usuário
    async store(req, res) {
        try {
            const { user, token } = await userService.store(req.body);
            return res.status(201).json({
                status: 1,
                message: 'Usuário cadastrado com sucesso!',
                user,
                token,
            });
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
};
