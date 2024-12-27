import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    RiLockPasswordLine,
    RiArrowLeftCircleLine
} from '@remixicon/react';

function CriarNovaSenha() {
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
                            onClick={() => navigate('/redefinirsenha')}
                        />
                        <div className={stylesFormBaseA.bigText}>
                            REDEFINIR SENHA
                        </div>
                    </div>
                    <div className={stylesFormBaseA.formContainer}>
                        <form action="#" className={stylesFormBaseA.baseForm}>
                            <label htmlFor="novaSenha" className={stylesFormBaseA.label}>
                                Nova Senha
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiLockPasswordLine />
                                <input type="password" id= "novaSenha" placeholder="Digite sua nova senha" className={stylesFormBaseA.inputField} required />
                            </div>
                            <label htmlFor="confirmarSenha" className={stylesFormBaseA.label}>
                                Confirme a senha
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiLockPasswordLine />
                                <input type="password" id= "confirmarSenha" placeholder="Confirme a nova senha" className={stylesFormBaseA.inputField} required />
                            </div>
                            <button className={stylesFormBaseA.buttonBase} onClick={() => handleNavigate('/')}>
                                Redefinir
                            </button>
                        </form>

                    </div>
                    <div className={stylesFormBaseA.register}>
                        <span className={stylesFormBaseA.smallText}>Não tem uma conta?</span>
                        <Link to="/cadastrarusuario" className={stylesFormBaseA.blueBolder}>CADASTRE-SE</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CriarNovaSenha;

