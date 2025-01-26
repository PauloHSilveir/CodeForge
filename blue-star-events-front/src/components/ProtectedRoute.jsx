import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  // Verifica o token no localStorage ou de onde você armazenar os dados do usuário
  const token = localStorage.getItem('token');
  
  // Se não tiver token, redireciona para a página de login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // Decodifica o token para pegar as informações do usuário (aqui estamos assumindo que o token é JWT)
  const user = JSON.parse(atob(token.split('.')[1])); // Decodificando o payload

  // Verifica se o papel do usuário está na lista de roles permitidos
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // Redireciona para a página inicial ou outra página
  }

  // Se passar na verificação, renderiza a rota
  return children;
}

export default ProtectedRoute;
