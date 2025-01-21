const Carrinho = require("../models/CarrinhoModel");
const CustomError = require("../utils/CustomError");

class CarrinhoService {
    static async addToCart(carrinhoData) {
        try {
            const { usuario_id, pacote_id, quantidade, preco_unitario } = carrinhoData;

            const [item, created] = await Carrinho.findOrCreate({
                where: { usuario_id, pacote_id },
                defaults: {
                    quantidade,
                    preco_unitario
                }
            }).catch(err => {
                console.error('Erro SQL:', err);
                throw err;
            });

            console.log('Resultado da operação:', { created, item });

            if (!created) {
                item.quantidade += quantidade;
                item.preco_unitario = preco_unitario;
                await item.save();
            }

            return item;
        } catch (error) {
            console.error('Erro detalhado:', error);
            throw new Error(`Erro ao adicionar item ao carrinho: ${error.message}`);
        }
    }

    static async getCartItems(usuario_id) {
        try {
            const items = await Carrinho.findAll({
                where: { usuario_id },
                include: [{
                    association: 'pacote',
                    attributes: ['name', 'description'],
                }],
                order: [['createdAt', 'DESC']]
            });

            return items;
        } catch (error) {
            throw new CustomError("Erro ao buscar itens do carrinho", 500);
        }
    }

    static async removeItem(usuario_id, pacote_id) {
        try {
            const deleted = await Carrinho.destroy({
                where: { usuario_id, pacote_id }
            });

            if (!deleted) {
                throw new CustomError("Item não encontrado no carrinho", 404);
            }

            return true;
        } catch (error) {
            if (error instanceof CustomError) throw error;
            throw new CustomError("Erro ao remover item do carrinho", 500);
        }
    }

    static async clearCart(usuario_id) {
        try {
            await Carrinho.destroy({ where: { usuario_id } });
            return true;
        } catch (error) {
            throw new CustomError("Erro ao limpar o carrinho", 500);
        }
    }
}

module.exports = CarrinhoService;