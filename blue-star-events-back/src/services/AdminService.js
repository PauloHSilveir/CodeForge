const Admin = require('../models/Admin');
const User = require('../models/User');

class AdminService {
    // Busca todos os admins
    async getAllAdmins() {
        return await Admin.findAll({
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            },
        });
    }

    // Busca admin por ID
    async getAdminById(adminId) {
        const admin = await Admin.findByPk(adminId, {
            include: {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'email'],
            },
        });

        if (!admin) {
            throw new Error('Admin não encontrado!');
        }

        return admin;
    }

    // Cria um novo admin
    async createAdminAndUser(adminData) {
        const { name, email, password, salario, data_admissao } = adminData;

        // Valida se o e-mail já está sendo usado
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            throw new Error('E-mail já está em uso!');
        }

        // Cria o usuário
        const user = await User.create({
            name,
            email,
            password, // Certifique-se de aplicar hash no password antes de salvar
        });

        // Cria o admin associado ao usuário
        const admin = await Admin.create({
            user_id: user.id,
            salario,
            data_admissao,
        });

        return { user, admin };
    }

    // Atualiza os dados de um admin
    async updateAdmin(adminId, adminData) {
        const admin = await Admin.findByPk(adminId);

        if (!admin) {
            throw new Error('Admin não encontrado!');
        }

        await admin.update(adminData);

        return admin;
    }

    // Remove um admin
    async deleteAdmin(adminId) {
        const admin = await Admin.findByPk(adminId);

        if (!admin) {
            throw new Error('Admin não encontrado!');
        }

        await admin.destroy();

        return { message: 'Admin deletado com sucesso!' };
    }
}

module.exports = new AdminService();
