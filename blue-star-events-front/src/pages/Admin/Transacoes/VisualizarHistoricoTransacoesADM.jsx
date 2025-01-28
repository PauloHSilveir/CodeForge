import GerenciarGenerico from "../../../components/GerenciarGenerico";
import { RiMoneyDollarCircleLine } from "@remixicon/react"; 
import TransacaoIndividual from "../../../components/TransacaoIndividual";

// Dados mockados
const transacoes = [
    { id: 1, valor: 571847.56, data: "2024-12-21", cliente: "João Marcos da Silva Guedes", status: "Pendente"},
    { id: 2, valor: 864.31, data: "2024-12-17", cliente: "Otávio Melo Ribeiro", status: "concluido"},
];

function VisualizarHistoricoTransacoesADM() {
    return (
        <GerenciarGenerico
            dados={transacoes}
            renderItem={(transacao) => (
                <TransacaoIndividual
                    key={transacao.id}
                    id={transacao.id}
                    valor={transacao.valor}
                    data={transacao.data}
                    cliente={transacao.cliente}
                    status={transacao.status}
                />
            )}
            icone={RiMoneyDollarCircleLine}
            titulo="HISTÓRICO DE TRANSAÇÕES"
            placeholder="Pesquisar transações"
            buttonText="VOLTAR"
            buttonLink="/gerenciarsistema"
            itensPorPagina={30}
            noItensFound="Nenhuma transação encontrada."
            campoPesquisa="cliente"
        />
    );
}

export default VisualizarHistoricoTransacoesADM;
