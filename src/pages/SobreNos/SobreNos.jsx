import { useEffect, useRef, useState } from "react";
import { BeamsBackground } from "./BeamsBackground.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./SobreNos.module.css";

import imgAxel from "../../assets/img/sobrenos/axel.webp";
import imgBeatriz from "../../assets/img/sobrenos/beatriz.webp";
import imgDiego from "../../assets/img/sobrenos/diego.webp";
import imgGuilherme from "../../assets/img/sobrenos/guilherme.webp";
import imgPaulo from "../../assets/img/sobrenos/paulo.webp";
import imgSamuel from "../../assets/img/sobrenos/samuel.webp";
import imgVictor from "../../assets/img/sobrenos/victor.webp";
import imgWanny from "../../assets/img/sobrenos/wanny.webp";
import iconeGitHub from "../../assets/img/sobrenos/icon-github.svg";
import iconeLinkedIn from "../../assets/img/sobrenos/icon-linkedin.svg";

const MEMBROS = [
  {
    nome: "Axel",
    cargo: "UI/UX Design",
    foto: imgAxel,
    linkedin:
      "https://www.linkedin.com/in/axel-ray-silva-de-azevedo-b9810437a/",
    github: "https://github.com/Axel-Ray",
  },
  {
    nome: "Beatriz",
    cargo: "Dev. Front-End",
    foto: imgBeatriz,
    linkedin: "https://www.linkedin.com/in/beatriz-lacerda-628635392/",
    github: "https://github.com/devbialacerda",
  },
  {
    nome: "Diego",
    cargo: "Financeiro",
    foto: imgDiego,
    linkedin: "https://www.linkedin.com/in/diego-cabaleiro/",
    github: "https://github.com/diegocabaleiro",
  },
  {
    nome: "Guilherme",
    cargo: "Dev. Full Stack",
    foto: imgGuilherme,
    linkedin: "https://www.linkedin.com/in/guilherme-machado-silva-47597a2b8/",
    github: "https://github.com/gui-mach",
  },
  {
    nome: "Paulo",
    cargo: "Dev. Full Stack",
    foto: imgPaulo,
    linkedin: "https://www.linkedin.com/in/devoluap/",
    github: "https://github.com/DevoluaP",
  },
  {
    nome: "Samuel",
    cargo: "Dev. Back-End",
    foto: imgSamuel,
    linkedin: "https://www.linkedin.com/in/samuelaranha2935/",
    github: "https://github.com/SamuelAranha",
  },
  {
    nome: "Victor",
    cargo: "Marketing",
    foto: imgVictor,
    linkedin: "https://www.linkedin.com/in/victor-mariano-95612b320/",
    github: "https://github.com/marianovictor-900",
  },
  {
    nome: "Wanny",
    cargo: "Product Owner",
    foto: imgWanny,
    linkedin: "https://www.linkedin.com/in/wanny-barreto-b49682204/",
    github: "https://github.com/NannyBarreto",
  },
];

const VALORES = [
  { num: "01", texto: "Acessibilidade para todos" },
  { num: "02", texto: "Cuidado como prioridade" },
  { num: "03", texto: "Amor e respeito pelos animais" },
  { num: "04", texto: "Compromisso com o impacto social" },
  { num: "05", texto: "Inovação através da tecnologia" },
  { num: "06", texto: "Ética e segurança no tratamento de dados" },
];

