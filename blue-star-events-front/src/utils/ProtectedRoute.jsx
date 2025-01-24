import React, { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import ModalMensagemFalha from '../components/ModalMensagemFalha';
import stylesPR from '../styles/ProtectedRoute.module.css';

const ProtectedRoute = ({ allowedRoles }) => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const [showMessageError, setShowMessageError] = useState(false);
    const [showRoleError, setShowRoleError] = useState(false);
    const [redirectToLogin, setRedirectToLogin] = useState(false);
    const [redirectToHome, setRedirectToHome] = useState(false);

    if (!isLoggedIn) {
        if (!showMessageError) {
            setShowMessageError(true);
            setTimeout(() => {
                setRedirectToLogin(true);
            }, 2000);
        }

        if (redirectToLogin) {
            return <Navigate to="/login" replace />;
        }

        return (
            <div className={stylesPR.protectedRouteBackground}>
                <ModalMensagemFalha
                    title="ACESSO NEGADO"
                    text="Você precisa estar logado e possuir o nível de autenticação adequado para acessar esta página!"
                    isVisible={showMessageError}
                />
            </div>
        );
    }

    if (allowedRoles && !allowedRoles.includes(localStorage.getItem('userType') === 'admin'))  {
        if (!showRoleError) {
            setShowRoleError(true);
            setTimeout(() => {
                setRedirectToHome(true);
            }, 2000);
        }

        if (redirectToHome) {
            return <Navigate to="/" replace />;
        }

        return (
            <div className={stylesPR.protectedRouteBackground}>
                <ModalMensagemFalha
                    title="PERMISSÃO NEGADA"
                    text="Você não possui permissão para acessar esta página!"
                    isVisible={showRoleError}
                />
            </div>
        );
    }

    return <Outlet />;
};

export default ProtectedRoute;
