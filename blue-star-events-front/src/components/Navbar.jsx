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
  RiSofaLine,
  RiShoppingCart2Line
} from '@remixicon/react';
import stylesNavbar from '../styles/Navbar.module.css';
import { Link } from 'react-router-dom';

const CartIcon = ({ cartItems }) => (
  <li>
    <Link to="/carrinho" className={stylesNavbar.nav__link}>
      <div className={stylesNavbar.cart}>
        <RiShoppingCart2Line className={stylesNavbar.cart__icon} />
        {cartItems > 0 && <span className={stylesNavbar.cart__count}>{cartItems}</span>}
      </div>
    </Link>
  </li>
);

const Logo = () => (
  <Link to="/" className={stylesNavbar.nav__logo}>
    <RiStarLine /> Blue Star Events
  </Link>
);

const MenuToggle = ({ menuOpen, toggleMenu }) => (
  <div
    className={stylesNavbar.nav__toggle}
    id="nav-toggle"
    onClick={toggleMenu}
  >
    {menuOpen ? (
      <RiCloseLine className={stylesNavbar.nav__close} />
    ) : (
      <RiMenuLine className={stylesNavbar.nav__burger} />
    )}
  </div>
);

const PackagesDropdown = () => (
  <li className={stylesNavbar.dropdown__item}>
    <div className={stylesNavbar.nav__link}>
      Contratar um pacote <RiArrowDownSLine className={stylesNavbar.dropdown__arrow} />
    </div>
    <ul className={stylesNavbar.dropdown__menu}>
      <li>
        <Link to="/consultarpacotes" className={stylesNavbar.dropdown__link}>
          <RiFileLine /> Padrão
        </Link>
      </li>
      <li>
        <Link to="/orcamentopersonalizado1" className={stylesNavbar.dropdown__link}>
          <RiFileEditLine /> Personalizado
        </Link>
      </li>
    </ul>
  </li>
);

const UserDropdown = () => (
  <li className={stylesNavbar.dropdown__item}>
    <div className={stylesNavbar.nav__link}>
      Usuário <RiArrowDownSLine className={stylesNavbar.dropdown__arrow} />
    </div>
    <ul className={stylesNavbar.dropdown__menu}>
      <li>
        <Link to='/login' className={stylesNavbar.dropdown__link}>
          <RiLoginBoxLine /> Login
        </Link>
      </li>
      <li>
        <Link to="/cadastrarusuario" className={stylesNavbar.dropdown__link}>
          <RiUserAddLine /> Cadastrar
        </Link>
      </li>
      <li>
        <Link to="/perfil" className={stylesNavbar.dropdown__link}>
          <RiUserLine /> Perfil
        </Link>
      </li>
    </ul>
  </li>
);

const ManageSystemDropdown = () => (
  <li className={stylesNavbar.dropdown__item}>
    <div className={stylesNavbar.nav__link}>
    <Link to="/gerenciarsistema"  className={`${stylesNavbar.nav__link} ${stylesNavbar.nav__link__GS}`}>Gerenciar Sistema</Link><RiArrowDownSLine className={stylesNavbar.dropdown__arrow} />
    </div>
    <ul className={stylesNavbar.dropdown__menu}>
      <li>
        <Link to="/gerenciarpacotes" className={stylesNavbar.dropdown__link}>
          <RiBox3Line /> Pacotes
        </Link>
      </li>
      <li>
        <Link to="/gerenciaritens" className={stylesNavbar.dropdown__link}>
          <RiSofaLine /> Itens
        </Link>
      </li>
      <li>
        <Link to="/gerenciarfuncionarios" className={stylesNavbar.dropdown__link}>
          <RiUserLine /> Funcionários
        </Link>
      </li>
      <li>
        <Link to="/gerenciartransacoes" className={stylesNavbar.dropdown__link}>
          <RiMoneyDollarBoxLine /> Transações
        </Link>
      </li>
    </ul>
  </li>
);

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState(1); 

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={stylesNavbar.header}>
      <nav className={`${stylesNavbar.nav} ${stylesNavbar.container}`}>
        <div className={stylesNavbar.nav__data}>
          <Logo />
          <MenuToggle menuOpen={menuOpen} toggleMenu={toggleMenu} />
        </div>
        <div
          className={`${stylesNavbar.nav__menu} ${
            menuOpen ? stylesNavbar['show-menu'] : ''
          }`}
          id="nav-menu"
        >
          <ul className={stylesNavbar.nav__list}>
            <PackagesDropdown />
            <UserDropdown />
            <ManageSystemDropdown />
            <li>
              <Link to="/contatenos" className={stylesNavbar.nav__link}>Contate-nos</Link>
            </li>
            <CartIcon cartItems={cartItems} />
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
