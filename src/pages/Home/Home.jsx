import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./Home.module.css";
import ScrollExpand from "./scroll-expansion";
import { TestimonialsColumn } from "./testimonials-column";

import dogDeitado from "../../assets/img/home/dog-deitado.webp";
import dogFeliz from "../../assets/img/home/dog-feliz.webp";
import imgAna from "../../assets/img/home/img-ana.webp";
import imgBeatriz from "../../assets/img/home/img-beatriz.webp";
import imgCarlos from "../../assets/img/home/img-carlos.webp";
import imgFernanda from "../../assets/img/home/img-fernanda.webp";
import imgJuliana from "../../assets/img/home/img-juliana.webp";
import imgLarissa from "../../assets/img/home/img-larissa.webp";
import imgMarcos from "../../assets/img/home/img-marcos.webp";
import imgRafaela from "../../assets/img/home/img-rafaela.webp";
import imgThiago from "../../assets/img/home/img-thiago.webp";
import img1 from "../../assets/img/home/img1.webp";
import img2 from "../../assets/img/home/img2.webp";
import img3 from "../../assets/img/home/img3.webp";
import img4 from "../../assets/img/home/img4.webp";
import img5 from "../../assets/img/home/img5.webp";
import img6 from "../../assets/img/home/img6.webp";

import videoColeiraDesktop from "../../assets/videos/video-coleira-desktop.webm";
import videoColeiraMobile from "../../assets/videos/video-coleira-mobile.webm";
import videoComercial from "../../assets/videos/video-comercial.webm";
import videoDashboard from "../../assets/videos/video-dashboard.webm";

const petFotos = [img1, img2, img3, img4, img5, img6];

const testimonials = [
  {
    text: "Fiquei muito mais tranquila depois que comecei a usar a coleira DunDum. Consigo monitorar meu cachorro em tempo real e recebo alertas instantâneos. Recomendo demais!",
    image: imgAna,
    name: "Ana Lima",
  },
  {
    text: "A plataforma é incrível! Consigo acompanhar todos os dados do meu pet em um único lugar. O suporte é excelente e o produto funciona perfeitamente.",
    image: imgCarlos,
    name: "Carlos Souza",
  },
  {
    text: "Meu pet tem problemas cardíacos e a DunDum me dá paz de espírito. Os dados são precisos e a interface é muito fácil de usar. Vale cada centavo!",
    image: imgFernanda,
    name: "Fernanda Costa",
  },
  {
    text: "Meu border collie é muito agitado e eu sempre me preocupava quando ficava sozinho. Com a DunDum consigo ver tudo em tempo real. Produto incrível!",
    image: imgRafaela,
    name: "Rafaela Mendes",
  },
  {
    text: "A coleira chegou rápido e foi fácil de configurar. Em menos de 10 minutos já estava monitorando minha pet. A interface da plataforma é linda e muito intuitiva.",
    image: imgJuliana,
    name: "Juliana Torres",
  },
  {
    text: "Recebi um alerta de batimento cardíaco elevado enquanto estava no trabalho. Liguei para o veterinário na hora. A DunDum pode ter salvado a vida do meu pet.",
    image: imgMarcos,
    name: "Marcos Oliveira",
  },
  {
    text: "Três pets em casa e consigo monitorar todos pela mesma plataforma. Já indiquei para toda a minha família. Vocês são incríveis!",
    image: imgBeatriz,
    name: "Beatriz Santos",
  },
  {
    text: "Comprei com um pouco de receio por ser um produto novo, mas superou todas as expectativas. O GPS é preciso e os dados de saúde me ajudaram muito na consulta veterinária.",
    image: imgThiago,
    name: "Thiago Almeida",
  },
  {
    text: "Minha labrador tem epilepsia e antes eu vivia com medo de deixá-la sozinha. Com a DunDum recebo alertas na hora e consigo agir rápido. Mudou completamente minha rotina.",
    image: imgLarissa,
    name: "Larissa Figueiredo",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

// rolagem suave
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.12 },
    );

    document
      .querySelectorAll(`.${styles.reveal}`)
      .forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// fundo dinâmico
