import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../Dashboard.module.css";

// Modal genérico com backdrop
export function Modal({ titulo, children, onClose }) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitulo}>{titulo}</h2>
          <button
            className={styles.modalClose}
            onClick={onClose}
            aria-label="Fechar"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

// Popup de perfil do usuário
export function ModalPerfil({ usuario, onClose }) {
  const navigate = useNavigate();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };
    
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  return (
    <div ref={ref} className={styles.modalPerfil}>
      <div className={styles.modalPerfilHeader}>
        <div className={styles.avatarGrande}>{usuario.iniciais}</div>
        <div>
          <p className={styles.modalPerfilNome}>{usuario.nome}</p>
          <p className={styles.modalPerfilEmail}>{usuario.email}</p>
        </div>
      </div>
      <hr className={styles.modalDivider} />
      <button
        className={styles.modalPerfilBtn}
        onClick={() => {
          onClose();
          navigate("/");
        }}
      >
        🔄 Trocar de conta
      </button>
      <button
        className={`${styles.modalPerfilBtn} ${styles.modalPerfilBtnSair}`}
        onClick={() => {
          onClose();
          navigate("/login");
        }}
      >
        🚪 Sair
      </button>
    </div>
  );
}

// Modal: Notificações
export function ModalNotificacoes({ notificacoes, onClose }) {
  return (
    <Modal titulo="Notificações" onClose={onClose}>
      <ul className={styles.notifListaModal}>
        {notificacoes.map((n) => (
          <li
            key={n.id}
            className={`${styles.notifItem} ${!n.lido ? styles.notifNaoLida : ""}`}
          >
            <p>{n.texto}</p>
            <span>{n.quando}</span>
          </li>
        ))}
      </ul>
    </Modal>
  );
}

// Modal: Configurações
export function ModalConfiguracoes({ onClose }) {
  const itens = [
    { icone: "🔔", label: "Alertas de saúde" },
    { icone: "📍", label: "Zona segura GPS" },
    { icone: "📊", label: "Frequência de relatórios" },
    { icone: "🔋", label: "Alerta de bateria" },
  ];
  return (
    <Modal titulo="Configurações" onClose={onClose}>
      <div className={styles.modalConteudo}>
        {itens.map((item) => (
          <button key={item.label} className={styles.modalItem}>
            {item.icone} {item.label}
          </button>
        ))}
      </div>
    </Modal>
  );
}

// Modal: Plano
export function ModalPlano({ onClose }) {
  return (
    <Modal titulo="Seu Plano" onClose={onClose}>
      <div className={styles.modalConteudo}>
        <div className={styles.planoAtualCard}>
          <p className={styles.planoAtualLabel}>Plano atual</p>
          <h3 className={styles.planoAtualNome}>Intermediário</h3>
          <p className={styles.planoAtualPreco}>R$ 29,90/mês</p>
        </div>
        <button className={styles.btnUpgrade}>Ver planos disponíveis</button>
      </div>
    </Modal>
  );
}

// Modal: Perfil do Pet
export function ModalPet({ pet, onClose }) {
  const campos = [
    { label: "Raça", valor: pet.raca },
    { label: "Idade", valor: pet.idade },
    { label: "Sexo", valor: pet.sexo },
    { label: "Coleira", valor: pet.coleira },
  ];
  return (
    <Modal titulo="Perfil do Pet" onClose={onClose}>
      <div className={styles.modalPetConteudo}>
        <img src={pet.foto} alt={pet.nome} className={styles.modalPetFoto} />
        <h3 className={styles.modalPetNome}>{pet.nome}</h3>
        <div className={styles.modalPetInfo}>
          {campos.map(({ label, valor }) => (
            <div key={label}>
              <span>{label}</span>
              <strong>{valor}</strong>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}
