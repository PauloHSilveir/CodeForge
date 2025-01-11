import NavBar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import stylesPerfil from "../styles/Perfil.module.css";
import stylesGS from "../styles/GerenciarSistema.module.css";

import {
    RiApps2Fill,
    RiBox3Line,
    RiSurroundSoundLine,
    RiUser3Line,
    RiMoneyDollarCircleLine
} from '@remixicon/react';

function GerenciarSistema() {
    const navigate = useNavigate();

    const handleNavigate = (path) => {
        navigate(path);
    };

    return (
        <div>
            <NavBar />
            <div className={stylesPerfil.backgroundImage}>
                <div className={stylesPerfil.container}>
                    <div className={stylesPerfil.optionBox}>
                        <div className={`${stylesPerfil.containerTitle} ${stylesGS.containerTitle}`}>
                            <RiApps2Fill className={stylesPerfil.blueIcon} />
                            <span className={stylesPerfil.bigText}>GERENCIADOR DO SISTEMA</span>
                        </div>
                        <div className={stylesPerfil.containerButtons}>
                            <button className={`${stylesPerfil.buttonsOptionsBox} ${stylesGS.buttonsOptionsBox}`} onClick={() => handleNavigate('/gerenciarpacotes')}>
                                <RiBox3Line className={`${stylesPerfil.blueIcon} ${stylesPerfil.bigIcon}`} />
                                <div className={`${stylesPerfil.textButtonsOptions} ${stylesGS.textButtonsOptions}`}>
                                    <span className={stylesPerfil.mediumText}> GERENCIAR PACOTES </span>
                                    <span className={stylesPerfil.smallText}> <br />Adicione, edite, remova e visualize os pacotes disponíveis no sistema. </span>
                                </div>
                            </button>
                            <button className={`${stylesPerfil.buttonsOptionsBox} ${stylesGS.buttonsOptionsBox}`} onClick={() => handleNavigate('/gerenciaritens')}>
                                <RiSurroundSoundLine className={`${stylesPerfil.blueIcon} ${stylesPerfil.bigIcon}`} />
                                <div className={`${stylesPerfil.textButtonsOptions} ${stylesGS.textButtonsOptions}`}>
                                    <span className={stylesPerfil.mediumText}> GERENCIAR ITENS </span>
                                    <span className={stylesPerfil.smallText}> <br />Adicione, edite, remova e visualize os itens disponíveis no sistema. </span>
                                </div>
                            </button>
                            <button className={`${stylesPerfil.buttonsOptionsBox} ${stylesGS.buttonsOptionsBox}`} onClick={() => handleNavigate('/gerenciarfuncionarios')}>
                                <RiUser3Line className={`${stylesPerfil.blueIcon} ${stylesPerfil.bigIcon}`} />
                                <div className={`${stylesPerfil.textButtonsOptions} ${stylesGS.textButtonsOptions}`}>
                                    <span className={stylesPerfil.mediumText}> GERENCIAR FUNCIONÁRIOS </span>
                                    <span className={stylesPerfil.smallText}> <br />Cadastre novos funcionários, atualize informações ou gerencie permissões. </span>
                                </div>
                            </button>
                            <button className={`${stylesPerfil.buttonsOptionsBox} ${stylesGS.buttonsOptionsBox}`} onClick={() => handleNavigate('/gerenciartransacoes')}>
                                <RiMoneyDollarCircleLine className={`${stylesPerfil.blueIcon} ${stylesPerfil.bigIcon}`} />
                                <div className={`${stylesPerfil.textButtonsOptions} ${stylesGS.textButtonsOptions}`}>
                                    <span className={stylesPerfil.mediumText}> GERENCIAR TRANSAÇÕES </span>
                                    <span className={stylesPerfil.smallText}> <br />Acompanhe e monitore as transações realizadas no sistema. </span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GerenciarSistema;
