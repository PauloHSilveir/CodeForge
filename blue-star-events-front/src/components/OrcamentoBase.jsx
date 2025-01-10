import React from "react";
import NavBar from "../components/Navbar";
import stylesFormBaseA from "../styles/FormBaseA.module.css";
import stylesOP1 from "../styles/OrcamentoBase.module.css";
import { RiFileTextLine } from "@remixicon/react";

const OrcamentoBase = ({ title, children, subtotal, nextPath, prevPath, handleNavigate, nextButtonText }) => {
    return (
        <div>
            <NavBar />
            <div className={stylesOP1.container}>
                <div className={`${stylesFormBaseA.legendContainer} ${stylesOP1.legendContainer}`}>
                    <div className={stylesFormBaseA.bigText}>CRIANDO PACOTE PERSONALIZADO</div>
                </div>
                <div className={stylesOP1.infos}>
                    <div className={stylesOP1.details}>
                        <div className={stylesOP1.mediumText}>{title}</div>
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
                        <button className={`${stylesOP1.buttons} ${stylesOP1.pe}`} onClick={() => handleNavigate(nextPath)}> 
                            {nextButtonText} 
                        </button>
                        <button className={`${stylesOP1.buttons} ${stylesOP1.voltar}`} onClick={() => handleNavigate(prevPath)}>
                            VOLTAR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrcamentoBase;
