const { sequelize } = require('../database');
const Admin = require('../models/AdminModel');
const User = require('../models/UserModel');

class AdminService {

    async getAllAdmins() {
        return await User.findAll({
            where: { isAdmin: true },
            attributes: ['id', 'name', 'email', 'phone'],
            include: {
                model: Admin,
                as: 'admin',
                attributes: ['data_admissao'],
            },
        });
    }

    async getAdminById(adminId) {
        try {
            const admin = await User.findByPk(adminId, {
                where: { isAdmin: true },
                attributes: [
                    'id', 'name', 'cpf', 'phone', 'email',
                    'rua', 'numero', 'complemento', 'bairro',
                    'cidade', 'estado', 'cep',
                ],
                include: {
                    model: Admin,
                    as: 'admin',
                    attributes: ['salario', 'data_admissao'],
                },
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
            const user = await User.findByPk(adminId, { transaction });

            if (!user) {
                throw new Error('Usuário não encontrado!');
            }

            if (personalData || addressData) {
                await user.update({ ...personalData, ...addressData }, { transaction });
            }

            const admin = await Admin.findOne({
                where: { usuario_id: adminId },
                transaction,
            });

            if (admin && adminData) {
                await admin.update(adminData, { transaction });
            }

            await transaction.commit();

            return await User.findByPk(adminId, {
                include: { model: Admin, as: 'admin' },
            });
        } catch (error) {
            await transaction.rollback();
            console.error('Erro ao atualizar admin:', error.message);
            throw error;
        }
    }

    async deleteAdmin(userId) {
        const transaction = await sequelize.transaction();
    
        try {
            const admin = await Admin.findOne({
                where: { usuario_id: userId },
                transaction,
            });
    
            if (!admin) {
                throw new Error('Admin não encontrado!');
            }
    
            await Admin.destroy({
                where: { usuario_id: userId },
                transaction,
            });
    
            await User.destroy({
                where: { id: userId },
                transaction,
            });

            await transaction.commit();
    
            return { message: 'Admin e usuário deletados com sucesso!' };
        } catch (error) {
            await transaction.rollback();
            throw new Error(`Erro ao deletar admin e usuário: ${error.message}`);
        }
    }

}

module.exports = new AdminService();
