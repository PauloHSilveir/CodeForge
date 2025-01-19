const { sequelize } = require('../database');
const Admin = require('../models/AdminModel');
const User = require('../models/UserModel');

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

    async getAdminById(adminId) {
        try {
            const admin = await Admin.findByPk(adminId, {
                include: {
                    model: User,
                    as: 'user',
                    attributes: [
                        'id', 'name', 'cpf', 'phone', 
                        'email', 'rua', 'numero', 
                        'complemento', 'bairro', 
                        'cidade', 'estado', 'cep'
                    ],
                },
                attributes: ['salario', 'data_admissao'],
            });
    
            if (!admin) {
                throw new Error('Admin não encontrado!');
            }
    
            return admin;
        } catch (error) {
            throw new Error(`Erro ao buscar admin por ID: ${error.message}`);
        }
    }    

    async createAdminAndUser(adminData) {
        const { name, cpf, password, email, phone, rua, numero, complemento, bairro, cidade, estado,
            cep, isAdmin, salario, data_admissao } = adminData;
    
        const transaction = await sequelize.transaction();
    
        try {
            // Valida se o e-mail já está sendo usado
            const existingUser = await User.findOne({ where: { email }, transaction });
            if (existingUser) {
                throw new Error('E-mail já está em uso!');
            }
    
            // Cria o usuário
            const user = await User.create({
                name,
                cpf,
                password,
                email,
                phone,
                rua,
                numero,
                complemento,
                bairro,
                cidade,
                estado,
                cep,
                isAdmin,
            }, { transaction });
    
            // Cria o admin
            const admin = await Admin.create({
                usuario_id: user.id,
                salario,
                data_admissao,
            }, { transaction });
    
            await transaction.commit();
    
            return { user, admin };
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }

    async updateAdmin(adminId, personalData, addressData, adminData) {
        const transaction = await sequelize.transaction();

        try {
            const admin = await Admin.findByPk(adminId, {
                include: { model: User, as: 'user' },
            });

            if (!admin) {
                throw new Error('Admin não encontrado!');
            }

            if (personalData) {
                await admin.user.update(personalData, { transaction });
            }

            if (addressData) {
                await admin.user.update(addressData, { transaction });
            }

            if (adminData) {
                await admin.update(adminData, { transaction });
            }

            await transaction.commit();

            return await Admin.findByPk(adminId, {
                include: { model: User, as: 'user' },
            });
        } catch (error) {
            await transaction.rollback();
            throw error;
        }
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
