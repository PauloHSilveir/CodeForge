import NavBar from "../components/Navbar";
import stylesLogin from '../styles/Login.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    RiLoginBoxLine,
    RiMailLine,
    RiLockPasswordLine
} from '@remixicon/react';

function Login() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div>
            <NavBar />
            <div className={stylesLogin.backgroundImage}>
                <div className={stylesLogin.container}>
                    <div className={stylesLogin.bigText}>
                        ACESSE SUA CONTA
                    </div>
                    <div className={stylesLogin.loginContainer}>
                        <form action="#" className={stylesLogin.loginForm}>
                            <div className={stylesLogin.inputs}>
                                <RiMailLine />
                                <input type="email" placeholder="Digite seu e-mail" className={stylesLogin.inputField} required />
                            </div>
                            <div className={stylesLogin.inputs}>
                                <RiLockPasswordLine />
                                <input type="password" placeholder="Digite sua senha" className={stylesLogin.inputField} required />
                            </div>

                            <button className={stylesLogin.buttonLogin} onClick={() => handleNavigate('/')}>
                                <RiLoginBoxLine /> Entrar
                            </button>
                            <Link to="/redefinirsenha" className={stylesLogin.forgotPass}>Esqueceu a senha?</Link>
                        </form>

                    </div>
                    <div className={stylesLogin.register}>
                        <span className={stylesLogin.smallText}>Não tem uma conta?</span>
                        <Link to="/cadastrar" className={stylesLogin.blueBolder}>CADASTRE-SE</Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Login;

