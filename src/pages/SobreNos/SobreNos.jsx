import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./SobreNos.module.css";

//import fotoAxel from "../../assets/img/sobrenos/foto-axel.webp";
//import fotoBeatriz from "../../assets/img/sobrenos/foto-beatriz.webp";
//import fotoDiego from "../../assets/img/sobrenos/foto-diego.webp";
//import fotoGuilherme from "../../assets/img/sobrenos/foto-guilherme.webp";
//import fotoPaulo from "../../assets/img/sobrenos/foto-paulo.webp";
//import fotoSamuel from "../../assets/img/sobrenos/foto-samuel.webp";
//import fotoVictor from "../../assets/img/sobrenos/foto-victor.webp";
//import fotoWanny from "../../assets/img/sobrenos/foto-wanny.webp";

import iconeGitHub from "../../assets/img/sobrenos/icon-github.svg";
import iconeLinkedIn from "../../assets/img/sobrenos/icon-linkedin.svg";

const membros = [
  {
    nome: "Axel",
    cargo: "Dev. Front-End & UI/UX Design",
    linkedin:
      "https://www.linkedin.com/in/axel-ray-silva-de-azevedo-b9810437a/",
    github: "https://github.com/Axel-Ray",
  },
  {
    nome: "Beatriz",
    cargo: "Dev. Front-End & UI/UX Design",
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
  { num: "01", texto: "Amor e respeito pelos animais" },
  { num: "02", texto: "Inovação através da tecnologia" },
  { num: "03", texto: "Transparência com nossos usuários" },
  { num: "04", texto: "Compromisso com a saúde e o bem-estar dos pets" },
  { num: "05", texto: "Colaboração e respeito entre as pessoas" },
];

export default function SobreNos() {
  return (
    <>
      <Header />

      <main className={styles.container}>
        {/* SEÇÃO: Quem Somos */}
        <section className={styles.quemSomosSection}>
          <h1 className={styles.tituloQuemSomos}>
            Quem <span className={styles.destaquePurple}>Somos?</span>
          </h1>

          <div className={styles.membroGrid}>
            {membros.map((membro) => (
              <div key={membro.nome} className={styles.membroCard}>
                <div className={styles.membroAvatar} />
                <p className={styles.membroNome}>{membro.nome}</p>
                <p className={styles.membroCargo}>{membro.cargo}</p>
                <div className={styles.membroLinks}>
                  <a
                    href={membro.linkedin}
                    target="_blank"
                    rel="noreferrer"
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
                    rel="noreferrer"
                    className={styles.linkIcone}
                  >
                    <img
                      src={iconeGitHub}
                      alt="GitHub"
                      className={styles.iconeGithub}
                    />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SEÇÃO: O que nos move */}
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

        {/* SEÇÃO: Por que criamos a coleira */}
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

        {/* SEÇÃO: Nossa História */}
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

        {/* SEÇÃO: O que acreditamos */}
        <section className={styles.acreditamosSection}>
          <h2 className={styles.tituloAcreditamos}>
            O que <span className={styles.destaquePurple}>acreditamos</span>
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
