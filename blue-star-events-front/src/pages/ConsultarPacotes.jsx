import { RiSearchLine } from "@remixicon/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Paginacao from "../components/Paginacao";
import styles from "../styles/ConsultarPacotes.module.css";
import stylesGIT from "../styles/GerenciarItensTop.module.css";
import packageImage1 from "../assets/images/Aniversario.png";
import packageImage2 from "../assets/images/Casamento.png";

// Abreviação dos tamanhos
const mapTamanhoParaAbreviacao = {
    mini: "MN",
    pequeno: "PQ",
    medio: "MD",
    grande: "GR",
    mega: "MG",
};

// Dados mockados
const pacotes = [
    { id: 1, nome: "Pacote Aniversário Grande", descricao: "Inclui decoração temática completa, mesa de doces, bolo personalizado, iluminação especial, som ambiente e espaço para até 100 convidados. Ideal para festas memoráveis e cheias de alegria!", tamanho: "grande", valor: 1000.40, imagem: packageImage1 },
    { id: 2, nome: "Pacote Mega Casamento", descricao: "descricao teste", tamanho: "mega", valor: 2500.40, imagem: packageImage2 },
    { id: 3, nome: "Pacote Festa de Criança", descricao: "descricao teste", tamanho: "pequeno", valor: 1000.40, imagem: packageImage1 },
    { id: 4, nome: "Pacote Viagem Internacional", descricao: "descricao teste", tamanho: "medio", valor: 1000.40, imagem: packageImage1 },
    { id: 5, nome: "Pacote Férias na Praia", descricao: "descricao teste", tamanho: "mini", valor: 1000.90, imagem: packageImage1 },
    { id: 6, nome: "Pacote Viagem Aventura", descricao: "descricao teste", tamanho: "mini", valor: 300.25, imagem: packageImage1 },
    { id: 7, nome: "Pacote Casamento Romântico", descricao: "Decoração elegante, cerimonialista, buffet premium, bolo nupcial, iluminação, DJ, e espaço sofisticado para até 200 convidados. Perfeito para tornar seu grande dia inesquecível!", tamanho: "mini", valor: 1000.40, imagem: packageImage2 },
    { id: 8, nome: "Pacote Aniversário Infantil", descricao: "descricao teste", tamanho: "mini", valor: 1000, imagem: packageImage1 },
    { id: 9, nome: "Pacote Viagem Europa", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 10, nome: "Pacote Lua de Mel", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 11, nome: "Pacote Aniversário Temático", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 12, nome: "Pacote Festa de Formatura", descricao: "descricao teste", tamanho: "grande", valor: 1000.40, imagem: packageImage1 },
    { id: 13, nome: "Pacote Casamento no Campo", descricao: "descricao teste", tamanho: "medio", valor: 1000.40, imagem: packageImage2 },
    { id: 14, nome: "Pacote Fim de Semana Relaxante", descricao: "descricao teste", tamanho: "pequeno", valor: 1000.40, imagem: packageImage1 },
    { id: 15, nome: "Pacote Cruzeiro Tropical", descricao: "descricao teste", tamanho: "grande", valor: 1000.40, imagem: packageImage1 },
    { id: 16, nome: "Pacote Aniversário Vip", descricao: "descricao teste", tamanho: "medio", valor: 1000.40, imagem: packageImage1 },
    { id: 17, nome: "Pacote Festa de Empresa", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 18, nome: "Pacote Viagem para a Disney", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 19, nome: "Pacote Festa de Natal", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 20, nome: "Pacote Aventura na Selva", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 21, nome: "Pacote Aniversário com Temática Nerd", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 22, nome: "Pacote Viagem de Luxo", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 23, nome: "Pacote Festa Teen", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 24, nome: "Pacote Viagem para o Japão", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 25, nome: "Pacote Festival Gastronômico", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 26, nome: "Pacote Festa de 15 Anos", descricao: "descricao teste", tamanho: "mega", valor: 1000.40, imagem: packageImage1 },
    { id: 27, nome: "Pacote Férias de Inverno", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 28, nome: "Pacote Festa Anos 80", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 29, nome: "Pacote Viagem para a África", descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 30, nome: "Pacote Aniversário Hollywoodiano", descricao: "descricao teste", tamanho: "mini", valor: 2000, imagem: packageImage1 },
];

