import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import logo from "../../assets/img/logo-branco.webp";
import iconeOlho from "../../assets/img/icon-olho.svg";
import iconeOlhoFechado from "../../assets/img/icon-olho-fechado.svg";

export default function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.voltarBtn} onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <img src={logo} alt="Logo DunDum" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.titulo}>Acessar ou criar conta</h1>

        <div className={styles.card}>
          <h2 className={styles.subtitulo}>Acesse sua conta</h2>

          <div className={styles.campo}>
            <label htmlFor="email">E-mail</label>
            <input
              id="email"
              type="email"
              placeholder="Digite seu e-mail"
              className={styles.input}
            />
          </div>

          <div className={styles.campo}>
            <label htmlFor="senha">Senha</label>
            <div className={styles.senhaWrap}>
              <input
                id="senha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Sua senha"
                className={styles.input}
              />
              <button
                className={styles.olhoBtn}
                onClick={() => setMostrarSenha(!mostrarSenha)}
                type="button"
                aria-label="Mostrar ou ocultar senha"
              >
                <img
                  src={mostrarSenha ? iconeOlhoFechado : iconeOlho}
                  alt="Ícone de referência para exibir senha"
                />
              </button>
            </div>
          </div>

          <Link to="/esqueci-senha" className={styles.esqueciSenha}>
            Esqueci a senha
          </Link>

          <button className={styles.btnEntrar}>Entrar</button>

          <Link to="/cadastro">
            <button className={styles.btnCriar}>Criar minha conta</button>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2026 DunDum</p>
        <p>Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
