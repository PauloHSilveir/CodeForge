import GerenciarGenerico from "../components/GerenciarGenerico";
import { RiSurroundSoundLine } from "@remixicon/react";
import packageImage1 from "../assets/images/Aniversario.png";
import ItemIndividual from "../components/ItemIndividual";

// Dados mockados
const itens = [
    { id: 1, nome: "Bolo de aniversário", quantidade: 1556, imagem: packageImage1 },
    { id: 2, nome: "Cadeira", quantidade: 2343, imagem: "https://via.placeholder.com/150" },
];

function GerenciarItens() {
    return (
        <GerenciarGenerico
            dados={itens}
            renderItem={(item) => (
                <ItemIndividual
                    key={item.id}
                    id={item.id}
                    nome={item.nome}
                    quantidade={item.quantidade}
                    imagem={item.imagem}
                />
            )}
            icone={RiSurroundSoundLine}
            titulo="ITENS CADASTRADOS"
            placeholder="Pesquisar itens"
            buttonText="ADICIONAR ITEM"
            buttonLink="/adicionaritem"
            itensPorPagina={12}
            noItensFound="Nenhum item encontrado."
        />
    );
}

export default GerenciarItens;
