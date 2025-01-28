import React, { useState, useEffect } from "react";
import GerenciarGenerico from "../../../components/GerenciarGenerico";
import { RiSurroundSoundLine } from "@remixicon/react";
import ItemIndividual from "../../../components/ComponenteIndividual";

function GerenciarComponentes() {
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
            console.error("Erro ao carregar componentes:", error);
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
            titulo="COMPONENTES CADASTRADOS"
            placeholder="Pesquisar componentes"
            buttonText="ADICIONAR COMPONENTES"
            buttonLink="/cadastrar-componentes"
            itensPorPagina={12}
            noItensFound="Nenhum componente encontrado."
            campoPesquisa="nome"
        />
    );
}

export default GerenciarComponentes;
