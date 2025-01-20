import React, { useState } from "react";
import ListaPacotes2 from "../components/ListaPacotes2";
import stylesFormBaseA from "../styles/FormBaseA.module.css";
import stylesFP1 from "../styles/FormularioPacotes1.module.css";
import { RiArrowLeftCircleLine } from "@remixicon/react";
import Navbar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import stylesCP from "../styles/CadastrarPacotes.module.css";

const PacoteForm = ({ title, selectType, items, preSelectedItems = [], onSave, backPath, nextPath, buttonText }) => {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState(preSelectedItems);
    const location = useLocation();
    const pacoteData = location.state?.pacoteData || {};

    const handleItemsChange = (updatedItems) => {
        setSelectedItems(updatedItems.filter((item) => item.quantity > 0));
    };

    const handleSaveClick = () => {
        onSave(selectedItems);
        navigate(nextPath);
    };

    const handleBackClick = () => {
        navigate(backPath, {
            state: {
                pacoteData: {
                    id: pacoteData.id,
                    nome: pacoteData.nome,
                    descricao: pacoteData.descricao,
                    tamanho: pacoteData.tamanho,
                    valor: pacoteData.valor,
                    imagem: pacoteData.imagem,
                },
            },
        });
    };

    return (
        <div>
            <Navbar />
            <div className={`${stylesFormBaseA.container} ${stylesFP1.container}`}>
                <div className={stylesFormBaseA.legendContainer}>
                    <RiArrowLeftCircleLine
                        className={stylesFormBaseA.iconBack}
                        onClick={handleBackClick} 
                    />
                    <div className={stylesFormBaseA.bigText}>{title}</div>
                </div>

                <div className={stylesCP.containerList}>
                    <div className={stylesCP.mediumText}>{selectType}</div>
                    <ListaPacotes2
                        initialItems={items}
                        preSelectedItems={preSelectedItems}
                        onItemsChange={handleItemsChange}
                    />

                    <button
                        className={`${stylesFormBaseA.buttonBase} ${stylesCP.buttonCP}`}
                        onClick={handleSaveClick} 
                    >
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PacoteForm;
