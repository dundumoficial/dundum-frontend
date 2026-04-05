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
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/" className={styles.logo}>
            <img src={logo} alt="Logo da DunDum" />
          </Link>

          <nav className={styles.nav}>
            <Link to="/">Início</Link>
            <Link to="/produtos">Produtos</Link>
            <Link to="/sobrenos">Sobre Nós</Link>
            <Link to="/comunidade">Comunidade</Link>
            <Link to="/centraldeajuda">Central de Ajuda</Link>
          </nav>

          <Link to="/login" className={styles.actions}>
            <button className={styles.loginBtn}>
              <img
                src={user}
                alt="Ícone de usuário"
                className={styles.userIcon}
              />
              <div className={styles.btnText}>
                <span className={styles.btnTop}>Entrar</span>
                <span className={styles.btnSub}>Cadastre-se</span>
              </div>
            </button>
          </Link>

          <div
            className={`${styles.menuIcon} ${menuOpen ? styles.menuOpen : ""}`}
            onClick={() => setMenuOpen(true)}
          >
            <img src={menu} alt="Ícone de menu" />
          </div>
        </div>
      </header>

      {/* overlay do menu mobile */}
      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayOpen : ""}`}
        onClick={() => setMenuOpen(false)}
      />

      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        <div className={styles.mobileHeader}>
          <Link
            to="/"
            className={styles.logo}
            onClick={() => setMenuOpen(false)}
          >
            <img src={logo} alt="Logo da DunDum" />
          </Link>
          <button
            className={styles.closeBtn}
            onClick={() => setMenuOpen(false)}
          >
            <img src={close} alt="Ícone de fechar menu" />
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

        <nav className={styles.mobileNav}>
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
