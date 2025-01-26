import React, { useState, useEffect } from 'react';
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import stylesPerfil from "../styles/Perfil.module.css";
import ModalExcluir from "../components/ModalExcluir";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";
import iconImage from "../assets/images/iconPerfil.png";
import { jwtDecode } from 'jwt-decode';
import {
    RiMailFill,
    RiEditBoxLine,
    RiDeleteBinLine,
    RiApps2Fill,
    RiShoppingCart2Line,
    RiUser3Line,
} from '@remixicon/react';

const BASE_URL = 'http://localhost:1313';

function Perfil() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [showSucessModal, setShowSucessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [userData, setUserData] = useState({ name: '', email: '' });

    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    const showSuccessModal = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowSucessModal(true);
        setTimeout(() => setShowSucessModal(false), 2000);
    };

    const showModalFail = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowFailModal(true);
        setTimeout(() => setShowFailModal(false), 2000);
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/user/${userId}`);
                if (!response.ok) {
                    throw new Error('Erro ao buscar dados do usuário');
                }
                const data = await response.json();
                setUserData(data.user);
            } catch (error) {
                showModalFail('ERRO', 'Não foi possível carregar os dados do usuário');
            }
        };

        fetchUserData();
    }, [userId]);

    const handleNavigate = (path) => {
        navigate(path);
    }

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleDelete = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`
                }
            });

            if (!response.ok) {
                throw new Error('Erro ao excluir conta');
            }

            showSuccessModal('EXCLUIR CONTA', 'Conta excluída com sucesso! Redirecionando...');
            setTimeout(() => navigate('/login'), 3000);
        } catch (error) {
            showModalFail('EXCLUIR CONTA', 'Erro ao excluir a conta');
        }
        closeModal();
    };

    return (
        <div>
            <NavBar />
            <div className={stylesPerfil.backgroundImage}>
                <div className={stylesPerfil.container}>
                    <div className={stylesPerfil.PerfilBox}>
                        <div className={stylesPerfil.leftPerfil}>
                            <img src={iconImage} alt="Imagem de icone" />
                            <div className={stylesPerfil.leftText}>
                                <span className={stylesPerfil.bigText}>
                                    Bem Vindo, {userData.name}
                                </span>

                                <div className={stylesPerfil.mailPerfil}>
                                    <RiMailFill className={`${stylesPerfil.blueIcon} ${stylesPerfil.smallIcon}`} />
                                    <span className={stylesPerfil.mediumText}> {userData.email} </span>
                                </div>

                            </div>
                        </div>
                        <div>
                            <button
                                className={`${stylesPerfil.buttonsPerfilBox} ${stylesPerfil.editarDados}`}
                                onClick={() => handleNavigate('/editardados')}
                            >
                                <RiEditBoxLine />EDITAR DADOS
                            </button>

                            <button
                                className={`${stylesPerfil.buttonsPerfilBox} ${stylesPerfil.excluirConta}`}
                                onClick={openModal}
                            >
                                <RiDeleteBinLine />EXCLUIR CONTA
                            </button>
                        </div>
                    </div>

                    <div className={stylesPerfil.optionBox}>
                        <div className={stylesPerfil.containerTitle}>
                            <RiApps2Fill className={stylesPerfil.blueIcon} />
                            <span className={stylesPerfil.bigText}>
                                ATALHOS
                            </span>
                        </div>

                        <div className={stylesPerfil.containerButtons}>
                            <button
                                className={stylesPerfil.buttonsOptionsBox}
                                onClick={() => handleNavigate('/historicotransacoes')}
                            >
                                <RiShoppingCart2Line className={`${stylesPerfil.blueIcon} ${stylesPerfil.bigIcon}`} />
                                <div className={stylesPerfil.textsButtonsOptions}>
                                    <span className={stylesPerfil.mediumText}>
                                        MEUS PEDIDOS
                                    </span>

                                    <span className={stylesPerfil.smallText}>
                                        <br />Veja o histórico e acompanhe seus pedidos.
                                    </span>
                                </div>
                            </button>

                            <button
                                className={stylesPerfil.buttonsOptionsBox}
                                onClick={() => handleNavigate('/editardados')}
                            >
                                <RiUser3Line className={`${stylesPerfil.blueIcon} ${stylesPerfil.bigIcon}`} />
                                <div className={stylesPerfil.textsButtonsOptions}>
                                    <span className={stylesPerfil.mediumText}>
                                        MEUS DADOS
                                    </span>

                                    <span className={stylesPerfil.smallText}>
                                        <br />Altere seus dados cadastrados.
                                    </span>
                                </div>
                            </button>
                            
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
                    DESEJA REALMENTE <strong>EXCLUIR</strong> SUA CONTA
                    <strong> PERMANENTEMENTE</strong>?
                </p>
            </ModalExcluir>

            <ModalMensagemSucesso
                title={modalTitle}
                text={modalMessage}
                isVisible={showSucessModal}
            />

            <ModalMensagemFalha
                title={modalTitle}
                text={modalMessage}
                isVisible={showFailModal}
            />
        </div>
    );
}

export default Perfil;