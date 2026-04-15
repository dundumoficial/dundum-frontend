import { BeamsBackground } from "./beams-background.tsx";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./SobreNos.module.css";

// import fotoAxel from "../../assets/img/sobrenos/foto-axel.webp";
// import fotoBeatriz from "../../assets/img/sobrenos/foto-beatriz.webp";
// import fotoDiego from "../../assets/img/sobrenos/foto-diego.webp";
// import fotoGuilherme from "../../assets/img/sobrenos/foto-guilherme.webp";
// import fotoPaulo from "../../assets/img/sobrenos/foto-paulo.webp";
// import fotoSamuel from "../../assets/img/sobrenos/foto-samuel.webp";
// import fotoVictor from "../../assets/img/sobrenos/foto-victor.webp";
// import fotoWanny from "../../assets/img/sobrenos/foto-wanny.webp";

import iconeGitHub from "../../assets/img/sobrenos/icon-github.svg";
import iconeLinkedIn from "../../assets/img/sobrenos/icon-linkedin.svg";

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────
   Dados
───────────────────────────────────── */
const membros = [
  {
    nome: "Axel",
    cargo: "UI/UX Design",
    linkedin:
      "https://www.linkedin.com/in/axel-ray-silva-de-azevedo-b9810437a/",
    github: "https://github.com/Axel-Ray",
  },
  {
    nome: "Beatriz",
    cargo: "Dev. Front-End",
    linkedin: "https://www.linkedin.com/in/beatriz-lacerda-628635392/",
    github: "https://github.com/devbialacerda",
  },
  {
    nome: "Diego",
    cargo: "Dev. Front-End",
    linkedin: "https://www.linkedin.com/in/diego-cabaleiro/",
    github: "https://github.com/diegocabaleiro",
  },
  {
    nome: "Guilherme",
    cargo: "Dev. Full Stack",
    linkedin: "https://www.linkedin.com/in/guilherme-machado-silva-47597a2b8/",
    github: "https://github.com/gui-mach",
  },
  {
    nome: "Paulo",
    cargo: "Dev. Full Stack",
    linkedin: "https://www.linkedin.com/in/devoluap/",
    github: "https://github.com/DevoluaP",
  },
  {
    nome: "Samuel",
    cargo: "Dev. Back-End",
    linkedin: "https://www.linkedin.com/in/samuelaranha2935/",
    github: "https://github.com/SamuelAranha",
  },
  {
    nome: "Victor",
    cargo: "UI/UX Design",
    linkedin: "https://www.linkedin.com/in/victor-mariano-95612b320/",
    github: "https://github.com/marianovictor-900",
  },
  {
    nome: "Wanny",
    cargo: "UI/UX Design",
    linkedin: "https://www.linkedin.com/in/wanny-barreto-b49682204/",
    github: "#",
  },
];

const valores = [
  { num: "01", texto: "Acessibilidade para todos" },
  { num: "02", texto: "Cuidado como prioridade" },
  { num: "03", texto: "Amor e respeito pelos animais" },
  { num: "04", texto: "Compromisso com o impacto social" },
  { num: "05", texto: "Inovação através da tecnologia" },
  { num: "06", texto: "Ética e segurança no tratamento de dados" },
];

