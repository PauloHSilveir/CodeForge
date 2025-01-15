import React, { useState } from "react";
import NavBar from "../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import FormularioItens from "../components/FomularioItens";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";

function EditarItem() {
    const navigate = useNavigate();
    const location = useLocation();
    const [showMessage, setShowMessage] = useState(false);

    const itemData = location.state?.itemData || {};

    if (!Object.keys(itemData).length) {
        navigate('/gerenciaritens');
        return null;
    }

    const handleEdit = (data) => {
        console.log("Atualizando item:", {
            id: itemData.id,
            ...data
        });
        
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
