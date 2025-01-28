import React, { useState, useEffect } from 'react';
import NavBar from "../../../components/Navbar";
import stylesFormBaseA from "../../../styles/FormBaseA.module.css";
import stylesPerfil from "../../../styles/Perfil.module.css";
import stylesED from "../../../styles/EditarDados.module.css";
import iconImage from "../../../assets/images/iconPerfil.png";
import ModalExcluir from "../../../components/ModalExcluir";
import { useNavigate } from 'react-router-dom';
import ModalMensagemSucesso from "../../../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../../../components/ModalMensagemFalha";
import { formatCpf, formatPhone, formatCep } from '../../../utils/formatters';
import { jwtDecode } from 'jwt-decode';
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

const BASE_URL = 'http://localhost:1313';

function EditarDados() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [displayName, setDisplayName] = useState('');
    const [userData, setUserData] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
    });

    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const isValidCPF = (cpf) => {
        const cleanCPF = cpf.replace(/\D/g, '');
        return cleanCPF.length === 11; 
    };
    
    const isValidPhone = (phone) => {
        const cleanPhone = phone.replace(/\D/g, '');
        return /^(\d{2})(\d{5})(\d{4})$/.test(cleanPhone);
    };

    const isValidEstado = (estado) => {
        const regex = /^[A-Z]{2}$/;
        return regex.test(estado);
    };

    const isValidCEP = (cep) => {
        const cleanCEP = cep.replace(/\D/g, '');
        return /^\d{5}\d{3}$/.test(cleanCEP);
    };

    const showModalFail = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BASE_URL}/user/${userId}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar dados do usuário');
            }
            const data = await response.json();
            setUserData(data.user);
            setDisplayName(data.user.name);
        } catch (error) {
            console.error('Erro:', error);
            showModalFail('ERRO', 'Erro ao carregar dados do usuário');
        }
    };

    const handlePersonalDataSubmit = async (e) => {
        e.preventDefault();

        if (!isValidCPF(userData.cpf)) {
            showModalFail("CPF INVÁLIDO", "Por favor, insira um CPF válido.");
            return;
        }

        if (!isValidPhone(userData.phone)) {
            showModalFail("TELEFONE INVÁLIDO", "Por favor, insira um telefone válido.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/user/update/personal/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({
                    name: userData.name,
                    cpf: formatCpf(userData.cpf),
                    email: userData.email,
                    phone: formatPhone(userData.phone),
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar dados pessoais');
            }

            setDisplayName(userData.name);
            setShowSuccess(true);
            setSuccessMessage('Dados pessoais atualizados com sucesso!');
            
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

        } catch (error) {
            console.error('Erro:', error);
            showModalFail('ERRO', 'Erro ao atualizar dados pessoais');
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEstado(userData.estado)) {
            showModalFail("ESTADO INVÁLIDO", "O estado deve ser uma sigla de 2 letras.");
            return;
        }

        if (!isValidCEP(userData.cep)) {
            showModalFail("CEP INVÁLIDO", "O CEP deve estar no formato XXXXX-XXX ou XXXXXXXX.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/user/update/address/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({
                    rua: userData.rua,
                    numero: userData.numero,
                    complemento: userData.complemento,
                    bairro: userData.bairro,
                    cidade: userData.cidade,
                    estado: userData.estado,
                    cep: formatCep(userData.cep),
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar endereço');
            }

            setShowSuccess(true);
            setSuccessMessage('Endereço atualizado com sucesso!');
            
            setTimeout(() => {
                setShowSuccess(false);
            }, 3000);

        } catch (error) {
            console.error('Erro:', error);
            showModalFail('ERRO', 'Erro ao atualizar endereço');
        }
    };

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

            setShowSuccess(true);
            setSuccessMessage('Conta excluída com sucesso! Redirecionando...');

            setTimeout(() => {
                setShowSuccess(false);
                navigate('/login');
            }, 3000);
        } catch (error) {
            console.error('Erro:', error);
            showModalFail('ERRO', 'Erro ao excluir a conta!');
        }
        closeModal();
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [id]: value
        }));
    };

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
                                    <span className={stylesPerfil.bigText}> Bem Vindo, {displayName} </span>
                                    <div className={stylesPerfil.mailPerfil}>
                                        <RiMailFill className={`${stylesPerfil.blueIcon} ${stylesPerfil.smallIcon}`} />
                                        <span className={stylesPerfil.mediumText}>{userData.email}</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <button
                                    className={`${stylesPerfil.buttonsPerfilBox} ${stylesPerfil.excluirConta}`}
                                    onClick={openModal}
                                >
                                    <RiDeleteBinLine />
                                    EXCLUIR CONTA
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className={stylesED.containerGeral}>
                        <div className={stylesED.containerDados}>
                            <div className={stylesFormBaseA.legendContainer}>
                                <RiArrowLeftCircleLine
                                    className={stylesFormBaseA.iconBack}
                                    onClick={() => handleNavigate('/perfil')}
                                />
                                <div className={stylesFormBaseA.bigText}>
                                    EDITE SEUS DADOS
                                </div>
                            </div>
                            <div className={stylesFormBaseA.formContainer}>
                                <form onSubmit={handlePersonalDataSubmit} className={stylesFormBaseA.baseForm}>
                                    <label htmlFor="name" className={stylesFormBaseA.label}>
                                        Nome
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiUserLine />
                                        <input
                                            type="text"
                                            id="name"
                                            value={userData.name}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>

                                    <label
                                        htmlFor="cpf"
                                        className={stylesFormBaseA.label}
                                    >
                                        CPF
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiIdCardLine />
                                        <input
                                            type="text"
                                            id="cpf"
                                            value={userData.cpf}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>

                                    <label
                                        htmlFor="email"
                                        className={stylesFormBaseA.label}
                                    >
                                        Email
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMailLine />
                                        <input
                                            type="email"
                                            id="email"
                                            value={userData.email}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>

                                    <label htmlFor="phone" className={stylesFormBaseA.label}>
                                        Telefone
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiPhoneLine />
                                        <input
                                            type="text"
                                            id="phone"
                                            value={userData.phone}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className={stylesFormBaseA.buttonBase}>
                                        Salvar Alterações
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className={stylesED.containerDados}>
                            <div className={stylesFormBaseA.legendContainer}>
                                <div className={stylesFormBaseA.bigText}>
                                    ENDEREÇO
                                </div>
                            </div>

                            <div className={stylesFormBaseA.formContainer}>
                                <form onSubmit={handleAddressSubmit} className={stylesFormBaseA.baseForm}>
                                    <label htmlFor="rua" className={stylesFormBaseA.label}>
                                        Rua
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiRoadMapLine />
                                        <input
                                            type="text"
                                            id="rua"
                                            value={userData.rua}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>

                                    <label htmlFor="numero" className={stylesFormBaseA.label}>
                                        Número
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiHome8Line />
                                        <input
                                            type="text"
                                            id="numero"
                                            value={userData.numero}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>

                                    <label htmlFor="complemento" className={stylesFormBaseA.label}>
                                        Complemento
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMapPinUserLine />
                                        <input
                                            type="text"
                                            id="complemento"
                                            value={userData.complemento}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                        />
                                    </div>

                                    <label htmlFor="bairro" className={stylesFormBaseA.label}>
                                        Bairro
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiGroup2Line />
                                        <input
                                            type="text"
                                            id="bairro"
                                            value={userData.bairro}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>

                                    <label htmlFor="cidade" className={stylesFormBaseA.label}>
                                        Cidade
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiCommunityLine />
                                        <input
                                            type="text"
                                            id="cidade"
                                            value={userData.cidade}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>

                                    <label htmlFor="estado" className={stylesFormBaseA.label}>
                                        Estado
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMapPinRangeLine />
                                        <input
                                            type="text"
                                            id="estado"
                                            value={userData.estado}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>

                                    <label htmlFor="cep" className={stylesFormBaseA.label}>
                                        CEP
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMapLine />
                                        <input
                                            type="text"
                                            id="cep"
                                            value={userData.cep}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField}
                                            required
                                        />
                                    </div>

                                    <button type="submit" className={stylesFormBaseA.buttonBase}>
                                        Salvar Alterações
                                    </button>
                                </form>
                            </div>
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
                title="EDITADO COM SUCESSO"
                text={successMessage}
                isVisible={showSuccess}
            />

            <ModalMensagemFalha
                title={modalTitle}
                text={modalMessage}
                isVisible={showModal}
            />
        </div>
    );
}

export default EditarDados;
