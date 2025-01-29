import React, { createContext, useContext, useState } from 'react';

const PackageContext = createContext();

export const PackageProvider = ({ children }) => {
  const [packageData, setPackageData] = useState({
    nome: '',
    descricao: '',
    tipo: '',
    disponibilidade: 0,
    imagem: null,
    tamanho: '',
    componentes: []
  });

  const updatePackageData = (formData) => {
    setPackageData(prev => ({ 
      ...prev, 
      ...formData 
    }));
  };

  const addComponents = (items) => {
    // Convert new items to the expected backend format
    const newComponents = items.map(item => ({
      componente_id: item.id,
      quantidade_componente: item.quantity
    }));

    setPackageData(prev => {
      // Get existing component IDs for comparison
      const existingComponentIds = prev.componentes.map(comp => comp.componente_id);
      
      // Filter out any new components that would be duplicates
      const uniqueNewComponents = newComponents.filter(
        comp => !existingComponentIds.includes(comp.componente_id)
      );

      // Combine existing components with new unique components
      const updatedComponents = [...prev.componentes, ...uniqueNewComponents];

      return {
        ...prev,
        componentes: updatedComponents
      };
    });
  };

  const getFormattedData = () => {
    return {
      ...packageData,
      componentes: packageData.componentes
    };
  };

  // Optional: Add a function to remove components if needed
  const removeComponent = (componentId) => {
    setPackageData(prev => ({
      ...prev,
      componentes: prev.componentes.filter(
        comp => comp.componente_id !== componentId
      )
    }));
  };

  return (
    <PackageContext.Provider value={{ 
      packageData, 
      updatePackageData, 
      addComponents,
      removeComponent, 
      getFormattedData 
    }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => useContext(PackageContext);