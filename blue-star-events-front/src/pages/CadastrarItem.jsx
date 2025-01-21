import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import FormularioItens from "../components/FomularioItens";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";

function CadastrarItem() {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const handleCreate = async (data) => {
        try {
            const response = await fetch('http://localhost:1313/componente/cadastrar', {
                method: 'POST',
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
                setShowSuccess(true);
                setTimeout(() => {
                    setShowSuccess(false);
                    navigate('/gerenciaritens');
                }, 3000);
            } else {
                throw new Error('Erro ao cadastrar');
            }
        } catch (error) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
        }
    };

    return (
        <div>
            <NavBar />
            <ModalMensagemSucesso
                title="CADASTRAR ITEM"
                text="Cadastrado com sucesso! Redirecionando..."
                isVisible={showSuccess}
            />
            <ModalMensagemFalha
                title="CADASTRAR ITEM"
                text="Erro ao cadastrar item! Verifique os dados e tente novamente."
                isVisible={showError}
            />
            <FormularioItens
                onSubmit={handleCreate}
                mode="create"
                onBack={() => navigate('/gerenciarItens')}
            />
        </div>
    );
}

export default CadastrarItem