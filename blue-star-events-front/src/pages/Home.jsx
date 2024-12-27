import React from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/Navbar';
import stylesHome from '../styles/Home.module.css';

function Home() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div>
            <NavBar />
            <div className={stylesHome.backgroundImage}>
                <div className={stylesHome.container}>
                    <div className={stylesHome.bigText}>
                        Transformando momentos em memórias inesquecíveis.
                    </div>
                    <ul className={stylesHome.customList}>
                        <li>
                            Qualquer trabalho que você possa imaginar.
                        </li>
                        <li>
                            Celebre sem preocupações! Nós organizamos, você aproveita.
                        </li>
                        <li>
                            Com Blue Star Events, seu evento brilha mais forte!
                        </li>
                    </ul>
                    <button className={`${stylesHome.buttonsHome} ${stylesHome.consPac}`} onClick={() => handleNavigate('/consultarpacotes')}>
                        Consultar Pacotes
                    </button>
                    <button className={`${stylesHome.buttonsHome} ${stylesHome.orcPer}`} onClick={() => handleNavigate('/obterorcamentopersonalizado')}>
                        Obter Orçamento Personalizado
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
