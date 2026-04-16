import styles from "../Dashboard.module.css";

// Badge de status
const COR_MAP = {
  normal: styles.badgeNormal,
  alerta: styles.badgeAlerta,
  alto: styles.badgeAlto,
  bom: styles.badgeBom,
  vivo: styles.badgeVivo,
};

export function Badge({ texto, cor }) {
  return (
    <span className={`${styles.badge} ${COR_MAP[cor] ?? ""}`}>{texto}</span>
  );
}

// Card branco com sombra
export function Card({ children, className = "" }) {
  return <div className={`${styles.card} ${className}`}>{children}</div>;
}

// Cabeçalho de card
export function CardHeader({ titulo, direita }) {
  return (
    <div className={styles.cardHeader}>
      <h3>{titulo}</h3>
      {direita}
    </div>
  );
}

// Valor grande de métrica
export function CardValor({ valor, unidade, sufixo }) {
  return (
    <div className={styles.cardValor}>
      {valor}
      {unidade && <span> {unidade}</span>}
      {sufixo && <span className={styles.cardHoje}> {sufixo}</span>}
    </div>
  );
}

// Spinner de loading
export function Spinner() {
  return <div className={styles.spinner} />;
}

// Tooltip customizado para Recharts
export function CustomTooltip({ active, payload, label, cor, unidade }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={styles.tooltip}>
      <p className={styles.tooltipLabel}>{label}</p>
      <p style={{ color: cor }}>
        {payload[0].value} {unidade}
      </p>
    </div>
  );
}
