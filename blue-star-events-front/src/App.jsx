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
      </Routes>
    </BrowserRouter>
  );
}

export default App
