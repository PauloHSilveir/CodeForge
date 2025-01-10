import React from "react";
import stylesOP1 from "../styles/FormularioDetalhesEventos.module.css";

const FormularioDetalhesEvento = ({ formData, handleChange }) => {
    return (
        <div className={stylesOP1.selectsBox}>
            <div className={stylesOP1.selectItem}>
                <label htmlFor="eventSize">Tamanho do Evento</label>
                <select id="eventSize" name="eventSize" value={formData.eventSize} onChange={handleChange}>
                    <option value="" disabled>Selecione o tamanho do evento</option>
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
                    <option value="" disabled>Selecione o tipo do evento</option>
                    <option value="aniversario">Aniversário</option>
                    <option value="casamento">Casamento</option>
                    <option value="corporativo">Corporativo</option>
                    <option value="formatura">Formatura</option>
                </select>
            </div>
            <div className={stylesOP1.selectItem}>
                <label htmlFor="eventLocation">Local do Evento</label>
                <select id="eventLocation" name="eventLocation" value={formData.eventLocation} onChange={handleChange}>
                    <option value="" disabled>Selecione o local do evento</option>
                    <option value="cadastrado">Endereço Cadastrado</option>
                    <option value="novo">Novo Endereço</option>
                </select>
            </div>
            <div className={stylesOP1.selectItem}>
                <label htmlFor="eventDate">Data e Hora</label>
                <input id="eventDate" name="eventDate" type="datetime-local" value={formData.eventDate} onChange={handleChange}/>
            </div>
        </div>
    );
};

export default FormularioDetalhesEvento;
