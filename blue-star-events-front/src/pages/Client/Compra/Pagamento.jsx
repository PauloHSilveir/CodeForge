import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../../../components/Navbar";
import OrcamentoBase from "../../../components/OrcamentoBase";
import { RiBankCardLine } from "@remixicon/react";
import styles from "../../../styles/Pagamento.module.css";
import { jwtDecode } from 'jwt-decode';

function Pagamento() {
    const navigate = useNavigate();
    const location = useLocation();
    const subtotal = location.state?.subtotal || 0;
    const itensCarrinho = location.state?.itensCarrinho || [];
    const eventData = location.state?.eventData;

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [cardData, setCardData] = useState({
        nomeCartao: '',
        numeroCartao: '',
        mesValidade: '',
        anoValidade: '',
        cvv: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Recupera o token e ID do usuário
    const token = localStorage.getItem('authToken');
    const usuarioId = token ? jwtDecode(token).id : null;

    const handlePaymentSelection = (method) => {
        setSelectedPaymentMethod((prevMethod) => (prevMethod === method ? "" : method));
    };

    const handleCardDataChange = (e) => {
        const { id, value } = e.target;
        setCardData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const processPayment = async () => {
        setLoading(true);
        setError(null);

        try {
            if (!selectedPaymentMethod) {
                setError('Selecione um método de pagamento');
                return;
            }

            const paymentData = {
                usuario_id: usuarioId,
                metodo_pagamento: selectedPaymentMethod,
                valor: subtotal
            };

            if (selectedPaymentMethod === 'cartao_credito') {
                paymentData.nomeCartao = cardData.nomeCartao;
                paymentData.numeroCartao = cardData.numeroCartao.replace(/\D/g, '');
                paymentData.mesValidade = cardData.mesValidade;
                paymentData.anoValidade = cardData.anoValidade;
                paymentData.cvv = cardData.cvv;
            }

            // 1. Process Payment
            const paymentResponse = await fetch('http://localhost:1313/pagamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(paymentData)
            });

            if (!paymentResponse.ok) {
                throw new Error('Erro ao processar pagamento');
            }

            const paymentResult = await paymentResponse.json();
            const pagamentoId = paymentResult.data.pagamento.id;

            // 2. Create Event
            const eventoData = {
                data: eventData.dataEvento,
                rua: eventData.endereco.rua,
                numero: eventData.endereco.numero,
                complemento: eventData.endereco.complemento,
                bairro: eventData.endereco.bairro,
                cidade: eventData.endereco.cidade,
                estado: eventData.endereco.estado,
                cep: eventData.endereco.cep
            };
            console.log(eventoData);

            const eventResponse = await fetch('http://localhost:1313/evento/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(eventoData)
            });

            if (!eventResponse.ok) {
                throw new Error('Erro ao criar evento');
            }

            const eventResult = await eventResponse.json();
            console.log(eventResult);
            const eventoId = eventResult.event.id; // Assuming the API returns the event ID

            // 3. Create Transaction
            const transactionData = {
                usuario_id: usuarioId,
                pagamento_id: pagamentoId,
                evento_id: eventoId,
                pacotes: itensCarrinho.map(item => ({
                    pacote_id: Number(item.pacote_id),
                    quantidade_pacote: Number(item.quantidade)
                }))                
            };
            console.log(transactionData);
            const transactionResponse = await fetch('http://localhost:1313/transacao/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(transactionData)
            });

            if (!transactionResponse.ok) {
                throw new Error('Erro ao criar transação');
            }

            // If everything is successful, navigate to confirmation page
            navigate('/confirmacaopagamento', {
                state: {
                    subtotal,
                    itensCarrinho,
                    selectedPaymentMethod,
                    paymentDetails: paymentResult,
                    eventData
                }
            });

        } catch (err) {
            setError(err.message || 'Erro ao processar operação');
            console.error('Erro:', err);
        } finally {
            setLoading(false);
        }
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
                handleNavigate={processPayment}
                nextButtonText="CONFIRMAR PAGAMENTO"
                prevButtonText="VOLTAR"
            >
                {error && (
                    <div className={styles.errorMessage}>
                        {error}
                    </div>
                )}

                <div className={styles.pagamentoOpcoes}>
                    {/* Opção Cartão de Crédito */}
                    <div className={styles.opcaoPagamento}>
                        <label className={styles.radioLabel}>
                            <input
                                type="radio"
                                name="formaPagamento"
                                value="credito"
                                onChange={() => handlePaymentSelection("cartao_credito")}
                                checked={selectedPaymentMethod === "cartao_credito"}
                                className={styles.radioInput}
                            />
                            <span>Cartão de Crédito</span>
                        </label>
                        {selectedPaymentMethod === "cartao_credito" && (
                            <div className={`${styles.formularioPagamento} ${styles.show}`}>
                                <form>
                                    <h3 className={styles.formTitle}>Preencha os dados do Cartão de Crédito</h3>
                                    <div>
                                        <label htmlFor="numeroCartao">Número do Cartão:</label>
                                        <input
                                            type="text"
                                            id="numeroCartao"
                                            placeholder="XXXX-XXXX-XXXX-XXXX"
                                            required
                                            pattern="\d{4}-\d{4}-\d{4}-\d{4}"
                                            title="Insira um número de cartão válido no formato XXXX-XXXX-XXXX-XXXX"
                                            value={cardData.numeroCartao}
                                            onChange={handleCardDataChange}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="nomeCartao">Nome do Titular:</label>
                                        <input
                                            type="text"
                                            id="nomeCartao"
                                            placeholder="Nome completo"
                                            required
                                            pattern="^[a-zA-ZÀ-ÿ\s]+$"
                                            title="Insira um nome válido (apenas letras e espaços)"
                                            value={cardData.nomeCartao}
                                            onChange={handleCardDataChange}
                                        />
                                    </div>
                                    <div>
                                        <label>Validade:</label>
                                        <div style={{ display: "flex", gap: "10px" }}>
                                            <input
                                                type="text"
                                                id="mesValidade"
                                                placeholder="MM"
                                                required
                                                pattern="^(0[1-9]|1[0-2])$"
                                                title="Insira um mês válido (01 a 12)"
                                                value={cardData.mesValidade}
                                                onChange={handleCardDataChange}
                                            />
                                            <input
                                                type="text"
                                                id="anoValidade"
                                                placeholder="AAAA"
                                                required
                                                pattern="^\d{4}$"
                                                title="Insira um ano válido no formato AAAA"
                                                value={cardData.anoValidade}
                                                onChange={handleCardDataChange}
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="cvv">CVV:</label>
                                        <input
                                            type="text"
                                            id="cvv"
                                            placeholder="XXX"
                                            required
                                            pattern="^\d{3}$"
                                            title="Insira um CVV válido (3 dígitos)"
                                            value={cardData.cvv}
                                            onChange={handleCardDataChange}
                                        />
                                    </div>
                                </form>
                            </div>
                        )}
                    </div>

                    {/* Opção Boleto */}
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

                    {/* Opção PIX */}
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

                    {loading && (
                        <div className={styles.loadingOverlay}>
                            Processando pagamento...
                        </div>
                    )}
                </div>
            </OrcamentoBase>
        </div>
    );
}

export default Pagamento;