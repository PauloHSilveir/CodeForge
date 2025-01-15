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

function RedefinirSenha() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

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
                setSuccess('Email enviado com sucesso!');
                setError('');
                setTimeout(() => navigate('/'), 2000); 
            } else {
                setError(data.message || 'Erro ao enviar o e-mail.');
                setSuccess('');
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor. Tente novamente mais tarde.', err);
            setSuccess('');
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
                                    disabled={loading} // Bloqueia o campo durante a requisição
                                    required
                                />
                            </div>
                            {error && (
                                <p className={stylesFormBaseA.errorText}>{error}</p>
                            )}
                            {success && (
                                <p className={stylesFormBaseA.successText}>{success}</p>
                            )}
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
        </div>
    );
}

export default RedefinirSenha;
