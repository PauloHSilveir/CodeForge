import { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import stylesPerfil from "../styles/Perfil.module.css";
import stylesDT from "../styles/DetalhesTransacao.module.css";
import styles from "../styles/HistoricoTransacoesCliente.module.css";
import stylesGIT from "../styles/GerenciarItensTop.module.css";
import stylesCP from "../styles/ConfirmacaoPagamento.module.css"
import { RiShoppingCart2Line } from '@remixicon/react';
import { jwtDecode } from "jwt-decode";

function ConfirmacaoPagamento() {
    const navigate = useNavigate();
    const location = useLocation();
    const itensCarrinho = location.state?.itensCarrinho || [];
    const [pagamentos, setPagamentos] = useState([]);
    const [usuarioId, setUsuarioId] = useState(null);

    useEffect(() => {        
        const token = localStorage.getItem('authToken');
        const usuarioId = token ? jwtDecode(token).id : null;

        if (usuarioId, token) {
            setUsuarioId(parseInt(usuarioId));
            fetchPagamentos(parseInt(usuarioId));
        }
    }, []);

    const fetchPagamentos = async (userId, token) => {
        try {
            const response = await fetch('http://localhost:1313/pagamento', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            });
    
            if (!response.ok) {
                throw new Error("Erro ao buscar dados de pagamento.");
            }
    
            const data = await response.json();
    
            // Filtrar pagamentos pelo ID do usuário
            const userPagamentos = data.data.registros.filter(
                pagamento => pagamento.usuario_id === userId
            );

            const formattedData = userPagamentos.map((pagamento) => ({
                id: pagamento.id,
                asaas_payment_id: pagamento.asaas_payment_id 
                    ? pagamento.asaas_payment_id.replace(/^pay_/, '') 
                    : null,
                data: new Date(pagamento.data)
                    .toISOString()
                    .split("T")[0],
                metodo_pagamento: pagamento.metodo_pagamento,
                valor: parseFloat(pagamento.valor),
                status: pagamento.status,
            }));
            
            setPagamentos(formattedData);
        } catch (error) {
            console.error("Erro ao buscar dados de pagamento:", error.message);
        }
    };    

    const getStatusColor = (status) => {
        switch (status) {
            case "concluido":
                return "green";
            case "pendente":
                return "orange";
            case "atrasado":
                return "red";
            default:
                return "green";
        }
    };

    const generateAsaasPaymentLink = (paymentId) => {
        return paymentId ? `https://sandbox.asaas.com/i/${paymentId}` : null;
    };

    return (
        <div>
            <NavBar />
            <div className={`${stylesPerfil.container} ${stylesCP.container}`}>
                <div className={stylesPerfil.optionBox}>
                    <div className={stylesGIT.topTitle}>
                        <div className={stylesGIT.title}>
                            <RiShoppingCart2Line className={stylesGIT.blueIcon} />
                            <span className={stylesGIT.bigText}>RESUMO DO PEDIDO</span>
                        </div>
                        <button
                            className={stylesGIT.adicPac}
                            onClick={() => navigate('/consultarpacotes')}
                        >
                            VOLTAR PARA O CATÁLOGO
                        </button>
                    </div>

                    {pagamentos.map(pagamento => (
                        <div key={pagamento.id} className={`${stylesDT.detailsContainer} ${styles.detailsContainer}`}>
                            <div className={stylesDT.transactionDetails}>
                                <div className={styles.transacaoHeader}>
                                    <div>
                                        <span className={stylesDT.smallTextDark}>Pedido:</span>
                                        <span className={stylesDT.smallTextLight}>
                                            {pagamento.id} - {pagamento.data}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className={stylesDT.transactionDetails}>
                                <div className={`${stylesDT.smallTextDark} ${styles.transacaoStatus} ${styles[getStatusColor(pagamento.status)]}`}>
                                    <span>
                                        {pagamento.status === 'concluido' 
                                            ? 'Pagamento Realizado' 
                                            : 'Aguardando Confirmação'}
                                    </span>
                                </div>
                            </div>

                            <div className={stylesDT.transactionDetails}>
                                <span className={stylesDT.smallTextDark}>
                                    Pagamento via {pagamento.metodo_pagamento}:
                                </span>
                                <span className={stylesDT.smallTextLight}>
                                    R$ {pagamento.valor}
                                </span>
                            </div>

                            {pagamento.status !== 'concluido' && (
                                <div className={stylesDT.transactionDetails}>
                                    <a 
                                        href={generateAsaasPaymentLink(pagamento.asaas_payment_id)}
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className={styles.paymentLink}
                                    >
                                        Pagar {pagamento.metodo_pagamento.toUpperCase()} - R$ {pagamento.valor}
                                    </a>
                                </div>
                            )}
                        </div>
                    ))}

                    {itensCarrinho.map((pacote, index) => (
                        <div key={index} className={stylesDT.transactionDetailsImage}>
                            <div>
                                <img src={pacote.imagem} alt="Imagem do pacote" className={stylesDT.image} />
                            </div>
                            <div>
                                <span className={stylesDT.smallTextDark}>{pacote.nome}</span><br />
                                <span className={stylesDT.smallTextLightNotMargin}>Quantidade: {pacote.quantidade}</span><br />
                                <span className={stylesDT.smallTextLightNotMargin}>Preço: {pacote.preco}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default ConfirmacaoPagamento;