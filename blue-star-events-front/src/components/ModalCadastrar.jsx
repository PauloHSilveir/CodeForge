import React from 'react';
import stylesMC from '../styles/ModalCadastrar.module.css';

const ModalCadastrar = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className={stylesMC.modalOverlay}>
            <div className={stylesMC.modalContent}>
                <h2>{title}</h2>
                <div>{children}</div>
                <button onClick={onClose} className={stylesMC.closeButton}>Fechar</button>
            </div>
        </div>
    );
};

export default ModalCadastrar;
