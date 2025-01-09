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
      </Routes>
    </BrowserRouter>
  );
}

export default App
