import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ModalPerfil.module.css";

import iconeTrocar from "../../assets/img/dashboard/icon-trocar.svg";
import iconeLogout from "../../assets/img/dashboard/icon-logout.svg";

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
          navigate("/login");
        }}
      >
        <img src={iconeTrocar} alt="Ícone de trocar de conta" />
        Trocar de conta
      </button>
      <button
        className={`${styles.modalPerfilBtn} ${styles.modalPerfilBtnSair}`}
        onClick={() => {
          onClose();
          navigate("/login");
        }}
      >
        <img src={iconeLogout} alt="Ícone de deslogar" />
        Sair
      </button>
    </div>
  );
}
