import { RiSearchLine } from "@remixicon/react";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import Paginacao from "../components/Paginacao";
import styles from "../styles/ConsultarPacotes.module.css";
import stylesGIT from "../styles/GerenciarItensTop.module.css";
import packageImage1 from "../assets/images/Aniversario.png";
import packageImage2 from "../assets/images/Casamento.png";

const mapTamanhoParaAbreviacao = {
    mini: "MN",
    pequeno: "PQ",
    medio: "MD",
    grande: "GR",
    mega: "MG",
};

const BASE_URL = 'http://localhost:1313';

function ConsultarPacotes() {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [pacotes, setPacotes] = useState([]); // Store original pacotes
    const [itensFiltrados, setItensFiltrados] = useState([]);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const [ordem, setOrdem] = useState("padrao");

    const [precoMin, setPrecoMin] = useState(0);
    const [precoMax, setPrecoMax] = useState(0);
    const [precoMinRange, setPrecoMinRange] = useState(0); // For the range input
    const [precoMaxRange, setPrecoMaxRange] = useState(0); // For the range input

    const [tamanhosSelecionados, setTamanhosSelecionados] = useState([]);
    const itensPorPagina = 24;

    const tamanhosOrdenados = ["mini", "pequeno", "medio", "grande", "mega"];
    const [tamanhosDisponiveis, setTamanhosDisponiveis] = useState([]);

    // Fetch initial data
    useEffect(() => {
        const fetchPacotes = async () => {
            try {
                const response = await fetch(`${BASE_URL}/pacote`);
                if (!response.ok) {
                    throw new Error("Erro ao carregar pacotes");
                }
                const data = await response.json();

                // Transform API data to match our format
                const pacotesFormatados = data.map(pacote => ({
                    id: pacote.id,
                    nome: pacote.name,
                    descricao: pacote.description,
                    tamanho: pacote.tamanho.toLowerCase(),
                    preco: parseFloat(pacote.preco),
                    imagem: pacote.imagem || 
                           (pacote.name.toLowerCase().includes('casamento') ? packageImage2 : packageImage1)
                }));

                setPacotes(pacotesFormatados);
                setItensFiltrados(pacotesFormatados);

                // Set price ranges
                const precos = pacotesFormatados.map(p => p.preco);
                const minPreco = Math.min(...precos);
                const maxPreco = Math.max(...precos);
                setPrecoMin(minPreco);
                setPrecoMax(maxPreco);
                setPrecoMinRange(minPreco);
                setPrecoMaxRange(maxPreco);

                // Set available sizes
                const tamanhosDisp = tamanhosOrdenados.filter(tamanho =>
                    pacotesFormatados.some(p => p.tamanho === tamanho)
                );
                setTamanhosDisponiveis(tamanhosDisp);
            } catch (error) {
                console.error("Erro ao carregar pacotes:", error);
                // Set empty states in case of error
                setPacotes([]);
                setItensFiltrados([]);
            }
        };

        fetchPacotes();
    }, []);

    const aplicarFiltros = () => {
        let filtrados = [...pacotes];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.trim().toLowerCase();
            filtrados = filtrados.filter((pacote) =>
                pacote.nome.toLowerCase().includes(query) ||
                pacote.descricao.toLowerCase().includes(query)
            );
        }

        // Price filter
        filtrados = filtrados.filter((pacote) =>
            pacote.preco >= precoMinRange && pacote.preco <= precoMaxRange
        );

        // Size filter
        if (tamanhosSelecionados.length > 0) {
            filtrados = filtrados.filter((pacote) =>
                tamanhosSelecionados.includes(pacote.tamanho)
            );
        }

        // Apply current sort
        if (ordem === "crescente") {
            filtrados.sort((a, b) => a.preco - b.preco);
        } else if (ordem === "decrescente") {
            filtrados.sort((a, b) => b.preco - a.preco);
        }

        setItensFiltrados(filtrados);
        setPaginaAtual(1);
    };

    useEffect(() => {
        aplicarFiltros();
    }, [precoMinRange, precoMaxRange, tamanhosSelecionados, searchQuery, ordem]);

    const handleSearch = () => {
        aplicarFiltros();
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    const handleSortChange = (event) => {
        setOrdem(event.target.value);
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
                            <label className={styles.normalText}>MIN: <br /></label>
                            <input
                                type="range"
                                min={precoMin}
                                max={precoMax}
                                step="0.01"
                                value={precoMinRange}
                                onChange={(e) => setPrecoMinRange(Number(e.target.value))}
                                className={styles.slider}
                            />
                            <br />
                            <label className={styles.normalText}>MAX: <br /></label>
                            <input
                                type="range"
                                min={precoMin}
                                max={precoMax}
                                step="0.01"
                                value={precoMaxRange}
                                onChange={(e) => setPrecoMaxRange(Number(e.target.value))}
                                className={styles.slider}
                            />
                            <div>
                                <span className={styles.normalText}>
                                    R$ {precoMinRange.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </span> - <span className={styles.normalText}>R$ {precoMaxRange.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
                                <div key={pacote.id} className={styles.packageCard} onClick={() => handleClick(pacote)}>
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
                                            R$ {pacote.preco.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
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