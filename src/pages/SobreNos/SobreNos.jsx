import { useEffect, useRef, useState } from "react";
import { BeamsBackground } from "./beams-background.tsx";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./SobreNos.module.css";

import iconeGitHub from "../../assets/img/sobrenos/icon-github.svg";
import iconeLinkedIn from "../../assets/img/sobrenos/icon-linkedin.svg";

gsap.registerPlugin(ScrollTrigger);

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
    cargo: "Financeiro",
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
    cargo: "Marketing",
    linkedin: "https://www.linkedin.com/in/victor-mariano-95612b320/",
    github: "https://github.com/marianovictor-900",
  },
  {
    nome: "Wanny",
    cargo: "Product Owner",
    linkedin: "https://www.linkedin.com/in/wanny-barreto-b49682204/",
    github: "https://github.com/NannyBarreto",
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

function QuemSomosHero() {
  const containerRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = containerRef.current;
      if (!heroEl) return;

      const rect = heroEl.getBoundingClientRect();
      const traveled = -rect.top;
      const zoneH = window.innerHeight;
      const idx = Math.min(
        Math.max(Math.floor(traveled / zoneH), 0),
        membros.length - 1,
      );

      if (activeRef.current !== idx) {
        activeRef.current = idx;
        setActiveIndex(idx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef} className={styles.heroSection}>
      <div className={styles.beamsWrapper}>
        <BeamsBackground />
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.tituloQuemSomos}>
          Quem <span className={styles.destaquePink}>Somos?</span>
        </h1>

        <div className={styles.membroStage}>
          {membros.map((membro, i) => (
            <div
              key={membro.nome}
              className={`${styles.membroCardSingle} ${i === activeIndex ? styles.cardAtivo : ""}`}
            >
              <div className={styles.membroAvatar} />
              <p className={styles.membroNome}>{membro.nome}</p>
              <p className={styles.membroCargo}>{membro.cargo}</p>
              <div className={styles.membroLinks}>
                <a
                  href={membro.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkIcone}
                >
                  <img
                    src={iconeLinkedIn}
                    alt="LinkedIn"
                    className={styles.icone}
                  />
                </a>
                <a
                  href={membro.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkIcone}
                >
                  <img
                    src={iconeGitHub}
                    alt="GitHub"
                    className={styles.icone}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.scrollIndicador}>
          <span className={styles.scrollText}>Role para Ver</span>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{
                width: `${((activeIndex + 1) / membros.length) * 100}%`,
              }}
            />
          </div>
          <span className={styles.sectionCounter}>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(membros.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className={styles.scrollSections}>
        {membros.map((_, i) => (
          <div key={i} className={styles.scrollSection} />
        ))}
      </div>
    </div>
  );
}

export default function SobreNos() {
  return (
    <>
      <Header />
      <main className={styles.container}>
        <QuemSomosHero />

        <div className={styles.secoesClaras}>
          <section className={styles.moveSection}>
            <h2 className={styles.tituloMove}>
              O que nos <span className={styles.destaquePink}>move</span>
            </h2>
            <p className={styles.moveTexto}>
              Utilizar tecnologia e inteligência artificial para monitorar a
              saúde e o comportamento dos pets, oferecendo informações que
              ajudam tutores e veterinários a cuidar melhor dos animais.
            </p>
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
              mudanças no comportamento dos animais, permitindo uma prevenção
              mais eficiente de possíveis problemas de saúde.
            </p>
          </section>

          <section className={styles.historiaSection}>
            <h2 className={styles.tituloHistoria}>
              Nossa <span className={styles.destaquePink}>História</span>
            </h2>
            <p className={styles.historiaTexto}>
              O projeto nasceu durante o desenvolvimento de um trabalho
              acadêmico, quando percebemos que a tecnologia poderia ser
              utilizada para melhorar o cuidado com os animais de estimação.
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
        </div>
      </main>
      <Footer />
    </>
  );
}
