import { useState, useEffect } from "react";
import styles from "./PageLoader.module.css";

function PageLoader({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className={styles.overlay}>
        <div className={styles.coleiraWrap}>
          <svg viewBox="0 0 120 120" className={styles.svg}>
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#e0e0e0"
              strokeWidth="10"
            />
            <circle
              cx="60"
              cy="60"
              r="45"
              fill="none"
              stroke="#1b1f3b"
              strokeWidth="10"
              strokeDasharray="70 212"
              strokeLinecap="round"
            />
            <rect x="50" y="90" width="20" height="14" rx="3" fill="#1b1f3b" />
            <rect x="55" y="87" width="10" height="4" rx="2" fill="#454ade" />
            <circle
              cx="60"
              cy="108"
              r="6"
              fill="none"
              stroke="#1b1f3b"
              strokeWidth="3"
            />
          </svg>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default PageLoader;
