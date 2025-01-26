import React, { useState, useEffect } from 'react';
import {
  RiStarLine,
  RiMenuLine,
  RiCloseLine,
  RiArrowDownSLine,
  RiLoginBoxLine,
  RiUserAddLine,
  RiUserLine,
  RiMoneyDollarBoxLine,
  RiBox3Line,
  RiSofaLine,
  RiShoppingCart2Line,
  RiLogoutBoxRLine,
} from '@remixicon/react';
import stylesNavbar from '../styles/Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import ModalMensagemSucesso from '../components/ModalMensagemSucesso';
import { jwtDecode } from 'jwt-decode';

const UserDropdown = ({ isLoggedIn, handleLogout }) => {
  const userType = localStorage.getItem('userType');

  return (
    <li className={stylesNavbar.dropdown__item}>
      <div className={stylesNavbar.nav__link}>
        Usuário <RiArrowDownSLine className={stylesNavbar.dropdown__arrow} />
      </div>
      <ul className={stylesNavbar.dropdown__menu}>
        {isLoggedIn ? (
          <>
            {userType === 'client' && (
              <li>
                <Link to="/perfil" className={stylesNavbar.dropdown__link}>
                  <RiUserLine /> Perfil
                </Link>
              </li>
            )}
            <li>
              <Link
                to="#"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
                className={stylesNavbar.dropdown__link}
              >
                <RiLogoutBoxRLine /> Sair
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className={stylesNavbar.dropdown__link}>
                <RiLoginBoxLine /> Login
              </Link>
            </li>
            <li>
              <Link to="/cadastrarusuario" className={stylesNavbar.dropdown__link}>
                <RiUserAddLine /> Cadastrar
              </Link>
            </li>
          </>
        )}
      </ul>
    </li>
  );
};

const ManageSystemDropdown = () => {
  const userType = localStorage.getItem('userType');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  if (userType !== 'admin' || !isLoggedIn) {
    return null;
  }

  return (
    <li className={stylesNavbar.dropdown__item}>
      <div className={stylesNavbar.nav__link}>
        <Link to="/gerenciarsistema" className={`${stylesNavbar.nav__link} ${stylesNavbar.nav__link__GS}`}>
          Gerenciar Sistema
        </Link>
        <RiArrowDownSLine className={stylesNavbar.dropdown__arrow} />
      </div>
      <ul className={stylesNavbar.dropdown__menu}>
        <li>
          <Link to="/gerenciarpacotes" className={stylesNavbar.dropdown__link}>
            <RiBox3Line /> Pacotes
          </Link>
        </li>
        <li>
          <Link to="/gerenciar-componentes" className={stylesNavbar.dropdown__link}>
            <RiSofaLine /> Componentes
          </Link>
        </li>
        <li>
          <Link to="/gerenciarfuncionarios" className={stylesNavbar.dropdown__link}>
            <RiUserLine /> Administradores
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
};

const CartIcon = ({ cartItems }) => {
  const userType = localStorage.getItem('userType');
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (userType !== 'client' || !isLoggedIn) {
    return null;
  }

  return (
    <li>
      <Link to="/carrinho" className={stylesNavbar.nav__link}>
        <div className={stylesNavbar.cart}>
          <RiShoppingCart2Line className={stylesNavbar.cart__icon} />
          {cartItems > 0 && <span className={stylesNavbar.cart__count}>{cartItems}</span>}
        </div>
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSucess, setShowSucess] = useState(false);
  const [cartItems, setCartItems] = useState(0);
  const navigate = useNavigate();

  const token = localStorage.getItem('authToken');
  const userId = token ? jwtDecode(token).id : null;
  console.log(userId);
  console.log(token);

  // Carrega os itens do carrinho quando o componente monta
  useEffect(() => {
    carregarCarrinho();

  }, [token, userId]);

  const carregarCarrinho = async () => {
    try {
      const response = await fetch(`http://localhost:1313/carrinho/${userId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error('Falha ao carregar quantidade do carrinho');
      }
  
      const responseData = await response.json();
      console.log('Itens do carrinho:', responseData.data.items);
  
      // Somar a quantidade total de itens no carrinho
      const totalQuantidade = responseData.data.items.reduce((total, item) => total + item.quantidade, 0);
  
      setCartItems(totalQuantidade);
      console.log('Carrinho carregado com sucesso. Quantidade total:', totalQuantidade);
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };
  

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('isLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.setItem('authToken', '');
    localStorage.setItem('isLoggedIn', 'false');
    localStorage.removeItem('userType');
    setShowSucess(true);

    setTimeout(() => {
      setShowSucess(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <header className={stylesNavbar.header}>
      <nav className={`${stylesNavbar.nav} ${stylesNavbar.container}`}>
        <div className={stylesNavbar.nav__data}>
          <Link to="/" className={stylesNavbar.nav__logo}>
            <RiStarLine /> Blue Star Events
          </Link>
          <div className={stylesNavbar.nav__toggle} onClick={toggleMenu}>
            {menuOpen ? (
              <RiCloseLine className={stylesNavbar.nav__close} />
            ) : (
              <RiMenuLine className={stylesNavbar.nav__burger} />
            )}
          </div>
        </div>
        <div
          className={`${stylesNavbar.nav__menu} ${menuOpen ? stylesNavbar['show-menu'] : ''}`}
          id="nav-menu"
        >
          <ul className={stylesNavbar.nav__list}>
            <Link to="/consultarpacotes" className={`${stylesNavbar.nav__link} ${stylesNavbar.nav__link__GS}`}>
              Consultar Pacotes
            </Link>
            <UserDropdown isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
            <ManageSystemDropdown />
            <li>
              <Link to="/contatenos" className={`${stylesNavbar.nav__link} ${stylesNavbar.nav__link__GS}`}>
                Contate-nos
              </Link>
            </li>
            <CartIcon cartItems={cartItems} />
          </ul>

        </div>
      </nav>
      <ModalMensagemSucesso
        title="SAIR DA CONTA"
        text="Logout realizado com sucesso"
        isVisible={showSucess}
      />
    </header>
  );
};

export default Navbar;