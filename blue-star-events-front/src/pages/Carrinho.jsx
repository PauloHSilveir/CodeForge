import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import OrcamentoBase from "../components/OrcamentoBase";
import { RiShoppingCart2Line, RiDeleteBin6Line } from "@remixicon/react";
import styles from '../styles/Carrinho.module.css';
import packageImage1 from "../assets/images/Aniversario.png";
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'http://localhost:1313';

function Carrinho() {
    const navigate = useNavigate();
    const [itensCarrinho, setItensCarrinho] = useState([]);
    const [subtotal, setSubtotal] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Recupera o token e ID do usuário
    const token = localStorage.getItem('authToken');
    const userId = token ? jwtDecode(token).id : null;

    // Redireciona para login se não houver token
    useEffect(() => {
        if (!token || !userId) {
            navigate('/login');
            return;
        }
    }, [token, userId, navigate]);

    // Carrega os itens do carrinho quando o componente monta
    useEffect(() => {
        if (token && userId) {
            carregarCarrinho();
        }
    }, [token, userId]);

    // Função para carregar os itens do carrinho
    const carregarCarrinho = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${BASE_URL}/carrinho/${userId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao carregar o carrinho');
            }

            const responseData = await response.json();
            
            if (responseData.success && responseData.data) {
                setItensCarrinho(responseData.data.items || []);
                setSubtotal(parseFloat(responseData.data.total) || 0);
            } else {
                throw new Error('Formato de resposta inválido');
            }
        } catch (error) {
            console.error('Erro ao carregar carrinho:', error);
            setError('Não foi possível carregar os itens do carrinho');
        } finally {
            setIsLoading(false);
        }
    };

    // Função para remover um item
    const handleRemoverItem = async (pacoteId) => {
        try {
            const response = await fetch(`${BASE_URL}/carrinho/delete/${userId}/${pacoteId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao remover item');
            }

            // Recarrega o carrinho após remover o item
            await carregarCarrinho();
        } catch (error) {
            console.error('Erro ao remover item:', error);
            setError('Não foi possível remover o item');
        }
    };

    // Função para remover todos os itens
    const handleRemoverTodos = async () => {
        try {
            const response = await fetch(`${BASE_URL}/carrinho/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Falha ao limpar carrinho');
            }

            setItensCarrinho([]);
            setSubtotal(0);
        } catch (error) {
            console.error('Erro ao limpar carrinho:', error);
            setError('Não foi possível limpar o carrinho');
        }
    };

    // Função de navegação
    const handleNavigate = (path) => {
        navigate(path, { 
            state: { 
                subtotal,
                itens: itensCarrinho 
            } 
        });
    };

    // Renderiza loading
    if (isLoading) {
        return (
            <div>
                <Navbar />
                <div className={styles.loading}>Carregando...</div>
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <OrcamentoBase
                title="CARRINHO"
                subtotal={subtotal}
                IconDetails={RiShoppingCart2Line}
                nextPath="/pagamento"
                prevPath="/consultarpacotes"
                handleNavigate={handleNavigate}
                nextButtonText="IR PARA O PAGAMENTO"
                prevButtonText="CONTINUAR COMPRANDO"
            >
                {error && (
                    <div className={styles.error}>
                        {error}
                    </div>
                )}
                
                <div>
                    {itensCarrinho.length > 0 ? (
                        <>
                            <div className={styles.removerTodos}>
                                <button
                                    onClick={handleRemoverTodos}
                                    className={styles.buttons}
                                >
                                    REMOVER TODOS OS PRODUTOS
                                    <RiDeleteBin6Line className={styles.iconeRemover} />
                                </button>
                            </div>

                            {itensCarrinho.map((item) => (
                                <div key={item.id} className={styles.itemCart}>
                                    <div className={styles.itemCartDetails}>
                                        <img
                                            src={packageImage1}
                                            alt="Icone Pacote"
                                            className={styles.imagemItem}
                                        />
                                        <div>
                                            <div className={styles.boldText}>{item.pacote.name}</div>
                                            <div>Quantidade: {item.quantidade}</div>
                                            <div>R$ {parseFloat(item.preco_unitario).toFixed(2)}</div>
                                            <div className={styles.totalItem}>
                                                Total: R$ {parseFloat(item.preco_total).toFixed(2)}
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemoverItem(item.pacote_id)}
                                        className={styles.buttons}
                                    >
                                        REMOVER
                                        <RiDeleteBin6Line className={styles.iconRemove} />
                                    </button>
                                </div>
                            ))}
                        </>
                    ) : (
                        <div className={styles.emptyCart}>
                            Seu carrinho está vazio
                        </div>
                    )}
                </div>
            </OrcamentoBase>
        </div>
    );
}

export default Carrinho;