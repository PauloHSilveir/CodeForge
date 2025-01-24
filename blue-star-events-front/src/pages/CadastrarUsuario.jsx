import React, { useState } from 'react';
import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import stylesCadastrarUsuario from '../styles/CadastrarUsuario.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    RiArrowLeftCircleLine,
    RiUserLine,
    RiIdCardLine,
    RiMailLine,
    RiPhoneLine,
    RiLockPasswordLine
} from '@remixicon/react';
import ModalMensagemFalha from "../components/ModalMensagemFalha";

const formatCPF = (cpf) => {
    const numbers = cpf.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

const formatPhone = (phone) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

const isValidCPF = (cpf) => {
    const cleanCPF = cpf.replace(/\D/g, '');
    return cleanCPF.length === 11; 
};

const isValidPhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, '');
    return /^(\d{2})(\d{5})(\d{4})$/.test(cleanPhone);
};

function CadastrarUsuario() {
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalTitle, setModalTitle] = useState("");

    const [name, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setTelefone] = useState('');
    const [password, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const showModalFail = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (!isValidCPF(cpf)) {
            showModalFail("CPF INVÁLIDO", "Por favor, insira um CPF válido.");
            return;
        }

        if (!isValidPhone(phone)) {
            showModalFail("TELEFONE INVÁLIDO", "Por favor, insira um telefone válido.");
            return;
        }

        if (password !== confirmarSenha) {
            showModalFail("SENHAS NÃO CONFEREM", "As senhas digitadas são diferentes.");
            return;
        }

        if (password.length < 8) {
            showModalFail("SENHA INVÁLIDA", "A senha deve conter no mínimo 8 caracteres!");
            return;
        }

        const userData = { name, cpf: formatCPF(cpf), email, phone: formatPhone(phone), password };
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate('/cadastrarendereco');
    };

    return (
        <div>
            <NavBar />
            <div className={stylesFormBaseA.backgroundImage}>
                <div className={`${stylesFormBaseA.container} ${stylesCadastrarUsuario.container}`}>
                    <div className={stylesFormBaseA.legendContainer}>
                        <RiArrowLeftCircleLine
                            className={stylesFormBaseA.iconBack}
                            onClick={() => navigate('/')}
                        />

                        <div className={stylesFormBaseA.bigText}>
                            INSIRA SEUS DADOS
                        </div>
                    </div>
                    <div className={stylesFormBaseA.formContainer}>
                        <form onSubmit={handleSubmit} className={stylesFormBaseA.baseForm}>
                            <label htmlFor="nome" className={stylesFormBaseA.label}>
                                Nome
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiUserLine />
                                <input
                                    type="text"
                                    id="nome"
                                    placeholder="Digite seu nome"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={name}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>

                            <label htmlFor="cpf" className={stylesFormBaseA.label}>
                                CPF
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiIdCardLine />
                                <input
                                    type="text"
                                    id="cpf"
                                    placeholder="Digite seu CPF"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </div>

                            <label htmlFor="email" className={stylesFormBaseA.label}>
                                Email
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiMailLine />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Digite seu email"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <label htmlFor="telefone" className={stylesFormBaseA.label}>
                                Telefone
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiPhoneLine />
                                <input
                                    type="text"
                                    id="telefone"
                                    placeholder="Digite seu telefone"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={phone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                />
                            </div>

                            <label htmlFor="senha" className={stylesFormBaseA.label}>
                                Senha
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiLockPasswordLine />
                                <input
                                    type="password"
                                    id="senha"
                                    placeholder="Digite sua senha"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={password}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>

                            <label htmlFor="confirmarSenha" className={stylesFormBaseA.label}>
                                Confirme a senha
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiLockPasswordLine />
                                <input
                                    type="password"
                                    id="confirmarSenha"
                                    placeholder="Digite novamente a senha"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                />
                            </div>

                            <button type="submit" className={stylesFormBaseA.buttonBase}>
                                Próximo
                            </button>
                        </form>
                    </div>
                    <div className={stylesFormBaseA.register}>
                        <span className={stylesFormBaseA.smallText}>
                            Já possui uma conta?
                        </span>
                        <Link to="/login" className={stylesFormBaseA.blueBolder}>
                            ENTRAR
                        </Link>
                    </div>
                </div>
            </div>
            <ModalMensagemFalha
                title={modalTitle}
                text={modalMessage}
                isVisible={showModal}
            />
        </div>
    );
}

export default CadastrarUsuario;
