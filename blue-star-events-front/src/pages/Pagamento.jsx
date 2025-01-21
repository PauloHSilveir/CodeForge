import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import OrcamentoBase from "../components/OrcamentoBase";
import { RiBankCardLine } from "@remixicon/react";
import styles from "../styles/Pagamento.module.css";

function Pagamento() {
    const navigate = useNavigate();
    const location = useLocation();
    const subtotal = location.state?.subtotal || 0;
    const itensCarrinho = location.state?.itensCarrinho || [];


    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

    const handleNavigate = (path) => {
        navigate(path, {
            state: {
                subtotal,
                itensCarrinho,
                selectedPaymentMethod
            }
        });
    };

    const handlePaymentSelection = (method) => {
        setSelectedPaymentMethod((prevMethod) => (prevMethod === method ? "" : method));
    };

    return (
        <div>
            <Navbar />
            <OrcamentoBase
                title="FORMA DE PAGAMENTO"
                subtotal={subtotal}
                IconDetails={RiBankCardLine}
                nextPath="/confirmacaopagamento"
                prevPath="/carrinho"
                handleNavigate={handleNavigate}
                nextButtonText="CONFIRMAR PAGAMENTO"
                prevButtonText="VOLTAR"
            >

                <div className={styles.pagamentoOpcoes}>
                    <div className={styles.opcaoPagamento}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="formaPagamento"
                                value="credito"
                                onChange={() => handlePaymentSelection("credito")}
                                checked={selectedPaymentMethod === "credito"}
                                className={styles.radioInput}
                            />
                            <span>Cartão de Crédito</span>
                        </label>
                        {selectedPaymentMethod === "credito" && (
                            <div className={`${styles.formularioPagamento} ${styles.show}`}>
                                <form>
                                    <h3 className={styles.formTitle}>Preencha os dados do Cartão de Crédito</h3>
                                    <div>
                                        <label>Número do Cartão:</label>
                                        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" />
                                    </div>
                                    <div>
                                        <label>Nome do Titular:</label>
                                        <input type="text" placeholder="Nome completo" />
                                    </div>
                                    <div>
                                        <label>Validade:</label>
                                        <input type="text" placeholder="MM/AA" />
                                    </div>
                                    <div>
                                        <label>CVV:</label>
                                        <input type="text" placeholder="XXX" />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>
                    <div className={styles.opcaoPagamento}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="formaPagamento"
                                value="boleto"
                                onChange={() => handlePaymentSelection("boleto")}
                                checked={selectedPaymentMethod === "boleto"}
                                className={styles.radioInput}
                            />
                            <span>Boleto Bancário</span>
                        </label>
                        {selectedPaymentMethod === "boleto" && (
                            <div className={`${styles.formularioPagamento} ${styles.show}`}>
                                <h3 className={styles.formTitle}>Você selecionou Boleto Bancário</h3>
                                <p className={styles.formInfo}>O boleto será gerado após a confirmação do pagamento.</p>
                            </div>
                        )}
                    </div>
                    <div className={styles.opcaoPagamento}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="formaPagamento"
                                value="pix"
                                onChange={() => handlePaymentSelection("pix")}
                                checked={selectedPaymentMethod === "pix"}
                                className={styles.radioInput}
                            />
                            <span>PIX</span>
                        </label>
                        {selectedPaymentMethod === "pix" && (
                            <div className={`${styles.formularioPagamento} ${styles.show}`}>
                                <h3 className={styles.formTitle}>Você selecionou PIX</h3>
                                <p className={styles.formInfo}>O QR Code será exibido na próxima etapa.</p>
                            </div>
                        )}
                    </div>
                </div>
            </OrcamentoBase>
        </div>
    );
}

export default Pagamento;
