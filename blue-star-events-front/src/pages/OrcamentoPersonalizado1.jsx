import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import OrcamentoBase from "../components/OrcamentoBase";
import FormularioDetalhesEvento from "../components/FormularioDetalhesEvento";

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
        <OrcamentoBase
            title="DETALHES DO EVENTO"
            subtotal={2000}
            nextPath="/orcamentopersonalizado2"
            prevPath="/"
            handleNavigate={handleNavigate}
            nextButtonText="PRÓXIMA ETAPA"
        >
            <FormularioDetalhesEvento formData={formData} handleChange={handleChange} />
        </OrcamentoBase>
    );
}

export default OrcamentoPersonalizado1;
