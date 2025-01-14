import React from "react";
import styles from "../styles/ModalMensagemSucesso.module.css";

const ModalMensagemSucesso = ({ text, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.message}>{text}</div>
            </div>
        </div>
    );
};

export default ModalMensagemSucesso;
