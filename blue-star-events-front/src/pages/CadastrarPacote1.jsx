import React from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import FormularioPacotes1 from "../components/FormularioPacotes1";

function CadastrarPacote1() {
    const navigate = useNavigate();

    const handleCreate = (data) => {
        console.log("Dados do cadastro:", data);
        navigate('/cadastrarpacotes2');
    };

    return (
        <div>
            <NavBar />
            <FormularioPacotes1
                onSubmit={handleCreate}
                mode="create"
                onBack={() => navigate('/gerenciarpacotes')}
            />
        </div>
    );
}

export default CadastrarPacote1;
