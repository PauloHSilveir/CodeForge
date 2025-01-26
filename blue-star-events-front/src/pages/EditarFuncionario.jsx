import React, { useState, useEffect } from 'react';
import NavBar from "../components/Navbar";
import stylesFormBaseA from "../styles/FormBaseA.module.css";
import stylesED from "../styles/EditarDados.module.css";
import stylesEF from "../styles/EditarFuncionario.module.css";
import { useNavigate, useParams } from 'react-router-dom';
import { formatCpf, formatPhone, formatCep } from '../utils/formatters';
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";
import {
    RiArrowLeftCircleLine,
    RiUserLine,
    RiIdCardLine,
    RiMailLine,
    RiPhoneLine,
    RiMoneyDollarCircleLine,
    RiRoadMapLine,
    RiMapPinUserLine,
    RiHome8Line,
    RiGroup2Line,
    RiCommunityLine,
    RiMapLine,
    RiMapPinRangeLine,
} from '@remixicon/react';

const BASE_URL = 'http://localhost:1313';

function EditarFuncionario() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        name: '',
        cpf: '',
        email: '',
        phone: '',
        salario: '',
        data_admissao: '',
        rua: '',
        numero: '',
        complemento: '',
        bairro: '',
        cidade: '',
        estado: '',
        cep: ''
    });

    const { userId } = useParams();

    useEffect(() => {
        if (userId) {
            fetchUserData(userId);
        }
    }, [userId]);

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`${BASE_URL}/admin/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();

            setUserData(prevData => ({
                ...prevData,
                ...data.admin,
                dataAdmissao: new Date(data.admin.data_admissao)
                    .toISOString()
                    .split("T")[0],
            }));
        } catch (error) {
            console.error('Erro ao buscar dados do funcionário:', error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/admin/update/personal/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify({
                    personalData: {
                        name: userData.name,
                        cpf: formatCpf(userData.cpf),
                        email: userData.email,
                        phone: formatPhone(userData.phone),
                    },
                    addressData: {
                        rua: userData.rua,
                        numero: userData.numero,
                        complemento: userData.complemento,
                        bairro: userData.bairro,
                        cidade: userData.cidade,
                        estado: userData.estado,
                        cep: formatCep(userData.cep),
                    },
                    adminData: {
                        salario: userData.salario,
                        dataAdmissao: userData.dataAdmissao,
                    },
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao atualizar suas informações pessoais.');
            }

            setShowSucess(true);

            setTimeout(() => {
                setShowSucess(false);
                navigate(-1);
            }, 1500);
        } catch (error) {
            console.error('Erro:', error.message);

            setShowFail(true);

            setTimeout(() => {
                setShowFail(false);
            }, 3000);
        }
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div>
            <NavBar />
            <div className={stylesED.backgroundImage}>
                <div className={`${stylesED.containerGeral} ${stylesEF.containerGeral}`}>
                    <div className={stylesED.containerDados}>
                        <div className={stylesFormBaseA.legendContainer}>
                            <RiArrowLeftCircleLine
                                className={stylesFormBaseA.iconBack}
                                onClick={() => handleNavigate('/gerenciarfuncionarios')}
                            />
                            <div className={stylesFormBaseA.bigText}>
                                EDITE OS DADOS
                            </div>
                        </div>
                        <div className={stylesFormBaseA.formContainer}>
                            <form onSubmit={handleSubmit} className={stylesFormBaseA.baseForm}>
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

                                <label
                                    htmlFor="phone"
                                    className={stylesFormBaseA.label}
                                >
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

                                <label
                                    htmlFor="salario"
                                    className={stylesFormBaseA.label}
                                >
                                    Salário
                                </label>
                                <div className={stylesFormBaseA.inputs}>
                                    <RiMoneyDollarCircleLine />
                                    <input
                                        type="number"
                                        id="salario"
                                        onChange={handleInputChange}
                                        className={stylesFormBaseA.inputField}
                                        value={userData.salario}
                                        required

                                    />
                                </div>

                                <label
                                    htmlFor="dataAdmissao"
                                    className={stylesFormBaseA.label}
                                >
                                    Data admissão
                                </label>
                                <div className={stylesFormBaseA.inputs}>
                                    <input
                                        type="date"
                                        id="dataAdmissao"
                                        className={stylesFormBaseA.inputField}
                                        onChange={handleInputChange}
                                        value={userData.dataAdmissao}
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
                                EDITE O ENDEREÇO
                            </div>
                        </div>
                        <div className={stylesFormBaseA.formContainer}>
                            <form onSubmit={handleSubmit} className={stylesFormBaseA.baseForm}>
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

            <ModalMensagemSucesso
                title="EDITAR CONTA"
                text="Conta editada com sucesso!"
                isVisible={showSucess}
            />

            <ModalMensagemFalha
                title="EDITAR CONTA"
                text="Erro ao editar a conta!"
                isVisible={showFail}
            />
        </div>

    );
}

export default EditarFuncionario;