import React, { useState, useEffect } from 'react';
import NavBar from "../../components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "../../styles/DetalhesPacote.module.css";
import { jwtDecode } from 'jwt-decode';
import ModalMensagemSucesso from "../../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../../components/ModalMensagemFalha";

const BASE_URL = 'http://localhost:1313';

function DetalhesPacote() {
    const navigate = useNavigate();
    const [quantity, setQuantity] = useState(1);
    const [pacoteDetalhes, setPacoteDetalhes] = useState(null);
    const [loading, setLoading] = useState(true);

    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showFailModal, setShowFailModal] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalMessage, setModalMessage] = useState('');

    const showModalSuccess = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowSuccessModal(true);

        setTimeout(() => {
            setShowSuccessModal(false);
        }, 2000);
    };

    const showModalFail = (title, message) => {
        setModalTitle(title);
        setModalMessage(message);
        setShowFailModal(true);

        setTimeout(() => {
            setShowFailModal(false);
        }, 2000);
    };

    const location = useLocation();
    const pacoteBasico = location.state;

    useEffect(() => {
        const fetchPacoteDetalhes = async () => {
            if (!pacoteBasico?.id) {
                showModalFail('ERRO', 'Pacote não encontrado');
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
                showModalFail('ERRO', err.message);
                setLoading(false);
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

    const handleAddToCart = async () => {
        const token = localStorage.getItem('authToken');
        const userId = token ? jwtDecode(token).id : null;

        if (!token) {
            showModalFail('LOGIN NECESSÁRIO', 'Você precisa estar logado para adicionar itens ao carrinho.');
            return;
        }

        const userType = localStorage.getItem('userType');
        if (userType !== 'client') {
            showModalFail('USUÁRIO INVÁLIDO', 'Somente clientes podem adicionar itens ao carrinho.');
            return;
        }

        if (!pacoteDetalhes?.id) {
            showModalFail('ERRO', "Pacote não encontrado.");
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/carrinho/cadastrar`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    usuario_id: userId,
                    pacote_id: pacoteDetalhes.id,
                    quantidade: quantity,
                    preco_unitario: pacoteDetalhes.preco,
                }),
            });

            if (!response.ok) {
                throw new Error('Erro ao adicionar pacote ao carrinho');
            }

            showModalSuccess('SUCESSO', 'Pacote adicionado ao carrinho com sucesso!');
            setTimeout(() => {
                navigate('/carrinho');
            }, 2000);
        } catch (error) {
            showModalFail('ERRO', 'Não foi possível adicionar o item ao carrinho');
        }
    };

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

    if (!pacoteDetalhes) return <div className={styles.container}><p className={styles.mediumText}>Pacote não encontrado. Volte à lista.</p></div>;

    const profissionais = getComponentesPorCategoria("Funcionário");
    const itens = getComponentesPorCategoria("Item");
    const comidas = getComponentesPorCategoria("Comida");

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
                                <button
                                    onClick={handleAddToCart}
                                    className={`${styles.buttons} ${styles.addToCartButton}`}>
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
            <ModalMensagemFalha
                title={modalTitle}
                text={modalMessage}
                isVisible={showFailModal}
            />
            <ModalMensagemSucesso
                title={modalTitle}
                text={modalMessage}
                isVisible={showSuccessModal}
            />
        </div>
    );
}

export default DetalhesPacote;