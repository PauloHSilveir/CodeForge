import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../../../styles/GerenciarItensTop.module.css";
import stylesDT from "../../../styles/DetalhesTransacao.module.css";
import { RiMoneyDollarCircleLine } from "@remixicon/react";
import Navbar from "../../../components/Navbar";
import packageImage from "../../../assets/images/Aniversario.png";

const BASE_URL = "http://localhost:1313";

function DetalhesTransacao() {
    const navigate = useNavigate();
    const location = useLocation();
    const [transacao, setTransacao] = useState(null);
    const token = localStorage.getItem('authToken');
    const id = location.state?.transacaoData.id;
    const valor = location.state?.transacaoData.valor;
    const data = location.state?.transacaoData.data;

    useEffect(() => {
        if (id) {
            fetchTransacao(id);
        } else {
            navigate('/gerenciartransacoes');
        }
    }, [location.state, navigate]);

    const fetchTransacao = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/transacao/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar os detalhes da transação');
            }

            const data = await response.json();

            const formattedData = {
                id: data.id,
                data: new Date(data.data).toLocaleDateString('pt-BR'),
                status: mapStatusFromBackend(data.pagamento.status),
                metodoPagamento: data.pagamento.metodo_pagamento,
                valor: parseFloat(data.pagamento.valor).toFixed(2),
                cliente: data.usuario.name,
                evento: {
                    data: new Date(data.evento.data).toLocaleDateString('pt-BR'),
                    rua: data.evento.rua,
                    numero: data.evento.numero,
                    complemento: data.evento.complemento,
                    bairro: data.evento.bairro,
                    cidade: data.evento.cidade,
                    estado: data.evento.estado,
                    cep: data.evento.cep
                },
                pacotes: data.pacotes.map(pacote => ({
                    nome: pacote.nome,
                    quantidade: pacote.quantidade,
                    image: packageImage,
                    valor: parseFloat(pacote.preco).toFixed(2) // Garantindo que o valor seja um número com 2 casas decimais
                }))
            };

            setTransacao(formattedData);
        } catch (error) {
            console.error('Erro ao buscar a transação:', error);
            navigate('/gerenciartransacoes');
        }
    };

    const mapStatusFromBackend = (status) => {
        switch (status) {
            case 'concluido':
                return 'Concluído';
            case 'pendente':
                return 'Pendente';
            case 'cancelado':
                return 'Cancelado';
            default:
                return status;
        }
    };

    const calcularSubtotal = (pacotes) => {
        return pacotes.reduce((total, pacote) =>
            total + (parseFloat(pacote.valor) * pacote.quantidade), 0
        ).toFixed(2);
    };

    if (!transacao) {
        return (
            <div>
                <Navbar />
                <div className={stylesDT.container}>
                    <p>Carregando detalhes da transação...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <div className={stylesDT.container}>
                <div className={styles.topTitle}>
                    <div className={styles.title}>
                        <RiMoneyDollarCircleLine className={styles.blueIcon} />
                        <span className={styles.bigText}>DETALHES DA TRANSAÇÃO</span>
                    </div>
                    <button
                        className={styles.adicPac}
                        onClick={() => navigate('/gerenciartransacoes')}
                    >
                        VOLTAR
                    </button>
                </div>

                <div className={stylesDT.detailsContainer}>
                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDark}>Transação:</span>
                        <span className={stylesDT.smallTextLight}>{transacao.id} - {data}</span>
                    </div>

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDarkOrange}>{transacao.status}.</span>
                    </div>

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDark}>Pagamento via {transacao.metodoPagamento}.</span>
                    </div>

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDark}>Nome do cliente:</span>
                        <span className={stylesDT.smallTextLight}>{transacao.cliente}</span>
                    </div>

                    {transacao.pacotes.map((pacote, index) => (
                        <div key={index} className={stylesDT.transactionDetailsImage}>
                            <div>
                                <img src={packageImage} alt="Imagem do pacote" className={stylesDT.image} />
                            </div>
                            <div>
                                <span className={stylesDT.smallTextDark}>{pacote.nome}</span><br />
                                <span className={stylesDT.smallTextLightNotMargin}>Quantidade: {pacote.quantidade}</span><br />
                                <span className={stylesDT.smallTextLightNotMargin}>Valor: R$ {pacote.valor}</span>
                            </div>
                        </div>
                    ))}

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDark}>Resumo do Pedido:</span><br />
                        <div>
                            <div className={stylesDT.transactionDetailsRow}>
                                <span className={stylesDT.smallTextLightNotMargin}>Subtotal do(s) item(ns):</span>
                                <span className={stylesDT.smallTextLightNotMargin}>R$ {calcularSubtotal(transacao.pacotes)}</span>
                            </div>
                            <div className={stylesDT.transactionDetailsRow}>
                                <span className={stylesDT.smallTextLightNotMargin}>Frete e Manuseio:</span>
                                <span className={stylesDT.smallTextLightNotMargin}>R$ 0,00</span>
                            </div>
                            <div className={stylesDT.transactionDetailsRow}>
                                <span className={stylesDT.smallTextLightNotMargin}>Total:</span>
                                <span className={stylesDT.smallTextLightNotMargin}>R$ {calcularSubtotal(transacao.pacotes)}</span>
                            </div>
                            <div className={stylesDT.transactionDetailsRow}>
                                <span className={stylesDT.smallTextDark}>Total Geral:</span>
                                <span className={stylesDT.smallTextDark}>R$ {calcularSubtotal(transacao.pacotes)}</span>
                            </div>
                        </div>
                    </div>

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDark}>Endereço do Evento: </span><br />
                        <span className={stylesDT.smallTextLightNotMargin}>
                            {transacao.evento.rua}, {transacao.evento.numero}
                            {transacao.evento.complemento && `, ${transacao.evento.complemento}`}
                        </span><br />
                        <span className={stylesDT.smallTextLightNotMargin}>{transacao.evento.bairro}</span><br />
                        <span className={stylesDT.smallTextLightNotMargin}>
                            {transacao.evento.cidade} - {transacao.evento.estado}
                        </span><br />
                        <span className={stylesDT.smallTextLightNotMargin}>CEP: {transacao.evento.cep}</span><br />
                        <span className={stylesDT.smallTextDark}>Data do Evento: </span>
                        <span className={stylesDT.smallTextLightNotMargin}>{transacao.evento.data}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalhesTransacao;