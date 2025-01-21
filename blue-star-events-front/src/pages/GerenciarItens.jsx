import React, { useState, useEffect } from "react";
import GerenciarGenerico from "../components/GerenciarGenerico";
import { RiSurroundSoundLine } from "@remixicon/react";
import ItemIndividual from "../components/ItemIndividual";

function GerenciarItens() {
    const [items, setItems] = useState([]);

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const response = await fetch('http://localhost:1313/componente');
            const data = await response.json();
            const formattedItems = data.componente.map(item => ({
                id: item.id,
                nome: item.name,
                descricao: item.description,
                quantidade: item.quantidade,
                valor: item.preco,
                categoria: item.categoria,
                imagem: item.imagem
            }));
            setItems(formattedItems);
        } catch (error) {
            console.error("Erro ao carregar itens:", error);
        }
    };

    return (
        <GerenciarGenerico
            dados={items}
            renderItem={(item) => (
                <ItemIndividual
                    key={item.id}
                    {...item}
                    onDelete={loadItems}
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
