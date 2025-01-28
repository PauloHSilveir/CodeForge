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
import { RiFileEditFill, RiMailFill } from '@remixicon/react';
import { jwtDecode } from 'jwt-decode';


function EditarPedido() {
    const navigate = useNavigate();
    const location = useLocation();
    const [pedido, setPedido] = useState(null);
    const [pedidoOriginal, setPedidoOriginal] = useState(null);
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
                    const response = await fetch(`http://localhost:1313/user/${userId}`, {
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
        if (location.state?.pedido) {
            setPedido(location.state.pedido);
            setPedidoOriginal(JSON.parse(JSON.stringify(location.state.pedido)));
        }
    }, [location.state]);

    const handleQuantidadeChange = (index, novaQuantidade) => {
        const atualizado = { ...pedido };
        atualizado.pacotes[index].quantidade = novaQuantidade;
        setPedido(atualizado);
    };

    const handleRemoverPacote = (index) => {
        const atualizado = { ...pedido };
        atualizado.pacotes.splice(index, 1);
        setPedido(atualizado);
    };

    const handleSalvarAlteracoes = () => {
        console.log("Pedido atualizado:", pedido);
        navigate(`/detalhespedido/${pedido.id}`, { state: { pedido } });
    };

    const handleCancelarEdicao = () => {
        setPedido(pedidoOriginal);
        navigate(`/detalhespedido/${pedido.id}`, { state: { pedido: pedidoOriginal } });
    };

    const calcularSubtotal = (pacotes) => {
        return pacotes.reduce((total, pacote) => total + pacote.valor * pacote.quantidade, 0);
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
                            <span className={stylesGIT.bigText}>EDITAR PEDIDO</span>
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
                                disabled={JSON.stringify(pedido) === JSON.stringify(pedidoOriginal)} // Desabilita se não houver alteração
                            >
                                SALVAR ALTERAÇÕES
                            </button>
                        </div>
                    </div>

                    <div className={`${stylesDT.detailsContainer} ${styles.detailsContainer}`}>
                        {pedido.pacotes.map((pacote, index) => (
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
                                            <input
                                                type="number"
                                                value={pacote.quantidade}
                                                min="1"
                                                onChange={(e) => handleQuantidadeChange(index, parseInt(e.target.value, 10))}
                                                className={stylesEP.input}
                                            />
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
                            <span className={stylesDT.smallTextDark}>Resumo do Pedido:</span>
                            <div>
                                <div className={stylesDT.transactionDetailsRow}>
                                    <span className={stylesDT.smallTextLightNotMargin}>
                                        Subtotal:
                                    </span>
                                    <span className={stylesDT.smallTextLightNotMargin}>
                                        R$ {calcularSubtotal(pedido.pacotes).toFixed(2)}
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
                                        R$ {calcularSubtotal(pedido.pacotes).toFixed(2)}
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
