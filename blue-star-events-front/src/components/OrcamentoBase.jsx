import React from "react";
import NavBar from "../components/Navbar";
import stylesOP1 from "../styles/OrcamentoBase.module.css";
import { RiFileTextLine } from "@remixicon/react";

const OrcamentoBase = ({ title, children, subtotal, IconDetails, nextPath, prevPath, handleNavigate, nextButtonText, prevButtonText }) => {
    return (
        <div>
            <NavBar />
            <div className={stylesOP1.container}>
                <div className={stylesOP1.infos}>
                    <div className={stylesOP1.details}>
                        <div className={stylesOP1.mediumText}>
                            {IconDetails && <IconDetails className={stylesOP1.icon} />}{title}
                        </div>
                        {children}
                    </div>
                    <div className={stylesOP1.resumo}>
                        <div className={stylesOP1.mediumText}>
                            <RiFileTextLine className={stylesOP1.icon} /> RESUMO
                        </div>
                        <div className={stylesOP1.summaryTable}>
                            <div className={stylesOP1.summaryRow}>
                                <span>Subtotal do Pacote:</span>
                                <span>R$ {subtotal.toFixed(2)}</span>
                            </div>

                            <div className={stylesOP1.summaryRow}>
                                <span>Frete:</span>
                                <span>R$ 0,00</span>
                            </div>

                            <div className={stylesOP1.summaryRowTotal}>
                                <span>Total:</span>
                                <span>R$ {subtotal.toFixed(2)}</span>
                            </div>
                        </div>
                        <button
                            className={`${stylesOP1.buttons} ${stylesOP1.pe}`}
                            onClick={() => handleNavigate(nextPath)}
                        >
                            {nextButtonText}
                        </button>
                        <button
                            className={`${stylesOP1.buttons} ${stylesOP1.voltar}`}
                            onClick={() => handleNavigate(prevPath)}
                        >
                            {prevButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrcamentoBase;
