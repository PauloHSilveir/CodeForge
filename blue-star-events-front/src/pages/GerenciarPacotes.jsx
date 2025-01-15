import GerenciarGenerico from "../components/GerenciarGenerico";
import PacoteIndividual from "../components/PacoteIndividual";
import { RiBox3Line } from "@remixicon/react";
import packageImage1 from "../assets/images/Aniversario.png";

// Dados mockados
const pacotes = [
    { id: 1, nome: "Pacote Aniversário Grande",descricao: "descricao teste", tamanho: "grande", valor: 1000.40, imagem: packageImage1 },
    { id: 2, nome: "Pacote Mega Casamento",descricao: "descricao teste", tamanho: "mega", valor: 1000.40, imagem: packageImage1 },
    { id: 3, nome: "Pacote Festa de Criança",descricao: "descricao teste", tamanho: "pequeno", valor: 1000.40, imagem: packageImage1 },
    { id: 4, nome: "Pacote Viagem Internacional",descricao: "descricao teste", tamanho: "medio", valor: 1000.40, imagem: packageImage1 },
    { id: 5, nome: "Pacote Férias na Praia",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 6, nome: "Pacote Viagem Aventura",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 7, nome: "Pacote Casamento Romântico",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 8, nome: "Pacote Aniversário Infantil",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 9, nome: "Pacote Viagem Europa",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 10, nome: "Pacote Lua de Mel",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 11, nome: "Pacote Aniversário Temático",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 12, nome: "Pacote Festa de Formatura",descricao: "descricao teste", tamanho: "grande", valor: 1000.40, imagem: packageImage1 },
    { id: 13, nome: "Pacote Casamento no Campo",descricao: "descricao teste", tamanho: "medio", valor: 1000.40, imagem: packageImage1 },
    { id: 14, nome: "Pacote Fim de Semana Relaxante",descricao: "descricao teste", tamanho: "pequeno", valor: 1000.40, imagem: packageImage1 },
    { id: 15, nome: "Pacote Cruzeiro Tropical",descricao: "descricao teste", tamanho: "grande", valor: 1000.40, imagem: packageImage1 },
    { id: 16, nome: "Pacote Aniversário Vip",descricao: "descricao teste", tamanho: "medio", valor: 1000.40, imagem: packageImage1 },
    { id: 17, nome: "Pacote Festa de Empresa",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 18, nome: "Pacote Viagem para a Disney",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 19, nome: "Pacote Festa de Natal",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 20, nome: "Pacote Aventura na Selva",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 21, nome: "Pacote Aniversário com Temática Nerd",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 22, nome: "Pacote Viagem de Luxo",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 23, nome: "Pacote Festa Teen",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 24, nome: "Pacote Viagem para o Japão",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 25, nome: "Pacote Festival Gastronômico",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 26, nome: "Pacote Festa de 15 Anos",descricao: "descricao teste", tamanho: "mega", valor: 1000.40, imagem: packageImage1 },
    { id: 27, nome: "Pacote Férias de Inverno",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 28, nome: "Pacote Festa Anos 80",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 29, nome: "Pacote Viagem para a África",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
    { id: 30, nome: "Pacote Aniversário Hollywoodiano",descricao: "descricao teste", tamanho: "mini", valor: 1000.40, imagem: packageImage1 },
];

function GerenciarPacotes() {
    return (
        <GerenciarGenerico
            dados={pacotes}
            renderItem={(pacote) => (
                <PacoteIndividual
                    key={pacote.id}
                    {...pacote}
                />
            )}
            icone={RiBox3Line}
            titulo="PACOTES CADASTRADOS"
            placeholder="Pesquisar pacotes"
            buttonText="ADICIONAR PACOTE"
            buttonLink="/cadastrarpacotes1"
            itensPorPagina={12}
            noItensFound="Nenhum pacote encontrado."
            campoPesquisa="nome"
        />
    );
}

export default GerenciarPacotes;
