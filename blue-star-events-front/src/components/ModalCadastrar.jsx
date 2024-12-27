import React from 'react';
import styles from '../styles/ModalCadastrar.module.css';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h2>{title}</h2>
                <div>{children}</div>
                <button onClick={onClose} className={styles.closeButton}>Fechar</button>
            </div>
        </div>
    );
};

export default Modal;
