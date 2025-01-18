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

    async show(req, res) {
        const { id: adminId } = req.params;

        try {
            if (!adminId) {
                throw new Error('O ID do admin é obrigatório.');
            }

            const admin = await AdminService.getAdminById(adminId);
            return res.status(200).json(admin);
        } catch (error) {
            console.error('Erro ao buscar admin:', error.message);
            return res.status(404).json({ message: error.message });
        }
    }


    // Cria um novo admin
    async create(req, res) {
        try {
            const { user, admin } = await AdminService.createAdminAndUser(req.body);

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
        const { id: adminId } = req.params;
        const { personalData, addressData, adminData } = req.body;

        try {
            const loggedAdminId = req.userId;
            console.log('Admin ID:', parseInt(adminId));
            if (parseInt(adminId) !== loggedAdminId) {
                throw new Error('Você não tem permissão para atualizar esses dados.');
            }

            const updatedAdmin = await AdminService.updateAdmin(adminId, personalData, addressData, adminData);

            return res.status(200).json({
                message: 'Admin atualizado com sucesso!',
                admin: updatedAdmin,
            });
        } catch (error) {
            console.error('Erro ao atualizar admin:', error.message);
            return res.status(400).json({ message: error.message });
        }
    }


    // Remove um admin
    async delete(req, res) {
        const { id } = req.params;

        try {
            await AdminService.deleteAdmin(id);
            return res.status(200).json({ message: 'Admin deletado com sucesso!' });
        } catch (error) {
            console.error(error);
            return res.status(404).json({ message: error.message });
        }
    }
}

module.exports = new AdminController();
