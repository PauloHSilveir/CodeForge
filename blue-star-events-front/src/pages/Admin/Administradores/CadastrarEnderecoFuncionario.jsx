import NavBar from "../../../components/Navbar";
import stylesFormBaseA from '../../../styles/FormBaseA.module.css';
import stylesCadastrarEndereco from '../../../styles/CadastrarEndereco.module.css';
import { formatCep } from '../../../utils/formatters';
import ModalMensagemSucesso from "../../../components/ModalMensagemSucesso";
import ModalMensagemFalha from "../../../components/ModalMensagemFalha";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    RiArrowLeftCircleLine,
    RiRoadMapLine,
    RiMapPinUserLine,
    RiHome8Line,
    RiGroup2Line,
    RiCommunityLine,
    RiMapLine,
    RiMapPinRangeLine,
    RiUserAddLine
} from '@remixicon/react';

function CadastrarEnderecoFuncionario() {
    const navigate = useNavigate();

    const [showSucess, setShowSucess] = useState(false);
    const [showFail, setShowFail] = useState(false);
    const [showFailRegister, setShowFailRegister] = useState(false);

    const [rua, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = JSON.parse(localStorage.getItem('userData'));
        if (!userData) {
            setShowFail(true);

            setTimeout(() => {
                setShowFail(false);
                navigate('/cadastrarfuncionario');
            }, 3000);
            
        }

        const fullData = {
            ...userData,
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado: estado.toUpperCase(),
            cep : formatCep(cep),
            isAdmin: true
        };

        try {
            const response = await fetch('http://localhost:1313/admin/cadastrar', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
                },
                body: JSON.stringify(fullData),
            });

            if (response.ok) {
                localStorage.removeItem('userData');
                setShowSucess(true);

                setTimeout(() => {
                    setShowSucess(false);
                    navigate('/gerenciarfuncionarios');
                }, 2000);
                
            } else {
                setShowFailRegister(true);

                setTimeout(() => {
                    setShowFailRegister(false);
                    navigate('/cadastrarusuario');
                    return;
                }, 3000);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        }
    };

    return (
        <div>
            <NavBar />
            <div className={stylesFormBaseA.backgroundImage}>
                <div className={`${stylesFormBaseA.container} ${stylesCadastrarEndereco.container}`}>
                    <div className={`${stylesFormBaseA.legendContainer} ${stylesCadastrarEndereco.legendContainer}`}>
                        <RiArrowLeftCircleLine
                            className={stylesFormBaseA.iconBack}
                            onClick={() => navigate('/cadastrarfuncionario')}
                        />
                        <div className={stylesFormBaseA.bigText}>
                            INSIRA O ENDEREÇO DO FUNCIONÁRIO
                        </div>
                    </div>
                    <div className={stylesFormBaseA.formContainer}>
                        <form onSubmit={handleSubmit} className={stylesFormBaseA.baseForm}>
                            <label htmlFor="logradouro" className={stylesFormBaseA.label}>
                                Logradouro
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiRoadMapLine />
                                <input type="text" id="logradouro" placeholder="Digite o logradouro" className={stylesFormBaseA.inputField} onChange={(e) => setLogradouro(e.target.value)} required />
                            </div>

                            <label htmlFor="numero" className={stylesFormBaseA.label}>
                                Número
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiMapPinUserLine />
                                <input type="text" id="numero" placeholder="Digite o número da residência" className={stylesFormBaseA.inputField} onChange={(e) => setNumero(e.target.value)} required />
                            </div>

                            <label htmlFor="complemento" className={stylesFormBaseA.label}>
                                Complemento
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiHome8Line />
                                <input type="text" id="complemento" placeholder="Digite o complemento" className={stylesFormBaseA.inputField} onChange={(e) => setComplemento(e.target.value)} />
                            </div>

                            <label htmlFor="bairro" className={stylesFormBaseA.label}>
                                Bairro
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiGroup2Line />
                                <input type="text" id="bairro" placeholder="Digite o bairro" className={stylesFormBaseA.inputField} onChange={(e) => setBairro(e.target.value)} required />
                            </div>

                            <label htmlFor="cidade" className={stylesFormBaseA.label}>
                                Cidade
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiCommunityLine />
                                <input type="text" id="cidade" placeholder="Digite a cidade" className={stylesFormBaseA.inputField} onChange={(e) => setCidade(e.target.value)} required />
                            </div>

                            <label htmlFor="estado" className={stylesFormBaseA.label}>
                                Estado
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiMapLine />
                                <input type="text" id="estado" placeholder="Digite o estado" className={stylesFormBaseA.inputField} onChange={(e) => setEstado(e.target.value)} required />
                            </div>

                            <label htmlFor="cep" className={stylesFormBaseA.label}>
                                CEP
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <RiMapPinRangeLine />
                                <input type="text" id="cep" placeholder="Digite o CEP" className={stylesFormBaseA.inputField} onChange={(e) => setCep(e.target.value)} required />
                            </div>

                            <button className={stylesFormBaseA.buttonBase} type='submit'>
                                <RiUserAddLine />Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <ModalMensagemSucesso
                title="CADASTRAR FUNCIONÁRIO"
                text="Funcionário cadastrado com sucesso!"
                isVisible={showSucess}
            />

            <ModalMensagemFalha
                title="DADOS DO FUNCIONÁRIO"
                text="Dados do usuário não encontrados! Por favor, refaça o cadastro."
                isVisible={showFail}
            />

            <ModalMensagemFalha
                title="CADASTRAR FUNCIONÁRIO"
                text="Erro ao cadastrar."
                isVisible={showFailRegister}
            />
        </div >
    );
}

export default CadastrarEnderecoFuncionario;