function LinkSocial({ href, rede, icone }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Perfil no ${rede}`}
      className={styles.linkIcone}
    >
      <img src={icone} alt="" aria-hidden="true" className={styles.icone} />
    </a>
  );
}

function MembroCard({ membro, ativo }) {
  return (
    <article
      className={`${styles.membroCardSingle} ${ativo ? styles.cardAtivo : ""}`}
      aria-hidden={!ativo}
    >
      <img
        src={membro.foto}
        alt={`Foto de ${membro.nome}`}
        className={styles.membroAvatar}
        loading="lazy"
        width={96}
        height={96}
      />
      <p className={styles.membroNome}>{membro.nome}</p>
      <p className={styles.membroCargo}>{membro.cargo}</p>

      <nav
        className={styles.membroLinks}
        aria-label={`Redes sociais de ${membro.nome}`}
      >
        <LinkSocial
          href={membro.linkedin}
          rede="LinkedIn"
          icone={iconeLinkedIn}
        />
        <LinkSocial href={membro.github} rede="GitHub" icone={iconeGitHub} />
      </nav>
    </article>
  );
}

function SecaoTexto({ tituloId, titulo, destaque, children }) {
  return (
    <section className={styles.secaoTexto} aria-labelledby={tituloId}>
      <h2 id={tituloId} className={styles.tituloSecao}>
        {titulo} <span className={styles.destaquePink}>{destaque}</span>
      </h2>
      {children}
    </section>
  );
}

function ValorItem({ num, texto }) {
  return (
    <li className={styles.valorCard}>
      <span className={styles.valorNum} aria-hidden="true">
        {num}
      </span>
      <p className={styles.valorTexto}>{texto}</p>
    </li>
  );
}

function QuemSomosHero() {
  const containerRef = useRef(null);
  const activeRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const total = MEMBROS.length;

  useEffect(() => {
    const handleScroll = () => {
      const heroEl = containerRef.current;
      if (!heroEl) return;

      const rect = heroEl.getBoundingClientRect();
      const traveled = -rect.top;
      const zoneH = window.innerHeight;
      const idx = Math.min(
        Math.max(Math.floor(traveled / zoneH), 0),
        total - 1,
      );

      if (activeRef.current !== idx) {
        activeRef.current = idx;
        setActiveIndex(idx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [total]);

  const srProgress = `Membro ${activeIndex + 1} de ${total}: ${MEMBROS[activeIndex].nome}, ${MEMBROS[activeIndex].cargo}`;

  return (
    <section
      ref={containerRef}
      className={styles.heroSection}
      aria-label="Conheça a equipe"
    >
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className={styles.srOnly}
      >
        {srProgress}
      </div>

      <div className={styles.beamsWrapper}>
        <BeamsBackground />
      </div>

      <div className={styles.heroContent}>
        <h1 className={styles.tituloQuemSomos}>
          Quem <span className={styles.destaquePink}>Somos?</span>
        </h1>

        <div
          className={styles.membroStage}
          role="list"
          aria-label="Membros da equipe"
        >
          {MEMBROS.map((membro, i) => (
            <div key={membro.nome} role="listitem">
              <MembroCard membro={membro} ativo={i === activeIndex} />
            </div>
          ))}
        </div>

        <div className={styles.scrollIndicador} aria-hidden="true">
          <span className={styles.scrollText}>Role para Ver</span>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${((activeIndex + 1) / total) * 100}%` }}
            />
          </div>
          <span className={styles.sectionCounter}>
            {String(activeIndex + 1).padStart(2, "0")} /{" "}
            {String(total).padStart(2, "0")}
          </span>
        </div>
      </div>

      <div className={styles.scrollSections} aria-hidden="true">
        {MEMBROS.map((_, i) => (
          <div key={i} className={styles.scrollSection} />
        ))}
      </div>
    </section>
  );
}

export default function SobreNos() {
  return (
    <>
      <main className={styles.container}>
        <QuemSomosHero />

        <div className={styles.secoesClaras}>
          <SecaoTexto tituloId="titulo-move" titulo="O que nos" destaque="move">
            <p className={styles.textoCorpo}>
              Utilizar tecnologia e inteligência artificial para monitorar a
              saúde e o comportamento dos cães, oferecendo informações que
              ajudam tutores e veterinários a cuidar melhor dos animais.
            </p>
          </SecaoTexto>

          <SecaoTexto
            tituloId="titulo-coleira"
            titulo="Por que criamos"
            destaque="a coleira"
          >
            <p className={styles.textoCorpo}>
              Muitos tutores não conseguem acompanhar de perto a saúde e o
              comportamento dos seus cães no dia a dia. Pensando nisso, criamos
              uma coleira inteligente capaz de monitorar sinais importantes como
              batimentos cardíacos, atividade física e sono.
            </p>
            <p className={styles.textoCorpo}>
              Nosso objetivo é ajudar tutores e veterinários a identificar
              mudanças no comportamento dos cães, permitindo uma prevenção mais
              eficiente de possíveis problemas de saúde.
            </p>
          </SecaoTexto>

          <SecaoTexto
            tituloId="titulo-historia"
            titulo="Nossa"
            destaque="História"
          >
            <p className={styles.textoCorpo}>
              O projeto nasceu durante o desenvolvimento de um trabalho
              acadêmico, quando percebemos que a tecnologia poderia ser
              utilizada para melhorar o cuidado com os cães.
            </p>
            <p className={styles.textoCorpo}>
              A partir dessa ideia, começamos a desenvolver uma coleira
              inteligente capaz de coletar dados de saúde e comportamento dos
              cães, utilizando sensores e inteligência artificial para gerar
              informações úteis aos tutores.
            </p>
          </SecaoTexto>

          <section
            className={styles.acreditamosSection}
            aria-labelledby="titulo-acreditamos"
          >
            <h2 id="titulo-acreditamos" className={styles.tituloSecao}>
              O que <span className={styles.destaquePink}>acreditamos</span>
            </h2>
            <ul className={styles.valoresGrid} role="list">
              {VALORES.map((v) => (
                <ValorItem key={v.num} num={v.num} texto={v.texto} />
              ))}
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
