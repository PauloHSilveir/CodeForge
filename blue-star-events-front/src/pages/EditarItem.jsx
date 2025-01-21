import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import FormularioItens from "../components/FomularioItens";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";

function EditarItem() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMessage, setShowMessage] = useState(false);
    const [itemData, setItemData] = useState(location.state?.itemData || {});

    useEffect(() => {
        const fetchItem = async () => {
            if (itemData.id) {
                try {
                    const response = await fetch(`http://localhost:1313/componente/${itemData.id}`);
                    const data = await response.json();
                    setItemData({
                        id: data.componente.id,
                        nome: data.componente.name,
                        descricao: data.componente.description,
                        quantidade: data.componente.quantidade,
                        valor: data.componente.preco,
                        categoria: data.componente.categoria,
                        imagem: data.componente.imagem
                    });
                } catch (error) {
                    console.error("Erro ao buscar item:", error);
                    navigate('/gerenciaritens');
                }
            }
        };
        fetchItem();
    }, [itemData.id]);

    const handleEdit = async (data) => {
        try {
            const response = await fetch(`http://localhost:1313/componente/update/${itemData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: data.nome,
                    description: data.descricao,
                    preco: parseFloat(data.valor),
                    categoria: data.categoria,
                    imagem: data.imagem instanceof File ? data.imagem.name : data.imagem
                }),
            });

            if (response.ok) {
                setShowMessage(true);
                setTimeout(() => {
                    setShowMessage(false);
                    navigate('/gerenciaritens');
                }, 3000);
            } else {
                throw new Error('Erro ao atualizar');
            }
        } catch (error) {
            console.error("Erro ao atualizar item:", error);
            
        }
    };

    return (
        <div>
            <NavBar />
            <ModalMensagemSucesso
                title="EDITAR ITEM"
                text="Editado com sucesso! Redirecionando..."
                isVisible={showMessage}
            />
            <FormularioItens
                initialData={itemData}
                onSubmit={handleEdit}
                mode="edit"
                onBack={() => navigate('/gerenciarItens')}
            />
        </div>
    );
}

export default EditarItem;
