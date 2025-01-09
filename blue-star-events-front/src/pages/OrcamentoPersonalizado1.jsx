import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import stylesFormBaseA from "../styles/FormBaseA.module.css";
import stylesOP1 from "../styles/OrcamentoPersonalizado1.module.css";
import { RiFileTextLine } from '@remixicon/react';

function OrcamentoPersonalizado1() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        eventSize: "",
        eventType: "",
        eventLocation: "",
        eventDate: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNavigate = (path) => {
        navigate(path);
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
                            DETALHES DO EVENTO
                        </div>
                        <div className={stylesOP1.selectsBox}>
                            <div className={stylesOP1.selectItem}>
                                <label htmlFor="eventSize">Tamanho do Evento</label>
                                <select id="eventSize" name="eventSize" value={formData.eventSize} onChange={handleChange}>
                                    <option value="" disabled> Selecione o tamanho do evento </option>
                                    <option value="mini">Mini (até 30 pessoas)</option>
                                    <option value="pequeno">Pequeno (31 a 100 pessoas)</option>
                                    <option value="medio">Médio (101 a 300 pessoas)</option>
                                    <option value="grande">Grande (301 a 1000 pessoas)</option>
                                    <option value="mega">Mega (mais de 1000 pessoas)</option>
                                </select>
                            </div>

                            <div className={stylesOP1.selectItem}>
                                <label htmlFor="eventType">Tipo de Evento</label>
                                <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange}>
                                    <option value="" disabled> Selecione o tipo do evento</option>
                                    <option value="aniversario">Aniversário</option>
                                    <option value="casamento">Casamento</option>
                                    <option value="corporativo">Corporativo</option>
                                    <option value="formatura">Formatura</option>
                                </select>
                            </div>

                            <div className={stylesOP1.selectItem}>
                                <label htmlFor="eventLocation">Local do Evento</label>
                                <select id="eventLocation" name="eventLocation" value={formData.eventLocation} onChange={handleChange}>
                                    <option value="" disabled> Selecione o local do evento</option>
                                    <option value="cadastrado">Endereço Cadastrado</option>
                                    <option value="novo">Novo Endereço</option>
                                </select>
                            </div>

                            <div className={stylesOP1.selectItem}>
                                <label htmlFor="eventDate">Data e Hora</label>
                                <input id="eventDate" name="eventDate" type="datetime-local" value={formData.eventDate} onChange={handleChange} />
                            </div>
                        </div>
                    </div>

                    <div className={stylesOP1.resumo}>
                        <div className={stylesOP1.mediumText}>
                            <RiFileTextLine  className={stylesOP1.icon}/> RESUMO
                        </div>
                        <div className={stylesOP1.summaryTable}>
                            <div className={stylesOP1.summaryRow}>
                                <span>Subtotal do Pacote:</span>
                                <span>R$ 2000,00</span>
                            </div>
                            <div className={stylesOP1.summaryRow}>
                                <span>Frete:</span>
                                <span>R$ 0,00</span>
                            </div>
                            <div className={stylesOP1.summaryRowTotal}>
                                <span>Total:</span>
                                <span>R$ 2000,00</span>
                            </div>
                        </div>
                        <button className={`${stylesOP1.buttons} ${stylesOP1.pe}`} onClick={() => handleNavigate("/orcamentopersonalizado2")}>
                            PRÓXIMA ETAPA
                        </button>
                        <button className={`${stylesOP1.buttons} ${stylesOP1.voltar}`} onClick={() => handleNavigate("/")}>
                            VOLTAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrcamentoPersonalizado1;
