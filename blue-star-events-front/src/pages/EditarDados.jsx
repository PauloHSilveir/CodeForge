import React, { useState, useEffect } from 'react';
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

const BASE_URL = 'http://localhost:1313';

function EditarDados() {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
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
    
    // Assumindo que você tem o ID do usuário armazenado em algum lugar
    const userId = '4'; // Substitua pela forma como você armazena o ID do usuário

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
        } catch (error) {
            console.error('Erro:', error);
            // Adicione tratamento de erro apropriado aqui
        }
    };

    const handlePersonalDataSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/user/update/personal/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: userData.name,
                    cpf: userData.cpf,
                    email: userData.email,
                    phone: userData.phone,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar dados pessoais');
            }

            alert('Dados pessoais atualizados com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao atualizar dados pessoais');
        }
    };

    const handleAddressSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BASE_URL}/user/update/address/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rua: userData.rua,
                    numero: userData.numero,
                    complemento: userData.complemento,
                    bairro: userData.bairro,
                    cidade: userData.cidade,
                    estado: userData.estado,
                    cep: userData.cep,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao atualizar endereço');
            }

            alert('Endereço atualizado com sucesso!');
        } catch (error) {
            console.error('Erro:', error);
            alert('Erro ao atualizar endereço');
        }
    };

    const handleDeleteAccount = async () => {
        try {
            
            const response = await fetch(`${BASE_URL}/user/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error('Erro ao excluir conta');
            }

            alert('Conta excluída com sucesso!');
            navigate('/login'); // ou para onde você quiser redirecionar após a exclusão
        } catch (error) {
            
            console.error('Erro:', error);
            alert('Erro ao excluir conta');
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
                                    <span className={stylesPerfil.bigText}> Bem Vindo, {userData.name} </span>
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
                                    EDITE SEU ENDEREÇO
                                </div>
                            </div>
                            <div className={stylesFormBaseA.formContainer}>
                                <form onSubmit={handleAddressSubmit} className={stylesFormBaseA.baseForm}>
                                    <label htmlFor="rua" className={stylesFormBaseA.label}>
                                        Logradouro
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

                                    <label
                                        htmlFor="numero"
                                        className={stylesFormBaseA.label}
                                    >
                                        Número
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMapPinUserLine />
                                        <input 
                                            type="text" 
                                            id="numero" 
                                            value={userData.numero}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField} 
                                            required 
                                        />
                                    </div>

                                    <label
                                        htmlFor="complemento"
                                        className={stylesFormBaseA.label}
                                    >
                                        Complemento
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiHome8Line />
                                        <input 
                                            type="text" 
                                            id="complemento" 
                                            value={userData.complemento}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField} 
                                        />
                                    </div>

                                    <label
                                        htmlFor="bairro"
                                        className={stylesFormBaseA.label}
                                    >
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

                                    <label
                                        htmlFor="cidade"
                                        className={stylesFormBaseA.label}
                                    >
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

                                    <label
                                        htmlFor="estado"
                                        className={stylesFormBaseA.label}
                                    >
                                        Estado
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMapLine />
                                        <input 
                                            type="text" 
                                            id="estado" 
                                            value={userData.estado}
                                            onChange={handleInputChange}
                                            className={stylesFormBaseA.inputField} 
                                            required 
                                        />
                                    </div>

                                    <label
                                        htmlFor="cep"
                                        className={stylesFormBaseA.label}
                                    >
                                        CEP
                                    </label>
                                    <div className={stylesFormBaseA.inputs}>
                                        <RiMapPinRangeLine />
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

            <ModalExcluir isOpen={isModalOpen} onClose={closeModal} onConfirm={handleDeleteAccount}>
                <p>DESEJA REALMENTE <strong>EXCLUIR</strong> SUA CONTA<strong> PERMANENTEMENTE</strong>?</p>
            </ModalExcluir>
        </div>
    );
}

export default EditarDados;