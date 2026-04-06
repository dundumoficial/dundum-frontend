import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import logo from "../../assets/img/logo-branco.webp";
import facebook from "../../assets/img/icon-facebook.svg";
import instagram from "../../assets/img/icon-instagram.svg";
import linkedin from "../../assets/img/icon-linkedin.svg";
import tiktok from "../../assets/img/icon-tiktok.svg";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.col}>
          <h3>Atendimento</h3>
          <p>8h às 21h - Segunda a Sexta;</p>
          <p>8h às 18h - Sábados;</p>
          <p>9h às 16h - Domingos e feriados;</p>
          <p>Horário de Brasília.</p>
        </div>

        <div className={styles.col}>
          <h3>Sobre</h3>
          <Link to="/sobrenos">Nossa missão</Link>
          <Link to="/sobrenos">Quem somos</Link>
        </div>

        <div className={styles.col}>
          <h3>Redes Sociais</h3>
          <div className={styles.socialIcons}>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={facebook} alt="Ícone do Facebook" />
            </a>
            <a
              href="https://www.instagram.com/dundumoficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={instagram} alt="Ícone do Instagram" />
            </a>
            <a
              href="https://www.linkedin.com/company/dundumoficial"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={linkedin} alt="Ícone do LinkedIn" />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer">
              <img src={tiktok} alt="Ícone do TikTok" />
            </a>
          </div>
        </div>

        <div className={styles.col}>
          <h3>Precisa de Ajuda?</h3>
          <Link to="/centraldeajuda">Contato</Link>
          <Link to="/centraldeajuda">FAQ</Link>
        </div>

        <div className={styles.col}>
          <h3>Políticas</h3>
          <Link to="#">Cookies</Link>
          <Link to="#">Privacidade</Link>
          <Link to="#">Segurança</Link>
        </div>
      </div>

      <div className={styles.logoWrap}>
        <img src={logo} alt="Logo DunDum" />
      </div>

      <p className={styles.copyright}>
        Copyright © 2026 DunDum - Todos os direitos reservados
      </p>
    </footer>
  );
}

export default Footer;
