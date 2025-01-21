import NavBar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import stylesPerfil from "../styles/Perfil.module.css";
import stylesDT from "../styles/DetalhesTransacao.module.css";
import styles from "../styles/HistoricoTransacoesCliente.module.css";
import stylesGIT from "../styles/GerenciarItensTop.module.css";
import stylesCP from "../styles/ConfirmacaoPagamento.module.css"
import { RiShoppingCart2Line } from '@remixicon/react';

function ConfirmacaoPagamento() {
    const navigate = useNavigate();
    const location = useLocation();
    const subtotal = location.state?.subtotal || 0;
    const itensCarrinho = location.state?.itensCarrinho || [];
    const selectedPaymentMethod = location.state?.selectedPaymentMethod || '';
    const dataAtual = new Date();

    const dia = dataAtual.getDate().toString().padStart(2, '0');
    const mes = (dataAtual.getMonth() + 1).toString().padStart(2, '0');
    const ano = dataAtual.getFullYear();

    const dataFormatada = `${dia}/${mes}/${ano}`;

    const handleNavigate = (path) => {
        navigate(path);
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Realizado":
                return "orange";
            case "Aguardando Pagamento":
                return "red";
            default:
                return "green";
        }
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

                    <div className={`${stylesDT.detailsContainer} ${styles.detailsContainer}`}>
                        <div className={stylesDT.transactionDetails}>
                            <div className={styles.transacaoHeader}>
                                <div>
                                    <span className={stylesDT.smallTextDark}>
                                        Pedido:
                                    </span>
                                    {/*Ajustar ID */}
                                    <span className={stylesDT.smallTextLight}>
                                        000151 - {dataFormatada}
                                    </span>
                                </div>

                            </div>
                        </div>
                        <div className={stylesDT.transactionDetails}>
                            <div className={`${stylesDT.smallTextDark} ${styles.transacaoStatus} ${styles[getStatusColor("Realizado")]}`}>
                                <span>
                                    Pedido Realizado.
                                </span>
                            </div>
                        </div>


                        <div className={stylesDT.transactionDetails}>
                            <span className={stylesDT.smallTextDark}>
                                Pagamento via {selectedPaymentMethod}:
                            </span>
                            <span className={stylesDT.smallTextLight}>
                                R$ {subtotal.toFixed(2)}
                            </span>
                        </div>

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
        </div>
    );
}

export default ConfirmacaoPagamento;
