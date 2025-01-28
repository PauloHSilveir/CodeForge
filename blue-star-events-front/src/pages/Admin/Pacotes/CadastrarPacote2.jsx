import React, { useEffect, useState } from "react";
import PacoteForm from "../../../components/PacoteForm";
import { useNavigate } from "react-router-dom";
import { usePackage } from "../../../context/PackageContext";

const CadastrarPacote2 = () => {
    const [professionals, setProfessionals] = useState([]);
    const { addComponents } = usePackage();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfessionals = async () => {
            try {
                const response = await fetch('http://localhost:1313/componente');
                if (!response.ok) {
                    throw new Error('Failed to fetch professionals');
                }
                const data = await response.json();
                
                const professionalComponents = data.componente
                    .filter(item => item.categoria === 'Funcionarios')
                    .map(item => ({
                        id: item.id,
                        name: item.name,
                        price: item.preco,
                        quantity: 0
                    }));

                setProfessionals(professionalComponents);

            } catch (error) {
                console.error('Erro ao buscar funcionários:', error);
                setProfessionals([]); // Define um array vazio em caso de erro
            }
        };

        fetchProfessionals();
    }, []);

    const handleSave = (selectedItems) => {
        addComponents(selectedItems);
        navigate('/cadastrarpacotes3');
    };

    return (
        <PacoteForm
            title="CRIANDO NOVO PACOTE"
            selectType="ESCOLHA OS PROFISSIONAIS"
            items={professionals}
            onSave={handleSave}
            backPath="/cadastrarpacotes1"
            nextPath="/cadastrarpacotes3"
            buttonText="PRÓXIMA ETAPA"
        />
    );
};

export default CadastrarPacote2;