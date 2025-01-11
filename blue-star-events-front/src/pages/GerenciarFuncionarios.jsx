import GerenciarGenerico from "../components/GerenciarGenerico";
import { RiUser3Line } from "@remixicon/react"; 
import FuncionarioIndividual from "../components/FuncionarioIndividual";

// Dados mockados
const funcionarios = [
    { id: 1, nome: "Gabriel Jardim de Souza", email: "gabriel@email.com", celular: "33999887766", tipo: "Administrador"},
    { id: 2, nome: "Paulo Henrique Dos Anjos Silveira", email: "paulo@email.com", celular: "35999776611", tipo: "Funcionário"},
    { id: 3, nome: "Thiago Ferreira Azevedo", email: "thiago@email.com", celular: "35999665511", tipo: "Funcionário"},
];

function GerenciarFuncionarios() {
    return (
        <GerenciarGenerico
            dados={funcionarios}
            renderItem={(funcionario) => (
                <FuncionarioIndividual
                    key={funcionario.id}
                    nome={funcionario.nome}
                    email={funcionario.email}
                    celular={funcionario.celular}
                    tipo={funcionario.tipo}
                />
            )}
            icone={RiUser3Line}
            titulo="FUNCIOÁRIOS CADASTRADOS"
            placeholder="Pesquisar funcionários"
            buttonText="ADICIONAR FUNCIONÁRIOS"
            buttonLink="/gerenciarfuncionarios"
            itensPorPagina={30}
            noItensFound="Nenhuma funcionário encontrado."
            campoPesquisa="nome"
        />
    );
}

export default GerenciarFuncionarios;
