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

    const token = localStorage.getItem('authToken');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    useEffect(() => {
        if (userId) {
            fetchCarrinho();
        }
    }, [userId]);

    const fetchCarrinho = async () => {
        try {
            const response = await fetch(`${BASE_URL}/carrinho/${userId}`, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao carregar itens do carrinho");
            }

            const data = await response.json();
            setItensCarrinho(data.itens);
            calcularSubtotal(data.itens);
        } catch (error) {
            console.error("Erro:", error);
            alert("Não foi possível carregar o carrinho.");
        }
    };

    const calcularSubtotal = (itens) => {
        const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);
        setSubtotal(total);
    };

    const handleRemoverItem = async (id) => {
        try {
            const response = await fetch(`${BASE_URL}/carrinho/${userId}/pacote/${id}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao remover item do carrinho");
            }

            const data = await response.json();
            setItensCarrinho(data.itens);
            calcularSubtotal(data.itens);
        } catch (error) {
            console.error("Erro:", error);
            alert("Não foi possível remover o item.");
        }
    };

    const handleRemoverTodos = async () => {
        try {
            const response = await fetch(`${BASE_URL}/carrinho/${userId}/deleteAll`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Erro ao limpar o carrinho");
            }

            setItensCarrinho([]);
            setSubtotal(0);
        } catch (error) {
            console.error("Erro:", error);
            alert("Não foi possível limpar o carrinho.");
        }
    };

    const handleNavigate = (path) => {
        navigate(path, { state: { subtotal } });
    };

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
                <div>
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
                                    <div className={styles.boldText}>{item.nome}</div>
                                    <div>Quantidade: {item.quantidade}</div>
                                    <div>R$ {item.preco.toFixed(2)}</div>
                                </div>
                            </div>
                            <button
                                onClick={() => handleRemoverItem(item.id)}
                                className={styles.buttons}
                            >
                                REMOVER
                                <RiDeleteBin6Line className={styles.iconRemove} />
                            </button>
                        </div>
                    ))}
                </div>
            </OrcamentoBase>
        </div>
    );
}

export default Carrinho;
