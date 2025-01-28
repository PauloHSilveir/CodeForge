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
    // No need for field conversion since form matches our state structure
    setPackageData(prev => ({ 
      ...prev, 
      ...formData 
    }));
  };

  const addComponents = (items) => {
    
    const newComponents = items.map(item => ({
      componente_id: item.id,
      quantidade_componente: item.quantity || 1,
    }));

    setPackageData(prev => ({
      ...prev,
      componentes: [...prev.componentes, ...newComponents]
    }));
  };

  const getFormattedData = () => {
    return packageData;
  };

  return (
    <PackageContext.Provider value={{ 
      packageData, 
      updatePackageData, 
      addComponents, 
      getFormattedData 
    }}>
      {children}
    </PackageContext.Provider>
  );
};

export const usePackage = () => useContext(PackageContext);