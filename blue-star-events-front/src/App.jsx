import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './utils/ProtectedRoute';

import Home from './pages/Global/Home'
import Login from './pages/Global/Login';
import RedefinirSenha from './pages/Global/RedefinirSenha';
import CriarNovaSenha from './pages/Global/CriarNovaSenha';
import CadastrarUsuario from './pages/Global/CadastrarUsuario';
import CadastrarEndereco from './pages/Global/CadastrarEndereco';
import Perfil from './pages/Client/Perfil/Perfil';
import EditarDados from './pages/Client/Perfil/EditarDados';
import GerenciarSistema from './pages/Admin/GerenciarSistema';
import GerenciarPacotes from './pages/Admin/Pacotes/GerenciarPacotes';
import GerenciarComponentes from './pages/Admin/Componentes/GerenciarComponentes';
import VisualizarHistoricoTransacoesADM from './pages/Admin/Transacoes/VisualizarHistoricoTransacoesADM';
import GerenciarFuncionarios from './pages/Admin/Administradores/GerenciarFuncionarios';
import CadastrarPacote1 from './pages/Admin/Pacotes/CadastrarPacote1';
import EditarPacotes1 from './pages/Admin/Pacotes/EditarPacotes1';
import CadastrarPacote2 from './pages/Admin/Pacotes/CadastrarPacote2';
import EditarPacotes2 from './pages/Admin/Pacotes/EditarPacotes2';
import CadastrarPacote3 from './pages/Admin/Pacotes/CadastrarPacote3';
import CadastrarComponente from './pages/Admin/Componentes/CadastrarComponente';
import EditarComponente from './pages/Admin/Componentes/EditarComponente';
import CadastrarPacote4 from './pages/Admin/Pacotes/CadastrarPacote4';
import EditarPacotes3 from './pages/Admin/Pacotes/EditarPacotes3';
import EditarPacotes4 from './pages/Admin/Pacotes/EditarPacotes4';
import ConsultarPacotes from './pages/Global/ConsultarPacotes';
import CadastrarFuncionario from './pages/Admin/Administradores/CadastrarFuncionario';
import CadastrarEnderecoFuncionario from './pages/Admin/Administradores/CadastrarEnderecoFuncionario';
import EditarFuncionario from './pages/Admin/Administradores/EditarFuncionario';
import DetalhesTransacao from './pages/Admin/Transacoes/DetalhesTransacao';
import ContateNos from './pages/Global/ContateNos';
import VisualizarHistoricoTransacoesCliente from './pages/Client/Perfil/VisualizarHistoricoTransacoesCliente';
import DetalhesPedido from './pages/Client/Perfil/DetalhesPedido';
import DetalhesPacote from './pages/Global/DetalhesPacote';
import Carrinho from './pages/Client/Compra/Carrinho';
import Pagamento from './pages/Client/Compra/Pagamento';
import ConfirmacaoPagamento from './pages/Client/Compra/ConfirmacaoPagamento';
import EditarPedido from './pages/Client/Perfil/EditarPedido';
import { PackageProvider } from './context/PackageContext';
import DefinirDetalhesEvento from './pages/Client/Compra/DefinirDetalhesEvento';

function App() {
  return (
    <BrowserRouter>
      <PackageProvider>
        <Routes>
          {/*Globais */}
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/redefinirsenha' element={<RedefinirSenha />} />
          <Route path='/criarnovasenha' element={<CriarNovaSenha />} />
          <Route path='/cadastrarusuario' element={<CadastrarUsuario />} />
          <Route path='/cadastrarendereco' element={<CadastrarEndereco />} />
          <Route path='/contatenos' element={<ContateNos />} />
          <Route path='/consultarpacotes' element={<ConsultarPacotes />} />
          <Route path="/detalhespacote" element={<DetalhesPacote />} />

          {/*Cliente */}
          <Route element={<ProtectedRoute allowedRoles={[false]} />}>
            <Route path='/perfil' element={<Perfil />} />
            <Route path='/editardados' element={<EditarDados />} />
            <Route path='historicotransacoes' element={<VisualizarHistoricoTransacoesCliente />} />
            <Route path="/detalhespedido/:pedidoId" element={<DetalhesPedido />} /> {/*Falta fazer e ajustar modais */}
            <Route path="/editarpedido/:pedidoId" element={<EditarPedido />} /> {/*Falta fazer e ajustar modais */}
            <Route path="/carrinho" element={<Carrinho />} /> {/*Falta fazer e ajustar modais */}
            <Route path="/pagamento" element={<Pagamento />} /> {/*Falta fazer e ajustar modais */}
            <Route path="/confirmacaopagamento" element={<ConfirmacaoPagamento />} /> {/*Falta fazer e ajustar modais */}
            <Route path='/definirdetalhesevento' element={<DefinirDetalhesEvento />} />
          </Route>

          {/*Admin */}
          <Route element={<ProtectedRoute allowedRoles={[true]} />}>
            <Route path='/gerenciarsistema' element={<GerenciarSistema />} />
            <Route path='/gerenciarpacotes' element={<GerenciarPacotes />} />
            <Route path='/cadastrarpacotes1' element={<CadastrarPacote1 />} />
            <Route path='/cadastrarpacotes2' element={<CadastrarPacote2 />} />
            <Route path='/cadastrarpacotes3' element={<CadastrarPacote3 />} />
            <Route path='/cadastrarpacotes4' element={<CadastrarPacote4 />} />
            <Route path='editarpacote1' element={<EditarPacotes1 />} />
            <Route path='editarpacote2' element={<EditarPacotes2 />} />
            <Route path='editarpacote3' element={<EditarPacotes3 />} />
            <Route path='editarpacote4' element={<EditarPacotes4 />} />
            <Route path='/gerenciar-componentes' element={<GerenciarComponentes />} />
            <Route path='cadastrar-componentes' element={<CadastrarComponente />} />
            <Route path='editar-componente' element={<EditarComponente />} />
            <Route path='/gerenciarfuncionarios' element={<GerenciarFuncionarios />} />
            <Route path='cadastrarfuncionario' element={<CadastrarFuncionario />} />
            <Route path='cadastrarenderecofuncionario' element={<CadastrarEnderecoFuncionario />} />
            <Route path='editarfuncionario/:id' element={<EditarFuncionario />} />
            <Route path='/gerenciartransacoes' element={<VisualizarHistoricoTransacoesADM />} />
            <Route path='detalhestransacao' element={<DetalhesTransacao />} />
          </Route>
        </Routes>
      </PackageProvider>
    </BrowserRouter>
  );
}

export default App
