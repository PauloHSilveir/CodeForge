import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "../styles/GerenciarItensTop.module.css";
import stylesDT from "../styles/DetalhesTransacao.module.css";
import { RiMoneyDollarCircleLine } from "@remixicon/react";
import Navbar from "../components/Navbar";
import packageImage from "../assets/images/Aniversario.png"

function DetalhesTransacao() {
    const navigate = useNavigate();
    const location = useLocation();

    const transacaoData = location.state?.transacaoData || {};

    if (!Object.keys(transacaoData).length) {
        navigate('/gerenciartransacoes');
        return null;
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
                        <span className={stylesDT.smallTextLight}>{transacaoData.id} - {transacaoData.data}</span>
                    </div>

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDarkOrange}>{transacaoData.status}.</span>
                    </div>

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDark}>Pagamento via Pix.</span>
                    </div>

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDark}>Nome do cliente:</span>
                        <span className={stylesDT.smallTextLight}>{transacaoData.cliente}</span>
                    </div>

                    {/*Toda vez que receber os pacotes envolvidos na transação, tem que imprimir essa div */}
                    <div className={stylesDT.transactionDetailsImage}>
                        <div>
                            <img src={packageImage} alt="Imagem do pacote" className={stylesDT.image} />
                        </div>
                        <div>
                            <span className={stylesDT.smallTextDark}>Pacote Decoração Pequeno</span><br />
                            <span className={stylesDT.smallTextLightNotMargin}>Quantidade: 1</span>
                        </div>
                    </div>

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDark}>Resumo do Pedido:</span><br />
                        <div>
                            <div className={stylesDT.transactionDetailsRow}>
                                <span className={stylesDT.smallTextLightNotMargin}>Subtotal do(s) item(ns):</span>
                                <span className={stylesDT.smallTextLightNotMargin}>R$ {transacaoData.valor}</span>
                            </div>
                            <div className={stylesDT.transactionDetailsRow}>
                                <span className={stylesDT.smallTextLightNotMargin}>Frete e Manuseio:</span>
                                <span className={stylesDT.smallTextLightNotMargin}>R$ 0.00</span>{/*Frete*/}
                            </div>
                            <div className={stylesDT.transactionDetailsRow}>
                                <span className={stylesDT.smallTextLightNotMargin}>Total:</span>
                                <span className={stylesDT.smallTextLightNotMargin}>R$ {transacaoData.valor}</span>{/*Total*/}
                            </div>
                            <div className={stylesDT.transactionDetailsRow}>
                                <span className={stylesDT.smallTextDark}>Total Geral:</span>
                                <span className={stylesDT.smallTextDark}>R$ {transacaoData.valor}</span>{/*Total Geral*/}
                            </div>
                        </div>
                    </div>

                    <div className={stylesDT.transactionDetails}>
                        <span className={stylesDT.smallTextDark}>Endereço: </span><br />
                        <span className={stylesDT.smallTextLightNotMargin}>Rua Salomão Pinheiro Costa 697</span><br />
                        <span className={stylesDT.smallTextLightNotMargin}>Higienópolis</span><br />
                        <span className={stylesDT.smallTextLightNotMargin}>São Paulo</span><br />
                        <span className={stylesDT.smallTextLightNotMargin}>Brasil</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalhesTransacao;
