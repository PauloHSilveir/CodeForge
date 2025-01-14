import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import OrcamentoBase from "../components/OrcamentoBase";
import ListaDeSelecao from "../components/ListaSelecaoPersonalizado";

function OrcamentoPersonalizado4() {
    const navigate = useNavigate();

    const [foods, setFoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const savedFoods = JSON.parse(localStorage.getItem('foods'));
        if (savedFoods) {
            setFoods(savedFoods);
            setLoading(false);
        } else {
            fetchFoods();
        }
    }, []);

    const fetchFoods = async () => {
        try {
            const response = await fetch("http://localhost:3333/itens/foods");
            if (!response.ok) {
                throw new Error("Erro ao buscar comidas.");
            }
            const data = await response.json();
            setFoods(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const { render, subtotal } = ListaDeSelecao({ initialItems: foods });

    const handleSubmit = async (e) => {
        e.preventDefault();

        localStorage.setItem('formFood', JSON.stringify(foods));

        const formData = {
            formEvent: JSON.parse(localStorage.getItem('formEvent')),
            formProfessional: JSON.parse(localStorage.getItem('formProfessional')),
            formItem: JSON.parse(localStorage.getItem('formItem')),
            formFood: JSON.parse(localStorage.getItem('formFood')),

        };

        // Obtenha o token JWT do localStorage
        const token = localStorage.getItem("authToken");
        if (!token) {
            console.error("Token não encontrado. O usuário não está autenticado.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3333/pacotes/pacote_pers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                console.log("Dados enviados com sucesso!");
                localStorage.removeItem('formData');
                localStorage.removeItem('formEvent');
                localStorage.removeItem('formProfessional');
                localStorage.removeItem('formItem');
                localStorage.removeItem('formFood');
            } else {
                console.error("Erro ao enviar dados.");
            }
        } catch (error) {
            console.error("Erro na conexão com o servidor:", error);
        }
    };

    const handleNavigate = (path) => {
        handleSubmit();
        navigate(path);
    };

    if (loading) return <p>Carregando...</p>;
    if (error) return <p>Erro: {error}</p>;

    return (
        <OrcamentoBase
            title="SELECIONE AS COMIDAS"
            subtotal={subtotal}
            nextPath="/carrinho"
            prevPath="/orcamentopersonalizado3"
            handleNavigate={handleNavigate}
            nextButtonText="IR PARA O PAGAMENTO"
        >
            {render}
        </OrcamentoBase>
    );
}

export default OrcamentoPersonalizado4;