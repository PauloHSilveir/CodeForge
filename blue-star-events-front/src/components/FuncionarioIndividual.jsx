import stylesGI from "../styles/PacoteIndividual.module.css";
import stylesTI from "../styles/TransacaoIndividual.module.css";
import stylesFI from "../styles/FuncionarioIndividual.module.css";
import React, { useState } from 'react';
import ModalExcluir from "../components/ModalExcluir";
import ModalMensagemSucesso from "../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../components/ModalMensagemFalha";

function FuncionarioIndividual({ nome, email, celular, tipo }) {
    const [isModalOpen, setModalOpen] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleDelete = async () => {
        try {
            // Implementar a chamada real para a API de exclusão
            // await api.delete('/user');

            setShowSucess(true);

            setTimeout(() => {
                setShowSucess(false);
            }, 2000);
        } catch (error) {
            console.error("Erro ao excluir funcionário:", error);

            setShowFail(true);

            setTimeout(() => {
                setShowFail(false);
            }, 3000);
        }
    };

    return (
        <div className={`${stylesGI.descriptionItem} ${stylesTI.descriptionItem}`}>
            <div className={`${stylesTI.descriptionItemTop} ${stylesFI.descriptionItemTop}`}>

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
                    <button
                        className={`${stylesGI.buttons} ${stylesGI.excPac}`}
                        onClick={openModal}
                    >
                        EXCLUIR FUNCIONÁRIO
                    </button>
                </div>

                <div className={stylesTI.itemColuna}>
                    <button className={`${stylesGI.buttons} ${stylesGI.ediPac}`}>
                        EDITAR FUNCIONÁRIO
                    </button>
                </div>

            </div>
            <ModalExcluir
                isOpen={isModalOpen}
                onClose={closeModal}
                onConfirm={handleDelete}
            >
                <p>
                    DESEJA REALMENTE <strong>EXCLUIR</strong> O FUNCIONÁRIO
                    <strong> PERMANENTEMENTE</strong>?
                </p>
            </ModalExcluir>

            <ModalMensagemSucesso
                title="EXCLUIR FUNCIONÁRIO"
                text="Funcionário excluído com sucesso! "
                isVisible={showSucess}
            />

            <ModalMensagemFalha
                title="EXCLUIR FUNCIONÁRIO"
                text="Erro ao excluir o funcionário!"
                isVisible={showFail}
            />
        </div>
    );
}

export default FuncionarioIndividual;
