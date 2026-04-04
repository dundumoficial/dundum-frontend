import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Cadastro.module.css";
import logo from "../../assets/img/logo-branco.png";
import iconeOlho from "../../assets/img/icon-olho.svg";
import iconeOlhoFechado from "../../assets/img/icon-olho-fechado.svg";

export default function Cadastro() {
  const navigate = useNavigate();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarConfirmar, setMostrarConfirmar] = useState(false);
  const [racaAberto, setRacaAberto] = useState(false);
  const [sexoAberto, setSexoAberto] = useState(false);
  const [planoSelecionado, setPlanoSelecionado] = useState("gratuito");

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <button className={styles.voltarBtn} onClick={() => navigate(-1)}>
          ← Voltar
        </button>
        <img src={logo} alt="Logo DunDum" className={styles.logo} />
      </header>

      <main className={styles.main}>
        <h1 className={styles.titulo}>Crie sua conta</h1>

        <div className={styles.card}>
          <h2 className={styles.secaoTitulo}>Dono (a) do pet</h2>

          <div className={styles.grid2}>
            <div className={styles.campo}>
              <label>Nome*</label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className={styles.input}
              />
            </div>
            <div className={styles.campo}>
              <label>E-mail*</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.campo}>
              <label>Senha*</label>
              <div className={styles.senhaWrap}>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Sua senha"
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.olhoBtn}
                  onClick={() => setMostrarSenha(!mostrarSenha)}
                  aria-label="Mostrar ou ocultar senha"
                >
                  <img
                    src={mostrarSenha ? iconeOlhoFechado : iconeOlho}
                    alt=""
                  />
                </button>
              </div>
            </div>
            <div className={styles.campo}>
              <label>Confirmar a senha*</label>
              <div className={styles.senhaWrap}>
                <input
                  type={mostrarConfirmar ? "text" : "password"}
                  placeholder="Confirme sua senha"
                  className={styles.input}
                />
                <button
                  type="button"
                  className={styles.olhoBtn}
                  onClick={() => setMostrarConfirmar(!mostrarConfirmar)}
                  aria-label="Mostrar ou ocultar confirmação de senha"
                >
                  <img
                    src={mostrarConfirmar ? iconeOlhoFechado : iconeOlho}
                    alt=""
                  />
                </button>
              </div>
            </div>
          </div>

          <h2 className={styles.secaoTitulo}>Informações do pet</h2>
          <div className={styles.grid2}>
            <div className={styles.campo}>
              <label>Nome*</label>
              <input type="text" placeholder="Rex" className={styles.input} />
            </div>
            <div className={styles.campo}>
              <label>Raça*</label>
              <div
                className={`${styles.selectWrap} ${racaAberto ? styles.selectAberto : ""}`}
              >
                <select
                  className={styles.input}
                  onFocus={() => setRacaAberto(true)}
                  onBlur={() => setRacaAberto(false)}
                >
                  <option>Labrador</option>
                  <option>Golden Retriever</option>
                  <option>Bulldog</option>
                  <option>Poodle</option>
                </select>
              </div>
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.campo}>
              <label>Sexo*</label>
              <div
                className={`${styles.selectWrap} ${sexoAberto ? styles.selectAberto : ""}`}
              >
                <select
                  className={styles.input}
                  onFocus={() => setSexoAberto(true)}
                  onBlur={() => setSexoAberto(false)}
                >
                  <option>Macho</option>
                  <option>Fêmea</option>
                </select>
              </div>
            </div>
            <div className={styles.campo}>
              <label>Data de Nascimento*</label>
              <input
                type="text"
                placeholder="20/03/2022"
                className={styles.input}
              />
            </div>
          </div>

          <div className={styles.grid2}>
            <div className={styles.campo}>
              <label>Peso</label>
              <input type="text" placeholder="15 kg" className={styles.input} />
            </div>
            <div className={styles.campo}>
              <label>Número da coleira*</label>
              <input
                type="text"
                placeholder="Digite o número da coleira"
                className={styles.input}
              />
            </div>
          </div>

          <button className={styles.btnAdicionar}>Adicionar Pet</button>

          <label className={styles.termos}>
            <input type="checkbox" />
            Concordo com os{" "}
            <Link to="/termos" className={styles.termosLink}>
              termos e condições
            </Link>
          </label>

          <h2 className={styles.secaoTitulo}>Escolher Plano</h2>

          <div className={styles.planos}>
            <div
              className={`${styles.plano} ${planoSelecionado === "gratuito" ? styles.planoAtivo : ""}`}
              onClick={() => setPlanoSelecionado("gratuito")}
            >
              <div
                className={`${styles.planoBadge} ${planoSelecionado === "gratuito" ? styles.planoBadgeInativo : styles.planoBadgeInativo}`}
              >
                Gratuito
              </div>
              <p className={styles.planoLabel}>Preço mensal</p>
              <p className={styles.planoPreco}>Grátis</p>
            </div>

            <div
              className={`${styles.plano} ${planoSelecionado === "intermediario" ? styles.planoAtivo : ""}`}
              onClick={() => setPlanoSelecionado("intermediario")}
            >
              <div
                className={`${styles.planoBadge} ${planoSelecionado === "intermediario" ? styles.planoBadgeAtivo : styles.planoBadgeAtivo}`}
              >
                Intermediário
              </div>
              {planoSelecionado === "intermediario" && (
                <span className={styles.planoTag}>Mais escolhido</span>
              )}
              <p className={styles.planoLabel}>Preço mensal</p>
              <p className={styles.planoPreco}>R$ 29,90</p>
            </div>

            <div
              className={`${styles.plano} ${planoSelecionado === "premium" ? styles.planoAtivo : ""}`}
              onClick={() => setPlanoSelecionado("premium")}
            >
              <div
                className={`${styles.planoBadge} ${planoSelecionado === "premium" ? styles.planoBadgePremium : styles.planoBadgePremium}`}
              >
                Premium
              </div>
              <p className={styles.planoLabel}>Preço mensal</p>
              <p className={styles.planoPreco}>R$ 59,90</p>
            </div>
          </div>

          <button className={styles.btnCadastrar}>Cadastrar</button>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>Copyright © 2026 DunDum</p>
        <p>Todos os direitos reservados</p>
      </footer>
    </div>
  );
}
