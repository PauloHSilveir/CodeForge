const itemModel = require('../models/item');
const { verificarQuantidadeEPreco, verificarNomeItemUnico } = require('../utils/funcoesAuxiliares');


class ItemServices {
    async Create(name, description, preco, quantidade) {

        try {
            if (!name) {
                throw new Error("Informe o nome do item.");
            } else if (!description) {
                throw new Error("Informe a desrição do item.");
            } else if (!preco) {
                throw new Error("Informe o preço do item.");
            } else if (!quantidade) {
                throw new Error("Informe a quantidade do item.");
            }

            //aplica regras de negocio
            verificarQuantidadeEPreco(quantidade, preco);
            await verificarNomeItemUnico(name);

            const item = await itemModel.create({
                name,
                description,
                preco,
                quantidade,
            });

            return {
                msg: "Item cadastrado com sucesso!",
                item,
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async Update(idItem, name, description, preco, quantidade) {
        try {
            const item = await itemModel.findByPk(idItem);
            if (!item) {
                throw new Error("Item não encontrado.");
            }

            //Aplica regras de negocio
            if (name && name !== item.name) {
                await verificarNomeItemUnico(name, idItem);
            }

            // Define valores para quantidade e preço
            verificarQuantidadeEPreco(quantidade, preco);
            await verificarNomeItemUnico(name);

            // Atualiza campos
            if (name) item.name = name;
            if (description) item.description = description;
            if (preco) item.preco = preco;
            if (quantidade) item.quantidade = quantidade;

            await item.save();
            return {
                msg: "Alterações realizadas com sucesso!",
                item,
            };

        } catch (error) {
            throw new Error(error.message);
        }
    }

    async FindById(idItem) {
        try {
            const item = itemModel.findOne({ where: { idItem } });
            if (!item) {
                throw new Error("Item não encontrado.");
            }
            return item;
        } catch (error) {
            throw new Error(error.message);
        }

    }

    async FindAll() {
        return itemModel.findAll();
    }

    async DeleteItem(idItem, packageStatus) {
        try {
            const item = await this.FindById(idItem);
            if(!item) {
                throw new Error("Item não encontrado.");
            }
            //aplicando regras de negocio
            if (packageStatus) {
                throw new Error("Não é possível excluiro item pois está relacionado a um pacote existente.");
            }

            await item.destroy();
            return {
                msg: "Item excluido com sucesso!",
            }
        } catch (error) {
            
        }
    }
}

module.exports = new ItemServices();