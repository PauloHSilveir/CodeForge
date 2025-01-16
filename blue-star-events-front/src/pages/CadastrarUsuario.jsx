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

// Função para formatar CPF
const formatCPF = (cpf) => {
    const numbers = cpf.replace(/\D/g, '');
    return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

// Função para formatar telefone
const formatPhone = (phone) => {
    const numbers = phone.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

// Função para validar email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

function CadastrarUsuario() {
    const navigate = useNavigate();

    const [name, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setTelefone] = useState('');
    const [password, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validação básica de email
        if (!isValidEmail(email)) {
            alert('Por favor, insira um email válido');
            return;
        }

        // Validação de senha
        if (password !== confirmarSenha) {
            alert('As senhas não conferem!');
            return;
        }

        if (password.length < 8) {
            alert('A senha deve ter pelo menos 8 caracteres');
            return;
        }

        // Se passou pelas validações, continua com o código original
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
                                    className={`${stylesFormBaseA.inputField} ${email && !isValidEmail(email) ? stylesFormBaseA.inputError : ''}`}
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onBlur={(e) => {
                                        if (e.target.value && !isValidEmail(e.target.value)) {
                                            alert('Por favor, insira um email válido');
                                        }
                                    }}
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
        </div>
    );
}

export default CadastrarUsuario;
