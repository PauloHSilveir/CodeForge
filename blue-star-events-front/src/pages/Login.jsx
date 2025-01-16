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

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [userType, setUserType] = useState("false");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:1313/user/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email: email, password: senha, userType: userType, islogged: true }),
            });

            const data = await response.json();

            localStorage.setItem("authToken", data.token);

            if (response.status === 200) {
                console.log('Logado com sucesso');

                if (userType) {
                    navigate('/gerenciarsistema');
                } else {
                    navigate('/'); 
                }
            } else if (response.status === 401) {
                console.log('Não autorizado');
                setError({ message: data.message });
            }
        } catch (error) {
            setError({ message: error.message });
            console.error('Erro ao tentar logar:', error);
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
                    {error && <div className="error">{error.message}</div>}
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
                                        value="false"
                                        checked={userType === false}
                                        onChange={() => setUserType(false)} //Cliente
                                        className={stylesLogin.radioInput}
                                    />
                                    Cliente
                                </label>
                                <label className={`${stylesFormBaseA.label} ${stylesLogin.radioLabel}`}>
                                    <input
                                        type="radio"
                                        name="userType"
                                        value="true"
                                        checked={userType === true}
                                        onChange={() => setUserType(true)} //Admin
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
        </div>
    );
}

export default Login;
