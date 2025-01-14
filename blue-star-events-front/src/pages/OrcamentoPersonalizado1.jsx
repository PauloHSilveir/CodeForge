import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrcamentoBase from "../components/OrcamentoBase";
import FormularioDetalhesEvento from "../components/FormularioDetalhesEvento";

function OrcamentoPersonalizado1() {
    const navigate = useNavigate();

    const [formEvent, setFormEvent] = useState({
        eventSize: "",
        eventType: "",
        eventLocation: "",
        eventDate: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedEvent = JSON.parse(localStorage.getItem('formEvent'));
        if (savedEvent) {
            setFormEvent(savedEvent);
            setLoading(false);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormEvent({ ...formEvent, [name]: value });
    };

    const handleNavigate = (path) => {
        if (formEvent.eventSize && formEvent.eventType && formEvent.eventLocation && formEvent.eventDate) {
            handleSubmit();
            navigate(path);
        } else {
            alert("Por favor, preencha todos os campos antes de prosseguir.");
        }
    };    

    const handleSubmit = () => {
        localStorage.setItem('formEvent', JSON.stringify(formEvent));
    };

    if (loading) return <p>Carregando...</p>;

    return (
        <OrcamentoBase
            title="DETALHES DO EVENTO"
            subtotal={2000}
            nextPath="/orcamentopersonalizado2"
            prevPath="/"
            handleNavigate={handleNavigate}
            nextButtonText="PRÓXIMA ETAPA"
        >
            <FormularioDetalhesEvento
                formData={formEvent}
                handleChange={handleChange}
            />
            
        </OrcamentoBase>
    );
}

export default OrcamentoPersonalizado1;
