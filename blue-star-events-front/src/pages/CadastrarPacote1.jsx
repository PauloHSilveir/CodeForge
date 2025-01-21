import React from "react";
import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import FormularioPacotes1 from "../components/FormularioPacotes1";
import { usePackage } from "../context/PackageContext";

function CadastrarPacote1() {
    const navigate = useNavigate();
    const { updatePackageData } = usePackage();

    const handleCreate = (formData) => {
        console.log(formData);
        updatePackageData(formData);
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