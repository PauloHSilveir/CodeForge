import React, { useState, useEffect } from 'react';
import NavBar from "../../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import ModalExcluir from "../../../components/ModalExcluir";
import ModalMensagemSucesso from "../../../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../../../components/ModalMensagemFalha";
import stylesPerfil from "../../../styles/Perfil.module.css";
import stylesDT from "../../../styles/DetalhesTransacao.module.css";
import styles from "../../../styles/HistoricoTransacoesCliente.module.css";
import stylesPI from "../../../styles/PacoteIndividual.module.css";
import stylesGIT from "../../../styles/GerenciarItensTop.module.css";
import iconImage from "../../../assets/images/iconPerfil.png";
import { RiShoppingCart2Line, RiMailFill } from '@remixicon/react';
import { jwtDecode } from 'jwt-decode';
import packageImage from "../../../assets/images/Aniversario.png";

const BASE_URL = "http://localhost:1313";

function DetalhesPedido() {
    const navigate = useNavigate();
    const location = useLocation();

    const [transacao, setTransacao] = useState(null);

    const [isModalOpen, setModalOpen] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [userData, setUserData] = useState({
        nome: 'Usuário',
        email: 'email@exemplo.com'
    });

    const token = localStorage.getItem('authToken');
    const userId = token ? jwtDecode(token).id : null;


    useEffect(() => {
        const fetchUserData = async () => {
            if (userId && token) {
                try {
                    const response = await fetch(`${BASE_URL}/user/${userId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao buscar dados do usuário');
                    }

                    const data = await response.json();

                    // Acessando os dados dentro do objeto user
                    setUserData({
                        nome: data.user.name || 'Usuário',
                        email: data.user.email || 'email@exemplo.com'
                    });

                } catch (error) {
                    console.error('Erro ao buscar dados do usuário:', error);
                }
            }
        };

        fetchUserData();
    }, [userId, token]);

    useEffect(() => {
        if (location.state?.idTransacao) {
            fetchTransacao(location.state.idTransacao);
        }
    }, [location.state]);


    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            setUserData({
                nome: decodedToken.nome || 'Usuário',
                email: decodedToken.email || 'email@exemplo.com'
            });
        }
    }, [token]);

    const mapStatusFromBackend = (status) => {
        switch (status) {
            case 'completa':
                return 'Concluída';
            case 'pendente':
                return 'Pendente';
            case 'falha':
                return 'Cancelada';
            default:
                return status;
        }
    };

    const fetchTransacao = async (idTransacao) => {
        try {
            const response = await fetch(`${BASE_URL}/transacao/${idTransacao}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar os detalhes da transação.');
            }

            const data = await response.json();

            // Formatando os dados recebidos
            const formattedData = {
                id: data.id,
                data: new Date(data.data_criacao).toLocaleDateString('pt-BR'),
                status: mapStatusFromBackend(data.pagamento.status),
                pagamento: data.pagamento.metodo_pagamento,
                valor: data.pagamento.valor,
                usuario: {
                    nome: data.usuario.nome,
                    email: data.usuario.email
                },
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
                    valor: pacote.preco
                }))
            };

            setTransacao(formattedData);
        } catch (error) {
            console.error('Erro ao buscar a transação:', error);
        }
    };

    const openModal = (orderId) => {
        setSelectedOrder(orderId);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    // Update the handleDelete function to use the API
    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/transacao/delete/${selectedOrder}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao cancelar transação');
            }

            setShowSucess(true);

            setTimeout(() => {
                setShowSucess(false);
                setModalOpen(false);
                navigate("/historicotransacoes");
            }, 3000);
        } catch (error) {
            console.error("Erro ao cancelar transação:", error);
            setShowFail(true);

            setTimeout(() => {
                setShowFail(false);
            }, 3000);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Concluído":
                return "green";
            case "Realizado":
                return "orange";
            case "Cancelado":
                return "red";
            default:
                return "black";
        }
    };
    const calcularSubtotal = (pacotes) => {
        return pacotes.reduce((total, pacote) => total + (pacote.valor * pacote.quantidade), 0);
    };


    if (!transacao) {
        return (
            <div>
                <NavBar />
                <div className={stylesPerfil.container}>
                    <div className={stylesPerfil.PerfilBox}>
                        <p>Transação não encontrada. Retorne à página anterior.</p>
                        <button
                            className={stylesGIT.adicPac}
                            onClick={() => navigate('/historicotransacoes')}
                        >
                            VOLTAR
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            <NavBar />
            <div className={stylesPerfil.container}>
                <div className={stylesPerfil.PerfilBox}>
                    <div className={stylesPerfil.leftPerfil}>
                        <img src={iconImage} alt="Imagem de icone" />
                        <div className={stylesPerfil.leftText}>
                            <span className={stylesPerfil.bigText}>
                                Bem Vindo, {userData.nome}
                            </span>

                            <div className={stylesPerfil.mailPerfil}>
                                <RiMailFill className={`${stylesPerfil.blueIcon} ${stylesPerfil.smallIcon}`} />
                                <span className={stylesPerfil.mediumText}>
                                    {userData.email}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={stylesPerfil.optionBox}>
                    <div className={stylesGIT.topTitle}>
                        <div className={stylesGIT.title}>
                            <RiShoppingCart2Line className={stylesGIT.blueIcon} />
                            <span className={stylesGIT.bigText}>DETALHES DA TRANSAÇÃO</span>
                        </div>
                        <button
                            className={stylesGIT.adicPac}
                            onClick={() => navigate('/historicotransacoes')}
                        >
                            VOLTAR
                        </button>
                    </div>

                    <div className={`${stylesDT.detailsContainer} ${styles.detailsContainer}`}>
                        <div className={stylesDT.transactionDetails}>
                            <div className={styles.transacaoHeader}>
                                <div>
                                    <span className={stylesDT.smallTextDark}>
                                        Transação:
                                    </span>
                                    <span className={stylesDT.smallTextLight}>
                                        {transacao.id} - {transacao.data}
                                    </span>
                                </div>
                                <div className={styles.containerButtons}>
                                    {transacao.status === "Pendente" && (
                                        <>
                                            <button
                                                className={`${stylesPI.buttons} ${stylesPI.excPac}`}
                                                onClick={() => openModal(transacao.id)}
                                            >
                                                CANCELAR TRANSAÇÃO
                                            </button>

                                            <button
                                                className={`${stylesPI.buttons} ${stylesPI.ediPac}`}
                                                onClick={() => navigate(`/editarpedido/${transacao.id}`, { state: { idTransacao: transacao.id } })}
                                            >
                                                EDITAR TRANSAÇÃO
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={stylesDT.transactionDetails}>
                            <div
                                className={`${stylesDT.smallTextDark} ${styles.transacaoStatus} ${styles[getStatusColor(transacao.status)]}`}
                            >
                                Transação {transacao.status}.
                            </div>
                        </div>

                        <div className={stylesDT.transactionDetails}>
                            <span className={stylesDT.smallTextDark}>
                                Pagamento via {transacao.pagamento}.
                            </span>
                        </div>

                        <div className={stylesDT.transactionDetails}>
                            <span className={stylesDT.smallTextDark}>
                                Exibir recibo
                            </span>
                        </div>

                        {transacao.pacotes.map((pacote, index) => (
                            <div key={index} className={stylesDT.transactionDetailsImage}>
                                <div>
                                    <img src={pacote.image} alt="Imagem do pacote" className={stylesDT.image} />
                                </div>
                                <div>
                                    <span className={stylesDT.smallTextDark}>{pacote.nome}</span><br />
                                    <span className={stylesDT.smallTextLightNotMargin}>
                                        Quantidade: {pacote.quantidade}
                                    </span>
                                </div>
                            </div>
                        ))}

                        <div className={stylesDT.transactionDetails}>
                            <span className={stylesDT.smallTextDark}>Resumo da Transação:</span><br />
                            <div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextLightNotMargin}>Subtotal do(s) item(ns):</span>
                                    <span className={stylesDT.smallTextLightNotMargin}>R$ {calcularSubtotal(transacao.pacotes).toFixed(2)}</span>
                                </div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextLightNotMargin}>Frete e Manuseio:</span>
                                    <span className={stylesDT.smallTextLightNotMargin}>R$ 0,00</span>
                                </div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextLightNotMargin}>Total:</span>
                                    <span className={stylesDT.smallTextLightNotMargin}>R$ {calcularSubtotal(transacao.pacotes).toFixed(2)}</span>
                                </div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextDark}>Total Geral:</span>
                                    <span className={stylesDT.smallTextDark}>R$ {calcularSubtotal(transacao.pacotes).toFixed(2)}</span>
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

            <ModalExcluir
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            >
                <p>
                    DESEJA REALMENTE <strong>CANCELAR</strong> O PEDIDO
                    <strong> {selectedOrder}</strong>?
                </p>
            </ModalExcluir>

            <ModalMensagemSucesso
                title="CANCELAR PEDIDO"
                text="Pedido cancelado com sucesso!"
                isVisible={showSucess}
            />

            <ModalMensagemFalha
                title="CANCELAR PEDIDO"
                text="Erro ao cancelar o pedido!"
                isVisible={showFail}
            />
        </div>
    );
}

export default DetalhesPedido;
