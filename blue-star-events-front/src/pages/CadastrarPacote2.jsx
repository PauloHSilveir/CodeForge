import React from "react";
import PacoteForm from "../components/PacoteForm";

const CadastrarPacote2 = () => {
    const professionals = [
        { id: 1, name: "CERIMONIALISTA", price: 4500 },
        { id: 2, name: "DECORADOR", price: 3500 },
        { id: 3, name: "CHEFE DE COZINHA", price: 5000 },
        { id: 4, name: "GARÇOM", price: 1200 },
        { id: 5, name: "BARTENDER", price: 1500 },
        { id: 6, name: "DJ", price: 3000 },
        { id: 7, name: "BANDA MUSICAL", price: 8000 },
        { id: 8, name: "FOTÓGRAFO", price: 2500 },
        { id: 9, name: "VIDEOMAKER", price: 3000 },
        { id: 10, name: "SEGURANÇA", price: 1000 },
        { id: 11, name: "RECEPCIONISTA", price: 800 },
        { id: 12, name: "MOTORISTA", price: 900 },
        { id: 13, name: "FAXINEIRO", price: 700 },
    ];

    const handleSave = (selectedItems) => {
        console.log("Profissionais selecionados para salvar:", selectedItems);
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
