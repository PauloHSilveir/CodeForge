const User = require('../models/user');
const Item = require("../models/item");
const { Op } = require('sequelize');

async function verificarEmailUnico(email, userId = null) {
    const user = await User.findOne({ where: { email } });
    if (user && user.id !== userId) {
        throw new Error('O e-mail já está cadastrado no sistema.');
    }
}

async function verificarCpfUnico(cpf, userId = null) {
    const user = await User.findOne({ where: { cpf } });
    if (user && user.id !== userId) {
        throw new Error('O CPF já está cadastrado no sistema.');
    }
}

async function verificarQuantidadeEPreco(quantidade, preco) {
    if (quantidade <= 0) {
        throw new Error("A quantidade deve ser maior que 0.");
    }
    if (preco <= 0) {
        throw new Error("O preço deve ser maior que 0.");
    }
}



async function verificarNomeItemUnico(name, idItem = null) {
    const whereCondition = { name };
    if (idItem) whereCondition.idItem = { [Op.ne]: idItem }; // Exclui o item atual na verificação.

    const existingItem = await Item.findOne({ where: whereCondition });
    if (existingItem) {
        throw new Error("Já existe um item com este nome.");
    }
}
module.exports = {verificarEmailUnico, verificarCpfUnico, verificarQuantidadeEPreco, verificarNomeItemUnico};