import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import stylesLogin from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    RiLoginBoxLine,
    RiMailLine,
    RiLockPasswordLine,
    RiArrowLeftCircleLine
} from '@remixicon/react';
import { useState } from "react";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";

function Login() {
    const navigate = useNavigate();
    const [userType, setUserType] = useState("cliente");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [showSucessLogin, setShowSucessLogin] = useState(false);
    const [showShortPassword, setShowShortPassword] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (senha.length < 8) {
            setShowShortPassword(true);

            setTimeout(() => {
                setShowShortPassword(false);
            }, 1500);

            return;
        }

        if (userType === "cliente") {
            console.log("Buscando na tabela cliente...");
        } else {
            console.log("Buscando na tabela admin...");
        }

        setShowSucessLogin(true);

        setTimeout(() => {
            setShowSucessLogin(false);
            handleNavigate('/');
        }, 1500);

    };


    return (
        <div>
            <NavBar />
            <div className={stylesFormBaseA.backgroundImage}>
                <div className={stylesFormBaseA.container}>
                    <div className={stylesFormBaseA.legendContainer}>
                        <RiArrowLeftCircleLine
                            className={stylesFormBaseA.iconBack}
                            onClick={() => navigate('/')}
                        />
                        <div className={stylesFormBaseA.bigText}>
                            ACESSE SUA CONTA
                        </div>
                    </div>
                    <div className={stylesFormBaseA.formContainer}>
                        <form
                            onSubmit={handleSubmit}
                            className={stylesFormBaseA.baseForm}
                        >
                            <label htmlFor="email" className={stylesFormBaseA.label}>
                                Email
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiMailLine />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Digite seu e-mail"
                                    className={stylesFormBaseA.inputField}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
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
                                    value={senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    required
                                />
                            </div>

                            <div className={stylesLogin.radioGroup}>
                                <label className={`${stylesFormBaseA.label} ${stylesLogin.radioLabel}`}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="cliente"
                                        checked={userType === "cliente"}
                                        onChange={() => setUserType("cliente")}
                                        className={stylesLogin.radioInput}
                                    />
                                    Cliente
                                </label>
                                <label className={`${stylesFormBaseA.label} ${stylesLogin.radioLabel}`}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="admin"
                                        checked={userType === "admin"}
                                        onChange={() => setUserType("admin")}
                                        className={stylesLogin.radioInput}
                                    />
                                    Admin
                                </label>
                            </div>

                            <button
                                type="submit"
                                className={stylesFormBaseA.buttonBase}
                            >
                                <RiLoginBoxLine /> Entrar
                            </button>

                            <Link to="/redefinirsenha" className={stylesLogin.forgotPass}>
                                Esqueceu a senha?
                            </Link>
                        </form>
                    </div>
                    <div className={stylesFormBaseA.register}>
                        <span className={stylesFormBaseA.smallText}>
                            Não tem uma conta?
                        </span>

                        <Link to="/cadastrarusuario" className={stylesFormBaseA.blueBolder}>
                            CADASTRE-SE
                        </Link>
                    </div>
                </div>
            </div>
            <ModalMensagemSucesso
                title="FAZER LOGIN"
                text="Login realizado com sucesso! Redirecionando..."
                isVisible={showSucessLogin}
            />

            <ModalMensagemFalha
                title="SENHA INVÁLIDA"
                text="A senha deve conter no mínimo 8 caracteres!"
                isVisible={showShortPassword}
            />
        </div>
    );
}

export default Login;
