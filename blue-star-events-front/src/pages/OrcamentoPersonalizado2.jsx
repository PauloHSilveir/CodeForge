import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrcamentoBase from "../components/OrcamentoBase";
import ListaDeSelecao from "../components/ListaSelecaoPersonalizado";

function OrcamentoPersonalizado2() {
    const navigate = useNavigate();

    const [professionals, setProfessionals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedProfessionals = JSON.parse(localStorage.getItem('professionals'));
        if (savedProfessionals) {
            setProfessionals(savedProfessionals);
            setLoading(false);
        } else {
            fetchProfessionals();
        }
    }, []);

    const fetchProfessionals = async () => {
        try {
            const response = await fetch("http://localhost:3333/itens/professionals");
            if (!response.ok) {
                throw new Error("Erro ao buscar profissionais");
            }
            const data = await response.json();
            setProfessionals(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const { render, subtotal } = ListaDeSelecao({ initialItems: professionals });

    const handleSubmit = () => {
        localStorage.setItem("formProfessional", JSON.stringify(professionals));
    };

    const handleNavigate = (path) => {
        handleSubmit();
        navigate(path);
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <OrcamentoBase
            title="ESCOLHA OS PROFISSIONAIS"
            subtotal={subtotal}
            nextPath="/orcamentopersonalizado3"
            prevPath="/orcamentopersonalizado1"
            handleNavigate={handleNavigate}
            nextButtonText="PRÓXIMA ETAPA"
        >
            {render}
        </OrcamentoBase>
    );
}

export default OrcamentoPersonalizado2;
