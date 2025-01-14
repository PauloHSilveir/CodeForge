import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrcamentoBase from "../components/OrcamentoBase";
import ListaDeSelecao from "../components/ListaSelecaoPersonalizado";

function OrcamentoPersonalizado3() {
    const navigate = useNavigate();

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedItems = JSON.parse(localStorage.getItem('items'));
        if (savedItems) {
            setItems(savedItems);
            setLoading(false);
        } else {
            fetchItems();
        }
    }, []);

    const fetchItems = async () => {
        try {
            const response = await fetch("http://localhost:3333/itens/items");
            if (!response.ok) {
                throw new Error("Erro ao buscar profissionais");
            }
            const data = await response.json();
            setItems(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const { render, subtotal } = ListaDeSelecao({ initialItems: items });

    const handleSubmit = () => {
        localStorage.setItem("formItem", JSON.stringify(items));
    };

    const handleNavigate = (path) => {
        handleSubmit();
        navigate(path);
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <OrcamentoBase
            title="ESCOLHA OS ITENS DO EVENTO"
            subtotal={subtotal}
            nextPath="/orcamentopersonalizado4"
            prevPath="/orcamentopersonalizado2"
            handleNavigate={handleNavigate}
            nextButtonText="PRÓXIMA ETAPA"
        >
            {render}
        </OrcamentoBase>
    );
}

export default OrcamentoPersonalizado3;
