const CarrinhoService = require("../services/CarrinhoService");

class CarrinhoController {
    static async addToCart(req, res) {
        try {
            const { usuario_id, pacote_id, quantidade, preco_unitario } = req.body;

            const cartItem = await CarrinhoService.addToCart({
                usuario_id,
                pacote_id,
                quantidade,
                preco_unitario
            });

            return res.status(201).json({
                success: true,
                data: cartItem,
                message: "Item adicionado ao carrinho com sucesso"
            });
        } catch (error) {
            console.error('Erro ao adicionar item ao carrinho:', error);
            return res.status(error.status || 500).json({
                success: false,
                message: error.message || "Erro interno do servidor"
            });
        }
    }

    static async getCartItems(req, res) {
        try {
            const { usuario_id } = req.params;
            
            if (!usuario_id) {
                return res.status(400).json({
                    success: false,
                    message: "ID do usuário é obrigatório"
                });
            }

            const items = await CarrinhoService.getCartItems(usuario_id);
            
            return res.status(200).json({
                success: true,
                data: {
                    items,
                    total: items.reduce((acc, item) => acc + parseFloat(item.preco_total), 0).toFixed(2)
                }
            });
        } catch (error) {
            console.error('Erro ao buscar itens do carrinho:', error);
            return res.status(error.status || 500).json({
                success: false,
                message: error.message || "Erro interno do servidor"
            });
        }
    }

    static async removeItem(req, res) {
        try {
            const { usuario_id, pacote_id } = req.params;
            
            if (!usuario_id || !pacote_id) {
                return res.status(400).json({
                    success: false,
                    message: "IDs do usuário e pacote são obrigatórios"
                });
            }

            await CarrinhoService.removeItem(usuario_id, pacote_id);
            
            return res.status(200).json({
                success: true,
                message: "Item removido do carrinho com sucesso"
            });
        } catch (error) {
            console.error('Erro ao remover item do carrinho:', error);
            return res.status(error.status || 500).json({
                success: false,
                message: error.message || "Erro interno do servidor"
            });
        }
    }

    static async clearCart(req, res) {
        try {
            const { usuario_id } = req.params;
            
            if (!usuario_id) {
                return res.status(400).json({
                    success: false,
                    message: "ID do usuário é obrigatório"
                });
            }

            await CarrinhoService.clearCart(usuario_id);
            
            return res.status(200).json({
                success: true,
                message: "Carrinho limpo com sucesso"
            });
        } catch (error) {
            console.error('Erro ao limpar carrinho:', error);
            return res.status(error.status || 500).json({
                success: false,
                message: error.message || "Erro interno do servidor"
            });
        }
    }
}

module.exports = CarrinhoController;