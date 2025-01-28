import React, { useEffect, useState } from "react";
import PacoteForm from "../../../components/PacoteForm";
import { useNavigate } from "react-router-dom";
import { usePackage } from "../../../context/PackageContext";
// import { fetchPacotes } from "./GerenciarPacotes";
import ModalMensagemSucesso from "../../../components/ModalMensagemSucesso";

const CadastrarPacote4 = () => {
    const [foods, setFoods] = useState([]);
    const { packageData, addComponents } = usePackage();
    const navigate = useNavigate();

    const [showSucessPacote, setShowSucessPacote] = useState(false);

    useEffect(() => {
        const fetchFoods = async () => {
            try {
                const response = await fetch("http://localhost:1313/componente");
                if (!response.ok) {
                    throw new Error("Failed to fetch foods");
                }
                const data = await response.json();

                const foodComponents = data.componente
                    .filter((item) => item.categoria === "Comidas")
                    .map((item) => ({
                        id: item.id,
                        name: item.name,
                        price: item.preco,
                        quantity: 0,
                    }));

                setFoods(foodComponents);
            } catch (error) {
                console.error("Error ao buscar comidas", error);
            }
        };

        fetchFoods();
    }, []);

    const handleSave = async (selectedItems) => {
        console.log("selected itens: " + selectedItems);
        addComponents(selectedItems);
        handleSubmit();
    }
    const handleSubmit = async () => {
        try {
            const response = await fetch("http://localhost:1313/pacote/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: packageData.nome,
                    description: packageData.descricao,
                    tipo: packageData.tipo,
                    disponibilidade: Number(packageData.disponibilidade),
                    imagem: packageData.imagem instanceof File ? packageData.imagem.name : packageData.imagem,
                    tamanho: packageData.tamanho,
                    componentes: packageData.componentes,
                }),
            });
            console.log("Componentes:", packageData.componentes);

            if (!response.ok) throw new Error("Falha ao criar pacote");

            // Exibir modal de sucesso
            setShowSucessPacote(true);

            setTimeout(() => {
                setShowSucessPacote(false);
                navigate("/gerenciarpacotes");
            }, 1500);
        } catch (error) {
            console.error("Erro ao criar pacote", error);
        }
    };

    return (
        <>
            <PacoteForm
                title="CRIANDO NOVO PACOTE"
                selectType="ESCOLHA AS COMIDAS DO PACOTE"
                items={foods}
                onSave={handleSave}
                backPath="/cadastrarpacotes3"
                nextPath="/gerenciarpacotes"
                buttonText="CADASTRAR PACOTE"
            />
            <ModalMensagemSucesso
                title="CADASTRAR PACOTE"
                text="Pacote cadastrado com sucesso!"
                isVisible={showSucessPacote}

            />

        </>
    );
};

export default CadastrarPacote4;
