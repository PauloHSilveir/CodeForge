import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "../components/Navbar";
import OrcamentoBase from "../components/OrcamentoBase";
import { RiShoppingCart2Line, RiDeleteBin6Line } from "@remixicon/react";
import styles from '../styles/Carrinho.module.css';
import packageImage1 from "../assets/images/Aniversario.png";

function Carrinho() {
    const navigate = useNavigate();
    const [itensCarrinho, setItensCarrinho] = useState([
        { id: 1, nome: "Pacote Aniversário Pequeno", preco: 2000.0, quantidade: 1, imagem: packageImage1},
        { id: 2, nome: "Pacote Aniversário Grande", preco: 10000.0, quantidade: 1, imagem: packageImage1}
    ]);

    const subtotal = itensCarrinho.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

    const handleRemoverItem = (id) => {
        setItensCarrinho((prev) => prev.filter((item) => item.id !== id));
    };

    const handleRemoverTodos = () => {
        setItensCarrinho([]);
    };

    const handleNavigate = (path) => {
        navigate(path, { 
            state: { 
                subtotal, 
                itensCarrinho
            } 
        });
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
                                    src={item.imagem}
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
