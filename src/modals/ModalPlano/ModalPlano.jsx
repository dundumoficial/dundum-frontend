import { useState } from "react";
import { Modal } from "../ModalBase/ModalBase.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import styles from "./ModalPlano.module.css";

const PLANOS_CONFIG = [
  {
    id: 1,
    chave: "gratuito",
    nome: "Gratuito",
    preco: "R$ 0,00/mês",
    beneficios: [
      "Monitoramento de batimentos cardíacos",
      "Alertas cardíacos",
      "Localização por GPS",
      "Alertas de fuga",
    ],
  },
  {
    id: 2,
    chave: "intermediário",
    nome: "Intermediário",
    preco: "R$ 29,90/mês",
    beneficios: [
      "Tudo do Plano Gratuito",
      "Monitoramento de passos",
      "Monitoramento de sono",
    ],
  },
  {
    id: 3,
    chave: "premium",
    nome: "Premium",
    preco: "R$ 59,90/mês",
    beneficios: [
      "Tudo do Plano Intermediário",
      "Monitoramento da respiração",
      "Alertas respiratórios",
      "Relatórios semanais",
    ],
  },
];

export function ModalPlano({ onClose, onPlanoAlterado }) {
  const { usuario, alterarPlano } = useAuth();
  const [tela, setTela] = useState("resumo");
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);

  // plano atual vindo do estado global do usuário
  const planoAtual = usuario?.plano ?? "gratuito";

  // encontra config do plano atual para exibir na tela de resumo
  const planoAtualConfig =
    PLANOS_CONFIG.find((p) => p.chave === planoAtual) ?? PLANOS_CONFIG[0];

  const handleEscolherPlano = async (plano) => {
    if (carregando) return;
    setErro(null);
    setCarregando(true);
    try {
      await alterarPlano(plano.id);
      // notifica o Dashboard para recarregar os dados (permissões atualizadas)
      if (onPlanoAlterado) onPlanoAlterado(plano.chave);
      onClose();
    } catch (e) {
      setErro(e.message || "Erro ao alterar plano");
    } finally {
      setCarregando(false);
    }
  };

  if (tela === "alterar") {
    return (
      <Modal
        titulo="Alterar Plano"
        onClose={onClose}
        onVoltar={() => setTela("resumo")}
      >
        <div className={styles.modalConteudo}>
          {erro && <p className={styles.erro}>{erro}</p>}
          {PLANOS_CONFIG.map((plano) => {
            const isAtual = plano.chave === planoAtual;
            return (
              <div
                key={plano.id}
                className={`${styles.planoItem} ${isAtual ? styles.planoItemAtual : ""}`}
              >
                <div className={styles.planoItemHeader}>
                  <div>
                    <strong>{plano.nome}</strong>
                    <span>{plano.preco}</span>
                  </div>
                  {isAtual && (
                    <span className={styles.planoBadgeAtual}>Atual</span>
                  )}
                </div>

                <ul className={styles.planoBeneficios}>
                  {plano.beneficios.map((b, i) => (
                    <li key={i}>✓ {b}</li>
                  ))}
                </ul>

                {!isAtual && (
                  <button
                    className={styles.btnUpgrade}
                    onClick={() => handleEscolherPlano(plano)}
                    disabled={carregando}
                  >
                    {carregando ? "Aguarde..." : "Escolher plano"}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </Modal>
    );
  }

  return (
    <Modal titulo="Seu Plano" onClose={onClose}>
      <div className={styles.modalConteudo}>
        <div className={styles.planoAtualCard}>
          <p className={styles.planoAtualLabel}>Plano atual</p>
          <h3 className={styles.planoAtualNome}>{planoAtualConfig.nome}</h3>
          <p className={styles.planoAtualPreco}>{planoAtualConfig.preco}</p>
        </div>
        <button
          className={styles.btnUpgrade}
          onClick={() => setTela("alterar")}
        >
          Alterar plano
        </button>
      </div>
    </Modal>
  );
}
