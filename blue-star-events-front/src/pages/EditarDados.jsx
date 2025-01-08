import React, { useState } from 'react';
import NavBar from "../components/Navbar";
import stylesFormBaseA from "../styles/FormBaseA.module.css";
import stylesPerfil from "../styles/Perfil.module.css";
import stylesED from "../styles/EditarDados.module.css";
import iconImage from "../assets/images/iconPerfil.png";
import ModalExcluir from "../components/ModalExcluir";
import { useNavigate } from 'react-router-dom';
import {
    RiMailFill,
    RiDeleteBinLine,
    RiArrowLeftCircleLine,
    RiUserLine,
    RiIdCardLine,
    RiMailLine,
    RiPhoneLine,
    RiRoadMapLine,
    RiMapPinUserLine,
    RiHome8Line,
    RiGroup2Line,
    RiCommunityLine,
    RiMapLine,
    RiMapPinRangeLine,
} from '@remixicon/react';

function EditarDados() {

    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div>
            <NavBar />
            <div className={stylesED.backgroundImage}>
                <div>
                    <div className={stylesED.containerPerfil}>
                        <div className={stylesPerfil.PerfilBox}>
                            <div className={stylesPerfil.leftPerfil}>
                                <img src={iconImage} alt="Imagem de icone" />
                                <div className={stylesPerfil.leftText}>
                                    <span className={stylesPerfil.bigText}> Bem Vindo, Fulano Editor Master </span>
                                    <div className={stylesPerfil.mailPerfil}>
                                        <RiMailFill className={`${stylesPerfil.blueIcon} ${stylesPerfil.smallIcon}`} />
                                        <span className={stylesPerfil.mediumText}>fulano@gmail.com</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button className={`${stylesPerfil.buttonsPerfilBox} ${stylesPerfil.excluirConta}`} onClick={openModal}>
                                    <RiDeleteBinLine />EXCLUIR CONTA
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={stylesED.containerGeral}>
                        <div className={stylesED.containerDados}>
                            <div className={stylesFormBaseA.legendContainer}>
                                <RiArrowLeftCircleLine
                                    className={stylesFormBaseA.iconBack}
                                    onClick={() => navigate('/')}
                                />
                                <div className={stylesFormBaseA.bigText}>
                                    EDITE SEUS DADOS
                                </div>
                            </div>
                            <div className={stylesFormBaseA.formContainer}>
                                <form action="#" className={stylesFormBaseA.baseForm}>
                                    <label htmlFor="nome" className={stylesFormBaseA.label}>
                                        Nome
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiUserLine />
                                        <input type="text" id="nome" placeholder="Digite seu nome" className={stylesFormBaseA.inputField} required />
                                    </div>

                                    <label htmlFor="cpf" className={stylesFormBaseA.label}>
                                        CPF
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiIdCardLine />
                                        <input type="text" id="cpf" placeholder="Digite seu CPF" className={stylesFormBaseA.inputField} required />
                                    </div>

                                    <label htmlFor="email" className={stylesFormBaseA.label}>
                                        Email
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMailLine />
                                        <input type="email" id="email" placeholder="Digite seu email" className={stylesFormBaseA.inputField} required />
                                    </div>

                                    <label htmlFor="telefone" className={stylesFormBaseA.label}>
                                        Telefone
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiPhoneLine />
                                        <input type="text" id="telefone" placeholder="Digite seu telefone" className={stylesFormBaseA.inputField} required />
                                    </div>
                                    <button className={stylesFormBaseA.buttonBase}>
                                        Salvar Alterações
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className={stylesED.containerDados}>
                            <div className={stylesFormBaseA.legendContainer}>
                                <div className={stylesFormBaseA.bigText}>
                                    EDITE SEU ENDEREÇO
                                </div>
                            </div>
                            <div className={stylesFormBaseA.formContainer}>
                                <form action="#" className={stylesFormBaseA.baseForm}>
                                    <label htmlFor="logradouro" className={stylesFormBaseA.label}>
                                        Logradouro
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiRoadMapLine />
                                        <input type="text" id="logradouro" placeholder="Digite o logradouro" className={stylesFormBaseA.inputField} required />
                                    </div>

                                    <label htmlFor="numero" className={stylesFormBaseA.label}>
                                        Número
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMapPinUserLine />
                                        <input type="text" id="numero" placeholder="Digite o número da residência" className={stylesFormBaseA.inputField} required />
                                    </div>

                                    <label htmlFor="complemento" className={stylesFormBaseA.label}>
                                        Complemento
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiHome8Line />
                                        <input type="text" id="complemento" placeholder="Digite o complemento" className={stylesFormBaseA.inputField} />
                                    </div>

                                    <label htmlFor="bairro" className={stylesFormBaseA.label}>
                                        Bairro
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiGroup2Line />
                                        <input type="text" id="bairro" placeholder="Digite o bairro" className={stylesFormBaseA.inputField} required />
                                    </div>

                                    <label htmlFor="cidade" className={stylesFormBaseA.label}>
                                        Cidade
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiCommunityLine />
                                        <input type="text" id="cidade" placeholder="Digite a cidade" className={stylesFormBaseA.inputField} required />
                                    </div>

                                    <label htmlFor="estado" className={stylesFormBaseA.label}>
                                        Estado
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMapLine />
                                        <input type="text" id="estado" placeholder="Digite o estado" className={stylesFormBaseA.inputField} required />
                                    </div>

                                    <label htmlFor="cep" className={stylesFormBaseA.label}>
                                        CEP
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMapPinRangeLine />
                                        <input type="text" id="cep" placeholder="Digite o CEP" className={stylesFormBaseA.inputField} required />
                                    </div>
                                    <button className={stylesFormBaseA.buttonBase}>
                                        Salvar Alterações
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalExcluir isOpen={isModalOpen} onClose={closeModal}>
                <p>DESEJA REALMENTE <strong>EXCLUIR</strong> SUA CONTA<strong> PERMANENTEMENTE</strong>?</p>
            </ModalExcluir>
        </div >
    );
}

export default EditarDados;

