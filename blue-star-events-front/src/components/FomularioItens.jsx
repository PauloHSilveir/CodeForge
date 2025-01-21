import React, { useState } from "react";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import stylesUpload from '../styles/Upload.module.css';
import stylesFP1 from '../styles/FormularioPacotes1.module.css';
import {
    RiArrowLeftCircleLine,
    RiUpload2Line
} from '@remixicon/react';

const FormularioItens = ({ initialData = {}, onSubmit, mode, onBack }) => {
    const [formData, setFormData] = useState({
        nome: initialData.nome || "",
        descricao: initialData.descricao || "",
        valor: initialData.valor || "",
        categoria: initialData.categoria || "",
        imagem: initialData.imagem || null,
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
                    {mode === "edit" ? "EDITANDO ITEM" : "CRIANDO NOVO ITEM"}
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
                            placeholder="Digite o nome do item"
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
                    <label htmlFor="valor" className={stylesFormBaseA.label}>
                        Valor
                    </label>
                    <div className={stylesFormBaseA.inputs}>
                        <input
                            id="valor"
                            name="valor"
                            value={formData.valor}
                            onChange={handleChange}
                            type="number"
                            className={stylesFormBaseA.inputField}
                            placeholder="Digite o valor do pacote"
                            required
                        />
                    </div>
                    <label htmlFor="categoria" className={stylesFormBaseA.label}>
                        Categoria
                    </label>
                    <div className={stylesFormBaseA.inputs}>
                        <input
                            id="categoria"
                            name="categoria"
                            value={formData.categoria}
                            onChange={handleChange}
                            className={stylesFormBaseA.inputField}
                            placeholder="Digite a categoria do item"
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
                        {mode === "edit" ? "EDITAR ITEM" : "CRIAR ITEM"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default FormularioItens;
