import { useState } from "react";
import { Modal } from "../ModalBase/ModalBase.jsx";
import styles from "./ModalPlano.module.css";

export function ModalPlano({ onClose }) {
  const [tela, setTela] = useState("resumo");

  const planos = [
    {
      id: 1,
      nome: "Gratuito",
      preco: "R$ 0,00/mês",
      beneficios: [
        "Monitoramento cardíaco",
        "Monitoramento de passos",
        "Localização por GPS",
        "Alertas cardíacos",
      ],
    },
    {
      id: 2,
      nome: "Intermediário",
      preco: "R$ 29,90/mês",
      beneficios: [
        "Tudo do plano gratuito",
        "Monitoramento da respiração",
        "Monitoramento de sono",
        "Alertas respiratórios",
      ],
    },
    {
      id: 3,
      nome: "Premium",
      preco: "R$ 59,90/mês",
      beneficios: [
        "Tudo do plano intermediário",
        "Estado emocional do pet",
        "Relatórios semanais",
        "Alertas de fuga",
      ],
      atual: true,
    },
  ];

  if (tela === "alterar") {
    return (
      <Modal
        titulo="Alterar Plano"
        onClose={onClose}
        onVoltar={() => setTela("resumo")}
      >
        <div className={styles.modalConteudo}>
          {planos.map((plano) => (
            <div
              key={plano.id}
              className={`${styles.planoItem} ${plano.atual ? styles.planoItemAtual : ""}`}
            >
              <div className={styles.planoItemHeader}>
                <div>
                  <strong>{plano.nome}</strong>
                  <span>{plano.preco}</span>
                </div>
                {plano.atual && (
                  <span className={styles.planoBadgeAtual}>Atual</span>
                )}
              </div>

              <ul className={styles.planoBeneficios}>
                {plano.beneficios.map((b, i) => (
                  <li key={i}>✓ {b}</li>
                ))}
              </ul>
              
              {!plano.atual && (
                <button
                  className={styles.btnUpgrade}
                  onClick={() => {
                    alert(`Plano ${plano.nome} selecionado`);
                    onClose();
                  }}
                >
                  Escolher plano
                </button>
              )}
            </div>
          ))}
        </div>
      </Modal>
    );
  }

  return (
    <Modal titulo="Seu Plano" onClose={onClose}>
      <div className={styles.modalConteudo}>
        <div className={styles.planoAtualCard}>
          <p className={styles.planoAtualLabel}>Plano atual</p>
          <h3 className={styles.planoAtualNome}>Premium</h3>
          <p className={styles.planoAtualPreco}>R$ 59,90/mês</p>
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
