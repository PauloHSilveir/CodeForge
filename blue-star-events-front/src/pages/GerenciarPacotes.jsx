import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import PacoteIndividual from "../components/PacoteIndividual";
import stylesGP from "../styles/GerenciarPacotes.module.css";
import { RiBox3Line } from '@remixicon/react';
import packageImage1 from "../assets/images/Aniversario.png";
import GerenciarItensTop from '../components/GerenciarItensTop';
import Paginacao from "../components/Paginacao";

// Dados mockados simulando o backend
const pacotesMock = [
    { id: 1, nome: "Pacote Aniversário Grande", imagem: packageImage1 },
    { id: 2, nome: "Pacote Mega Casamento", imagem: "https://via.placeholder.com/150" },
    { id: 3, nome: "Pacote Festa de Criança", imagem: "https://via.placeholder.com/150" },
    { id: 4, nome: "Pacote Viagem Internacional", imagem: "https://via.placeholder.com/150" },
    { id: 5, nome: "Pacote Férias na Praia", imagem: "https://via.placeholder.com/150" },
    { id: 6, nome: "Pacote Viagem Aventura", imagem: "https://via.placeholder.com/150" },
    { id: 7, nome: "Pacote Casamento Romântico", imagem: "https://via.placeholder.com/150" },
    { id: 8, nome: "Pacote Aniversário Infantil", imagem: "https://via.placeholder.com/150" },
    { id: 9, nome: "Pacote Viagem Europa", imagem: "https://via.placeholder.com/150" },
    { id: 10, nome: "Pacote Lua de Mel", imagem: "https://via.placeholder.com/150" },
    { id: 11, nome: "Pacote Aniversário Temático", imagem: "https://via.placeholder.com/150" },
    { id: 12, nome: "Pacote Festa de Formatura", imagem: "https://via.placeholder.com/150" },
    { id: 13, nome: "Pacote Casamento no Campo", imagem: "https://via.placeholder.com/150" },
    { id: 14, nome: "Pacote Fim de Semana Relaxante", imagem: "https://via.placeholder.com/150" },
    { id: 15, nome: "Pacote Cruzeiro Tropical", imagem: "https://via.placeholder.com/150" },
    { id: 16, nome: "Pacote Aniversário Vip", imagem: "https://via.placeholder.com/150" },
    { id: 17, nome: "Pacote Festa de Empresa", imagem: "https://via.placeholder.com/150" },
    { id: 18, nome: "Pacote Viagem para a Disney", imagem: "https://via.placeholder.com/150" },
    { id: 19, nome: "Pacote Festa de Natal", imagem: "https://via.placeholder.com/150" },
    { id: 20, nome: "Pacote Aventura na Selva", imagem: "https://via.placeholder.com/150" },
    { id: 21, nome: "Pacote Aniversário com Temática Nerd", imagem: "https://via.placeholder.com/150" },
    { id: 22, nome: "Pacote Viagem de Luxo", imagem: "https://via.placeholder.com/150" },
    { id: 23, nome: "Pacote Festa Teen", imagem: "https://via.placeholder.com/150" },
    { id: 24, nome: "Pacote Viagem para o Japão", imagem: "https://via.placeholder.com/150" },
    { id: 25, nome: "Pacote Festival Gastronômico", imagem: "https://via.placeholder.com/150" },
    { id: 26, nome: "Pacote Festa de 15 Anos", imagem: "https://via.placeholder.com/150" },
    { id: 27, nome: "Pacote Férias de Inverno", imagem: "https://via.placeholder.com/150" },
    { id: 28, nome: "Pacote Festa Anos 80", imagem: "https://via.placeholder.com/150" },
    { id: 29, nome: "Pacote Viagem para a África", imagem: "https://via.placeholder.com/150" },
    { id: 30, nome: "Pacote Aniversário Hollywoodiano", imagem: "https://via.placeholder.com/150" },
];

function GerenciarPacotes() {
    const [pacotes] = useState(pacotesMock);
    const [pacotesFiltrados, setPacotesFiltrados] = useState(pacotes);
    const [paginaAtual, setPaginaAtual] = useState(1);
    const pacotesPorPagina = 12;

    const indexInicial = (paginaAtual - 1) * pacotesPorPagina;
    const pacotesNaPagina = pacotesFiltrados.slice(indexInicial, indexInicial + pacotesPorPagina);

    const totalDePaginas = () => Math.ceil(pacotesFiltrados.length / pacotesPorPagina);

    const mudarPagina = (pagina) => {
        if (pagina >= 1 && pagina <= totalDePaginas()) {
            setPaginaAtual(pagina);
        }
    };

    const handleSearch = (query) => {
        const filtered = pacotes.filter(pacote => 
            pacote.nome.toLowerCase().includes(query.toLowerCase())
        );
        setPacotesFiltrados(filtered);
        setPaginaAtual(1);
    };

    return (
        <div>
            <NavBar />
            <div className={stylesGP.container}>
                <GerenciarItensTop 
                    pacotes={pacotes} 
                    setPacotesFiltrados={setPacotesFiltrados} 
                    placeholder="Pesquisar pacotes" 
                    icon={RiBox3Line}
                    bigText="PACOTES CADASTRADOS"
                    buttonText="ADICIONAR PACOTE"
                    buttonLink="/adicionar-pacote"
                    onSearch={handleSearch}
                />
                <div className={stylesGP.descriptions}>
                    {pacotesNaPagina.length > 0 ? (
                        pacotesNaPagina.map((pacote) => (
                            <PacoteIndividual
                                key={pacote.id}
                                id={pacote.id}
                                nome={pacote.nome}
                                imagem={pacote.imagem}
                            />
                        ))
                    ) : null}
                </div>
                
                <Paginacao 
                    totalItens={pacotesFiltrados.length} 
                    itensPorPagina={pacotesPorPagina} 
                    paginaAtual={paginaAtual} 
                    mudarPagina={mudarPagina}
                />
            </div>
        </div>
    );
}

export default GerenciarPacotes;

