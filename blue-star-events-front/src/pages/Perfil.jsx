import React, { useState } from 'react';
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import stylesPerfil from "../styles/Perfil.module.css";
import ModalExcluir from "../components/ModalExcluir";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";
import iconImage from "../assets/images/iconPerfil.png";
import {
    RiMailFill,
    RiEditBoxLine,
    RiDeleteBinLine,
    RiApps2Fill,
    RiShoppingCart2Line,
    RiUser3Line,
    RiChat4Fill
} from '@remixicon/react';

function Perfil() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleDelete = async () => {
        try {
            // Implementar a chamada real para a API de exclusão
            // await api.delete('/user');

            setShowSucess(true);

            setTimeout(() => {
                setShowSucess(false);
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error("Erro ao excluir conta:", error);

            setShowFail(true);

            setTimeout(() => {
                setShowFail(false);
            }, 3000);
        }
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
                title="EXCLUIR CONTA"
                text="Conta excluída com sucesso! Redirecionando..."
                isVisible={showSucess}
            />

            <ModalMensagemFalha
                title="EXCLUIR CONTA"
                text="Erro ao excluir a conta!"
                isVisible={showFail}
            />
        </div>
    );
}

export default Perfil;
