import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import FormularioItens from "../components/FomularioItens";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";

function CadastrarItem() {
    const navigate = useNavigate();
    const [showMessage, setShowMessage] = useState(false);

    const handleCreate = (data) => {
        console.log("Dados do item:", data);
        setShowMessage(true);

        setTimeout(() => {
            setShowMessage(false);
            navigate('/gerenciaritens');
        }, 3000);
    };

    return (
        <div>
            <NavBar />
            <ModalMensagemSucesso 
                text="Cadastrado com sucesso! Redirecionando..." 
                isVisible={showMessage} 
            />
            <FormularioItens
                onSubmit={handleCreate}
                mode="create"
                onBack={() => navigate('/gerenciarItens')}
            />
        </div>
    );
}

export default CadastrarItem;
