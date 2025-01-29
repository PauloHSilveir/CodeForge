import NavBar from "../../../components/Navbar";
import stylesFormBaseA from '../../../styles/FormBaseA.module.css';
import stylesCadastrarEndereco from '../../../styles/CadastrarEndereco.module.css';
import { formatCep } from '../../../utils/formatters';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    RiArrowLeftCircleLine,
    RiRoadMapLine,
    RiMapPinUserLine,
    RiHome8Line,
    RiGroup2Line,
    RiCommunityLine,
    RiMapLine,
    RiMapPinRangeLine
} from '@remixicon/react';

function DefinirDetalhesEvento() {
    const navigate = useNavigate();
    const location = useLocation();
    const subtotal = location.state?.subtotal || 0;
    const itensCarrinho = location.state?.itensCarrinho || [];
    const [rua, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [dataEvento, setDataEvento] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const endereco = {
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado: estado.toUpperCase(),
            cep: formatCep(cep),
        };

        const eventData = {
            endereco,
            dataEvento
        };

        console.log('Dados do evento sendo enviados:', eventData);
        
        navigate('/pagamento', { 
            state: {
                subtotal,
                itensCarrinho,
                eventData 
            } 
        });
    };

    return (
        <div>
            <NavBar />
            <div className={stylesFormBaseA.backgroundImage}>
                <div className={`${stylesFormBaseA.container} ${stylesCadastrarEndereco.container}`}>
                    <div className={`${stylesFormBaseA.legendContainer} ${stylesCadastrarEndereco.legendContainer}`}>
                        <RiArrowLeftCircleLine
                            className={stylesFormBaseA.iconBack}
                            onClick={() => navigate(-1)}
                        />
                        <div className={stylesFormBaseA.bigText}>
                            INSIRA O ENDEREÇO DO EVENTO
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
                                <input type="text" id="numero" placeholder="Digite o número" className={stylesFormBaseA.inputField} onChange={(e) => setNumero(e.target.value)} required />
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

                            <label htmlFor="dataEvento" className={stylesFormBaseA.label}>
                                Data do Evento
                            </label>
                            <div className={stylesFormBaseA.inputs}>
                                <input 
                                    type="date" 
                                    id="dataEvento" 
                                    className={stylesFormBaseA.inputField} 
                                    onChange={(e) => setDataEvento(e.target.value)} 
                                    required
                                />
                            </div>

                            <button className={stylesFormBaseA.buttonBase} type='submit'>
                                Confirmar Endereço
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DefinirDetalhesEvento;