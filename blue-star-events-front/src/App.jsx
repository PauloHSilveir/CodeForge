import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import RedefinirSenha from './pages/RedefinirSenha';
import CriarNovaSenha from './pages/CriarNovaSenha';
import CadastrarUsuario from './pages/CadastrarUsuario';
import CadastrarEndereco from './pages/CadastrarEndereco';
import Perfil from './pages/Perfil';
import EditarDados from './pages/EditarDados';
import OrcamentoPersonalizado1 from './pages/OrcamentoPersonalizado1';
import OrcamentoPersonalizado2 from './pages/OrcamentoPersonalizado2';
import OrcamentoPersonalizado3 from './pages/OrcamentoPersonalizado3';
import OrcamentoPersonalizado4 from './pages/OrcamentoPersonalizado4';
import GerenciarSistema from './pages/GerenciarSistema';
import GerenciarPacotes from './pages/GerenciarPacotes';
import GerenciarItens from './pages/GerenciarItens';
import VisualizarHistoricoTransacoesADM from './pages/VisualizarHistoricoTransacoesADM';
import GerenciarFuncionarios from './pages/GerenciarFuncionarios';
import CadastrarPacote1 from './pages/CadastrarPacote1';
import EditarPacotes1 from './pages/EditarPacotes1';
import CadastrarPacote2 from './pages/CadastrarPacote2';
import EditarPacotes2 from './pages/EditarPacotes2';
import CadastrarPacote3 from './pages/CadastrarPacote3';
import CadastrarItem from './pages/CadastrarItem';
import EditarItem from './pages/EditarItem';
import CadastrarPacote4 from './pages/CadastrarPacote4';
import EditarPacotes3 from './pages/EditarPacotes3';
import EditarPacotes4 from './pages/EditarPacotes4';
import ConsultarPacotes from './pages/ConsultarPacotes';
import CadastrarFuncionario from './pages/CadastrarFuncionário';
import CadastrarEnderecoFuncionario from './pages/CadastrarEnderecoFuncionario';
import EditarFuncionario from './pages/EditarFuncionario';
import DetalhesTransacao from './pages/DetalhesTransacao';
import ContateNos from './pages/ContateNos';
import VisualizarHistoricoTransacoesCliente from './pages/VisualizarHistoricoTransacoesCliente';
import DetalhesPedido from './pages/DetalhesPedido';
import DetalhesPacote from './pages/DetalhesPacote';
import Carrinho from './pages/Carrinho';
import Pagamento from './pages/Pagamento';
import ConfirmacaoPagamento from './pages/ConfirmacaoPagamento';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/redefinirsenha' element={<RedefinirSenha />} />
        <Route path='/criarnovasenha' element={<CriarNovaSenha />} />
        <Route path='/cadastrarusuario' element={<CadastrarUsuario />} />
        <Route path='/cadastrarendereco' element={<CadastrarEndereco />} />
        <Route path='/perfil' element={<Perfil />} />
        <Route path='/editardados' element={<EditarDados />} />
        <Route path='/orcamentopersonalizado1' element={<OrcamentoPersonalizado1 />} />
        <Route path='/orcamentopersonalizado2' element={<OrcamentoPersonalizado2 />} />
        <Route path='/orcamentopersonalizado3' element={<OrcamentoPersonalizado3 />} />
        <Route path='/orcamentopersonalizado4' element={<OrcamentoPersonalizado4 />} />
        <Route path='/gerenciarsistema' element={<GerenciarSistema />} />
        <Route path='/gerenciarpacotes' element={<GerenciarPacotes />} />
        <Route path='/gerenciaritens' element={<GerenciarItens />} />
        <Route path='/gerenciartransacoes' element={<VisualizarHistoricoTransacoesADM />} />
        <Route path='/gerenciarfuncionarios' element={<GerenciarFuncionarios />} />
        <Route path='/cadastrarpacotes1' element={<CadastrarPacote1 />} />
        <Route path='/cadastrarpacotes2' element={<CadastrarPacote2 />} />
        <Route path='/cadastrarpacotes3' element={<CadastrarPacote3 />} />
        <Route path='/cadastrarpacotes4' element={<CadastrarPacote4 />} />
        <Route path='editarpacote1' element={<EditarPacotes1 />}/>
        <Route path='editarpacote2' element={<EditarPacotes2 />}/>
        <Route path='editarpacote3' element={<EditarPacotes3 />}/>
        <Route path='editarpacote4' element={<EditarPacotes4 />}/>
        <Route path='cadastraritem' element={<CadastrarItem />}/>
        <Route path='editaritem' element={<EditarItem />}/>
        <Route path='consultarpacotes' element={<ConsultarPacotes />}/>
        <Route path='cadastrarfuncionario' element={<CadastrarFuncionario />}/>
        <Route path='cadastrarenderecofuncionario' element={<CadastrarEnderecoFuncionario />}/>
        <Route path='editarfuncionario' element={<EditarFuncionario />}/>
        <Route path='detalhestransacao' element={<DetalhesTransacao />}/>
        <Route path='contatenos' element={<ContateNos />}/>
        <Route path='historicotransacoes' element={<VisualizarHistoricoTransacoesCliente />}/>
        <Route path="/detalhespedido/:pedidoId" element={<DetalhesPedido />} />
        <Route path="/detalhespacote" element={<DetalhesPacote />} />
        <Route path="/carrinho" element={<Carrinho />} />
        <Route path="/pagamento" element={<Pagamento />} />
        <Route path="/confirmacaopagamento" element={<ConfirmacaoPagamento />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
