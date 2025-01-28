import React from "react";
import NavBar from "../../../components/Navbar";
import { useNavigate, useLocation } from "react-router-dom";
import FormularioPacotes1 from "../../../components/FormularioPacotes1";

function EditarPacotes1() {
    const navigate = useNavigate();
    const location = useLocation();

    const pacoteData = location.state?.pacoteData || {};

    if (!Object.keys(pacoteData).length) {
        navigate('/gerenciarpacotes');
        return null;
    }

    const handleEdit = (data) => {
        console.log("Atualizando Pacote:", {
            id: pacoteData.id,
            ...data
        });
        navigate('/editarpacote2', {
            state: { pacoteData: { id: pacoteData.id, ...data } }
        });
    };

    return (
        <div>
            <NavBar />
            <FormularioPacotes1
                initialData={pacoteData}
                onSubmit={handleEdit}
                mode="edit"
                onBack={() => navigate('/gerenciarpacotes')}
            />
        </div>
    );
}

export default EditarPacotes1;
