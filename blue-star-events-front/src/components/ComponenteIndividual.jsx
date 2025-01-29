import React, { useState } from 'react';
import stylesGI from "../styles/PacoteIndividual.module.css";
import ModalExcluir from "./ModalExcluir";
import ModalMensagemSucesso from "./ModalMensagemSucesso";
import ModalMensagemFalha from "./ModalMensagemFalha";
import { useNavigate } from 'react-router-dom';

function ComponenteIndividual({ id, nome, descricao, valor, categoria, imagem, onDelete }) {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleEdit = () => {
        navigate('/editar-componente', {
            state: {
                itemData: {
                    id,
                    nome,
                    descricao,
                    valor,
                    categoria,
                    imagem
                }
            }
        });
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:1313/componente/delete/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setShowSucess(true);
                setTimeout(() => {
                    setShowSucess(false);
                    onDelete();
                }, 1500);
            } else {
                throw new Error('Erro ao deletar');
            }
        } catch (error) {
            console.error("Erro ao excluir componente:", error);
            setShowFail(true);
            setTimeout(() => {
                setShowFail(false);
            }, 1500);
        }
        closeModal();
    };

    return (
        <div className={stylesGI.descriptionItem}>
            <div className={stylesGI.descriptionItemTop}>

                <div className={stylesGI.idTop}>
                    <span className={stylesGI.mediumTextDark}>Componente: </span>
                    <span className={stylesGI.mediumTextLight}>{id}</span>
                </div>

                <div className={stylesGI.buttonsTop}>
                    <button
                        className={`${stylesGI.buttons} ${stylesGI.excPac}`}
                        onClick={openModal}
                    >
                        EXCLUIR COMPONENTE
                    </button>

                    <button className={`${stylesGI.buttons} ${stylesGI.ediPac}`} onClick={handleEdit}>
                        EDITAR COMPONENTE
                    </button>
                </div>
            </div>

            <div className={stylesGI.descriptionItemTop}>
                <div className={stylesGI.idTop}>
                    <span className={stylesGI.mediumTextDark}>Categoria: </span>
                    <span className={stylesGI.mediumTextLight}>{categoria}</span>
                </div>
            </div>

            <div className={stylesGI.descriptionItemBottom}>
                <div className={stylesGI.packageImageContainer}>
                    <img src={imagem} alt={`Imagem do componente ${nome}`} />
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
                    DESEJA REALMENTE <strong>EXCLUIR</strong> O COMPONENTE
                    <strong> PERMANENTEMENTE</strong>?
                </p>
            </ModalExcluir>

            <ModalMensagemSucesso
                title="EXCLUIR COMPONENTE"
                text="Componente excluído com sucesso!"
                isVisible={showSucess}
            />

            <ModalMensagemFalha
                title="EXCLUIR COMPONENTE"
                text="Erro ao excluir o componente!"
                isVisible={showFail}
            />
        </div>
    );
}

export default ComponenteIndividual;
