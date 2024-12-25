import React from 'react';
import NavBar from '../components/Navbar'
import '../styles/Home.css'

function Home() {
    const handleClick = () => {
        console.log("Botão clicado!");
    }
        
    return (
        <body>
            <NavBar />
            <div className='background-image'>
                <div className='Textos'>
                    <div className='big-text'>
                        Transformando momentos em memórias inesquecíveis.
                    </div>
                    <ul className='custom-list small-text'>
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
                    <button className = 'buttons-home cons-pac' onClick={handleClick}>Consultar Pacotes</button>
                    <button className = 'buttons-home orc-per' onClick={handleClick}>Obter Orçamento Personalizado</button>
                </div>
            </div>
        </body>
    );
}

export default Home;
