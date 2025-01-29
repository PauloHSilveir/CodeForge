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
    const [evento, setEvento] = useState({
        data: '',
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: '',
        complemento: ''
    });
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

    const fetchTransacao = async (idTransacao) => {
        try {
            const response = await fetch(`${BASE_URL}/transacao/${idTransacao}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao buscar os detalhes da transação.');
            }

            const data = await response.json();

            // Converter a data do evento para o formato datetime-local
            const dataEvento = data.evento?.data
                ? new Date(data.evento.data).toISOString().slice(0, 16)
                : '';

            // Atualizar o estado do evento com os dados recebidos
            setEvento({
                data: dataEvento, // Data já formatada para datetime-local
                rua: data.evento?.rua || '',
                numero: data.evento?.numero || '',
                complemento: data.evento?.complemento || '',
                bairro: data.evento?.bairro || '',
                cidade: data.evento?.cidade || '',
                estado: data.evento?.estado || '',
                cep: data.evento?.cep || ''
            });

            const formattedData = {
                id: data.id,
                data_criacao: new Date(data.data_criacao).toLocaleDateString('pt-BR'),
                data_evento: dataEvento,
                status: mapStatusFromBackend(data.pagamento.status),
                pagamento: data.pagamento.metodo_pagamento,
                valor: data.pagamento.valor,
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

    const handleEventoChange = (e) => {
        const { name, value } = e.target;
        setEvento(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSalvarAlteracoes = async () => {
        try {
            const response = await fetch(`${BASE_URL}/transacao/update/${transacao.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    evento: evento // Enviando apenas os dados do evento
                })
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar os dados');
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
                            <span className={stylesGIT.bigText}>EDITAR ENDEREÇO DO EVENTO</span>
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
                            >
                                SALVAR ALTERAÇÕES
                            </button>
                        </div>
                    </div>
                    <div className={`${stylesDT.detailsContainer} ${styles.detailsContainer}`}>
                        {/* Nova seção para Data do Evento */}
                        <div className={stylesDT.transactionDetails}>
                            <p className={stylesDT.smallTextDark}>Data e Hora do Evento:</p>
                            <div className={stylesEP.inputContainer}>
                                <input
                                    type="datetime-local"
                                    name="data"
                                    value={evento.data}
                                    onChange={handleEventoChange}
                                    className={stylesEP.input}
                                />
                            </div>
                        </div>

                        <div className={stylesDT.transactionDetails}>
                            <p className={stylesDT.smallTextDark}>Endereço de evento:</p>
                            <div className={stylesEP.formGrid}>
                                <div className={stylesEP.inputContainer}>
                                    <label className={stylesDT.smallTextLightNotMargin}>
                                        Rua:
                                    </label>
                                    <input
                                        type="text"
                                        name="rua"
                                        value={evento.rua}
                                        onChange={handleEventoChange}
                                        className={stylesEP.input}
                                        placeholder="Rua"
                                    />
                                </div>

                                <div className={stylesEP.inputContainer}>
                                    <label className={stylesDT.smallTextLightNotMargin}>
                                        Número:
                                    </label>
                                    <input
                                        type="text"
                                        name="numero"
                                        value={evento.numero}
                                        onChange={handleEventoChange}
                                        className={stylesEP.input}
                                        placeholder="Número"
                                    />
                                </div>

                                <div className={stylesEP.inputContainer}>
                                    <label className={stylesDT.smallTextLightNotMargin}>
                                        Complemento:
                                    </label>
                                    <input
                                        type="text"
                                        name="complemento"
                                        value={evento.complemento}
                                        onChange={handleEventoChange}
                                        className={stylesEP.input}
                                        placeholder="Complemento"
                                    />
                                </div>

                                <div className={stylesEP.inputContainer}>
                                    <label className={stylesDT.smallTextLightNotMargin}>
                                        Bairro:
                                    </label>
                                    <input
                                        type="text"
                                        name="bairro"
                                        value={evento.bairro}
                                        onChange={handleEventoChange}
                                        className={stylesEP.input}
                                        placeholder="Bairro"
                                    />
                                </div>

                                <div className={stylesEP.inputContainer}>
                                    <label className={stylesDT.smallTextLightNotMargin}>
                                        Cidade:
                                    </label>
                                    <input
                                        type="text"
                                        name="cidade"
                                        value={evento.cidade}
                                        onChange={handleEventoChange}
                                        className={stylesEP.input}
                                        placeholder="Cidade"
                                    />
                                </div>

                                <div className={stylesEP.inputContainer}>
                                    <label className={stylesDT.smallTextLightNotMargin}>
                                        Estado:
                                    </label>
                                    <input
                                        type="text"
                                        name="estado"
                                        value={evento.estado}
                                        onChange={handleEventoChange}
                                        className={stylesEP.input}
                                        placeholder="Estado(XX)"
                                    />
                                </div>

                                <div className={stylesEP.inputContainer}>
                                    <label className={stylesDT.smallTextLightNotMargin}>
                                        CEP:
                                    </label>
                                    <input
                                        type="text"
                                        name="cep"
                                        value={evento.cep}
                                        onChange={handleEventoChange}
                                        className={stylesEP.input}
                                        placeholder="CEP(XXXXX-XXX)"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Exibição dos pacotes (somente leitura) */}
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
                                    <br />
                                    <span className={stylesDT.smallTextLightNotMargin}>
                                        Quantidade: {pacote.quantidade}
                                    </span>
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