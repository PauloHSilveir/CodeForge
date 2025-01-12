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

function Login() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
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
                        <form action="#" className={stylesFormBaseA.baseForm}>
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
                                    required
                                />
                            </div>

                            <button
                                className={stylesFormBaseA.buttonBase}
                                onClick={() => handleNavigate('/')}
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
        </div >
    );
}

export default Login;

