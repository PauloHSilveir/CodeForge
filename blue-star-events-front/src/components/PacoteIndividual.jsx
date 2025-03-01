import React, { useState } from 'react';
import stylesGI from "../styles/PacoteIndividual.module.css";
import ModalExcluir from "../components/ModalExcluir";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";
import { useNavigate } from 'react-router-dom';

function PacoteIndividual({ id, nome, descricao, tamanho, valor, imagem }) {
    const navigate = useNavigate();

    const [isModalOpen, setModalOpen] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);

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

    const handleDelete = async () => {
        try {
            // Implementar a chamada real para a API de exclusão
            // await api.delete('/user');

            setShowSucess(true);

            setTimeout(() => {
                setShowSucess(false);
            }, 2000);
        } catch (error) {
            console.error("Erro ao excluir pacote:", error);

            setShowFail(true);

            setTimeout(() => {
                setShowFail(false);
            }, 3000);
        }
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
                onConfirm={handleDelete}
            >
                <p>
                    DESEJA REALMENTE <strong>EXCLUIR</strong> O PACOTE
                    <strong> PERMANENTEMENTE</strong>?
                </p>
            </ModalExcluir>

            <ModalMensagemSucesso
                title="EXCLUIR PACOTE"
                text="Pacote excluído com sucesso!"
                isVisible={showSucess}
            />

            <ModalMensagemFalha
                title="EXCLUIR PACOTE"
                text="Erro ao excluir o pacote!"
                isVisible={showFail}
            />
        </div>
    );
}

export default PacoteIndividual;
