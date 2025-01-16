import React from "react";
import styles from "../styles/ModalMensagemSucesso.module.css";
import { RiCheckboxCircleLine } from '@remixicon/react';

const ModalMensagemSucesso = ({ title, text, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.top}>
                    {title}
                </div>
                <div className={styles.bot}>
                    <div>
                        <RiCheckboxCircleLine className={styles.icon} />
                    </div>
                    <div className={styles.message}>
                        {text}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalMensagemSucesso;
