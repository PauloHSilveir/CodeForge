import React, { useState, useEffect } from "react";
import NavBar from "../../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import stylesPerfil from "../../../styles/Perfil.module.css";
import stylesDT from "../../../styles/DetalhesTransacao.module.css";
import styles from "../../../styles/HistoricoTransacoesCliente.module.css";
import stylesPI from "../../../styles/PacoteIndividual.module.css";
import stylesGIT from "../../../styles/GerenciarItensTop.module.css";
import stylesEP from "../../../styles/EditarPedido.module.css";
import iconImage from "../../../assets/images/iconPerfil.png";
import packageImage from "../../../assets/images/Aniversario.png";
import { RiFileEditFill, RiMailFill } from '@remixicon/react';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = "http://localhost:1313";

function EditarPedido() {
    const navigate = useNavigate();
    const location = useLocation();
    const [transacao, setTransacao] = useState(null);
    const [transacaoOriginal, setTransacaoOriginal] = useState(null);
    const [userData, setUserData] = useState({
        nome: 'Usuário',
        email: 'email@exemplo.com',
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
                            'Content-Type': 'application/json',
                        },
                    });

                    if (!response.ok) {
                        throw new Error('Erro ao buscar dados do usuário');
                    }

                    const data = await response.json();
                    setUserData({
                        nome: data.user.name || 'Usuário',
                        email: data.user.email || 'email@exemplo.com',
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
                status: mapStatusFromBackend(data.status),
                pagamento: data.metodo_pagamento,
                valor: data.valor,
                pacotes: data.pacotes.map(pacote => ({
                    nome: pacote.nome,
                    quantidade: pacote.quantidade,
                    image: packageImage,
                    valor: pacote.preco
                }))
            };

            setTransacao(formattedData);
            setTransacaoOriginal(JSON.parse(JSON.stringify(formattedData)));
        } catch (error) {
            console.error('Erro ao buscar a transação:', error);
        }
    };

    const handleQuantidadeChange = (index, novaQuantidade) => {
        const atualizado = { ...transacao };
        atualizado.pacotes[index].quantidade = novaQuantidade;
        setTransacao(atualizado);
    };

    const handleRemoverPacote = (index) => {
        const atualizado = { ...transacao };
        atualizado.pacotes.splice(index, 1);
        setTransacao(atualizado);
    };

    const handleSalvarAlteracoes = async () => {
        try {
            console.log("T_ID:" + transacao.id);
            const response = await fetch(`${BASE_URL}/transacao/update/${transacao.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pacotes: transacao.pacotes.map(pacote => ({
                        nome: pacote.nome,
                        quantidade: pacote.quantidade,
                        preco: pacote.valor
                    }))
                })
            });

            console.log('Response:' + response);

            console.log({
                pacotes: transacao.pacotes.map(pacote => ({
                    nome: pacote.nome,
                    quantidade: pacote.quantidade,
                    preco: pacote.valor
                }))
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar a transação');
            }

            navigate(`/detalhespedido/${transacao.id}`, {
                state: { idTransacao: transacao.id }
            });
        } catch (error) {
            console.error('Erro ao salvar alterações:', error);
        }
    };

    const handleCancelarEdicao = () => {
        navigate(`/detalhespedido/${transacao.id}`, {
            state: { idTransacao: transacao.id }
        });
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
                            onClick={() => navigate("/historicotransacoes")}
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
                            <RiFileEditFill className={stylesGIT.blueIcon} />
                            <span className={stylesGIT.bigText}>EDITAR TRANSAÇÃO</span>
                        </div>
                        <div className={stylesEP.butonsTop}>
                            <button
                                className={stylesGIT.adicPac}
                                onClick={handleCancelarEdicao}
                            >
                                CANCELAR
                            </button>
                            <button
                                className={`${stylesPI.buttons} ${stylesPI.ediPac}`}
                                onClick={handleSalvarAlteracoes}
                                disabled={JSON.stringify(transacao) === JSON.stringify(transacaoOriginal)} // Desabilita se não houver alteração
                            >
                                SALVAR ALTERAÇÕES
                            </button>
                        </div>
                    </div>

                    <div className={`${stylesDT.detailsContainer} ${styles.detailsContainer}`}>
                        {transacao.pacotes.map((pacote, index) => (
                            <div key={index} className={stylesDT.transactionDetailsImage}>
                                <div>
                                    <img
                                        src={pacote.image}
                                        alt="Imagem do pacote"
                                        className={stylesDT.image}
                                    />
                                </div>
                                <div>
                                    <span className={stylesDT.smallTextDark}>{pacote.nome}</span>
                                    <div className={stylesEP.inputContainer}>
                                        <label className={stylesEP.inputLabel}>
                                            Quantidade:
                                            <select
                                                value={pacote.quantidade}
                                                onChange={(e) => handleQuantidadeChange(index, parseInt(e.target.value, 10))}
                                                className={stylesEP.input}
                                            >
                                                {/* A quantidade pode ser variada com base nas opções disponíveis */}
                                                {[...Array(10).keys()].map((num) => (
                                                    <option key={num + 1} value={num + 1}>
                                                        {num + 1}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>

                                </div>
                                <div className={stylesEP.remPac}>
                                    <button
                                        className={`${stylesPI.buttons} ${stylesPI.excPac}`}
                                        onClick={() => handleRemoverPacote(index)}
                                    >
                                        REMOVER PACOTE
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className={stylesDT.transactionDetails}>
                            <span className={stylesDT.smallTextDark}>Resumo da Transação:</span>
                            <div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextLightNotMargin}>
                                        Subtotal:
                                    </span>
                                    <span className={stylesDT.smallTextLightNotMargin}>
                                        R$ {calcularSubtotal(transacao.pacotes).toFixed(2)}
                                    </span>
                                </div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextLightNotMargin}>
                                        Frete:
                                    </span>
                                    <span className={stylesDT.smallTextLightNotMargin}>
                                        R$ 0,00
                                    </span>
                                </div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextDark}>Total:</span>
                                    <span className={stylesDT.smallTextDark}>
                                        R$ {calcularSubtotal(transacao.pacotes).toFixed(2)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditarPedido;
