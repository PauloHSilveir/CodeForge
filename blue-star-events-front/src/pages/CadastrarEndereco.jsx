import NavBar from "../components/Navbar";
import stylesFormBaseA from '../styles/FormBaseA.module.css';
import stylesCadastrarEndereco from '../styles/CadastrarEndereco.module.css';
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
import ModalCadastrar from "../components/ModalCadastrar";

function CadastrarEndereco() {
    const navigate = useNavigate();
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [showPrivacyModal, setShowPrivacyModal] = useState(false);

    const [rua, setLogradouro] = useState('');
    const [numero, setNumero] = useState('');
    const [complemento, setComplemento] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');

    const handleNavigate = (path) => {
        navigate(path);
    };

    const handleOpenTerms = () => {
        setShowTermsModal(true);
    };

    const handleCloseTerms = () => {
        setShowTermsModal(false);
    };

    const handleOpenPrivacy = () => {
        setShowPrivacyModal(true);
    };

    const handleClosePrivacy = () => {
        setShowPrivacyModal(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Recuperar os dados do usuário do localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));

        if (!userData) {
            alert('Dados do usuário não encontrados! Por favor, refaça o cadastro.');
            navigate('/cadastrarusuario');
            return;
        }

        // Combinar os dados do usuário e endereço
        const fullData = {
            ...userData,
            
            rua,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            cep,
            
        };

        // Enviar os dados para o backend
        try {
            const response = await fetch('http://localhost:1313/user/cadastro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(fullData),
            });

            if (response.ok) {
                // Limpar os dados do localStorage
                localStorage.removeItem('userData');
                navigate('/');
            } else {
                console.error('Erro ao cadastrar');
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
                            onClick={() => navigate('/cadastrarusuario')}
                        />
                        <div className={stylesFormBaseA.bigText}>
                            INSIRA SEU ENDEREÇO
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
                                <input type="text" id="complemento" placeholder="Digite o complemento" className={stylesFormBaseA.inputField} onChange={(e) => setComplemento(e.target.value)}/>
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

                            <div className={stylesCadastrarEndereco.inputCheckBox}>
                                <input type="checkbox" id="concordo" required />
                                <label htmlFor="concordo" className={stylesCadastrarEndereco.checkboxLabel}>
                                    Concordo com o <span onClick={handleOpenTerms} className={stylesCadastrarEndereco.link}>Termo de Acordo do Usuário </span>
                                    e com a <span onClick={handleOpenPrivacy} className={stylesCadastrarEndereco.link}>Política de Privacidade</span> do Blue Star Events.
                                </label>
                            </div>
                            <button className={stylesFormBaseA.buttonBase} type='submit'>
                                <RiUserAddLine />Cadastrar
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <ModalCadastrar isOpen={showTermsModal} onClose={handleCloseTerms} title="Termo de Acordo do Usuário">
                <div className={stylesCadastrarEndereco.modalText}>
                    <p>
                        <br />Ao utilizar os serviços da Blue Star Events, você concorda com os seguintes termos e condições:<br /><br />
                    </p>
                    <p>
                        <strong>1. Aceitação dos Termos</strong><br />
                        Ao acessar e utilizar os nossos serviços, você concorda em cumprir estes Termos de Uso, nossas políticas e todas as
                        leis e regulamentos aplicáveis. Se você não concorda com qualquer parte dos termos, você não deve utilizar nossos serviços.<br />
                    </p>
                    <p>
                        <br /><strong>2. Modificação dos Termos</strong><br />
                        Reservamo-nos o direito de modificar estes termos a qualquer momento. As modificações entrarão em vigor imediatamente após a
                        publicação no nosso site. Recomendamos que você revise os Termos de Uso periodicamente. O uso continuado dos nossos serviços
                        após quaisquer alterações constitui sua aceitação dos novos termos.<br /><br />
                    </p>
                    <p>
                        <strong>3. Responsabilidade do Usuário</strong><br />
                        Você concorda em usar nossos serviços de maneira responsável e conforme as leis locais. É proibido o uso dos serviços para
                        fins ilegais, fraudulentos ou prejudiciais.<br /><br />
                    </p>
                    <p>
                        <strong>4. Conta de Usuário</strong><br />
                        Para utilizar certos serviços, você pode ser solicitado a criar uma conta de usuário. Você é responsável por manter a
                        confidencialidade da sua conta e senha e por todas as atividades que ocorram sob sua conta. Você concorda em notificar-nos
                        imediatamente sobre qualquer uso não autorizado da sua conta.<br />
                    </p>
                </div>
            </ModalCadastrar>

            <ModalCadastrar isOpen={showPrivacyModal} onClose={handleClosePrivacy} title="Política de Privacidade">
                <div className={stylesCadastrarEndereco.modalText}>
                    <p>
                        <br />A Blue Star Events valoriza sua privacidade. Esta Política de Privacidade descreve como coletamos, usamos,
                        divulgamos e protegemos suas informações pessoais quando você utiliza nossos serviços.<br /><br />
                    </p>
                    <p>
                        <strong>1. Informações que Coletamos</strong><br />
                        Informações de Cadastro: Nome, endereço de e-mail, número de telefone, etc., fornecidos durante a criação de uma conta.<br />
                        Informações de Uso: Dados sobre como você utiliza nossos serviços, incluindo interações e preferências.<br />
                        Informações de Pagamento: Detalhes do cartão de crédito e outras informações financeiras necessárias para
                        processar transações.<br /><br />
                    </p>
                    <p>
                        <strong>2. Como Usamos Suas Informações</strong><br />
                        Para Fornecer Serviços: Usamos suas informações para oferecer, operar e melhorar nossos serviços.<br />
                        Para Comunicação: Enviamos notificações importantes, atualizações e promoções relevantes.<br />
                        Para Segurança: Monitoramos atividades para prevenir fraudes e outras atividades maliciosas.<br /><br />
                    </p>
                    <p>
                        <strong>3. Compartilhamento de Informações</strong><br />
                        Não compartilhamos suas informações pessoais com terceiros, exceto conforme necessário para fornecer os serviços
                        ou conforme exigido por lei.<br /><br />
                    </p>
                    <p>
                        <strong>4. Segurança das Informações</strong><br />
                        Implementamos medidas de segurança adequadas para proteger suas informações contra acessos não autorizados,
                        alterações, divulgação ou destruição.<br /><br />
                    </p>
                    <p>
                        <strong>5. Seus Direitos</strong><br />
                        Você tem o direito de acessar, corrigir ou excluir suas informações pessoais. Para exercer esses direitos, entre
                        em contato conosco através dos detalhes fornecidos no nosso site.<br /><br />
                    </p>
                    <p>
                        <strong>6. Alterações a esta Política</strong><br />
                        Reservamo-nos o direito de atualizar esta Política de Privacidade a qualquer momento. Notificaremos você sobre
                        quaisquer alterações significativas através do nosso site ou por outros meios apropriados.<br />
                    </p>
                </div>
            </ModalCadastrar>

        </div >
    );
}

export default CadastrarEndereco;

