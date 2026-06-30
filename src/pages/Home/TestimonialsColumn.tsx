import React from "react";
import { motion } from "motion/react";
import styles from "./Home.module.css";

type Testimonial = {
  text: string;
  image: string;
  name: string;
  role: string;
};

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  return (
    <div className={`${styles.testemunhaColuna} ${props.className || ""}`}>
      <motion.div
        className={styles.testemunhaTrack}
        animate={{ translateY: "-50%" }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
      >
        {[...Array(2)].map((_, index) => (
          <React.Fragment key={index}>
            {props.testimonials.map(({ text, image, name }, i) => (
              <div key={i} className={styles.testemunhaCard}>
                <p className={styles.testemunhaTexto}>{text}</p>
                <div className={styles.testemunhaAutor}>
                  <img
                    src={image}
                    alt={name}
                    className={styles.testemunhaFoto}
                  />
                  <div className={styles.testemunhaInfo}>
                    <span className={styles.testemunhaNome}>{name}</span>
                  </div>
                </div>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
