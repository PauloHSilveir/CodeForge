import { useState } from 'react';
import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    RiLockPasswordLine,
    RiArrowLeftCircleLine
} from '@remixicon/react';

function CriarNovaSenha() {
    const [novaSenha, setNovaSenha] = useState('');
    const [novaSenhaConfirma, setNovaSenhaConfirma] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    // Extraímos o token e o email da URL ou outro meio
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    const email = queryParams.get('email');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (novaSenha !== novaSenhaConfirma) {
            setError('As senhas não coincidem.');
            return;
        }

        setError('');
        try {
            const response = await fetch('http://localhost:3333/users/reset_password?token=' + token + '&email=' + email, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, token, password: novaSenha }),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccess('Senha alterada com sucesso!');
                setError('');
                setTimeout(() => navigate('/login'), 2000);
            } else {
                setError(data.message || 'Erro ao redefinir a senha.');
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor. Tente novamente mais tarde.', err);
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
                            {error && <p className={stylesFormBaseA.errorText}>{error}</p>}
                            {success && <p className={stylesFormBaseA.successText}>{success}</p>}
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
        </div>
    );
}

export default CriarNovaSenha;
