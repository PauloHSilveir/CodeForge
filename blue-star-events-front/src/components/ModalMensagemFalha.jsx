import React from "react";
import stylesSucesso from "../styles/ModalMensagemSucesso.module.css";
import stylesFalha from "../styles/ModalMensagemFalha.module.css";
import { RiCloseCircleLine } from '@remixicon/react';

const ModalMensagemSucesso = ({ title, text, isVisible }) => {
    if (!isVisible) return null;

    return (
        <div className={stylesSucesso.overlay}>
            <div className={stylesSucesso.modal}>
                <div className={`${stylesSucesso.top} ${stylesFalha.top}`}>
                    {title}
                </div>
                <div className={stylesSucesso.bot}>
                    <div>
                        <RiCloseCircleLine className={`${stylesSucesso.icon} ${stylesFalha.icon}`} />
                    </div>
                    <div className={stylesSucesso.message}>
                        {text}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalMensagemSucesso;