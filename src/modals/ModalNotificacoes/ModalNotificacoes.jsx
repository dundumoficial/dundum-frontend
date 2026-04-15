import { Modal } from "../ModalBase/ModalBase.jsx";
import styles from "./ModalNotificacoes.module.css";

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
