import React, { createContext, useContext, useState, useCallback } from "react";

const PacoteContext = createContext();

export const PacoteProvider = ({ children }) => {
    const [pacoteData, setPacoteData] = useState({
        id: null,
        nome: "",
        descricao: "",
        tamanho: "",
        valor: 0,
        imagem: "",
    });
    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    // Função para atualizar pacoteData
    const updatePacoteData = (newData) => {
        setPacoteData((prevData) => ({ ...prevData, ...newData }));
    };

    const updateItems = useCallback((itemsList) => {
        setItems(itemsList);
    }, []);

    const updateSelectedItems = (items) => {
        setSelectedItems(items);
    };

    return (
        <PacoteContext.Provider
            value={{
                pacoteData,
                setPacoteData,
                updatePacoteData, // Certifique-se de expor esta função
                items,
                updateItems,
                selectedItems,
                updateSelectedItems,
            }}
        >
            {children}
        </PacoteContext.Provider>
    );
};

export const usePacote = () => useContext(PacoteContext);