function ConsultarPacotes() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [itensFiltrados, setItensFiltrados] = useState(pacotes);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [ordem, setOrdem] = useState("padrao");

    const precosDisponiveis = pacotes.map(pacote => pacote.valor);
    const precoMinimo = 0;
    const precoMaximo = Math.max(...precosDisponiveis);
    const [precoMin, setPrecoMin] = useState(precoMinimo);
    const [precoMax, setPrecoMax] = useState(precoMaximo);

    const [tamanhosSelecionados, setTamanhosSelecionados] = useState([]);
    const itensPorPagina = 24;


    const tamanhosOrdenados = ["mini", "pequeno", "medio", "grande", "mega"];
    const tamanhosDisponiveis = tamanhosOrdenados.filter((tamanho) =>
        pacotes.some((pacote) => pacote.tamanho === tamanho)
    );

    const aplicarFiltros = () => {
        let filtrados = pacotes;

        // Filtro de pesquisa
        if (searchQuery) {
            const query = searchQuery.trim().toLowerCase();
            filtrados = filtrados.filter((pacote) =>
                pacote.nome.toLowerCase().includes(query) ||
                pacote.descricao.toLowerCase().includes(query)
            );
        }

        // Filtro de preço
        filtrados = filtrados.filter((pacote) =>
            pacote.valor >= precoMin && pacote.valor <= precoMax
        );

        // Filtro de tamanho
        if (tamanhosSelecionados.length > 0) {
            filtrados = filtrados.filter((pacote) =>
                tamanhosSelecionados.includes(pacote.tamanho)
            );
        }

        setItensFiltrados(filtrados);
        setPaginaAtual(1);
        setOrdem("padrao");
    };

    useEffect(() => {
        aplicarFiltros();
    }, [precoMin, precoMax, tamanhosSelecionados]);

    const handleSearch = () => {
        aplicarFiltros();
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        if (event.target.value === "") {
            aplicarFiltros();
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleSortChange = (event) => {
        const selectedOrder = event.target.value;
        setOrdem(selectedOrder);

        const sortedItems = [...itensFiltrados];
        if (selectedOrder === "crescente") {
            sortedItems.sort((a, b) => a.valor - b.valor);
        } else if (selectedOrder === "decrescente") {
            sortedItems.sort((a, b) => b.valor - a.valor);
        } else {
            const sortedItems = pacotes.filter(pacote =>
                itensFiltrados.some(item => item.id === pacote.id)
            );
            setItensFiltrados(sortedItems);
            return;
        }

        setItensFiltrados(sortedItems);
    };

    const handleTamanhoChange = (tamanho) => {
        setTamanhosSelecionados(prev => {
            if (prev.includes(tamanho)) {
                return prev.filter(t => t !== tamanho);
            } else {
                return [...prev, tamanho];
            }
        });
    };

    const indexInicial = (paginaAtual - 1) * itensPorPagina;
    const itensNaPagina = itensFiltrados.slice(indexInicial, indexInicial + itensPorPagina);

    const handleClick = (pacote) => {
        navigate("/detalhespacote", { state: pacote });
    };

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <div className={styles.filtersContainer}>
                    <div className={styles.filterSection}>
                        <p className={styles.mediumText}>Preço</p>
                        <div>
                            <label className={styles.normalText}>MIN: <br/></label>
                            <input
                                type="range"
                                min={precoMinimo}
                                max={precoMaximo}
                                step="0.01"
                                value={precoMin}
                                onChange={(e) => setPrecoMin(Number(e.target.value))}
                                className={styles.slider}
                            />
                            <br />
                            <label className={styles.normalText}>MAX: <br /></label>
                            <input
                                type="range"
                                min={precoMinimo}
                                max={precoMaximo}
                                step="0.01"
                                value={precoMax}
                                onChange={(e) => setPrecoMax(Number(e.target.value))}
                                className={styles.slider}
                            />
                            <div>
                                <span className={styles.normalText}> 
                                    R$ {precoMin.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span> - <span className={styles.normalText}>R$ {precoMax.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                            </div>
                        </div>

                        <p className={styles.mediumText}><br />Tamanho</p>
                        <div className={styles.sizeCheckboxes}>
                            {tamanhosDisponiveis.map((tamanho) => (
                                <div key={tamanho} className={styles.checkboxItem}>
                                    <input
                                        type="checkbox"
                                        id={`tamanho-${tamanho}`}
                                        checked={tamanhosSelecionados.includes(tamanho)}
                                        onChange={() => handleTamanhoChange(tamanho)}
                                    />
                                    <label htmlFor={`tamanho-${tamanho}`} className={styles.normalText}>
                                        {tamanho.charAt(0).toUpperCase() + tamanho.slice(1)} ({mapTamanhoParaAbreviacao[tamanho]})
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className={styles.packagesContainer}>
                    <div className={styles.top}>
                        <div className={styles.searchBarContainer}>
                            <div className={stylesGIT.searchInputWrapper}>
                                <RiSearchLine
                                    className={stylesGIT.iconSearch}
                                    onClick={handleSearch}
                                />
                                <input
                                    type="search"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Pesquisar pacotes"
                                    className={stylesGIT.searchBar}
                                />
                            </div>
                        </div>
                        <div className={styles.orderContainer}>
                            <p className={styles.bigText}>Resultados</p>
                            <div className={styles.selectItem}>
                            <select
                                name="ordenar"
                                id="ordenar"
                                onChange={handleSortChange}
                                value={ordem}
                            >
                                <option value="padrao">Padrão da loja</option>
                                <option value="crescente">Preço crescente</option>
                                <option value="decrescente">Preço decrescente</option>
                            </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles.bot}>
                        {itensNaPagina.length > 0 ? (
                            itensNaPagina.map((pacote) => (
                                <div key={pacote.id} className={styles.packageCard}  onClick={() => handleClick(pacote)}>
                                    <img
                                        src={pacote.imagem}
                                        alt={pacote.nome}
                                        className={styles.packageImage}
                                    />
                                    <div className={styles.packageDetails}>
                                        <p className={styles.normalText}>
                                            {pacote.nome} - {mapTamanhoParaAbreviacao[pacote.tamanho]}
                                        </p>
                                        <p className={styles.boldText}>
                                            R$ {pacote.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className={styles.noResults}>Nenhum pacote encontrado.</p>
                        )}
                    </div>

                    <Paginacao
                        totalItens={itensFiltrados.length}
                        itensPorPagina={itensPorPagina}
                        paginaAtual={paginaAtual}
                        mudarPagina={setPaginaAtual}
                    />
                </div>
            </div>
        </div>
    );
}

export default ConsultarPacotes;
