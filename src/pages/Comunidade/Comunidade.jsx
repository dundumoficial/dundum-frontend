import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./Comunidade.module.css";

import pet1 from "../../assets/img/comunidade/pet1.webp";
import pet2 from "../../assets/img/comunidade/pet2.webp";
import pet3 from "../../assets/img/comunidade/pet3.webp";
import pet4 from "../../assets/img/comunidade/pet4.webp";
import pet5 from "../../assets/img/comunidade/pet5.webp";
import pet6 from "../../assets/img/comunidade/pet6.webp";

import vet1 from "../../assets/img/comunidade/vet1.webp";
import vet2 from "../../assets/img/comunidade/vet2.webp";
import vet3 from "../../assets/img/comunidade/vet3.webp";
import vet4 from "../../assets/img/comunidade/vet4.webp";
import vet5 from "../../assets/img/comunidade/vet5.webp";
import vet6 from "../../assets/img/comunidade/vet6.webp";

import iconePata from "../../assets/img/comunidade/icon-pata.svg";
import iconePata2 from "../../assets/img/comunidade/icon-pata2.svg";
import iconeCachorro from "../../assets/img/comunidade/icon-cachorro.svg";
import iconeCasa from "../../assets/img/comunidade/icon-casa.svg";
import iconeLampada from "../../assets/img/comunidade/icon-lampada.svg";
import iconeTelefone from "../../assets/img/comunidade/tel.png";
import iconeEmail from "../../assets/img/comunidade/email.png";

//  DADOS 

const veterinarios = [
  {
    id: 1,
    nome: "Dra. Ana Meireles",
    cidade: "São Paulo, SP",
    tel: "(11) 98700-4321",
    email: "ana.meireles@petclinica.com.br",
    img: vet1,
  },
  {
    id: 2,
    nome: "Dr. Rafael Corrêa",
    cidade: "Campinas, SP",
    tel: "(19) 98234-5678",
    email: "rafael.correa@petderma.com.br",
    img: vet2,
  },
  {
    id: 3,
    nome: "Dra. Letícia Prado",
    cidade: "Curitiba, PR",
    tel: "(41) 99878-1234",
    email: "leticia.prado@petvorto.com.br",
    img: vet3,
  },
  {
    id: 4,
    nome: "Dr. Marcos Figueiredo",
    cidade: "Belo Horizonte, MG",
    tel: "(31) 98500-9800",
    email: "marcos.figueiredo@petcor.com.br",
    img: vet4,
  },
  {
    id: 5,
    nome: "Dra. Carolina Souza",
    cidade: "Porto Alegre, RS",
    tel: "(51) 949-2233",
    email: "carolina.souza@vetmosil.com.br",
    img: vet5,
  },
  {
    id: 6,
    nome: "Dr. Thiago Lima",
    cidade: "Rio de Janeiro, RJ",
    tel: "(21) 99877-3344",
    email: "thiago.lima@vetmauro.com.br",
    img: vet6,
  },
];

const pets = [
  {
    id: 1,
    nome: "Thor",
    idade: "2 anos",
    cidade: "São Paulo, SP",
    status: "Disponível",
    img: pet1,
  },
  {
    id: 2,
    nome: "Mia",
    idade: "1 ano",
    cidade: "Campinas, SP",
    status: "Disponível",
    img: pet2,
  },
  {
    id: 3,
    nome: "Bob",
    idade: "4 anos",
    cidade: "Curitiba, PR",
    status: "Disponível",
    img: pet3,
  },
  {
    id: 4,
    nome: "Mel",
    idade: "6 meses",
    cidade: "Belo Horizonte, MG",
    status: "Disponível",
    img: pet4,
  },
  {
    id: 5,
    nome: "Nala",
    idade: "3 anos",
    cidade: "Rio de Janeiro, RJ",
    status: "Disponível",
    img: pet5,
  },
  {
    id: 6,
    nome: "Simba",
    idade: "2 anos",
    cidade: "Porto Alegre, RS",
    status: "Disponível",
    img: pet6,
  },
];

const passosAdestramento = [
  {
    num: 1,
    titulo: "Reforço positivo",
    desc: "Recompense imediatamente quando o cão fizer o que você deseja para associar a ação a algo bom.",
  },
  {
    num: 2,
    titulo: "Comandos básicos",
    desc: "Comece com 'sentar' e 'fico', usando petiscos para induzir o movimento correto.",
  },
  {
    num: 3,
    titulo: "Treino diário",
    desc: "A repetição é a chave. Sessões curtas e frequentes são mais eficazes do que longas e esporádicas.",
  },
  {
    num: 4,
    titulo: "Foco e atenção",
    desc: "Treine antes das refeições para que o petisco seja uma motivação maior.",
  },
  {
    num: 5,
    titulo: "Educação em casa",
    desc: "Ensine onde fazer as necessidades e estabeleça limites para evitar mordidas, substituindo por brinquedos.",
  },
  {
    num: 6,
    titulo: "Comando de liberação",
    desc: "Use 'ok' para sinalizar quando o cão pode sair de uma posição como o 'ficar'.",
  },
];

