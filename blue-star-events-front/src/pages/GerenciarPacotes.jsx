import { useEffect, useState } from "react";
import GerenciarGenerico from "../components/GerenciarGenerico";
import PacoteIndividual from "../components/PacoteIndividual";
import { RiBox3Line } from "@remixicon/react";
import packageImage1 from "../assets/images/Aniversario.png";
import packageImage2 from "../assets/images/Casamento.png";

const BASE_URL = "http://localhost:1313";

function GerenciarPacotes() {
    const [pacotes, setPacotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const token = localStorage.getItem('authToken');
    
    useEffect(() => {
        fetchPacotes();
    }, []);

    const fetchPacotes = async () => {
        try {
            const response = await fetch(`${BASE_URL}/pacote`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (!response.ok) {
                throw new Error("Erro ao buscar dados dos pacotes.");
            }
            const data = await response.json();

            const formattedData = data.map((pacote) => ({
                id: pacote.id,
                nome: pacote.name,
                description: pacote.description,
                tamanho: pacote.tamanho,
                valor: pacote.preco,
                imagem: pacote.imagem,
            }));

            setPacotes(formattedData);
        } catch (err) {
            console.error("Erro ao buscar pacotes:", err);
            setError("Erro ao carregar pacotes.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Carregando pacotes...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleDeletePacote = (id) => {

        setPacotes((prevPacotes) =>
            prevPacotes.filter((pacote) => pacote.id !== id)
        );
    };

    return (
        <GerenciarGenerico
            dados={pacotes}
            renderItem={(pacote) => (
                <PacoteIndividual
                    key={pacote.id}
                    {...pacote}
                    onDelete={handleDeletePacote}
                />
            )}
            icone={RiBox3Line}
            titulo="PACOTES CADASTRADOS"
            placeholder="Pesquisar pacotes"
            buttonText="ADICIONAR PACOTE"
            buttonLink="/cadastrarpacotes1"
            itensPorPagina={12}
            noItensFound="Nenhum pacote encontrado."
            campoPesquisa="nome"
        />
    );
}

export default GerenciarPacotes;
