import { useState } from 'react';
import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import stylesRedefinirSenha from '../styles/RedefinirSenha.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    RiMailLine,
    RiArrowLeftCircleLine
} from '@remixicon/react';
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";

function RedefinirSenha() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModalS, setShowModalSuccess] = useState(false);
    const [showModalF, setShowModalFail] = useState(false);
    const navigate = useNavigate();

    const showModalSuccess = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowModalSuccess(true);

        setTimeout(() => {
            setShowModalSuccess(false);
        }, 2000);
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
        setLoading(true);

        try {
            const response = await fetch('http://localhost:1313/user/forgot_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                showModalSuccess(
                    "E-MAIL ENVIADO",
                    "Confira seu e-mail para achar o link de criar uma nova senha."
                );
            } else {
                showModalFail(
                    "ERRO AO ENVIAR E-MAIL",
                    data.message || "Erro ao enviar o e-mail. Tente novamente."
                );
            }
        } catch (err) {
            showModalFail(
                "ERRO NO SERVIDOR",
                "Erro ao conectar ao servidor. Tente novamente mais tarde."
            );
        } finally {
            setLoading(false);
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
                            onClick={() => !loading && navigate('/login')}
                        />
                        <div className={stylesFormBaseA.bigText}>
                            REDEFINIR SENHA
                        </div>
                    </div>

                    <div className={`${stylesRedefinirSenha.message} ${stylesFormBaseA.smallText}`}>
                        Insira seu e-mail para que possamos redefinir sua senha.
                    </div>

                    <div className={stylesFormBaseA.formContainer}>
                        <form onSubmit={handleSubmit} className={stylesFormBaseA.baseForm}>
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
                                    disabled={loading}
                                    required
                                />
                            </div>

                            <button
                                className={stylesFormBaseA.buttonBase}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Enviando...' : 'Continuar'}
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

            {/* Modal de sucesso */}
            <ModalMensagemSucesso
                title={modalTitle}
                text={modalMessage}
                isVisible={showModalS}
            />

            {/* Modal de falha */}
            <ModalMensagemFalha
                title={modalTitle}
                text={modalMessage}
                isVisible={showModalF}
            />
        </div>
    );
}

export default RedefinirSenha;
