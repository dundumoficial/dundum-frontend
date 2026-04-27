import { useEffect, useRef } from "react";
import styles from "./NotFoundPage.module.css";

const stars = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  size: Math.random() * 2 + 0.5,
  left: Math.random() * 100,
  top: Math.random() * 100,
  duration: 2 + Math.random() * 4,
  delay: Math.random() * 5,
  opacity: 0.3 + Math.random() * 0.7,
}));

export default function NotFound404() {
  const eclipseRef = useRef(null);

  useEffect(() => {
    let angle = 0;
    let raf;
    const animate = () => {
      angle += 0.4;
      if (eclipseRef.current) {
        eclipseRef.current.style.transform = `rotate(${angle}deg)`;
      }

      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className={styles["page-404"]}>
      {stars.map((s) => (
        <div
          key={s.id}
          className={styles.star}
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            "--d": `${s.duration}s`,
            "--delay": `${s.delay}s`,
            "--op": s.opacity,
          }}
        />
      ))}

      <div className={styles["ambient-glow"]} />

      <div className={styles["num-group"]}>
        <span className={styles.num}>4</span>
        <div className={styles["eclipse-wrap"]}>
          <div ref={eclipseRef} className={styles["eclipse-conic"]} />
          <div className={styles["eclipse-disk"]} />
          <div className={styles["eclipse-bottom-glow"]} />
        </div>
        <span className={styles.num}>4</span>
      </div>

      <p className={styles.caption}>
        Essa página não existe. <a href="/">Voltar para início.</a>
      </p>
    </div>
  );
}
