import stylesGI from "../styles/PacoteIndividual.module.css";
import stylesTI from "../styles/TransacaoIndividual.module.css";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TransacaoIndividual({ id, valor, data, cliente, status }) {
    const navigate = useNavigate();
    const handleDetails = () => {
        navigate('/detalhestransacao', {
            state: {
                transacaoData: {
                    id,
                    valor,
                    data,
                    cliente,
                    status
                }
            }
        });
    };
    return (
        <div className={`${stylesGI.descriptionItem} ${stylesTI.descriptionItem}`}>
            <div className={stylesTI.descriptionItemTop}>
                <div className={stylesTI.itemColuna}>
                    <span className={stylesGI.mediumTextDark}>Transação: </span>
                    <span className={stylesGI.mediumTextLight}>{id}</span>
                </div>
                <div className={stylesTI.itemColuna}>
                    <span className={stylesGI.mediumTextDark}>Valor: </span>
                    <span className={stylesGI.mediumTextLight}>R$ {valor}</span>
                </div>
                <div className={stylesTI.itemColuna}>
                    <span className={stylesGI.mediumTextDark}>Data: </span>
                    <span className={stylesGI.mediumTextLight}>{data}</span>
                </div>
                <div className={stylesTI.itemColuna}>
                    <span className={stylesGI.mediumTextDark}>Cliente: </span>
                    <span className={stylesGI.mediumTextLight}>{cliente}</span>
                </div>
                <div className={stylesTI.itemColuna}>
                    <span className={stylesGI.mediumTextDark}>Status: </span>
                    <span className={stylesGI.mediumTextLight}>{status}</span>
                </div>
                <div className={stylesTI.itemColuna}>
                    <button className={`${stylesGI.buttons} ${stylesGI.ediPac}`} onClick={handleDetails}>
                        DETALHES
                    </button>
                </div>
            </div>
        </div>
    );
}

export default TransacaoIndividual;
