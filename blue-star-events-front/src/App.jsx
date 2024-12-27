import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login';
import RedefinirSenha from './pages/RedefinirSenha';
import CriarNovaSenha from './pages/CriarNovaSenha';
import CadastrarUsuario from './pages/CadastrarUsuario';
import CadastrarEndereco from './pages/CadastrarEndereco';
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
      </Routes>
    </BrowserRouter>
  );
}

export default App
