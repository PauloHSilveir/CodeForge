import React from "react";
import PacoteForm from "../../../components/PacoteForm";
import { useLocation } from "react-router-dom";

const EditarPacotes4 = () => {
    const location = useLocation();
    const pacoteData = location.state?.pacoteData || {};

    const foods = [
        { id: 1, name: "MINI BRUCHETTAS", price: 3 },
        { id: 2, name: "BOLINHAS DE QUEIJO", price: 2 },
        { id: 3, name: "COXINHAS", price: 2.5 },
        { id: 4, name: "MINI QUICHES", price: 3.5 },
        { id: 5, name: "PASTÉIS", price: 3 },
        { id: 6, name: "ESPETINHOS", price: 4 },
        { id: 7, name: "EMPADAS", price: 3.5 },
        { id: 8, name: "MINI PIZZAS", price: 4.5 },
        { id: 9, name: "CHURRASCO", price: 5 },
        { id: 10, name: "RISOTOS", price: 6 },
        { id: 11, name: "FEIJOADA", price: 5.5 },
        { id: 12, name: "STROGONOFF", price: 5 },
        { id: 13, name: "FRICASSÉ", price: 4 },
        { id: 14, name: "MOQUECA", price: 7 },
        { id: 15, name: "SUSHI E SASHIMI", price: 10 },
        { id: 16, name: "TACOS OU BURRITOS", price: 4 },
        { id: 17, name: "HAMBÚRGUERES", price: 5 },
        { id: 18, name: "SALADAS", price: 3 },
        { id: 19, name: "ARROZ", price: 2 },
        { id: 20, name: "BATATA FRITA", price: 2.5 },
        { id: 21, name: "FAROFA", price: 2 },
        { id: 22, name: "POLENTAS", price: 3 }
    ];

    const preSelectedItems = [
        { id: 3, name: "COXINHAS", quantity: 100 },
        { id: 9, name: "CHURRASCO", quantity: 1 },
        { id: 17, name: "TALHERES", quantity: 25 },
    ];

    const handleSave = (selectedItems) => {
        console.log("Comidas selecionadas para salvar:", selectedItems);
    };

    return (
        <PacoteForm
            title="EDITANDO PACOTE"
            selectType="ESCOLHA AS COMIDAS DO PACOTE"
            items={foods}
            preSelectedItems={preSelectedItems}
            onSave={handleSave}
            backPath="/editarpacote3"
            nextPath="/gerenciarpacotes"
            buttonText="SALVAR PACOTE"
            initialData={pacoteData}
        />
    );
};

export default EditarPacotes4;
