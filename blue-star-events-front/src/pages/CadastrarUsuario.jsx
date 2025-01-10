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

        // Salvar os dados no localStorage
        const userData = { name, cpf, email, phone, password };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Navegar para a página de endereço
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
                        <span className={stylesFormBaseA.smallText}>Já possui uma conta?</span>
                        <Link to="/login" className={stylesFormBaseA.blueBolder}>ENTRAR</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastrarUsuario;