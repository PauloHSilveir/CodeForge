import { useNavigate } from "react-router-dom";
import OrcamentoBase from "../components/OrcamentoBase";
import ListaDeSelecao from "../components/ListaSelecaoPersonalizado";

function OrcamentoPersonalizado2() {
    const navigate = useNavigate();

    const professionals = [
        { id: 1, name: "CERIMONIALISTA", price: 4500 },
        { id: 2, name: "DECORADOR", price: 3500 },
        { id: 3, name: "CHEFE DE COZINHA", price: 5000 },
        { id: 4, name: "GARÇOM", price: 1200 },
        { id: 5, name: "BARTENDER", price: 1500 },
        { id: 6, name: "DJ", price: 3000 },
        { id: 7, name: "BANDA MUSICAL", price: 8000 },
        { id: 8, name: "FOTÓGRAFO", price: 2500 },
        { id: 9, name: "VIDEOMAKER", price: 3000 },
        { id: 10, name: "SEGURANÇA", price: 1000 },
        { id: 11, name: "RECEPCIONISTA", price: 800 },
        { id: 12, name: "MOTORISTA", price: 900 },
        { id: 13, name: "FAXINEIRO", price: 700 }
    ];   

    const { render, subtotal } = ListaDeSelecao({ initialItems: professionals });

    const handleNavigate = (path) => {
        navigate(path);
    };

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
