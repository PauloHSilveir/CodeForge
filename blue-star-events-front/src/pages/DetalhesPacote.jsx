import React, { useState, useEffect } from 'react';
import NavBar from "../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../styles/DetalhesPacote.module.css";

const BASE_URL = 'http://localhost:1313';

function DetalhesPacote() {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [pacoteDetalhes, setPacoteDetalhes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const location = useLocation();
    const pacoteBasico = location.state;

    useEffect(() => {
        const fetchPacoteDetalhes = async () => {
            if (!pacoteBasico?.id) {
                setError('Pacote não encontrado');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${BASE_URL}/pacote/${pacoteBasico.id}`);
                if (!response.ok) {
                    throw new Error('Erro ao carregar detalhes do pacote');
                }
                const data = await response.json();
                setPacoteDetalhes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchPacoteDetalhes();
    }, [pacoteBasico?.id]);

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleQuantityChange = (e) => {
        setQuantity(parseInt(e.target.value));
    };

    // Agrupar componentes por categoria
    const getComponentesPorCategoria = (categoria) => {
        if (!pacoteDetalhes?.componentes) return [];
        return pacoteDetalhes.componentes
            .filter(comp => comp.categoria.toLowerCase() === categoria.toLowerCase())
            .map(comp => ({
                nome: comp.name,
                quantidade: comp.PacoteComponente.quantidade_componente
            }));
    };

    if (loading) return <div className={styles.mediumText}>Carregando...</div>;
    if (error) return <div className={styles.mediumText}>{error}</div>;
    if (!pacoteDetalhes) return <p className={styles.mediumText}>Pacote não encontrado. Volte à lista.</p>;

    const profissionais = getComponentesPorCategoria("Funcionarios");
    const itens = getComponentesPorCategoria("Itens");
    const comidas = getComponentesPorCategoria("Comidas");

    return (
        <div>
            <NavBar />
            <div className={styles.mainContainer}>
                <div className={styles.container}>
                    <div className={styles.containerPackage}>
                        <div className={styles.containerImage}>
                            <img
                                src={pacoteDetalhes.imagem}
                                alt={pacoteDetalhes.name}
                                className={styles.packageImage}
                            />
                        </div>

                        <div className={styles.containerText}>
                            <p className={styles.bigText}>{pacoteDetalhes.name}</p>
                            <p className={styles.priceText}>
                                R$ {parseFloat(pacoteDetalhes.preco).toLocaleString('pt-BR', { 
                                    minimumFractionDigits: 2, 
                                    maximumFractionDigits: 2 
                                })}
                            </p>
                            <p className={styles.mediumText}>Descrição do pacote: </p>
                            <p className={styles.smallText}>{pacoteDetalhes.description}</p>

                            <div className={styles.quantitySection}>
                                <label htmlFor="quantity" className={styles.quantityText}>Quantidade:</label>
                                <select
                                    id="quantity"
                                    value={quantity}
                                    onChange={handleQuantityChange}
                                    className={styles.quantitySelect}
                                >
                                    {[...Array(pacoteDetalhes.disponibilidade)].map((_, i) => (
                                        <option key={i + 1} value={i + 1}>{i + 1}</option>
                                    ))}
                                </select>
                            </div>

                            <div className={styles.buttonSection}>
                                <button className={`${styles.buttons} ${styles.addToCartButton}`}>
                                    ADICIONAR AO CARRINHO
                                </button>
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
                            {profissionais.length > 0 ? (
                                profissionais.map((prof, index) => (
                                    <li key={index} className={styles.listItem}>
                                        <span className={styles.smallText}>
                                            {prof.nome} ({prof.quantidade})
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className={styles.listItem}>
                                    <span className={styles.smallText}>Nenhum profissional disponível</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <p className={styles.mediumText}>Itens:</p>
                        <ul className={styles.infoList}>
                            {itens.length > 0 ? (
                                itens.map((item, index) => (
                                    <li key={index} className={styles.listItem}>
                                        <span className={styles.smallText}>
                                            {item.nome} ({item.quantidade})
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className={styles.listItem}>
                                    <span className={styles.smallText}>Nenhum item disponível</span>
                                </li>
                            )}
                        </ul>
                    </div>

                    <div className={styles.column}>
                        <p className={styles.mediumText}>Comidas:</p>
                        <ul className={styles.infoList}>
                            {comidas.length > 0 ? (
                                comidas.map((comida, index) => (
                                    <li key={index} className={styles.listItem}>
                                        <span className={styles.smallText}>
                                            {comida.nome} ({comida.quantidade})
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className={styles.listItem}>
                                    <span className={styles.smallText}>Nenhuma comida disponível</span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetalhesPacote;