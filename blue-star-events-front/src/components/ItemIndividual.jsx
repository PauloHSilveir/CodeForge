import React, { useState } from 'react';
import stylesGI from "../styles/PacoteIndividual.module.css";
import ModalExcluir from "../components/ModalExcluir";

function ItemIndividual({ id, nome, quantidade, imagem }) {
    const [isModalOpen, setModalOpen] = useState(false);


    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    return (
        <div className={stylesGI.descriptionItem}>
            <div className={stylesGI.descriptionItemTop}>
                <div className={stylesGI.idTop}>
                    <span className={stylesGI.mediumTextDark}>Item: </span>
                    <span className={stylesGI.mediumTextLight}>{id}</span>
                </div>
                <div className={stylesGI.buttonsTop}>
                    <button className={`${stylesGI.buttons} ${stylesGI.excPac}`} onClick={openModal}>
                        EXCLUIR ITEM
                    </button>
                    <button className={`${stylesGI.buttons} ${stylesGI.ediPac}`}>
                        EDITAR ITEM
                    </button>
                </div>
            </div>
            <div className={stylesGI.descriptionItemTop}>
                <div className={stylesGI.idTop}>
                    <span className={stylesGI.mediumTextDark}>Quantidade Disponível: </span>
                    <span className={stylesGI.mediumTextLight}>{quantidade}</span>
                </div>
            </div>

            <div className={stylesGI.descriptionItemBottom}>
                <div className={stylesGI.packageImageContainer}>
                    <img src={imagem} alt={`Imagem do item ${nome}`} />
                </div>
                <div className={stylesGI.idTop}>
                    <span className={stylesGI.mediumTextDark}>{nome}</span>
                </div>
            </div>
            <ModalExcluir isOpen={isModalOpen} onClose={closeModal}>
                <p>DESEJA REALMENTE <strong>EXCLUIR</strong> O ITEM<strong> PERMANENTEMENTE</strong>?</p>
            </ModalExcluir>
        </div>
    );
}

export default ItemIndividual;
