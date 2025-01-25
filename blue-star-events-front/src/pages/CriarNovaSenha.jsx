import { useState } from 'react';
import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    RiLockPasswordLine,
    RiArrowLeftCircleLine
} from '@remixicon/react';
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";

function CriarNovaSenha() {
    const [novaSenha, setNovaSenha] = useState('');
    const [novaSenhaConfirma, setNovaSenhaConfirma] = useState('');
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModalS, setShowModalSuccess] = useState(false);
    const [showModalF, setShowModalFail] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    const showModalSuccess = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowModalSuccess(true);

        setTimeout(() => {
            setShowModalSuccess(false);
            navigate('/login'); 
        }, 1500);
    };

    const showModalFail = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowModalFail(true);

        setTimeout(() => {
            setShowModalFail(false);
        }, 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (novaSenha.length < 8) {
            showModalFail('SENHA INVÁLIDA', 'A senha deve conter no mínimo 8 caracteres!');
            return;
        }

        if (novaSenha !== novaSenhaConfirma) {
            showModalFail("ERRO", "As senhas não coincidem.");
            return;
        }

        try {
            const response = await fetch('http://localhost:1313/user/reset_password?token=' + token + '&email=' + email, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, password: novaSenha }),
            });

            const data = await response.json();

            if (response.ok) {
                showModalSuccess("SUCESSO", "Senha alterada com sucesso!");
            } else {
                showModalFail("ERRO", data.message || 'Erro ao redefinir a senha.');
            }
        } catch (err) {
            showModalFail("ERRO NO SERVIDOR", "Erro ao conectar ao servidor. Tente novamente mais tarde.");
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
                            onClick={() => navigate('/redefinirsenha')}
                        />
                        <div className={stylesFormBaseA.bigText}>
                            REDEFINIR SENHA
                        </div>
                    </div>
                    <div className={stylesFormBaseA.formContainer}>
                        <form onSubmit={handleSubmit} className={stylesFormBaseA.baseForm}>
                            <label htmlFor="novaSenha" className={stylesFormBaseA.label}>
                                Nova Senha
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiLockPasswordLine />
                                <input
                                    type="password"
                                    id="novaSenha"
                                    placeholder="Digite sua nova senha"
                                    className={stylesFormBaseA.inputField}
                                    value={novaSenha}
                                    onChange={(e) => setNovaSenha(e.target.value)}
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
                                    placeholder="Confirme a nova senha"
                                    className={stylesFormBaseA.inputField}
                                    value={novaSenhaConfirma}
                                    onChange={(e) => setNovaSenhaConfirma(e.target.value)}
                                    required
                                />
                            </div>
                            <button className={stylesFormBaseA.buttonBase} type="submit">
                                Redefinir
                            </button>
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
                title={modalTitle}
                text={modalMessage}
                isVisible={showModalS}
            />

            <ModalMensagemFalha
                title={modalTitle}
                text={modalMessage}
                isVisible={showModalF}
            />
        </div>
    );
}

export default CriarNovaSenha;
