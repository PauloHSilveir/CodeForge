import React, { useState } from "react";
import NavBar from "../components/Navbar";
import GerenciarItensTop from "../components/GerenciarItensTop";
import Paginacao from "../components/Paginacao";
import styles from "../styles/GerenciarPacotes.module.css";

function GerenciarGenerico({
    dados,
    renderItem,
    icone,
    titulo,
    placeholder,
    buttonText,
    buttonLink,
    itensPorPagina,
    noItensFound,
    campoPesquisa,
}) {
    const [itensFiltrados, setItensFiltrados] = useState(dados);
    const [paginaAtual, setPaginaAtual] = useState(1);

    const indexInicial = (paginaAtual - 1) * itensPorPagina;
    const itensNaPagina = itensFiltrados.slice(indexInicial, indexInicial + itensPorPagina);

    const totalDePaginas = () => Math.ceil(itensFiltrados.length / itensPorPagina);

    const mudarPagina = (pagina) => {
        if (pagina >= 1 && pagina <= totalDePaginas()) {
            setPaginaAtual(pagina);
        }
    };

    const handleSearch = (query) => {
        const filtered = dados.filter((item) =>
            item[campoPesquisa].toLowerCase().includes(query.toLowerCase())
        );
        setItensFiltrados(filtered);
        setPaginaAtual(1);
    };

    return (
        <div>
            <NavBar />
            <div className={styles.container}>
                <GerenciarItensTop
                    placeholder={placeholder}
                    icon={icone}
                    bigText={titulo}
                    buttonText={buttonText}
                    buttonLink={buttonLink}
                    onSearch={handleSearch} // Passa a função handleSearch para o filho
                />

                <div className={styles.descriptions}>
                    {itensNaPagina.length > 0 ? (
                        itensNaPagina.map((item) => renderItem(item))
                    ) : (
                        <p>{noItensFound}</p>
                    )}
                </div>

                <Paginacao
                    totalItens={itensFiltrados.length}
                    itensPorPagina={itensPorPagina}
                    paginaAtual={paginaAtual}
                    mudarPagina={mudarPagina}
                />
                
            </div>
        </div>
    );
}

export default GerenciarGenerico;
