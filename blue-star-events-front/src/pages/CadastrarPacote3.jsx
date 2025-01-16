import React from "react";
import PacoteForm from "../components/PacoteForm";

const CadastrarPacote3 = () => {
    const items = [
        { id: 1, name: "MESA", price: 50 },
        { id: 2, name: "CADEIRA", price: 25 },
        { id: 3, name: "TENDA", price: 500 },
        { id: 4, name: "TALHERES", price: 2 },
        { id: 5, name: "TOALHA DE MESA", price: 20 },
        { id: 6, name: "ARRANJOS DECORATIVOS", price: 150 },
        { id: 7, name: "ILUMINAÇÃO", price: 300 },
        { id: 8, name: "SOM E MICROFONES", price: 400 },
        { id: 9, name: "PISTA DE DANÇA", price: 600 },
        { id: 10, name: "MÁQUINA DE FUMAÇA", price: 200 },
        { id: 11, name: "VENTILADORES", price: 80 },
        { id: 12, name: "PALCO", price: 800 },
        { id: 13, name: "GERADOR DE ENERGIA", price: 1000 },
        { id: 14, name: "CABINE DE FOTOS", price: 500 }
    ];

    const handleSave = (selectedItems) => {
        console.log("Itens selecionados para salvar:", selectedItems);
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
