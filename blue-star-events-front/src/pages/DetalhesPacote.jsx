import React, { useState } from 'react';
import NavBar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/DetalhesPacote.module.css";

function DetalhesPacote() {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);

    const location = useLocation();
    const pacote = location.state;

    console.log(pacote); 

    if (!pacote) {
        return <p className={styles.mediumText}>Pacote não encontrado. Volte à lista.</p>;
    }

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    return (
        <div>
            <NavBar />
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <div className={styles.containerPackage}>
                        <div className={styles.containerImage}>
                            <img
                                src={pacote.imagem}
                                alt={pacote.nome}
                                className={styles.packageImage}
                            />
                        </div>

                        <div className={styles.containerText}>
                            <p className={styles.bigText}>{pacote.nome}</p>
                            <p className={styles.priceText}>R$ {pacote.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                            <p className={styles.mediumText}>Descrição do pacote: </p>
                            <p className={styles.smallText}>{pacote.descricao}</p>

                            <div className={styles.quantitySection}>
                                <label htmlFor="quantity" className={styles.quantityText}>Quantidade:</label>
                                <select
                                    id="quantity"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className={styles.quantitySelect}
                                >
                                    {[1, 2, 3, 4, 5].map((num) => (
                                        <option key={num} value={num}>{num}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.buttonSection}>
                                <button className={`${styles.buttons} ${styles.addToCartButton}`}>ADICIONAR AO CARRINHO</button>
                                <button
                                    className={`${styles.buttons} ${styles.backButton}`}
                                    onClick={() => handleNavigate('/consultarpacotes')}
                                >
                                    VOLTAR
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.containerInfos}>
                    <div className={styles.column}>
                        <p className={styles.mediumText}>Profissionais:</p>
                        <ul className={styles.infoList}>
                            <li className={styles.listItem}><span className={styles.smallText}>Decorador</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Cerimonialista</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Cantor</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Fotógrafo</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Barman</span></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <p className={styles.mediumText}>Itens:</p>
                        <ul className={styles.infoList}>
                            <li className={styles.listItem}><span className={styles.smallText}>Cadeira</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Mesas</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Decoração</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Palco</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Iluminação</span></li>
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <p className={styles.mediumText}>Comidas:</p>
                        <ul className={styles.infoList}>
                            <li className={styles.listItem}><span className={styles.smallText}>Bolo</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Doces</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Salgadinhos</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Aperitivos</span></li>
                            <li className={styles.listItem}><span className={styles.smallText}>Refrigerante</span></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalhesPacote;