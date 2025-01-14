import React, { useState } from 'react';
import stylesGI from "../styles/PacoteIndividual.module.css";
import ModalExcluir from "../components/ModalExcluir";
import { useNavigate } from 'react-router-dom';

function PacoteIndividual({ id, nome, descricao, tamanho, valor, imagem }) {
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleEdit = () => {
        navigate('/editarpacote1', {
            state: {
                pacoteData: {
                    id,
                    nome,
                    descricao,
                    tamanho,
                    valor,
                    imagem
                }
            }
        });
    };

    return (
        <div className={stylesGI.descriptionItem}>
            <div className={stylesGI.descriptionItemTop}>
                <div className={stylesGI.idTop}>
                    <span className={stylesGI.mediumTextDark}>Pacote: </span>
                    <span className={stylesGI.mediumTextLight}>{id}</span>
                </div>
                <div className={stylesGI.buttonsTop}>
                    <button
                        className={`${stylesGI.buttons} ${stylesGI.excPac}`}
                        onClick={openModal}
                    >
                        EXCLUIR PACOTE
                    </button>

                    <button className={`${stylesGI.buttons} ${stylesGI.ediPac}`} onClick={handleEdit}>
                        EDITAR PACOTE
                    </button>
                </div>
            </div>

            <div className={stylesGI.descriptionItemBottom}>
                <div className={stylesGI.packageImageContainer}>
                    <img src={imagem} alt={`Imagem do pacote ${nome}`} />
                </div>
                <div className={stylesGI.idTop}>
                    <span className={stylesGI.mediumTextDark}>{nome}</span>
                </div>
            </div>
            <ModalExcluir
                isOpen={isModalOpen}
                onClose={closeModal}
            >
                <p>DESEJA REALMENTE <strong>EXCLUIR</strong> O PACOTE<strong> PERMANENTEMENTE</strong>?</p>
            </ModalExcluir>
        </div>
    );
}

export default PacoteIndividual;
