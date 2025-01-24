import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import stylesLogin from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
import {
    RiLoginBoxLine,
    RiMailLine,
    RiLockPasswordLine,
    RiArrowLeftCircleLine
} from '@remixicon/react';
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [userType, setUserType] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showSucessLogin, setShowSucessLogin] = useState(false);

    const navigate = useNavigate();

    const showModalFail = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowModal(true);

        setTimeout(() => {
            setShowModal(false);
        }, 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (senha.length < 8) {
            showModalFail('SENHA INVÁLIDA', 'A senha deve conter no mínimo 8 caracteres!');
            return;
        }

        try {
            const response = await fetch('http://localhost:1313/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email: email, password: senha, userType: userType, islogged:true }),
            });

            const data = await response.json();

            if (response.status === 200) {
                localStorage.setItem("authToken", data.token);
                localStorage.setItem("isLoggedIn", true);
                localStorage.setItem("userType", userType ? "admin" : "client");

                setShowSucessLogin(true);

                setTimeout(() => {
                    setShowSucessLogin(false);
                    if (userType) {
                        navigate('/gerenciarsistema');
                    } else {
                        navigate('/');
                    }
                }, 1500);
            } else {
                showModalFail('ERRO DE LOGIN', data.message || 'Erro ao tentar fazer login. Verifique suas credenciais.');
            }
        } catch (error) {
            console.error('Erro ao tentar logar:', error);
            showModalFail('ERRO DE CONEXÃO', 'Não foi possível conectar ao servidor. Tente novamente mais tarde.');
        }
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
                                        value="client"
                                        checked={!userType}
                                        onChange={() => setUserType(false)} 
                                        className={stylesLogin.radioInput}
                                    />
                                    Cliente
                                </label>
                                <label className={`${stylesFormBaseA.label} ${stylesLogin.radioLabel}`}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="admin"
                                        checked={userType}
                                        onChange={() => setUserType(true)}
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
                title={modalTitle}
                text={modalMessage}
                isVisible={showModal}
            />
        </div>
    );
}

export default Login;