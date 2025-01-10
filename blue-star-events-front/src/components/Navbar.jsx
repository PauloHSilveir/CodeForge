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
import '../styles/Navbar.css';
import { Link } from 'react-router-dom';

// Componente para o Logo
const Logo = () => (
  <Link to="/" className="nav__logo">
    <RiStarLine /> Blue Star Events
  </Link>
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
        <Link to ="/consultarpacotes" className="dropdown__link">
          <RiFileLine /> Padrão
        </Link>
      </li>
      <li>
        <Link to="/orcamentopersonalizado1" className="dropdown__link">
          <RiFileEditLine /> Personalizado
        </Link>
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
        <Link to='/login' className="dropdown__link">
          <RiLoginBoxLine /> Login
        </Link>
      </li>
      <li>
        <Link to="/cadastrarusuario" className="dropdown__link">
          <RiUserAddLine /> Cadastrar
        </Link>
      </li>
      <li>
        <Link to="/perfil" className="dropdown__link">
          <RiUserLine /> Perfil
        </Link>
      </li>
    </ul>
  </li>
);

// Componente para o menu de Usuário
const ManageSystemDropdown = () => (
  <li className="dropdown__item">
    <div className="nav__link">
      <Link to="/gerenciarsistema" className="nav__link">Gerenciar Sistema</Link>
      <RiArrowDownSLine className="dropdown__arrow" />
    </div>
    <ul className="dropdown__menu">
      <li>
        <Link to="/gerenciarpacotes" className="dropdown__link">
          <RiBox3Line /> Pacotes
        </Link>
      </li>
      <li>
        <Link to="/gerenciaritens" className="dropdown__link">
          <RiSofaLine /> Itens
        </Link>
      </li>
      <li>
        <Link to="/gerenciarusuarios" className="dropdown__link">
          <RiUserLine /> Usuários
        </Link>
      </li>
      <li>
        <Link to="/gerenciartransacoes" className="dropdown__link">
          <RiMoneyDollarBoxLine /> Transações
        </Link>
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
              <Link to="/contatenos" className="nav__link">Contate-nos</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;