const dicasEspecialistas = [
  {
    num: 1,
    titulo: "Paciência",
    desc: "O adestramento é gradativo e pode levar meses para o animal absorver o que você quer.",
  },
  {
    num: 2,
    titulo: "Ambiente calmo",
    desc: "Treine em locais sem distrações para que o cão consiga se concentrar nos comandos.",
  },
  {
    num: 3,
    titulo: "Uso de guia",
    desc: "A coleira ajuda a direcionar o cão durante o treino de caminhada e obediência.",
  },
  {
    num: 4,
    titulo: "Recompense o 'fica'",
    desc: "Coloque o cão na posição correta e ofereça o petisco apenas quando ele obedecer.",
  },
  {
    num: 5,
    titulo: "Evite gritar",
    desc: "Use voz firme, mas evite gritos, o medo não é uma boa ferramenta de ensino.",
  },
];


export default function Comunidade() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        {/*  SEÇÃO: HERO  */}
        <section className={styles.heroSection}>
          <div className={styles.heroInner}>
            <div className={styles.heroText}>
              <h1 className={styles.heroTitle}>
                Cuidado real para
                <br />
                <span className={styles.heroDestaque}>animais</span> reais
              </h1>
              <p className={styles.heroSubtitulo}>
                Conectamos tutores a veterinários parceiros, ONGs e animais que
                precisam de um lar. Tudo em um só lugar.
              </p>
              <div className={styles.heroBtns}>
                <button className={styles.btnHeroPrimary}>Quero adotar</button>
                <button className={styles.btnHeroSecondary}>
                  Ver veterinários
                </button>
              </div>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStatCard}>
                <img
                  src={iconeCachorro}
                  alt="Cachorro"
                  className={styles.heroStatIconImg}
                />
                <div className={styles.heroStatInfo}>
                  <strong className={styles.heroStatNum}>248</strong>
                  <span className={styles.heroStatLabel}>Pets para adoção</span>
                </div>
              </div>
              <div className={styles.heroStatCard}>
                <img
                  src={iconePata}
                  alt="Pata"
                  className={styles.heroStatIconImg}
                />
                <div className={styles.heroStatInfo}>
                  <strong className={styles.heroStatNum}>84</strong>
                  <span className={styles.heroStatLabel}>
                    Veterinários parceiros
                  </span>
                </div>
              </div>
              <div className={styles.heroStatCard}>
                <img
                  src={iconeCasa}
                  alt="Casa"
                  className={styles.heroStatIconImg}
                />
                <div className={styles.heroStatInfo}>
                  <strong className={styles.heroStatNum}>37</strong>
                  <span className={styles.heroStatLabel}>ONGs cadastradas</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  SEÇÃO: VETERINÁRIOS  */}
        <section className={styles.vetSection}>
          <div className={styles.sectionInner}>
            <span className={styles.sectionTag1}>
              <span className={styles.tagDot}></span>
              VETERINÁRIOS PARCEIROS
            </span>
            <h2 className={styles.sectionTitle}>Profissionais de confiança</h2>
            <p className={styles.sectionSubtitle}>
              Lista de veterinários que podem ajudar você e seu pet.
            </p>

            <div className={styles.vetGrid}>
              {veterinarios.map((vet) => (
                <div key={vet.id} className={styles.vetCard}>
                  <img src={vet.img} alt={vet.nome} className={styles.vetImg} />
                  <div className={styles.vetInfo}>
                    <strong className={styles.vetNome}>{vet.nome}</strong>
                    <span className={styles.vetCidade}>{vet.cidade}</span>
                    <span className={styles.vetContato}>
                      <img
                        src={iconeTelefone}
                        alt="Telefone"
                        className={styles.vetIcontel}
                      />{" "}
                      {vet.tel}
                    </span>
                    <span className={styles.vetContato}>
                      <img
                        src={iconeEmail}
                        alt="Email"
                        className={styles.vetIcontel}
                      />{" "}
                      {vet.email}
                    </span>
                    <button className={styles.btnContato}>
                      Entrar em contato
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  SEÇÃO: ADOÇÃO  */}
        <section className={styles.adocaoSection}>
          <div className={styles.sectionInner}>
            <span className={styles.sectionTag}>
              <span className={styles.tagDot}></span>
              ADOÇÃO
            </span>
            <h2 className={styles.sectionTitleLight}>
              Pets esperando por você
            </h2>
            <p className={styles.sectionSubtitleLight}>
              Encontre seu novo melhor amigo e dê um lar cheio de amor.
            </p>

            <div className={styles.petsGrid}>
              {pets.map((pet) => (
                <div key={pet.id} className={styles.petCard}>
                  <div className={styles.petImgWrapper}>
                    <img
                      src={pet.img}
                      alt={pet.nome}
                      className={styles.petImg}
                    />
                    <span className={styles.petBadge}>{pet.status}</span>
                  </div>
                  <div className={styles.petInfo}>
                    <strong className={styles.petNome}>{pet.nome}</strong>
                    <div className={styles.petMeta}>
                      <span>{pet.idade}</span>
                      <span className={styles.petMetaDot}>•</span>
                      <span>{pet.cidade}</span>
                    </div>
                    <button className={styles.btnAdotar}>Quero adotar</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/*  SEÇÃO: ADESTRAMENTO  */}
        <section className={styles.adestSection}>
          <div className={styles.sectionInner}>
            <span className={styles.sectionTag}>
              <span className={styles.tagDot}></span>
              ADESTRAMENTO
            </span>
            <h2 className={styles.sectionTitle}>Dicas de adestramento</h2>
            <p className={styles.sectionSubtitle}>
              Passos e orientações para educar seu pet com respeito e carinho.
            </p>

            <div className={styles.adestGrid}>
              {/* Coluna esquerda */}
              <div className={styles.adestCard}>
                <div className={styles.adestCardHeader}>
                  <img
                    src={iconePata2}
                    alt="Pata"
                    className={styles.adestCardIconImg2}
                  />
                  <strong className={styles.adestCardTitle}>
                    Passos fundamentais
                  </strong>
                </div>
                <ol className={styles.adestList}>
                  {passosAdestramento.map((p) => (
                    <li key={p.num} className={styles.adestItem}>
                      <span className={styles.adestNum}>{p.num}</span>
                      <div>
                        <strong className={styles.adestItemTitle}>
                          {p.titulo}
                        </strong>
                        <p className={styles.adestItemDesc}>{p.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Coluna direita */}
              <div className={styles.adestCard}>
                <div className={styles.adestCardHeader}>
                  <img
                    src={iconeLampada}
                    alt="Lâmpada"
                    className={styles.adestCardIconImg2}
                  />
                  <strong className={styles.adestCardTitle}>
                    Dicas de especialistas
                  </strong>
                </div>
                <ol className={styles.adestList}>
                  {dicasEspecialistas.map((d) => (
                    <li key={d.num} className={styles.adestItem}>
                      <span className={styles.adestNum}>{d.num}</span>
                      <div>
                        <strong className={styles.adestItemTitle}>
                          {d.titulo}
                        </strong>
                        <p className={styles.adestItemDesc}>{d.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className={styles.adestHighlight}>
                  O adestramento deve ser constante e, se necessário,
                  acompanhado por um profissional para situações mais complexas.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*  SEÇÃO: REDE / CTA  */}
        <section className={styles.redeSection}>
          <div className={styles.sectionInner}>
            <span className={styles.sectionTag}>
              <span className={styles.tagDot}></span>
              TORNE-SE PARCEIRO
            </span>
            <h2 className={styles.redeTitulo}>
              Faça parte da{" "}
              <span className={styles.redeDestaque}>nossa rede</span>
            </h2>
            <p className={styles.redeSubtitulo}>
              Cadastre seu animal, ONG ou clínica e alcance quem precisa de
              você.
            </p>

            <div className={styles.redeCards}>
              <div className={styles.redeCard}>
                <div className={styles.iconWrapper}>
                  <img
                    src={iconeCachorro}
                    alt="Cachorro"
                    className={styles.redeCardIconImg}
                  />
                </div>
                <strong className={styles.redeCardTitle}>
                  Cadastrar animal para adoção
                </strong>
                <p className={styles.redeCardDesc}>
                  Publique seu pet e ajude-o a encontrar um lar responsável.
                </p>
                <button className={styles.btnRede}>Cadastrar agora</button>
              </div>
              <div className={styles.redeCard}>
                <div className={styles.iconWrapper}>
                  <img
                    src={iconeCasa}
                    alt="Casa"
                    className={styles.redeCardIconImg}
                  />
                </div>
                <strong className={styles.redeCardTitle}>
                  Cadastrar minha ONG
                </strong>
                <p className={styles.redeCardDesc}>
                  Amplie sua visibilidade e receba apoio de mais pessoas.{" "}
                </p>
                <button className={styles.btnRede}>Cadastrar ONG</button>
              </div>
              <div className={styles.redeCard}>
                <div className={styles.iconWrapper}>
                  <img
                    src={iconePata}
                    alt="Pata"
                    className={styles.redeCardIconImg}
                  />
                </div>
                <strong className={styles.redeCardTitle}>
                  Sou veterinário
                </strong>
                <p className={styles.redeCardDesc}>
                  Conecte-se a tutores que precisam de atendimento.{" "}
                </p>
                <button className={styles.btnRede}>Quero ser parceiro</button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
