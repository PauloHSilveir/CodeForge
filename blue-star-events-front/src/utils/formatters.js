import {jwtDecode} from 'jwt-decode';

export const formatCpf = (cpf) => {
    return cpf
        .replace(/[^\d]/g, '')
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhone = (phone) => {
    return phone
        .replace(/[^\d]/g, '')
        .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};

export const formatCep = (cep) => {
    return cep
        .replace(/[^\d]/g, '')
        .replace(/(\d{5})(\d{3})/, '$1-$2');
};

export const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isTokenExpired = (token) => {
    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        return decodedToken.exp < currentTime; 
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return true;
    }
};