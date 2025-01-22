import React, { useState } from "react";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import stylesUpload from '../styles/Upload.module.css';
import stylesFP1 from '../styles/FormularioPacotes1.module.css';
import {
    RiArrowLeftCircleLine,
    RiUpload2Line
} from '@remixicon/react';

const FormularioPacotes1 = ({ initialData = {}, onSubmit, mode, onBack }) => {
    const [formData, setFormData] = useState({
        nome: initialData.nome || "",
        descricao: initialData.descricao || "",
        tipo: initialData.tipo || "",
        disponibilidade: initialData.disponibilidade || "",
        imagem: initialData.imagem || null,
        tamanho: initialData.tamanho || "",
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === "file") {
            setFormData({ ...formData, [name]: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className={`${stylesFormBaseA.container} ${stylesFP1.container}`}>
            <div className={stylesFormBaseA.legendContainer}>
                <RiArrowLeftCircleLine
                    className={stylesFormBaseA.iconBack}
                    onClick={onBack}
                />
                <div className={stylesFormBaseA.bigText}>
                    {mode === "edit" ? "EDITANDO PACOTE" : "CRIANDO NOVO PACOTE"}
                </div>
            </div>
            <div className={stylesFormBaseA.formContainer}>
                <form onSubmit={handleSubmit} className={stylesFormBaseA.baseForm}>
                    <label htmlFor="nome" className={stylesFormBaseA.label}>
                        Nome
                    </label>
                    <div className={stylesFormBaseA.inputs}>
                        <input
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            className={stylesFormBaseA.inputField}
                            placeholder="Digite o nome do pacote"
                            required
                        />
                    </div>

                    <label htmlFor="descricao" className={stylesFormBaseA.label}>
                        Descrição
                    </label>
                    <div className={stylesFormBaseA.inputs}>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                            className={stylesFormBaseA.textAreaField}
                            placeholder="Digite uma descrição"
                            required
                        />
                    </div>

                    <label htmlFor="tipo" className={stylesFormBaseA.label}>
                        Tipo
                    </label>
                    <div className={stylesFormBaseA.inputs}>
                        <input
                            id="tipo"
                            name="tipo"
                            value={formData.tipo}
                            onChange={handleChange}
                            className={stylesFormBaseA.inputField}
                            placeholder="Digite o tipo do pacote"
                            required
                        />
                    </div>

                    <label htmlFor="tamanho" className={stylesFormBaseA.label}>
                        Tamanho
                    </label>
                    <div className={stylesFormBaseA.inputs}>
                        <select
                            id="tamanho"
                            name="tamanho"
                            value={formData.tamanho}
                            onChange={handleChange}
                            className={stylesFormBaseA.inputField}
                            required
                        >
                            <option value="" disabled>
                                Selecione o tamanho
                            </option>
                            <option value="Mini">Mini (até 30 pessoas)</option>
                            <option value="Pequeno">Pequeno (31 a 100 pessoas)</option>
                            <option value="Médio">Médio (101 a 300 pessoas)</option>
                            <option value="Grande">Grande (301 a 1000 pessoas)</option>
                            <option value="Mega">Mega (mais de 1000 pessoas)</option>
                        </select>
                    </div>

                    <label htmlFor="disponibilidade" className={stylesFormBaseA.label}>
                        Disponibilidade
                    </label>
                    <div className={stylesFormBaseA.inputs}>
                        <input
                            id="disponibilidade"
                            name="disponibilidade"
                            value={formData.disponibilidade}
                            onChange={handleChange}
                            type="number"
                            className={stylesFormBaseA.inputField}
                            placeholder="Digite a disponibilidade do pacote"
                            required
                        />
                    </div>

                    <label htmlFor="imagem" className={stylesFormBaseA.label}>
                        Imagem
                    </label>
                    <div className={stylesUpload.fileInputContainer}>
                        <input
                            id="imagem"
                            name="imagem"
                            type="file"
                            onChange={handleChange}
                            className={stylesUpload.fileInput}
                            accept="image/*"
                            required={mode === "create"}
                        />
                        <div className={stylesUpload.fileInputLabel}>
                            <RiUpload2Line className={stylesUpload.uploadIcon} />
                            <span>
                                {formData.imagem ? formData.imagem.name : 'UPLOAD DA IMAGEM'}
                            </span>
                        </div>
                    </div>
                    <button type="submit" className={stylesFormBaseA.buttonBase}>
                        PRÓXIMA ETAPA
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormularioPacotes1;