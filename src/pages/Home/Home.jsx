import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./Home.module.css";

import dogDeitado from "../../assets/img/home/dog-deitado.png";
import dogFeliz from "../../assets/img/home/dog-feliz.png";
import imgAna from "../../assets/img/home/img-ana.png";
import imgCarlos from "../../assets/img/home/img-carlos.png";
import imgFernanda from "../../assets/img/home/img-fernanda.png";
import img1 from "../../assets/img/home/img1.png";
import img2 from "../../assets/img/home/img2.png";
import img3 from "../../assets/img/home/img3.png";
import img4 from "../../assets/img/home/img4.png";

import videoColeiraDesktop from "../../assets/videos/video-coleira-desktop.webm";
import videoColeiraMobile from "../../assets/videos/video-coleira-desktop.webm";
import videoComercialDesktop from "../../assets/videos/video-comercial-desktop.webm";
import videoComercialMobile from "../../assets/videos/video-comercial-mobile.webm";

const petFotos = [img1, img2, img3, img4];

const depoimentos = [
  {
    nome: "Ana Lima",
    foto: imgAna,
    estrelas: 5,
    texto:
      "Fiquei muito mais tranquila depois que comecei a usar a coleira DunDum. Consigo monitorar meu cachorro em tempo real e recebo alertas instantâneos. Recomendo demais!",
  },
  {
    nome: "Carlos Souza",
    foto: imgCarlos,
    estrelas: 5,
    texto:
      "A plataforma é incrível! Consigo acompanhar todos os dados do meu pet em um único lugar. O suporte é excelente e o produto funciona perfeitamente.",
  },
  {
    nome: "Fernanda Costa",
    foto: imgFernanda,
    estrelas: 5,
    texto:
      "Meu pet tem problemas cardíacos e a DunDum me dá paz de espírito. Os dados são precisos e a interface é muito fácil de usar. Vale cada centavo!",
  },
];

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(styles.visible);
          }
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

