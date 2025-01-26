import GerenciarGenerico from "../components/GerenciarGenerico";
import { RiUser3Line } from "@remixicon/react";
import FuncionarioIndividual from "../components/FuncionarioIndividual";
import { useState, useEffect } from "react";

const BASE_URL = "http://localhost:1313";

function GerenciarFuncionarios() {
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        fetchFuncionarios();
    }, []);

    const fetchFuncionarios = async () => {
        try {
            const response = await fetch(`${BASE_URL}/admin`);
            if (!response.ok) {
                throw new Error("Erro ao buscar dados dos funcionários.");
            }
            const data = await response.json();

            const formattedData = data.map((funcionario) => ({
                id: funcionario.id,
                name: funcionario.name,
                email: funcionario.email,
                phone: funcionario.phone,
                data_admissao: new Date(funcionario.admin.data_admissao)
                    .toISOString()
                    .split("T")[0],
            }));

            console.log("Dados formatados:", formattedData);
            setFuncionarios(formattedData);
        } catch (error) {
            console.error("Erro ao buscar dados dos funcionários:", error.message);
        }
    };

    const handleDeleteFuncionario = (id) => {
        // Atualiza o estado para remover o funcionário excluído
        setFuncionarios((prevFuncionarios) =>
            prevFuncionarios.filter((funcionario) => funcionario.id !== id)
        );
    };

    return (
        <GerenciarGenerico
            dados={funcionarios}
            renderItem={(funcionario) => (
                <FuncionarioIndividual
                    key={funcionario.id}
                    id={funcionario.id}
                    nome={funcionario.name}
                    email={funcionario.email}
                    celular={funcionario.phone}
                    data_admissao={funcionario.data_admissao}
                    onDelete={handleDeleteFuncionario}
                />
            )}
            icone={RiUser3Line}
            titulo="ADMINISTRADORES CADASTRADOS"
            placeholder="Pesquisar administrador"
            buttonText="ADICIONAR ADMINISTRADORES"
            buttonLink="/cadastrarfuncionario"
            itensPorPagina={30}
            noItensFound="Nenhum administrador encontrado."
            campoPesquisa="name"
        />
    );
}

export default GerenciarFuncionarios;
