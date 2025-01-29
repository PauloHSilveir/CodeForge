import { useState, useEffect } from 'react';
import GerenciarGenerico from "../../../components/GerenciarGenerico";
import { RiMoneyDollarCircleLine } from "@remixicon/react";
import TransacaoIndividual from "../../../components/TransacaoIndividual";

function VisualizarHistoricoTransacoesADM() {
    const [transacoes, setTransacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransacoes = async () => {
            try {
                const response = await fetch('http://localhost:1313/transacao');
                if (!response.ok) {
                    throw new Error('Falha ao carregar as transações');
                }
                const data = await response.json();
                
                // Transform the API data to match the component's expected format
                const transformedData = data.map(transacao => ({
                    id: transacao.id,
                    valor: parseFloat(transacao.pagamento.valor),
                    data: new Date(transacao.data).toISOString().split('T')[0],
                    cliente: transacao.usuario.name,
                    status: transacao.pagamento.status,
                    metodoPagamento: transacao.pagamento.metodo_pagamento,
                    pacotes: transacao.transacao_pacotes.map(tp => ({
                        nome: tp.pacote.name,
                        quantidade: tp.quantidade_pacote,
                        preco: parseFloat(tp.pacote.preco)
                    }))
                }));

                setTransacoes(transformedData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransacoes();
    }, []);

    if (loading) {
        return <div>Carregando transações...</div>;
    }

    if (error) {
        return <div>Erro ao carregar transações: {error}</div>;
    }

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
                    metodoPagamento={transacao.metodoPagamento}
                    pacotes={transacao.pacotes}
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