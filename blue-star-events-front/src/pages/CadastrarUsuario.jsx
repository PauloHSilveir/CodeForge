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

    const handleNavigate = (path) => {
        navigate(path);
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
                        <form action="#" className={stylesFormBaseA.baseForm}>
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
                                />
                            </div>

                            <button
                                className={stylesFormBaseA.buttonBase}
                                onClick={() => handleNavigate('/cadastrarendereco')}
                            >
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
        </div >
    );
}

export default CadastrarUsuario;

