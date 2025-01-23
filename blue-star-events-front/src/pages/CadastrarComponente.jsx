import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import FormularioComponentes from "../components/FormularioComponentes";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";

function CadastrarComponente() {
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
                    navigate('/gerenciar-componentes');
                }, 1500);
            } else {
                throw new Error('Erro ao cadastrar');
            }
        } catch (error) {
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 1500);
        }
    };

    return (
        <div>
            <NavBar />
            <ModalMensagemSucesso
                title="CADASTRAR COMPONENTE"
                text="Cadastrado com sucesso! Redirecionando..."
                isVisible={showSuccess}
            />
            <ModalMensagemFalha
                title="CADASTRAR COMPONENTE"
                text="Erro ao cadastrar componente! Verifique os dados e tente novamente."
                isVisible={showError}
            />
            <FormularioComponentes
                onSubmit={handleCreate}
                mode="create"
                onBack={() => navigate('/gerenciar-componentes')}
            />
        </div>
    );
}

export default CadastrarComponente