function Carrossel({ items, renderItem }) {
  const [idx, setIdx] = useState(0);
  const total = items.length;
  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);
  return (
    <div className={styles.carrossel}>
      <button
        className={styles.carrosselBtn}
        onClick={prev}
        aria-label="anterior"
      >
        &#8249;
      </button>
      <div className={styles.carrosselTrack}>
        {items.map((item, i) => (
          <div
            key={i}
            className={`${styles.carrosselSlide} ${i === idx ? styles.carrosselAtivo : ""}`}
          >
            {renderItem(item, i)}
          </div>
        ))}
      </div>
      <button
        className={styles.carrosselBtn}
        onClick={next}
        aria-label="próximo"
      >
        &#8250;
      </button>
      <div className={styles.carrosselDots}>
        {items.map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i === idx ? styles.dotAtivo : ""}`}
            onClick={() => setIdx(i)}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  useScrollReveal();
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* principal */}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitulo}>
              Monitore a saúde do seu pet com{" "}
              <span className={styles.heroDestaque}>
                tecnologia inteligente.
              </span>
            </h1>
            <p className={styles.heroTexto}>
              A coleira inteligente que transforma dados em cuidado real.
              Batimentos, sono, localização e muito mais no seu dashboard.
            </p>
            <div className={styles.heroBtns}>
              <Link to="/produtos" className={styles.btnPrimario}>
                Ver produto
              </Link>
              <Link to="/como-funciona" className={styles.btnSecundario}>
                Como funciona
              </Link>
            </div>
          </div>
          <div className={styles.heroVideo}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className={styles.videoColeira}
            >
              <source
                src={isMobile ? videoColeiraMobile : videoColeiraDesktop}
                type="video/webm"
              />
            </video>
          </div>
        </section>

        {/* pets usando a coleira */}
        <section className={`${styles.secaoPets} ${styles.reveal}`}>
          <h2 className={styles.secaoTitulo}>PETS USANDO A NOSSA COLEIRA</h2>
          <div className={styles.petsDesktop}>
            {petFotos.map((foto, i) => (
              <div key={i} className={styles.petFotoWrap}>
                <img
                  src={foto}
                  alt={`Pet ${i + 1}`}
                  className={styles.petFoto}
                />
              </div>
            ))}
          </div>
          <div className={styles.petsMobile}>
            <Carrossel
              items={petFotos}
              renderItem={(foto, i) => (
                <div className={styles.petFotoWrap}>
                  <img
                    src={foto}
                    alt={`Pet ${i + 1}`}
                    className={styles.petFoto}
                  />
                </div>
              )}
            />
          </div>
        </section>

        {/* por que seu pet precisa de mais atenção */}
        <InteractiveBg className={`${styles.secaoPorque} ${styles.reveal}`}>
          <div className={styles.porqueImg}>
            <img src={dogDeitado} alt="Cachorro deitado" />
          </div>
          <div className={styles.porqueConteudo}>
            <h2 className={styles.porqueTitulo}>
              Por que seu pet precisa de mais atenção?
            </h2>
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
          </div>
        </InteractiveBg>

        {/* video comercial */}
        <section className={styles.secaoVideo}>
          <video
            autoPlay
            muted
            loop
            playsInline
            className={styles.videoComercial}
          >
            <source
              src={isMobile ? videoComercialMobile : videoComercialDesktop}
              type="video/webm"
            />
          </video>
        </section>

        {/* beneficios */}
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
                <span className={styles.heroDestaque}>DunDum</span>
              </h2>
            </div>
          </div>
          <div className={styles.beneficiosGrid}>
            {[
              {
                t: "Prevenção de doenças",
                d: "Detecta variações no batimento cardíaco e temperatura antes que virem emergência.",
              },
              {
                t: "Acompanhamento diário",
                d: "Histórico completo de sono, atividade e localização em tempo real.",
              },
              {
                t: "Dados para veterinários",
                d: "Compartilhe relatórios detalhados com seu vet em um clique.",
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

        {/* como funciona */}
        <section className={`${styles.secaoComoFunciona} ${styles.reveal}`}>
          <h2 className={styles.secaoTituloBranco}>COMO FUNCIONA</h2>
          <div className={styles.passosGrid}>
            {[
              {
                n: "1",
                t: "Coloque a coleira no pet",
                d: "A instalação é simples e o dispositivo se conecta ao app automaticamente.",
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

        {/* dashboard */}
        <InteractiveBg className={`${styles.secaoDashboard} ${styles.reveal}`}>
          <div className={styles.dashboardVideo}>
            <video
              autoPlay
              muted
              loop
              playsInline
              className={styles.videoDashboard}
            >
              <source src={videoColeiraDesktop} type="video/webm" />
            </video>
          </div>
          <div className={styles.dashboardTexto}>
            <h2>Tudo sobre seu pet em um único lugar</h2>
            <p>
              Visualize batimentos, GPS, nível de atividade, sono, histórico de
              saúde e muito mais. Compartilhe com seu veterinário com um clique.
            </p>
            <Link to="/produtos" className={styles.btnPrimario}>
              Criar minha conta
            </Link>
          </div>
        </InteractiveBg>

        {/* depoimentos */}
        <section className={`${styles.secaoDepoimentos} ${styles.reveal}`}>
          <h2 className={styles.secaoTituloGradiente}>
            O que dizem sobre a{" "}
            <span className={styles.heroDestaque}>DunDum</span>
          </h2>
          <Carrossel
            items={depoimentos}
            renderItem={(dep) => (
              <div className={styles.depCard}>
                <div className={styles.depEstrelas}>
                  {"★".repeat(dep.estrelas)}
                </div>
                <p className={styles.depTexto}>{dep.texto}</p>
                <div className={styles.depAutor}>
                  <img
                    src={dep.foto}
                    alt={dep.nome}
                    className={styles.depFoto}
                  />
                  <span>{dep.nome}</span>
                </div>
              </div>
            )}
          />
        </section>

        {/* chamada final */}
        <section className={`${styles.secaoCta} ${styles.reveal}`}>
          <p className={styles.ctaLabel}>CUIDE DO SEU PET</p>
          <h2 className={styles.ctaTitulo}>Seu pet merece o melhor cuidado</h2>
          <p className={styles.ctaTexto}>
            Junte-se a milhares de tutores que já monitoram a saúde do seu pet
            com a DunDum.
          </p>
          <div className={styles.ctaBtns}>
            <Link to="/cadastro" className={styles.btnPrimario}>
              Começar agora
            </Link>
            <Link to="/como-funciona" className={styles.btnSecundario}>
              Saiba mais
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
