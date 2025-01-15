import GerenciarGenerico from "../components/GerenciarGenerico";
import { RiSurroundSoundLine } from "@remixicon/react";
import packageImage1 from "../assets/images/Aniversario.png";
import ItemIndividual from "../components/ItemIndividual";

// Dados mockados
const itens = [
    { id: 1, nome: "Bolo de aniversário", descricao: "descrição teste", quantidade: 1556, valor: 150.00, imagem: packageImage1 },
    { id: 2, nome: "Cadeira", descricao: "descrição teste", quantidade: 2343, valor: 200.00, imagem: "https://via.placeholder.com/150" },
];

function GerenciarItens() {
    return (
        <GerenciarGenerico
            dados={itens}
            renderItem={(item) => (
                <ItemIndividual
                    key={item.id}
                    {...item}
                />
            )}
            icone={RiSurroundSoundLine}
            titulo="ITENS CADASTRADOS"
            placeholder="Pesquisar itens"
            buttonText="ADICIONAR ITEM"
            buttonLink="/cadastraritem"
            itensPorPagina={12}
            noItensFound="Nenhum item encontrado."
            campoPesquisa="nome"
        />
    );
}

export default GerenciarItens;
