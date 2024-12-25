import React, { useState } from 'react';
import { 
  RiStarLine, 
  RiMenuLine, 
  RiCloseLine, 
  RiArrowDownSLine, 
  RiFileLine, 
  RiFileEditLine, 
  RiLoginBoxLine, 
  RiUserAddLine, 
  RiUserLine,
  RiMoneyDollarBoxLine,
  RiBox3Line,
  RiSofaLine
 } from '@remixicon/react';
import '../styles/NavBar.css';

// Componente para o Logo
const Logo = () => (
  <a href="Home" className="nav__logo">
    <RiStarLine /> Blue Star Events
  </a>
);

// Componente para o botão do Menu
const MenuToggle = ({ menuOpen, toggleMenu }) => (
  <div className="nav__toggle" id="nav-toggle" onClick={toggleMenu}>
    {menuOpen ? <RiCloseLine className="nav__close" /> : <RiMenuLine className="nav__burger" />}
  </div>
);

// Componente para o item de Pacotes
const PackagesDropdown = () => (
  <li className="dropdown__item">
    <div className="nav__link">
      Contratar um pacote <RiArrowDownSLine className="dropdown__arrow" />
    </div>
    <ul className="dropdown__menu">
      <li>
        <a href="ConsultarPacotes" className="dropdown__link">
          <RiFileLine /> Padrão
        </a>
      </li>
      <li>
        <a href="ObterOrcamentoPersonalizado" className="dropdown__link">
          <RiFileEditLine /> Personalizado
        </a>
      </li>
    </ul>
  </li>
);

// Componente para o menu de Usuário
const UserDropdown = () => (
  <li className="dropdown__item">
    <div className="nav__link">
      Usuário <RiArrowDownSLine className="dropdown__arrow" />
    </div>
    <ul className="dropdown__menu">
      <li>
        <a href="Login" className="dropdown__link">
          <RiLoginBoxLine /> Login
        </a>
      </li>
      <li>
        <a href="Cadastrar" className="dropdown__link">
          <RiUserAddLine /> Cadastrar
        </a>
      </li>
      <li>
        <a href="Perfil" className="dropdown__link">
          <RiUserLine /> Perfil
        </a>
      </li>
    </ul>
  </li>
);

// Componente para o menu de Usuário
const ManageSystemDropdown = () => (
  <li className="dropdown__item">
    <div className="nav__link">
      Gerenciar Sistema <RiArrowDownSLine className="dropdown__arrow" />
    </div>
    <ul className="dropdown__menu">
      <li>
        <a href="GerenciarPacotes" className="dropdown__link">
          <RiBox3Line /> Pacotes
        </a>
      </li>
      <li>
        <a href="GerenciarItens" className="dropdown__link">
          <RiSofaLine /> Itens
        </a>
      </li>
      <li>
        <a href="GerenciarUsuarios" className="dropdown__link">
          <RiUserLine /> Usuários
        </a>
      </li>
      <li>
        <a href="GerenciarTransacoes" className="dropdown__link">
          <RiMoneyDollarBoxLine /> Transações
        </a>
      </li>
    </ul>
  </li>
);

// Componente principal da Navbar
const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <nav className="nav container">
        <div className="nav__data">
          <Logo />
          <MenuToggle menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </div>

        <div className={`nav__menu ${menuOpen ? 'show-menu' : 'show-icon'}`} id="nav-menu">
          <ul className="nav__list">
            <PackagesDropdown />
            <UserDropdown />
            <ManageSystemDropdown />
            <li>
              <a href="ContateNos" className="nav__link">Contate-nos</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;