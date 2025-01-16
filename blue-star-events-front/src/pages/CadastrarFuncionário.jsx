import React, { useState } from 'react';
import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import stylesCadastrarUsuario from '../styles/CadastrarUsuario.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {
    RiArrowLeftCircleLine,
    RiUserLine,
    RiIdCardLine,
    RiMailLine,
    RiPhoneLine,
    RiMoneyDollarCircleLine,
    RiLockPasswordLine
} from '@remixicon/react';

function CadastrarFuncionario() {
    const navigate = useNavigate();

    const [name, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setTelefone] = useState('');
    const [salario, setSalario] = useState('');
    const [dataAdmissao, setDataAdmissao] = useState('');
    const [password, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');


    const handleSubmit = (e) => {
        e.preventDefault();

        // Salvar os dados no localStorage
        const userData = { name, cpf, email, phone, salario, dataAdmissao, password };
        localStorage.setItem('userData', JSON.stringify(userData));

        // Navegar para a página de endereço
        navigate('/cadastrarenderecofuncionario');
    };

    return (
        <div>
            <NavBar />
            <div className={stylesFormBaseA.backgroundImage}>
                <div className={`${stylesFormBaseA.container} ${stylesCadastrarUsuario.container}`}>
                    <div className={stylesFormBaseA.legendContainer}>
                        <RiArrowLeftCircleLine
                            className={stylesFormBaseA.iconBack}
                            onClick={() => navigate('/gerenciarfuncionarios')}
                        />

                        <div className={stylesFormBaseA.bigText}>
                            INSIRA OS DADOS DO FUNCIONÁRIO
                        </div>
                    </div>
                    <div className={stylesFormBaseA.formContainer}>
                        <form onSubmit={handleSubmit} className={stylesFormBaseA.baseForm}>
                            <label htmlFor="nome" className={stylesFormBaseA.label}>
                                Nome
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiUserLine />
                                <input
                                    type="text"
                                    id="nome"
                                    placeholder="Digite o nome"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={name}
                                    onChange={(e) => setNome(e.target.value)}
                                />
                            </div>

                            <label htmlFor="cpf" className={stylesFormBaseA.label}>
                                CPF
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiIdCardLine />
                                <input
                                    type="text"
                                    id="cpf"
                                    placeholder="Digite o CPF"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={cpf}
                                    onChange={(e) => setCpf(e.target.value)}
                                />
                            </div>

                            <label htmlFor="email" className={stylesFormBaseA.label}>
                                Email
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiMailLine />
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="Digite o email"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <label htmlFor="telefone" className={stylesFormBaseA.label}>
                                Telefone
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiPhoneLine />
                                <input
                                    type="text"
                                    id="telefone"
                                    placeholder="Digite o telefone"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={phone}
                                    onChange={(e) => setTelefone(e.target.value)}
                                />
                            </div>

                            <label htmlFor="salario" className={stylesFormBaseA.label}>
                                Salário
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiMoneyDollarCircleLine />
                                <input
                                    type="number"
                                    id="salario"
                                    placeholder="Digite o salário"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={salario}
                                    onChange={(e) => setSalario(e.target.value)}
                                />
                            </div>

                            <label htmlFor="dataAdmissao" className={stylesFormBaseA.label}>
                                Data admissão
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <input
                                    type="date"
                                    id="dataAdmissao"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={dataAdmissao}
                                    onChange={(e) => setDataAdmissao(e.target.value)}
                                />
                            </div>

                            <label htmlFor="senha" className={stylesFormBaseA.label}>
                                Senha
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiLockPasswordLine />
                                <input
                                    type="password"
                                    id="senha"
                                    placeholder="Digite sua senha"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={password}
                                    onChange={(e) => setSenha(e.target.value)}
                                />
                            </div>

                            <label htmlFor="confirmarSenha" className={stylesFormBaseA.label}>
                                Confirme a senha
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiLockPasswordLine />
                                <input
                                    type="password"
                                    id="confirmarSenha"
                                    placeholder="Digite novamente a senha"
                                    className={stylesFormBaseA.inputField}
                                    required
                                    value={confirmarSenha}
                                    onChange={(e) => setConfirmarSenha(e.target.value)}
                                />
                            </div>

                            <button type="submit" className={stylesFormBaseA.buttonBase}>
                                Próximo
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CadastrarFuncionario;