/* ─────────────────────────────────────
   Hero com Three.js
───────────────────────────────────── */
function QuemSomosHero() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const cardsRef = useRef([]);
  const activeRef = useRef(-1);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const showMember = (newIndex) => {
      const prev = activeRef.current;
      if (prev === newIndex) return;

      if (prev >= 0 && cardsRef.current[prev]) {
        const el = cardsRef.current[prev];
        el.classList.remove(styles.cardEnter);
        el.classList.add(styles.cardExit);
        setTimeout(() => el?.classList.remove(styles.cardExit), 500);
      }

      if (cardsRef.current[newIndex]) {
        const el = cardsRef.current[newIndex];
        el.classList.remove(styles.cardExit);
        requestAnimationFrame(() =>
          requestAnimationFrame(() => el.classList.add(styles.cardEnter)),
        );
      }

      activeRef.current = newIndex;
      setActiveIndex(newIndex);
    };

    const handleScroll = () => {
      const heroEl = containerRef.current;
      if (!heroEl) return;

      const rect = heroEl.getBoundingClientRect();
      const traveled = -rect.top;

      const zoneH = window.innerHeight;
      const memberZoneStart = window.innerHeight;

      const memberScroll = Math.max(0, traveled - memberZoneStart);

      const idx = Math.min(
        Math.floor(memberScroll / zoneH),
        membros.length - 1,
      );

      showMember(Math.max(idx, 0));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.heroSection}>
      
      {/* 🔥 BACKGROUND FIXO */}
      <div className={styles.beamsWrapper}>
        <BeamsBackground />
      </div>

      {/* Canvas Three */}
      <canvas ref={canvasRef} className={styles.heroCanvas} />

      {/* Conteúdo */}
      <div className={styles.heroContent}>
        <h1 className={styles.tituloQuemSomos}>
          Quem <span className={styles.destaquePink}>Somos?</span>
        </h1>

        <div className={styles.membroStage}>
          {membros.map((membro, i) => (
            <div
              key={membro.nome}
              ref={(el) => (cardsRef.current[i] = el)}
              className={styles.membroCardSingle}
            >
              <div className={styles.membroAvatar} />
              <p className={styles.membroNome}>{membro.nome}</p>
              <p className={styles.membroCargo}>{membro.cargo}</p>

              <div className={styles.membroLinks}>
                <a href={membro.linkedin}>
                  <img src={iconeLinkedIn} className={styles.icone} />
                </a>
                <a href={membro.github}>
                  <img src={iconeGitHub} className={styles.icone} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll fake */}
      <div className={styles.scrollSections}>
        {[...Array(membros.length + 1)].map((_, i) => (
          <div key={i} className={styles.scrollSection} />
        ))}
      </div>
    </div>
  );
}


/* ─────────────────────────────────────
   Página
───────────────────────────────────── */
export default function SobreNos() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <QuemSomosHero />

        <section className={styles.moveSection}>
          <div className={styles.moveConteudo}>
            <h2 className={styles.tituloMove}>
              O que nos <span className={styles.destaquePink}>move</span>
            </h2>
            <p className={styles.moveTexto}>
              Utilizar tecnologia e inteligência artificial para monitorar a
              saúde e o comportamento dos pets, oferecendo informações que
              ajudam tutores e veterinários a cuidar melhor dos animais.
            </p>
          </div>
        </section>

        <section className={styles.coleiraSection}>
          <h2 className={styles.tituloColeira}>
            Por que criamos{" "}
            <span className={styles.destaquePink}>a coleira</span>
          </h2>
          <p className={styles.coleiraTexto}>
            Muitos tutores não conseguem acompanhar de perto a saúde e o
            comportamento dos seus pets no dia a dia. Pensando nisso, criamos
            uma coleira inteligente capaz de monitorar sinais importantes como
            batimentos cardíacos, atividade física e sono.
          </p>
          <p className={styles.coleiraTexto}>
            Nosso objetivo é ajudar tutores e veterinários a identificar
            mudanças no comportamento dos animais, permitindo uma prevenção mais
            eficiente de possíveis problemas de saúde.
          </p>
        </section>

        <section className={styles.historiaSection}>
          <h2 className={styles.tituloHistoria}>
            Nossa <span className={styles.destaquePink}>História</span>
          </h2>
          <p className={styles.historiaTexto}>
            O projeto nasceu durante o desenvolvimento de um trabalho acadêmico,
            quando percebemos que a tecnologia poderia ser utilizada para
            melhorar o cuidado com os animais de estimação.
          </p>
          <p className={styles.historiaTexto}>
            A partir dessa ideia, começamos a desenvolver uma coleira
            inteligente capaz de coletar dados de saúde e comportamento dos
            pets, utilizando sensores e inteligência artificial para gerar
            informações úteis aos tutores.
          </p>
        </section>

        <section className={styles.acreditamosSection}>
          <h2 className={styles.tituloAcreditamos}>
            O que <span className={styles.destaquePink}>acreditamos</span>
          </h2>
          <div className={styles.valoresGrid}>
            {valores.map((v) => (
              <div key={v.num} className={styles.valorCard}>
                <span className={styles.valorNum}>{v.num}</span>
                <p className={styles.valorTexto}>{v.texto}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
