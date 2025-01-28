import React from "react";
import PacoteForm from "../../../components/PacoteForm";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { usePackage } from "../../../context/PackageContext";

const CadastrarPacote3 = () => {
    const [items, setItems] = useState([]);
    const { addComponents } = usePackage();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch('http://localhost:1313/componente');
                if (!response.ok) {
                    throw new Error('Failed to fetch items');
                }
                const data = await response.json();

                const itemComponents = data.componente
                    .filter(item => item.categoria === 'Itens')
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.preco,
                        quantity: 0
                    }));

                setItems(itemComponents);
            } catch (error) {
                console.error('Erro ao buscar itens', error);
            }
        };

        fetchItems();
    }, []);

    const handleSave = (selectedItems) => {
        addComponents(selectedItems);
        navigate('/cadastrarpacotes4');
    };

    return (
        <PacoteForm
            title="CRIANDO NOVO PACOTE"
            selectType="ESCOLHA OS ITENS DO PACOTE"
            items={items}
            onSave={handleSave}
            backPath="/cadastrarpacotes2"
            nextPath="/cadastrarpacotes4"
            buttonText="PRÓXIMA ETAPA"
        />
    );
};

export default CadastrarPacote3;
