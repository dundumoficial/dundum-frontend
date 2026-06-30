import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../../assets/img/logo-azul.webp";
import user from "../../assets/img/user.svg";
import menu from "../../assets/img/menu.svg";
import close from "../../assets/img/close.svg";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

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

          <Link
            to="/login"
            className={styles.actions}
            aria-label="Entrar ou cadastrar-se"
          >
            <button className={styles.loginBtn}>
              <img
                src={user}
                alt="Ícone de usuário"
                aria-hidden="true"
                className={styles.userIcon}
              />
              <div className={styles.btnText}>
                <span className={styles.btnTop}>Entrar</span>
                <span className={styles.btnSub}>Cadastre-se</span>
              </div>
            </button>
          </Link>

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

      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`}
        onClick={() => setMenuOpen(false)}
        aria-hidden="true"
      />

      {/* Menu mobile */}
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
        aria-hidden={!menuOpen}
      >
        <div className={styles.mobileHeader}>
          <Link
            to="/"
            className={styles.logo}
            onClick={() => setMenuOpen(false)}
            aria-label="Página inicial"
          >
            <img src={logo} alt="DunDum" />
          </Link>
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <img src={close} alt="Ícone para fechar" aria-hidden="true" />
          </button>
        </div>

        <div className={styles.mobileAuth}>
          <Link
            to="/login"
            className={styles.authEntrar}
            onClick={() => setMenuOpen(false)}
          >
            Entrar
          </Link>
          <Link
            to="/cadastro"
            className={styles.authCadastro}
            onClick={() => setMenuOpen(false)}
          >
            Cadastre-se
          </Link>
        </div>

        <nav className={styles.mobileNav} aria-label="Menu mobile">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Início
          </Link>
          <Link to="/produtos" onClick={() => setMenuOpen(false)}>
            Produtos
          </Link>
          <Link to="/sobrenos" onClick={() => setMenuOpen(false)}>
            Sobre Nós
          </Link>
          <Link to="/comunidade" onClick={() => setMenuOpen(false)}>
            Comunidade
          </Link>
          <Link to="/centraldeajuda" onClick={() => setMenuOpen(false)}>
            Central de Ajuda
          </Link>
        </nav>
      </div>
    </>
  );
}

export default Header;
