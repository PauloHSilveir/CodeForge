import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import stylesFormBaseA from "../styles/FormBaseA.module.css";
import stylesOP1 from "../styles/OrcamentoPersonalizado1.module.css";
import stylesOP2 from "../styles/OrcamentoPersonalizado2.module.css";
import { RiFileTextLine } from "@remixicon/react";

function OrcamentoPersonalizado4() {
    const navigate = useNavigate();

    const items = [
        { id: 1, name: "MINI BRUCHETTAS", price: 15 },
        { id: 2, name: "BOLINHAS DE QUEIJO", price: 10 },
        { id: 3, name: "COXINHAS", price: 12 },
        { id: 4, name: "MINI QUICHES", price: 18 },
        { id: 5, name: "PASTÉIS", price: 14 },
        { id: 6, name: "ESPETINHOS", price: 20 },
        { id: 7, name: "EMPADAS", price: 16 },
        { id: 8, name: "MINI PIZZAS", price: 22 },
        { id: 9, name: "CHURRASCO", price: 35 },
        { id: 10, name: "RISOTOS", price: 28 },
        { id: 11, name: "FEIJOADA", price: 32 },
        { id: 12, name: "STROGONOFF", price: 30 },
        { id: 13, name: "FRICASSÊ", price: 25 },
        { id: 14, name: "MOQUECA", price: 40 },
        { id: 15, name: "SUSHI E SASHIMI", price: 50 },
        { id: 16, name: "TACOS OU BURRITOS", price: 20 },
        { id: 17, name: "HAMBÚRGUERES", price: 25 },
        { id: 18, name: "SALADAS", price: 12 },
        { id: 19, name: "ARROZ", price: 10 },
        { id: 20, name: "BATATA FRITA", price: 8 },
        { id: 21, name: "FAROFA", price: 7 },
        { id: 22, name: "POLENTAS", price: 15 }
    ];
    

    const [selectedItems, setSelectedItems] = useState({});

    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prev) => {
            const newState = { ...prev };
            if (newState[itemId] !== undefined) {
                delete newState[itemId]; // Deseleciona o item
            } else {
                newState[itemId] = 0; // Seleciona com quantidade inicial 0
            }
            return newState;
        });
    };

    const handleQuantityChange = (itemId, newQuantity) => {
        if (newQuantity === 0) {
            // Se a quantidade chegar a 0, deseleciona o item
            setSelectedItems((prev) => {
                const newState = { ...prev };
                delete newState[itemId];
                return newState;
            });
        } else if (newQuantity > 0) {
            setSelectedItems((prev) => ({
                ...prev,
                [itemId]: newQuantity,
            }));
        }
    };

    const handleNavigate = (path) => {
        navigate(path);
    };

    const calculateSubtotal = () => {
        return items
            .filter((item) => selectedItems[item.id] !== undefined)
            .reduce((total, item) => total + item.price * selectedItems[item.id], 0);
    };

    return (
        <div>
            <NavBar />
            <div className={stylesOP1.container}>
                <div className={`${stylesFormBaseA.legendContainer} ${stylesOP1.legendContainer}`}>
                    <div className={stylesFormBaseA.bigText}>
                        CRIANDO PACOTE PERSONALIZADO
                    </div>
                </div>
                <div className={stylesOP1.infos}>
                    <div className={stylesOP1.details}>
                        <div className={stylesOP1.mediumText}>
                            ESCOLHA OS ITENS DO EVENTO
                        </div>
                        <div className={stylesOP2.itemContainer}>
                            {items.map((item) => (
                                <div key={item.id} className={stylesOP2.itemRow}>
                                    <label className={stylesOP2.checkboxLabel}>
                                        <input type="checkbox" checked={selectedItems[item.id] !== undefined} onChange={() => handleCheckboxChange(item.id)} />
                                        <span className={stylesOP2.checkmark}></span>
                                        {item.name}
                                    </label>
                                    {selectedItems[item.id] !== undefined && (
                                        <div className={stylesOP2.quantityControls}>
                                            <button className={stylesOP2.quantityButton} onClick={() => handleQuantityChange(item.id, selectedItems[item.id] - 1)}>‹</button>
                                            <input
                                                type="number"
                                                className={stylesOP2.quantityInput}
                                                value={selectedItems[item.id]}
                                                onChange={(e) => {
                                                    const value = parseInt(e.target.value, 10);
                                                    if (!isNaN(value)) {
                                                        handleQuantityChange(item.id, value);
                                                    }
                                                }}
                                                min="0"
                                            />
                                            <button className={stylesOP2.quantityButton} onClick={() => handleQuantityChange(item.id, selectedItems[item.id] + 1)}>›</button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={stylesOP1.resumo}>
                        <div className={stylesOP1.mediumText}>
                            <RiFileTextLine className={stylesOP1.icon} /> RESUMO
                        </div>
                        <div className={stylesOP1.summaryTable}>
                            <div className={stylesOP1.summaryRow}>
                                <span>Subtotal do Pacote:</span>
                                <span>R$ {calculateSubtotal().toFixed(2)}</span>
                            </div>
                            <div className={stylesOP1.summaryRow}>
                                <span>Frete:</span>
                                <span>R$ 0,00</span>
                            </div>
                            <div className={stylesOP1.summaryRowTotal}>
                                <span>Total:</span>
                                <span>R$ {calculateSubtotal().toFixed(2)}</span>
                            </div>
                        </div>
                        <button className={`${stylesOP1.buttons} ${stylesOP1.pe}`} onClick={() => handleNavigate("/carrinho")}>
                            PRÓXIMA ETAPA
                        </button>
                        <button className={`${stylesOP1.buttons} ${stylesOP1.voltar}`} onClick={() => handleNavigate("/orcamentopersonalizado3")}>
                            VOLTAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrcamentoPersonalizado4;