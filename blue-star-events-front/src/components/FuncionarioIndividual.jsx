import stylesGI from "../styles/PacoteIndividual.module.css";
import stylesTI from "../styles/TransacaoIndividual.module.css";
import stylesFI from "../styles/FuncionarioIndividual.module.css";
import React, { useState } from 'react';
import ModalExcluir from "../components/ModalExcluir";

function FuncionarioIndividual({ nome, email, celular, tipo }) {
    const [isModalOpen, setModalOpen] = useState(false);


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className={`${stylesGI.descriptionItem} ${stylesTI.descriptionItem}`}>
            <div className={`${stylesTI.descriptionItemTop} ${stylesFI.descriptionItemTop}`}
            >
                <div className={stylesTI.itemColuna}>
                    <span className={stylesGI.mediumTextDark}>Nome: </span>
                    <span className={stylesGI.mediumTextLight}>{nome}</span>
                </div>
                <div className={stylesTI.itemColuna}>
                    <span className={stylesGI.mediumTextDark}>Tipo: </span>
                    <span className={stylesGI.mediumTextLight}>{tipo}</span>
                </div>
                <div className={stylesTI.itemColuna}>
                    <span className={stylesGI.mediumTextDark}>Celular: </span>
                    <span className={stylesGI.mediumTextLight}>{celular}</span>
                </div>
                <div className={stylesTI.itemColuna}>
                    <span className={stylesGI.mediumTextDark}>E-mail: </span>
                    <span className={stylesGI.mediumTextLight}>{email}</span>
                </div>
                <div className={stylesTI.itemColuna}>
                    <button className={`${stylesGI.buttons} ${stylesGI.excPac}`} onClick={openModal}>
                        EXCLUIR FUNCIONÁRIO
                    </button>
                </div>
                <div className={stylesTI.itemColuna}>
                    <button className={`${stylesGI.buttons} ${stylesGI.ediPac}`}>
                        EDITAR FUNCIONÁRIO
                    </button>
                </div>
            </div>
            <ModalExcluir isOpen={isModalOpen} onClose={closeModal}>
                <p>DESEJA REALMENTE <strong>EXCLUIR</strong> O FUNCIONÁRIO<strong> PERMANENTEMENTE</strong>?</p>
            </ModalExcluir>
        </div>
    );
}

export default FuncionarioIndividual;
