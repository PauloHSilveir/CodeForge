import React, { useState } from 'react';
import stylesGI from "../styles/PacoteIndividual.module.css";
import ModalExcluir from "../components/ModalExcluir";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";
import { useNavigate } from 'react-router-dom';

function ItemIndividual({ id, nome, descricao, quantidade, valor, categoria, imagem, onDelete }) {
    const navigate = useNavigate();
    const [isModalOpen, setModalOpen] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleEdit = () => {
        navigate('/editaritem', {
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
                    onDelete(); // Recarrega a lista após deletar
                }, 2000);
            } else {
                throw new Error('Erro ao deletar');
            }
        } catch (error) {
            console.error("Erro ao excluir item:", error);
            setShowFail(true);
            setTimeout(() => {
                setShowFail(false);
            }, 3000);
        }
        closeModal();
    };

    return (
        <div className={stylesGI.descriptionItem}>
            <div className={stylesGI.descriptionItemTop}>

                <div className={stylesGI.idTop}>
                    <span className={stylesGI.mediumTextDark}>Item: </span>
                    <span className={stylesGI.mediumTextLight}>{id}</span>
                </div>

                <div className={stylesGI.buttonsTop}>
                    <button
                        className={`${stylesGI.buttons} ${stylesGI.excPac}`}
                        onClick={openModal}
                    >
                        EXCLUIR ITEM
                    </button>

                    <button className={`${stylesGI.buttons} ${stylesGI.ediPac}`} onClick={handleEdit}>
                        EDITAR ITEM
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
                    <img src={imagem} alt={`Imagem do item ${nome}`} />
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
                    DESEJA REALMENTE <strong>EXCLUIR</strong> O ITEM
                    <strong> PERMANENTEMENTE</strong>?
                </p>
            </ModalExcluir>

            <ModalMensagemSucesso
                title="EXCLUIR ITEM"
                text="Item excluído com sucesso!"
                isVisible={showSucess}
            />

            <ModalMensagemFalha
                title="EXCLUIR ITEM"
                text="Erro ao excluir o item!"
                isVisible={showFail}
            />
        </div>
    );
}

export default ItemIndividual;