function InteractiveBg({ children, className }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--mx", `${x}%`);
    ref.current.style.setProperty("--my", `${y}%`);
  };

  return (
    <div
      ref={ref}
      className={`${styles.interactiveBg} ${className}`}
      onMouseMove={handleMouseMove}
    >
      {children}
    </div>
  );
}

export default function Home() {
  useScrollReveal();
  const comoFuncionaRef = useRef(null);

  // troca o vídeo conforme o tamanho da tela
  const videoHeroRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile((prev) => {
        if (prev !== mobile) {
          videoHeroRef.current?.load();
        }
        return mobile;
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollParaComoFunciona = (e) => {
    e.preventDefault();
    comoFuncionaRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* HERO (PRINCIPAL) */}
        <section className={styles.hero}>
          <video
            ref={videoHeroRef}
            autoPlay
            muted
            loop
            playsInline
            className={styles.heroBgVideo}
          >
            <source
              src={isMobile ? videoColeiraMobile : videoColeiraDesktop}
              type="video/webm"
            />
          </video>
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitulo}>
              Monitore a saúde do seu pet com
              <br />
              <span className={styles.heroDestaque}>tecnologia </span>
              <span className={styles.heroDestaque2}>inteligente.</span>
            </h1>
            <p className={styles.heroTexto}>
              A coleira inteligente que transforma dados em cuidado real.
              Batimentos, sono, localização e muito mais no seu dashboard.
            </p>
            <div className={styles.heroBtns}>
              <Link to="/produtos" className={styles.btnPrimario}>
                Ver produto
              </Link>
              <a
                href="#como-funciona"
                className={styles.btnSecundario}
                onClick={scrollParaComoFunciona}
              >
                Como funciona
              </a>
            </div>
          </div>
        </section>

        {/* PETS USANDO A COLEIRA */}
        <section className={`${styles.secaoPets} ${styles.reveal}`}>
          <h2 className={styles.secaoTitulo}>PETS USANDO A NOSSA COLEIRA</h2>
          <div className={styles.petsInfinito}>
            <div className={styles.petsTrack}>
              {[...petFotos, ...petFotos].map((foto, i) => (
                <div key={i} className={styles.petFotoWrap}>
                  <img
                    src={foto}
                    alt={`Pet ${(i % petFotos.length) + 1}`}
                    className={styles.petFoto}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* POR QUE SEU PET */}
        <InteractiveBg className={`${styles.secaoPorque} ${styles.reveal}`}>
          <div className={styles.porqueEsquerda}>
            <div className={styles.porqueImg}>
              <img src={dogDeitado} alt="Cachorro deitado" />
            </div>
            <h2 className={styles.porqueTitulo}>
              Por que seu pet precisa de mais atenção?
            </h2>
          </div>
          <div className={styles.porqueItens}>
            {[
              {
                n: "01",
                t: "Tutores não sabem quando o pet está doente",
                d: "Sinais sutis de dor, ansiedade ou febre passam despercebidos até virar algo sério.",
              },
              {
                n: "02",
                t: "Doenças cardíacas são comuns em pets",
                d: "1 em cada 10 cães desenvolve algum problema cardíaco ao longo da vida.",
              },
              {
                n: "03",
                t: "Pets sozinhos ficam entediados",
                d: "Quando o dono trabalha, o pet fica ansioso e pode se machucar de várias formas.",
              },
            ].map((item) => (
              <div key={item.n} className={styles.porqueItem}>
                <span className={styles.porqueNum}>{item.n}</span>
                <div>
                  <strong>{item.t}</strong>
                  <p>{item.d}</p>
                </div>
              </div>
            ))}
          </div>
        </InteractiveBg>

        {/* VÍDEO COMERCIAL */}
        <ScrollExpand
          mediaSrc={videoComercial}
          title="Conheça a DunDum"
          scrollToExpand="Role para ver"
        />

        {/* BENEFÍCIOS */}
        <InteractiveBg className={`${styles.secaoBeneficios} ${styles.reveal}`}>
          <div className={styles.beneficiosHeader}>
            <img
              src={dogFeliz}
              alt="Cachorro feliz"
              className={styles.dogFeliz}
            />
            <div>
              <p className={styles.beneficiosLabel}>BENEFÍCIOS</p>
              <h2 className={styles.beneficiosTitulo}>
                Por que escolher a{" "}
                <span className={styles.heroDestaque}>Dun</span>
                <span className={styles.heroDestaque2}>Dum</span>
              </h2>
            </div>
          </div>
          <div className={styles.beneficiosGrid}>
            {[
              {
                t: "Prevenção de doenças",
                d: "Detecta variações no batimento cardíaco e respiração antes que virem emergência.",
              },
              {
                t: "Acompanhamento diário",
                d: "Histórico completo de sono, atividade e localização em tempo real.",
              },
              {
                t: "Dados para veterinários",
                d: "Compartilhe relatórios detalhados com seu veterinário em um clique.",
              },
              {
                t: "Maior segurança",
                d: "GPS integrado para saber onde seu pet está a qualquer momento.",
              },
            ].map((b, i) => (
              <div key={i} className={styles.beneficioCard}>
                <strong>{b.t}</strong>
                <p>{b.d}</p>
              </div>
            ))}
          </div>
        </InteractiveBg>

        {/* COMO FUNCIONA */}
        <section
          id="como-funciona"
          ref={comoFuncionaRef}
          className={`${styles.secaoComoFunciona} ${styles.reveal}`}
        >
          <h2 className={styles.secaoTituloBranco}>COMO FUNCIONA</h2>
          <div className={styles.passosGrid}>
            {[
              {
                n: "1",
                t: "Coloque a coleira no pet",
                d: "Após ligar a coleira, o dispositivo se conecta à plataforma automaticamente.",
              },
              {
                n: "2",
                t: "A plataforma analisa",
                d: "Nossos algoritmos processam os dados em tempo real e geram alertas quando necessário.",
              },
              {
                n: "3",
                t: "Visualize no dashboard",
                d: "Acompanhe todos os dados do seu pet em um painel bonito e intuitivo.",
              },
            ].map((p) => (
              <div key={p.n} className={styles.passoCard}>
                <div className={styles.passoNum}>{p.n}</div>
                <strong>{p.t}</strong>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DASHBOARD */}
        <InteractiveBg className={`${styles.secaoDashboard} ${styles.reveal}`}>
          <div className={styles.dashboardVideo}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className={styles.videoDashboard}
            >
              <source src={videoDashboard} type="video/webm" />
            </video>
          </div>
          <div className={styles.dashboardTexto}>
            <h2>Tudo sobre seu pet em um único lugar</h2>
            <p>
              Acompanhe humor, gráficos de atividade e alertas em tempo real.
              Saiba exatamente como seu pet está se sentindo, onde quer que você
              esteja.
            </p>
            <Link to="/cadastro" className={styles.btnPrimario}>
              Criar minha conta
            </Link>
          </div>
        </InteractiveBg>

        {/* DEPOIMENTOS */}
        <section className={`${styles.secaoDepoimentos} ${styles.reveal}`}>
          <h2 className={styles.secaoTituloGradiente}>
            O que dizem sobre a DunDum
          </h2>
          <div className={styles.testemunhasGrid}>
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} duration={17} />
          </div>
        </section>

        {/* CTA FINAL */}
        <InteractiveBg className={`${styles.secaoCta} ${styles.reveal}`}>
          <p className={styles.ctaLabel}>CUIDE DO SEU PET</p>
          <h2 className={styles.ctaTitulo}>Seu pet merece o melhor cuidado</h2>
          <p className={styles.ctaTexto}>
            Junte-se a milhares de tutores que já monitoram a saúde dos seus
            pets com a DunDum.
          </p>
          <div className={styles.ctaBtns}>
            <Link to="/produtos" className={styles.btnPrimario}>
              Ver produto
            </Link>
            <Link to="/cadastro" className={styles.btnCta}>
              Criar conta
            </Link>
          </div>
        </InteractiveBg>
      </main>
      <Footer />
    </>
  );
}
