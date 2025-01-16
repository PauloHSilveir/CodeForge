const AdminService = require('../services/AdminService');

class AdminController {
    // Lista todos os admins
    async index(req, res) {
        try {
            const admins = await AdminService.getAllAdmins();
            return res.status(200).json(admins);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Erro ao buscar admins.' });
        }
    }

    // Busca admin por ID
    async show(req, res) {
        const { adminId } = req.params;

        try {
            const admin = await AdminService.getAdminById(adminId);
            return res.status(200).json(admin);
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: error.message });
        }
    }

    // Cria um novo admin
    async store(req, res) {
        const { name, email, password, salario, data_admissao } = req.body;

        try {
            const { user, admin } = await AdminService.createAdminAndUser({
                name,
                email,
                password,
                salario,
                data_admissao,
            });

            return res.status(201).json({
                message: 'Admin e usuário criados com sucesso!',
                user,
                admin,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    }

    // Atualiza os dados de um admin
    async update(req, res) {
        const { adminId } = req.params;
        const adminData = req.body;

        try {
            const updatedAdmin = await AdminService.updateAdmin(adminId, adminData);
            return res.status(200).json({
                message: 'Admin atualizado com sucesso!',
                admin: updatedAdmin,
            });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ message: error.message });
        }
    }

    // Remove um admin
    async delete(req, res) {
        const { adminId } = req.params;

        try {
            await AdminService.deleteAdmin(adminId);
            return res.status(200).json({ message: 'Admin deletado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new AdminController();
