import React from "react";
import styles from "../styles/ContateNos.module.css";
import { RiMapPinFill, RiPhoneFill, RiMailFill } from "@remixicon/react";
import Navbar from "../components/Navbar";

function ContateNos() {
    return (
        <div>
            <Navbar />
            <div className={styles.backgroundImage}>
                <div className={styles.container}>
                    <h1 className={styles.title}>Contate-nos</h1>
                    <div className={styles.infoSection}>
                        <div className={styles.infoItem}>
                            <RiMapPinFill className={styles.icon} />
                            <div>
                                <p className={styles.infoTitle}>Endereço</p>
                                <p className={styles.infoText}>
                                    Avenida Estrela Azul, 1234<br />
                                    Jardim das Luzes, São Paulo - SP<br />
                                    CEP: 01234-567
                                </p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <RiPhoneFill className={styles.icon} />
                            <div>
                                <p className={styles.infoTitle}>Telefone</p>
                                <p className={styles.infoText}>(11) 98765-4321</p>
                                <p className={styles.infoText}>(11) 3344-5566</p>
                            </div>
                        </div>
                        <div className={styles.infoItem}>
                            <RiMailFill className={styles.icon} />
                            <div>
                                <p className={styles.infoTitle}>E-mail</p>
                                <p className={styles.infoText}>contato@bluestarevents.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ContateNos;
