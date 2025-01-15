const Componente = require('../models/ComponenteModel');
const { Op } = require('sequelize');

class ComponenteService {
  async create(componenteData) {
  try {
    
    // Validações básicas
    if (!componenteData.name) {
      throw new Error('O nome do componente é obrigatório');
    }
    if (!componenteData.description) {
      throw new Error('A descrição do componente é obrigatória');
    }
    if (!componenteData.preco) {
      throw new Error('O preço do componente é obrigatório');
    }
    if (!componenteData.quantidade) {
      throw new Error('A quantidade do componente é obrigatória');
    }
    if (!componenteData.pacote_id) {
      throw new Error('O pacote associado é obrigatório');
    }
    if (!componenteData.categoria) {
      throw new Error('A categoria do componente é obrigatória');
    }
    if (!componenteData.imagem) {
      throw new Error('A imagem do componente é obrigatória');
    }
    
    
    // Validar nome único
    const existingComponent = await Componente.findOne({
      where: { name: componenteData.name }
    });

    if (existingComponent) {
      throw new Error('Já existe um componente com este nome');
    }

    // Validar preço e quantidade
    if (componenteData.preco <= 0) {
      throw new Error('O preço deve ser maior que zero');
    }
    if (componenteData.quantidade < 0) {
      throw new Error('A quantidade não pode ser negativa');
    }

    // Criar o componente
    const componente = await Componente.create(componenteData);

    return {
      message: 'Componente criado com sucesso',
      componente
    };
  } catch (error) {
    throw new Error(error.message);
  }
}

  async Update(id, componenteData) {
    try {
      const componente = await Componente.findByPk(id);
      
      if (!componente) {
        throw new Error('componente não encontrado');
      }

      // Validar nome único se estiver sendo atualizado
      if (componenteData.name && componenteData.name !== componente.name) {
        const existingcomponente = await Componente.findOne({
          where: { 
            name: componenteData.name,
            id: { [Op.ne]: id }
          }
        });
        
        if (existingcomponente) {
          throw new Error('Já existe um componente com este nome');
        }
      }

      // Validar preço e quantidade se estiverem sendo atualizados
      if (componenteData.preco && componenteData.preco <= 0) {
        throw new Error('O preço deve ser maior que zero');
      }
      if (componenteData.quantidade && componenteData.quantidade < 0) {
        throw new Error('A quantidade não pode ser negativa');
      }

      await componente.update(componenteData);

      return {
        message: 'componente atualizado com sucesso',
        componente
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async DeleteComponente(id, packageStatus = false) {
    try {
      const componente = await Componente.findByPk(id);
      
      if (!componente) {
        throw new Error('componente não encontrado');
      }

      if (componente.pacote_id) {
        throw new Error('Não é possível excluir o componente pois está vinculado a um pacote existente');
      }

      await componente.destroy();
      
      return {
        message: 'componente excluído com sucesso'
      };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async FindById(id) {
    try {
      const componente = await Componente.findByPk(id);
      
      if (!componente) {
        throw new Error('componente não encontrado');
      }

      return componente;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async FindAll() {
    try {
      return await Componente.findAll();
    } catch (error) {
      throw new Error('Erro ao buscar itens');
    }
  }
}

module.exports = new ComponenteService();