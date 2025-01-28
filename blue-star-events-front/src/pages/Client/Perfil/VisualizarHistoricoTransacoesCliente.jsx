import React, { useState, useEffect } from 'react';
import NavBar from "../../../components/Navbar";
import { useNavigate } from "react-router-dom";
import Paginacao from "../../../components/Paginacao";
import stylesPerfil from "../../../styles/Perfil.module.css";
import stylesDT from "../../../styles/DetalhesTransacao.module.css";
import styles from "../../../styles/HistoricoTransacoesCliente.module.css";
import stylesPI from "../../../styles/PacoteIndividual.module.css";
import stylesGIT from "../../../styles/GerenciarItensTop.module.css";
import ModalExcluir from "../../../components/ModalExcluir";
import ModalMensagemSucesso from "../../../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../../../components/ModalMensagemFalha";
import iconImage from "../../../assets/images/iconPerfil.png";
import { RiMoneyDollarCircleLine, RiMailFill } from '@remixicon/react';
import packageImage from "../../../assets/images/Aniversario.png";
import { jwtDecode } from 'jwt-decode';

const BASE_URL = "http://localhost:1313";

function VisualizarHistoricoTransacoesCliente() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [transacoes, setTransacoes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

    const token = localStorage.getItem('authToken');
    const userId = token ? jwtDecode(token).id : null;

    useEffect(() => {
        fetchTransacoes();
    }, []);

    const fetchTransacoes = async () => {
        try {
            const response = await fetch(`${BASE_URL}/transacao/usuario/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            
            if (!response.ok) {
                throw new Error('Erro ao buscar dados das transações.');
            }

            const data = await response.json();
            
            const formattedData = data.map(transacao => ({
                id: transacao.id,
                data: new Date(transacao.data_criacao).toLocaleDateString('pt-BR'),
                status: mapStatusFromBackend(transacao.status),
                pagamento: transacao.metodo_pagamento,
                valor: transacao.valor,
                pacotes: transacao.pacotes.map(pacote => ({
                    nome: pacote.nome,
                    quantidade: pacote.quantidade,
                    image: packageImage,
                    valor: pacote.preco
                }))
            }));

            setTransacoes(formattedData);
        } catch (err) {
            console.error("Erro ao buscar transações:", err);
            setError("Erro ao carregar transações.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        console.log(selectedOrder);
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
            await fetchTransacoes();

            setTimeout(() => {
                setShowSucess(false);
                setModalOpen(false);
            }, 3000);
        } catch (error) {
            console.error("Erro ao cancelar transação:", error);
            setShowFail(true);

            setTimeout(() => {
                setShowFail(false);
            }, 3000);
        }
    };

    const mapStatusFromBackend = (status) => {
        switch (status) {
            case 'completa':
                return 'Concluído';
            case 'pendente':
                return 'Pendente';
            case 'falha':
                return 'Cancelado';
            default:
                return status;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "Concluído":
                return "green";
            case "Pendente":
                return "orange";
            case "Cancelado":
                return "red";
            default:
                return "black";
        }
    };

    const openModal = (orderId) => {
        setSelectedOrder(orderId);
        setModalOpen(true);
    };

    const closeModal = () => setModalOpen(false);

    if (loading) {
        return <div>Carregando transações...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const totalItens = transacoes.length;
    const indexInicio = (paginaAtual - 1) * itensPorPagina;
    const indexFim = indexInicio + itensPorPagina;
    const transacoesPaginaAtual = transacoes.slice(indexInicio, indexFim);

    return (
        <div>
            <NavBar />
            <div className={stylesPerfil.container}>
                <div className={stylesPerfil.PerfilBox}>
                    <div className={stylesPerfil.leftPerfil}>
                        <img src={iconImage} alt="Imagem de icone" />
                        <div className={stylesPerfil.leftText}>
                            <span className={stylesPerfil.bigText}>
                                Bem Vindo, Fulano Editor Master
                            </span>

                            <div className={stylesPerfil.mailPerfil}>
                                <RiMailFill className={`${stylesPerfil.blueIcon} ${stylesPerfil.smallIcon}`} />
                                <span className={stylesPerfil.mediumText}>
                                    fulano@gmail.com
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={stylesPerfil.optionBox}>
                    <div className={stylesGIT.topTitle}>
                        <div className={stylesGIT.title}>
                            <RiMoneyDollarCircleLine className={stylesGIT.blueIcon} />
                            <span className={stylesGIT.bigText}>MINHAS TRANSAÇÕES</span>
                        </div>
                        <button
                            className={stylesGIT.adicPac}
                            onClick={() => navigate('/perfil')}
                        >
                            VOLTAR
                        </button>
                    </div>

                    {transacoesPaginaAtual.map((transacao) => (
                        <div key={transacao.id} className={`${stylesDT.detailsContainer} ${styles.detailsContainer}`}>
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
                                            <button
                                                className={`${stylesPI.buttons} ${stylesPI.excPac}`}
                                                onClick={() => openModal(transacao.id)}
                                            >
                                                CANCELAR TRANSAÇÂO
                                            </button>
                                        )}
                                        <button
                                            className={`${stylesPI.buttons} ${stylesPI.ediPac}`}
                                            onClick={() => navigate(`/detalhespedido/${transacao.id}`, { state: { pedido: transacao } })}
                                        >
                                            VER DETALHES
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className={stylesDT.transactionDetails}>
                                <div className={`${stylesDT.smallTextDark} ${styles.transacaoStatus} ${styles[getStatusColor(transacao.status)]}`}>
                                    Status: {transacao.status}
                                </div>
                            </div>
                            <div className={stylesDT.transactionDetails}>
                                <span className={stylesDT.smallTextDark}>
                                    Pagamento via {transacao.pagamento}
                                </span>
                            </div>

                            {transacao.pacotes.map((pacote, index) => (
                                <div key={index} className={stylesDT.transactionDetailsImage}>
                                    <div>
                                        <img src={pacote.image} alt="Imagem do pacote" className={stylesDT.image} />
                                    </div>
                                    <div>
                                        <span className={stylesDT.smallTextDark}>
                                            {pacote.nome}
                                        </span><br />
                                        <span className={stylesDT.smallTextLightNotMargin}>
                                            Quantidade: {pacote.quantidade}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                    
                    <Paginacao
                        totalItens={totalItens}
                        itensPorPagina={itensPorPagina}
                        paginaAtual={paginaAtual}
                        mudarPagina={setPaginaAtual}
                    />
                </div>
            </div>

            <ModalExcluir
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            >
                <p>
                    DESEJA REALMENTE <strong>CANCELAR</strong> A TRANSAÇÂO
                    <strong> {selectedOrder}</strong>?
                </p>
            </ModalExcluir>

            <ModalMensagemSucesso
                title="CANCELAR TRANSAÇÃO"
                text="Transação cancelada com sucesso!"
                isVisible={showSucess}
            />

            <ModalMensagemFalha
                title="CANCELAR TRANSAÇÃO"
                text="Erro ao cancelar a transação!"
                isVisible={showFail}
            />
        </div>
    );
}

export default VisualizarHistoricoTransacoesCliente;