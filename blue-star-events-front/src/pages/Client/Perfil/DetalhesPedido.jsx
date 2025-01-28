import React, { useState, useEffect } from 'react';
import NavBar from "../../../components/Navbar";
import { useNavigate, useParams, useLocation } from "react-router-dom";
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

const BASE_URL = "http://localhost:1313";

function DetalhesPedido() {
    const navigate = useNavigate();
    const location = useLocation();

    const [pedido, setPedido] = useState(null);

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
        if (location.state?.pedido) {
            setPedido(location.state.pedido);
        }
    }, [location.state]);


    useEffect(() => {
        if (token) {
            const decodedToken = jwtDecode(token);
            console.log("Token decodificado:", decodedToken);
            setUserData({
                nome: decodedToken.nome || 'Usuário',
                email: decodedToken.email || 'email@exemplo.com'
            });
        }
    }, [token]);

    useEffect(() => {
        if (location.state?.pedido) {
            setPedido(location.state.pedido);
        }
    }, [location.state]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const openModal = (orderId) => {
        setSelectedOrder(orderId);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    const handleDelete = async () => {
        try {
            console.log(`Pedido ${selectedOrder} cancelado.`);
            setShowSucess(true);

            setTimeout(() => {
                setShowSucess(false);
                setModalOpen(false);
                navigate("/historicotransacoes");
            }, 3000);
        } catch (error) {
            console.error("Erro ao excluir pedido:", error);
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


    if (!pedido) {
        return (
            <div>
                <NavBar />
                <div className={stylesPerfil.container}>
                    <div className={stylesPerfil.PerfilBox}>
                        <p>Pedido não encontrado. Retorne à página anterior.</p>
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
                            <span className={stylesGIT.bigText}>DETALHES DO PEDIDO</span>
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
                                        Pedido:
                                    </span>
                                    <span className={stylesDT.smallTextLight}>
                                        {pedido.id} - {pedido.data}
                                    </span>
                                </div>
                                <div className={styles.containerButtons}>
                                    {pedido.status === "Concluído" && (
                                        <>
                                            <button
                                                className={`${stylesPI.buttons} ${stylesPI.excPac}`}
                                                onClick={() => openModal(pedido.id)}
                                            >
                                                CANCELAR PEDIDO
                                            </button>

                                            <button
                                                className={`${stylesPI.buttons} ${stylesPI.ediPac}`}
                                                onClick={() => navigate(`/editarpedido/${pedido.id}`, { state: { pedido } })}
                                            >
                                                EDITAR PEDIDO
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className={stylesDT.transactionDetails}>
                            <div
                                className={`${stylesDT.smallTextDark} ${styles.transacaoStatus} ${styles[getStatusColor(pedido.status)]}`}
                            >
                                Pedido {pedido.status}.
                            </div>
                        </div>

                        <div className={stylesDT.transactionDetails}>
                            <span className={stylesDT.smallTextDark}>
                                Pagamento via {pedido.pagamento}.
                            </span>
                        </div>

                        <div className={stylesDT.transactionDetails}>
                            <span className={stylesDT.smallTextDark}>
                                Exibir recibo
                            </span>
                        </div>

                        {pedido.pacotes.map((pacote, index) => (
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
                            <span className={stylesDT.smallTextDark}>Resumo do Pedido:</span><br />
                            <div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextLightNotMargin}>Subtotal do(s) item(ns):</span>
                                    <span className={stylesDT.smallTextLightNotMargin}>R$ {calcularSubtotal(pedido.pacotes).toFixed(2)}</span>
                                </div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextLightNotMargin}>Frete e Manuseio:</span>
                                    <span className={stylesDT.smallTextLightNotMargin}>R$ 0,00</span>
                                </div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextLightNotMargin}>Total:</span>
                                    <span className={stylesDT.smallTextLightNotMargin}>R$ {calcularSubtotal(pedido.pacotes).toFixed(2)}</span>
                                </div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextDark}>Total Geral:</span>
                                    <span className={stylesDT.smallTextDark}>R$ {calcularSubtotal(pedido.pacotes).toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        {/*Depois ajeitar o endereço*/}
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
