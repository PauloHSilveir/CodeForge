import React, { useState } from 'react';
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Paginacao from "../components/Paginacao";
import stylesPerfil from "../styles/Perfil.module.css";
import stylesDT from "../styles/DetalhesTransacao.module.css";
import styles from "../styles/HistoricoTransacoesCliente.module.css";
import stylesPI from "../styles/PacoteIndividual.module.css";
import stylesGIT from "../styles/GerenciarItensTop.module.css";
import ModalExcluir from "../components/ModalExcluir";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";
import iconImage from "../assets/images/iconPerfil.png";
import { RiShoppingCart2Line } from '@remixicon/react';
import packageImage from "../assets/images/Aniversario.png"

function VisualizarHistoricoTransacoesCliente() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    const [paginaAtual, setPaginaAtual] = useState(1);
    const itensPorPagina = 5;

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

    const transacoesMockadas = [
        {
            id: "000004",
            data: "15/01/2025",
            status: "Realizado",
            pagamento: "Cartão de Crédito",
            valor: 11200,
            pacotes: [
                { nome: "Pacote Festa Infantil", quantidade: 1, image: packageImage, valor: 5000 },
                { nome: "Pacote Decoração Temática", quantidade: 2, image: packageImage, valor: 3000 },
            ],
        },
        {
            id: "000003",
            data: "01/12/2024",
            status: "Realizado",
            pagamento: "Pix",
            valor: 3000,
            pacotes: [{ nome: "Pacote Aniversário Grande", quantidade: 1, image: packageImage, valor: 3000 }],
        },
        {
            id: "000002",
            data: "10/11/2024",
            status: "Concluído",
            pagamento: "Pix",
            valor: 3150,
            pacotes: [{ nome: "Pacote Aniversário Pequeno", quantidade: 1, image: packageImage, valor: 3000 }],
        },
        {
            id: "000001",
            data: "06/08/2024",
            status: "Concluído",
            pagamento: "Pix",
            valor: 3120,
            pacotes: [{ nome: "Pacote Casamento Básico", quantidade: 1, image: packageImage, valor: 3000 }],
        },
    ];

    const totalItens = transacoesMockadas.length;
    const indexInicio = (paginaAtual - 1) * itensPorPagina;
    const indexFim = indexInicio + itensPorPagina;
    const transacoesPaginaAtual = transacoesMockadas.slice(indexInicio, indexFim);

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
                            <RiShoppingCart2Line className={stylesGIT.blueIcon} />
                            <span className={stylesGIT.bigText}>MEUS PEDIDOS</span>
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
                                            Pedido:
                                        </span>
                                        <span className={stylesDT.smallTextLight}>
                                            {transacao.id} - {transacao.data}
                                        </span>
                                    </div>
                                    <div className={styles.containerButtons}>
                                        {transacao.status === "Realizado" && (
                                            <button
                                                className={`${stylesPI.buttons} ${stylesPI.excPac}`}
                                                onClick={() => openModal(transacao.id)}
                                            >
                                                CANCELAR PEDIDO
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
                                    Pedido {transacao.status}.
                                </div>
                            </div>
                            <div className={stylesDT.transactionDetails}>
                                <span className={stylesDT.smallTextDark}>
                                    Pagamento via {transacao.pagamento}.
                                </span>
                            </div>

                            {transacao.pacotes.map((pacote, index) => (
                                <div key={index} className={stylesDT.transactionDetailsImage}>
                                    <div>
                                        <img src={pacote.image} alt="Imagem do pacote" className={stylesDT.image} />
                                    </div>
                                    <div>
                                        <span
                                            className={stylesDT.smallTextDark}>{pacote.nome}
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

export default VisualizarHistoricoTransacoesCliente;
