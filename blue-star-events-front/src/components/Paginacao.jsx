import React from "react";
import stylesPaginacao from "../styles/Paginacao.module.css";

const Paginacao = ({ totalItens, itensPorPagina, paginaAtual, mudarPagina }) => {
    const totalDePaginas = Math.ceil(totalItens / itensPorPagina);

    return (
        <div className={stylesPaginacao.pagination}>
            <button onClick={() => mudarPagina(paginaAtual - 1)} disabled={paginaAtual === 1}>
                ‹
            </button>

            {totalDePaginas === 0 ? (
                <span>Nenhuma página encontrada</span>
            ) : (
                <span>{`Página ${paginaAtual} de ${totalDePaginas}`}</span>
            )}

            <button
                onClick={() => mudarPagina(paginaAtual + 1)}
                disabled={(paginaAtual === totalDePaginas) || (totalDePaginas === 0)}
            >
                ›
            </button>
        </div>
    );
};

export default Paginacao;
