import React from 'react';
import stylesME from '../styles/ModalExclusao.module.css';

const ModalExcluir = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className={stylesME.modalOverlay}>
            <div className={stylesME.modalContent}>
                <div className={stylesME.text}>{children}</div>
                <div className={stylesME.buttonsContainer}>
                    <button
                        onClick={onClose}
                        className={`${stylesME.buttonsME} ${stylesME.sim}`}
                    >
                        SIM
                    </button> {/*Precisa implementar ainda*/}

                    <button
                        onClick={onClose}
                        className={`${stylesME.buttonsME} ${stylesME.nao}`}
                    >
                        NÃO
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalExcluir;
