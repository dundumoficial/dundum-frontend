import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext.jsx";
import styles from "./ModalPerfil.module.css";
import iconeLogout from "../../assets/img/dashboard/icon-logout.svg";

export function ModalPerfil({ usuario, onClose }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  }, [onClose]);

  const handleSair = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Falha ao invalidar sessão no servidor:", error);
    } finally {
      onClose();
      navigate("/login");
    }
  };

  return (
    <div ref={ref} className={styles.modalPerfil}>
      <div className={styles.modalPerfilHeader}>
        <div className={styles.avatarGrande}>
          {usuario.foto ? (
            <img
              src={usuario.foto}
              alt={`Foto de ${usuario.nome}`}
              className={styles.avatarGrandeFoto}
            />
          ) : (
            usuario.iniciais
          )}
        </div>
        <div>
          <p className={styles.modalPerfilNome}>{usuario.nome}</p>
          <p className={styles.modalPerfilEmail}>{usuario.email}</p>
        </div>
      </div>
      <hr className={styles.modalDivider} />
      <button className={styles.modalPerfilBtn} onClick={handleSair}>
        <img src={iconeLogout} alt="Ícone de deslogar" aria-hidden="true" />
        Sair
      </button>
    </div>
  );
}
