const Item = require('../models/ComponenteModel');
const { Op } = require('sequelize');

class ComponenteService {
  async create(itemData) {
    try {
      // Validações básicas
      if (!itemData.name) {
        throw new Error('O nome do item é obrigatório');
      }
      if (!itemData.description) {
        throw new Error('A descrição do item é obrigatória');
      }
      if (!itemData.preco) {
        throw new Error('O preço do item é obrigatório');
      }
      if (!itemData.quantidade) {
        throw new Error('A quantidade do item é obrigatória');
      }

      // Validar nome único
      const existingItem = await Item.findOne({
        where: { name: itemData.name }
      });

      if (existingItem) {
        throw new Error('Já existe um item com este nome');
      }

      // Validar preço e quantidade
      if (itemData.preco <= 0) {
        throw new Error('O preço deve ser maior que zero');
      }
      if (itemData.quantidade < 0) {
        throw new Error('A quantidade não pode ser negativa');
      }

      const item = await Item.create(itemData);
      
      return {
        message: 'Item criado com sucesso',
        item
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async update(id, itemData) {
    try {
      const item = await Item.findByPk(id);
      
      if (!item) {
        throw new Error('Item não encontrado');
      }

      // Validar nome único se estiver sendo atualizado
      if (itemData.name && itemData.name !== item.name) {
        const existingItem = await Item.findOne({
          where: { 
            name: itemData.name,
            id: { [Op.ne]: id }
          }
        });
        
        if (existingItem) {
          throw new Error('Já existe um item com este nome');
        }
      }

      // Validar preço e quantidade se estiverem sendo atualizados
      if (itemData.preco && itemData.preco <= 0) {
        throw new Error('O preço deve ser maior que zero');
      }
      if (itemData.quantidade && itemData.quantidade < 0) {
        throw new Error('A quantidade não pode ser negativa');
      }

      await item.update(itemData);

      return {
        message: 'Item atualizado com sucesso',
        item
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async delete(id, packageStatus = false) {
    try {
      const item = await Item.findByPk(id);
      
      if (!item) {
        throw new Error('Item não encontrado');
      }

      if (packageStatus) {
        throw new Error('Não é possível excluir o item pois está relacionado a um pacote existente');
      }

      await item.destroy();
      
      return {
        message: 'Item excluído com sucesso'
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findById(id) {
    try {
      const item = await Item.findByPk(id);
      
      if (!item) {
        throw new Error('Item não encontrado');
      }

      return item;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findAll() {
    try {
      return await Item.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar itens');
    }
  }
}

module.exports = new ComponenteService();