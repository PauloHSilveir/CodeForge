import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import stylesRedefinirSenha from '../styles/RedefinirSenha.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    RiMailLine,
    RiArrowLeftCircleLine
} from '@remixicon/react';

function RedefinirSenha() {
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
                            onClick={() => navigate('/login')}
                        />
                        <div className={stylesFormBaseA.bigText}>
                            REDEFINIR SENHA
                        </div>
                    </div>

                    <div className={`${stylesRedefinirSenha.message} ${stylesFormBaseA.smallText}`}>
                        Insira seu e-mail para que possamos redefinir sua senha.
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

                            <button
                                className={stylesFormBaseA.buttonBase}
                                onClick={() => handleNavigate('/criarnovasenha')}
                            >
                                Continuar
                            </button>
                        </form>

                    </div>
                    <div className={stylesFormBaseA.register}>
                        <span className={stylesFormBaseA.smallText}>
                            Não tem uma conta?
                        </span>

                        <Link
                            to="/cadastrarusuario"
                            className={stylesFormBaseA.blueBolder}
                        >
                            CADASTRE-SE
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RedefinirSenha;

