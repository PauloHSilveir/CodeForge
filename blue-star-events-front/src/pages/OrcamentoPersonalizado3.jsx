import { useNavigate } from "react-router-dom";
import OrcamentoBase from "../components/OrcamentoBase";
import ListaDeSelecao from "../components/ListaSelecaoPersonalizado";

function OrcamentoPersonalizado3() {
    const navigate = useNavigate();

    const items = [
        { id: 1, name: "MESA", price: 50 },
        { id: 2, name: "CADEIRA", price: 25 },
        { id: 3, name: "TENDA", price: 500 },
        { id: 4, name: "TALHERES", price: 2 },
        { id: 5, name: "TOALHA DE MESA", price: 20 },
        { id: 6, name: "ARRANJOS DECORATIVOS", price: 150 },
        { id: 7, name: "ILUMINAÇÃO", price: 300 },
        { id: 8, name: "SOM E MICROFONES", price: 400 },
        { id: 9, name: "PISTA DE DANÇA", price: 600 },
        { id: 10, name: "MÁQUINA DE FUMAÇA", price: 200 },
        { id: 11, name: "VENTILADORES", price: 80 },
        { id: 12, name: "PALCO", price: 800 },
        { id: 13, name: "GERADOR DE ENERGIA", price: 1000 },
        { id: 14, name: "CABINE DE FOTOS", price: 500 }
    ];

    const { render, subtotal } = ListaDeSelecao({ initialItems: items });

    const handleNavigate = (path) => {
        navigate(path);
    };

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
