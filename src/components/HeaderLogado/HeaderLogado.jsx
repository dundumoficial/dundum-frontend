import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HeaderLogado.module.css";
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useCart } from "../../contexts/CartContext.jsx";
import ModalCarrinho from "../../modals/ModalCarrinho/ModalCarrinho.jsx";

import logo from "../../assets/img/logo-azul.webp";
import menu from "../../assets/img/menu.svg";
import close from "../../assets/img/close.svg";

export default function HeaderLogado() {
  const { usuario, logout } = useAuth();
  const { totalItens } = useCart();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [carrinhoOpen, setCarrinhoOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  useEffect(() => {
    function handleClickFora(e) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target)) {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickFora);
    return () => document.removeEventListener("mousedown", handleClickFora);
  }, []);

  const fecharMenu = () => setMenuOpen(false);

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  const avatarContent = usuario?.foto ? (
    <img
      src={usuario.foto}
      alt={`Foto de ${usuario.nome}`}
      className={styles.avatarFoto}
    />
  ) : (
    <span className={styles.avatarIniciais} aria-hidden="true">
      {usuario?.iniciais ?? "U"}
    </span>
  );

  return (
    <>
      <header className={styles.header} role="banner">
        <div className={styles.container}>
          <Link
            to="/"
            className={styles.logo}
            aria-label="Página inicial DunDum"
          >
            <img src={logo} alt="DunDum" />
          </Link>

          <nav className={styles.nav} aria-label="Navegação principal">
            <Link to="/">Início</Link>
            <Link to="/produtos">Produtos</Link>
            <Link to="/sobrenos">Sobre Nós</Link>
            <Link to="/comunidade">Comunidade</Link>
            <Link to="/centraldeajuda">Central de Ajuda</Link>
          </nav>

          <div className={styles.actions}>
            <button
              className={styles.iconBtn}
              onClick={() => setCarrinhoOpen(true)}
              aria-label={`Carrinho de compras${totalItens > 0 ? `, ${totalItens} ${totalItens === 1 ? "item" : "itens"}` : ", vazio"}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItens > 0 && (
                <span className={styles.cartBadge} aria-hidden="true">
                  {totalItens > 99 ? "99+" : totalItens}
                </span>
              )}
            </button>

            <div className={styles.userMenuWrap} ref={userMenuRef}>
              <button
                className={styles.avatarBtn}
                onClick={() => setUserMenuOpen((v) => !v)}
                aria-label="Menu do usuário"
                aria-expanded={userMenuOpen}
                aria-haspopup="true"
              >
                {avatarContent}
              </button>

              {userMenuOpen && (
                <div className={styles.userDropdown} role="menu">
                  <div className={styles.userInfo}>
                    <p className={styles.userNome}>{usuario?.nome}</p>
                    <p className={styles.userEmail}>{usuario?.email}</p>
                  </div>
                  <hr className={styles.divider} />
                  <Link
                    to="/dashboard"
                    className={styles.dropdownItem}
                    role="menuitem"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <rect x="3" y="3" width="7" height="7" />
                      <rect x="14" y="3" width="7" height="7" />
                      <rect x="14" y="14" width="7" height="7" />
                      <rect x="3" y="14" width="7" height="7" />
                    </svg>
                    Dashboard
                  </Link>
                  <button
                    className={`${styles.dropdownItem} ${styles.dropdownItemLogout}`}
                    role="menuitem"
                    onClick={handleLogout}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      aria-hidden="true"
                    >
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sair
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            className={styles.menuIcon}
            onClick={() => setMenuOpen(true)}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <img src={menu} alt="" aria-hidden="true" />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          className={styles.overlay}
          onClick={fecharMenu}
          aria-hidden="true"
        />
      )}

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileHeader}>
          <Link
            to="/"
            className={styles.logo}
            onClick={fecharMenu}
            aria-label="Página inicial"
          >
            <img src={logo} alt="DunDum" />
          </Link>
          <button
            className={styles.closeBtn}
            onClick={fecharMenu}
            aria-label="Fechar menu"
          >
            <img src={close} alt="" aria-hidden="true" />
          </button>
        </div>

        <div className={styles.mobileUser}>
          <div className={styles.mobileAvatar}>{avatarContent}</div>
          <div>
            <p className={styles.mobileNome}>{usuario?.nome}</p>
            <p className={styles.mobileEmail}>{usuario?.email}</p>
          </div>
        </div>

        <nav className={styles.mobileNav} aria-label="Menu mobile">
          <Link to="/" onClick={fecharMenu}>
            Início
          </Link>
          <Link to="/produtos" onClick={fecharMenu}>
            Produtos
          </Link>
          <Link to="/sobrenos" onClick={fecharMenu}>
            Sobre Nós
          </Link>
          <Link to="/comunidade" onClick={fecharMenu}>
            Comunidade
          </Link>
          <Link to="/centraldeajuda" onClick={fecharMenu}>
            Central de Ajuda
          </Link>
          <Link to="/dashboard" onClick={fecharMenu}>
            Dashboard
          </Link>
        </nav>

        <div className={styles.mobileFooter}>
          <button
            className={styles.mobileCarrinhoBtn}
            onClick={() => {
              fecharMenu();
              setCarrinhoOpen(true);
            }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Carrinho{" "}
            {totalItens > 0 && (
              <span className={styles.mobileBadge}>{totalItens}</span>
            )}
          </button>
          <button className={styles.mobileLogoutBtn} onClick={handleLogout}>
            Sair da conta
          </button>
        </div>
      </div>

      {carrinhoOpen && <ModalCarrinho onClose={() => setCarrinhoOpen(false)} />}
    </>
  );
}
