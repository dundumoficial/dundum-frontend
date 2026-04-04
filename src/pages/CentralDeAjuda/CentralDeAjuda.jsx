import { useState } from "react";
import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./CentralDeAjuda.module.css";

import iconeBalao from "../../assets/img/centraldeajuda/icon-balao.svg";
import iconeChave from "../../assets/img/centraldeajuda/icon-chave.svg";
import iconeCoracao from "../../assets/img/centraldeajuda/icon-coracao.svg";
import iconeEmail from "../../assets/img/centraldeajuda/icon-email.svg";
import iconeFAQ from "../../assets/img/centraldeajuda/icon-faq.svg";
import iconeForm from "../../assets/img/centraldeajuda/icon-formulario.svg";
import iconeLampada from "../../assets/img/centraldeajuda/icon-lampada.svg";
import iconeRobo from "../../assets/img/centraldeajuda/icon-robo.svg";
import iconeSinal from "../../assets/img/centraldeajuda/icon-sinal.svg";
import iconeTelefone from "../../assets/img/centraldeajuda/icon-telefone.svg";

function scrollSuave(e, href) {
  e.preventDefault();
  const id = href.replace("#", "");
  const elemento = document.getElementById(id);
  if (!elemento) return;

  const headerAltura = document.querySelector("header")?.offsetHeight ?? 80;
  const topo =
    elemento.getBoundingClientRect().top + window.scrollY - headerAltura - 24;

  window.scrollTo({ top: topo, behavior: "smooth" });
}

const categorias = [
  { icone: iconeSinal, label: "Uso da Coleira", href: "#uso-da-coleira" },
  { icone: iconeChave, label: "Suporte Técnico", href: "#suporte-tecnico" },
  { icone: iconeCoracao, label: "Saúde do Pet", href: "#duvidas-pet" },
  { icone: iconeFAQ, label: "FAQ Geral", href: "#perguntas-frequentes" },
  { icone: iconeBalao, label: "Fale com a Gente", href: "#fale-conosco" },
];

const usoColeira = [
  {
    num: "01",
    titulo: "Como conectar a coleira?",
    texto:
      "Ligue o dispositivo e abra o aplicativo. Selecione 'Adicionar coleira' e escaneie o QR Code ou digite o número da coleira. Ela será vinculada ao seu pet automaticamente.",
  },
  {
    num: "02",
    titulo: "Como carregar a coleira?",
    texto:
      "Utilize o cabo USB fornecido com o dispositivo. Conecte na porta de carregamento e aguarde o indicador de bateria atingir 100% no aplicativo.",
  },
  {
    num: "03",
    titulo: "Como ver os dados do meu pet?",
    texto:
      "Acesse o painel principal do aplicativo. Lá você encontrará gráficos de batimentos cardíacos, atividade física, temperatura e tempo de sono.",
  },
];

const suporteTecnico = [
  {
    titulo: "A COLEIRA NÃO ESTÁ CONECTADA",
    texto:
      "Verifique se a coleira está ligada e com bateria. Certifique-se de que o Bluetooth ou a conexão com internet está ativo no seu celular. Caso o problema continue, tente reiniciar a coleira.",
  },
  {
    titulo: "A COLEIRA ESTÁ ENVIANDO DADOS",
    texto:
      "Isso pode acontecer se a bateria estiver baixa ou se a conexão estiver instável. Recarregue a coleira e verifique se o aplicativo está atualizado.",
  },
  {
    titulo: "A BATERIA ESTÁ ACABANDO MUITO RÁPIDO",
    texto:
      "O consumo pode variar dependendo da frequência de coleta de dados. Verifique nas configurações do aplicativo se o intervalo de coleta está muito curto.",
  },
];

const duvidasPet = [
  {
    pergunta: "Meu pet está estressado?",
    resposta:
      "De acordo com os dados coletados, seu pet pode apresentar aumento nos batimentos cardíacos e atividade física nas últimas horas. Isso pode indicar estresse ou agitação. Observe o comportamento do pet e, se necessário, consulte um veterinário.",
  },
  {
    pergunta: "Meu pet está dormindo bem?",
    resposta:
      "A plataforma calcula a média de horas de sono por noite e indica se o valor está dentro do padrão esperado para a espécie do seu pet.",
  },
  {
    pergunta: "O que significa a emoção 'estressado'?",
    resposta:
      "A emoção 'estressado' é identificada quando o sistema detecta padrões de batimentos cardíacos elevados combinados com pouca movimentação ou agitação incomum.",
  },
  {
    pergunta: "A coleira pode ajudar a detectar problemas de saúde?",
    resposta:
      "A coleira não substitui um veterinário, mas pode identificar mudanças incomuns nos sinais vitais, ajudando o tutor a perceber possíveis problemas mais cedo.",
  },
];

const dicasCuidados = [
  {
    titulo: "Quantas horas um cachorro deve dormir?",
    texto:
      "Cães adultos dormem entre 12 e 14 horas por dia. Filhotes podem dormir até 18-20 horas. Se o seu pet estiver dormindo muito além disso, consulte um veterinário.",
  },
  {
    titulo: "Quantas vezes um cachorro deve comer por dia?",
    texto:
      "Filhotes entre 2 e 6 meses devem comer 3 a 4 vezes por dia. Cães adultos geralmente comem 2 vezes ao dia. Siga as orientações do veterinário para a quantidade ideal.",
  },
  {
    titulo: "Como são gerados os relatórios da coleira semanais?",
    texto:
      "Os relatórios são gerados com base nos dados coletados pela coleira durante a semana. Eles são processados e disponibilizados no aplicativo todo domingo à meia-noite.",
  },
];

const perguntasFrequentes = [
  {
    pergunta: "Quanto dura a bateria?",
    resposta:
      "A bateria pode durar entre 15 e 30 dias, dependendo da frequência de coleta de dados e do uso da coleira. A plataforma também mostra o nível de bateria em tempo real.",
  },
  {
    pergunta: "A coleira é resistente à água?",
    resposta:
      "Sim. A coleira foi projetada para resistir até 30 minutos debaixo d'água com 1 metro de profundidade. No entanto, não é recomendável submergir totalmente o dispositivo por longos períodos.",
  },
  {
    pergunta: "Onde vejo o código da coleira?",
    resposta:
      "Na parte de trás do módulo aparece o código da coleira.",
  },
  {
    pergunta: "Onde vejo o código QR da coleira?",
    resposta:
      "Na parte de trás do módulo aparece o código da coleira.",
  },
  {
    pergunta: "Quais dados de saúde a coleira monitora?",
    resposta:
      "A coleira monitora diversos indicadores, como: Batimentos cardíacos. Temperatura corporal. Quantidade de passos. Tempo de sono. Emoções estimadas pela inteligência artificial",
  },
  {
    pergunta: "Como a IA identifica as emoções do pet?",
    resposta:
      "NA IA analisa padrões de batimentos cardíacos, movimento, temperatura e atividade para identificar possíveis estados emocionais, como relaxamento,  estresse ou animação.",
  },
  {
    pergunta: "Com que frequência os dados são atualizados?",
    resposta:
      "Os sensores coletam dados aproximadamente a cada 10 minutos, permitindo acompanhar o comportamento e a saúde do pet ao longo do dia.",
  },
  {
    pergunta: "Posso conectar mais de uma coleira na mesma conta?",
    resposta:
      "Sim! Você pode adicionar vários pets na mesma conta, cada um com sua própria coleira e histórico de dados.",
  },
  {
    pergunta: "Posso conectar mais de um pet na mesma coleira?",
    resposta:
      "Não. Cada coleira é associada a um único pet, garantindo que os dados de saúde e comportamento sejam registrados corretamente.",
  },
  {
    pergunta: "Meus dados e os do meu pet estão seguros?",
    resposta:
      "Sim. O sistema utiliza criptografia e armazenamento seguro, garantindo a proteção das informações dos usuários e dos pets.",
  },
];

const canaisAtendimento = [
  {
    icone: iconeRobo,
    titulo: "Chatbot",
    texto:
      "Tire dúvidas sobre uso da coleira, bateria e muito mais. O nosso agente inteligente está disponível para ajudar a qualquer hora.",
    link: "Acessar chat",
  },
  {
    icone: iconeEmail,
    titulo: "E-mail",
    texto:
      "O nosso e-mail dedicado está disponível para atendimento com até 24 horas úteis.",
    link: "oficialdundum@gmail.com.br →",
  },
  {
    icone: iconeTelefone,
    titulo: "Telefone",
    texto:
      "Fale diretamente com um dos nossos especialistas em pets. Disponível em horário especial.",
    link: "(11) 4002-8922 →",
  },
  {
    icone: iconeForm,
    titulo: "Formulário",
    texto:
      "Preencha o formulário de contato e nossa equipe te responderá em breve.",
    link: "Acessar formulário",
  },
];

function AccordionItem({ pergunta, resposta }) {
  const [aberto, setAberto] = useState(false);
  return (
    <div
      className={`${styles.accordionItem} ${aberto ? styles.accordionAberto : ""}`}
      onClick={() => setAberto(!aberto)}
    >
      <div className={styles.accordionHeader}>
        <span className={styles.accordionPergunta}>{pergunta}</span>
        <span className={styles.accordionIcone}>{aberto ? "−" : "+"}</span>
      </div>
      {aberto && (
        <div className={styles.accordionConteudo}>
          <p>{resposta}</p>
        </div>
      )}
    </div>
  );
}

export default function CentralDeAjuda() {
  return (
    <>
      <Header />

      <main className={styles.container}>
        {/* HERO */}
        <section className={styles.hero}>
          <p className={styles.heroLabel}>CENTRAL DE AJUDA</p>
          <h1 className={styles.heroTitulo}>
            Como podemos{" "}
            <span className={styles.heroDestaque}>
              <br />
              ajudar você?
            </span>
          </h1>
          <p className={styles.heroSubtitulo}>
            Encontre respostas rápidas sobre o seu coleira inteligente, dados do
            seu pet e muito mais.
          </p>

          <div className={styles.categoriasGrid}>
            {categorias.map((cat, i) => (
              <a
                key={i}
                href={cat.href}
                className={styles.categoriaCard}
                onClick={(e) => scrollSuave(e, cat.href)}
              >
                <img
                  src={cat.icone}
                  alt={cat.label}
                  className={styles.categoriaIcone}
                />
                <span className={styles.categoriaLabel}>{cat.label}</span>
              </a>
            ))}
          </div>
        </section>

        {/* USO DA COLEIRA */}
        <section id="uso-da-coleira" className={styles.secao}>
          <div className={styles.secaoTituloWrapper}>
            <img src={iconeSinal} alt="Ícone branco de um sinal de rádio ou Wi-Fi, composto por um pequeno círculo sólido na base e três arcos concêntricos que aumentam de tamanho para cima." className={styles.secaoIcone} />
            <h2 className={styles.secaoTitulo}>Uso da Coleira</h2>
          </div>

          <div className={styles.usoGrid}>
            {usoColeira.map((item) => (
              <div key={item.num} className={styles.usoCard}>
                <span className={styles.usoNumero}>{item.num}</span>
                <h3 className={styles.usoCardTitulo}>{item.titulo}</h3>
                <p className={styles.usoCardTexto}>{item.texto}</p>
              </div>
            ))}
          </div>
        </section>

        {/*SUPORTE TÉCNICO */}
        <section id="suporte-tecnico" className={styles.secaoGradiente}>
          <div className={styles.secaoInterna}>
            <div className={styles.secaoTituloWrapper}>
              <img src={iconeChave} alt="Ícone branco de uma chave de boca (ferramenta) posicionada diagonalmente sobre um fundo preto." className={styles.secaoIcone} />
              <h2 className={styles.secaoTituloClaro}>Suporte Técnico</h2>
            </div>

            <div className={styles.suporteGrid}>
              {suporteTecnico.map((item, i) => (
                <div key={i} className={styles.suporteCard}>
                  <h3 className={styles.suporteCardTitulo}>{item.titulo}</h3>
                  <p className={styles.suporteCardTexto}>{item.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* DÚVIDAS SOBRE O PET */}
        <section id="duvidas-pet" className={styles.secao}>
          <div className={styles.secaoTituloWrapper}>
            <img src={iconeCoracao} alt="Ícone branco de um coração com o desenho vazado de uma pata de animal no centro, sobre um fundo preto." className={styles.secaoIcone} />
            <h2 className={styles.secaoTitulo}>Dúvidas sobre o Pet</h2>
          </div>

          <div className={styles.accordionLista}>
            {duvidasPet.map((item, i) => (
              <AccordionItem
                key={i}
                pergunta={item.pergunta}
                resposta={item.resposta}
              />
            ))}
          </div>
        </section>

        {/* DICAS DE CUIDADOS */}
        <section className={styles.secaoGradiente}>
          <div className={styles.secaoInterna}>
            <div className={styles.secaoTituloWrapper}>
              <img src={iconeLampada} alt="Ícone branco de uma lâmpada de filamento, com traços simples representando o bulbo e a base rosqueável." className={styles.secaoIcone} />
              <h2 className={styles.secaoTituloClaro}>
                Dicas de Cuidados com Pets
              </h2>
            </div>

            <div className={styles.dicasGrid}>
              {dicasCuidados.map((dica, i) => (
                <div key={i} className={styles.dicaCard}>
                  <h3 className={styles.dicaCardTitulo}>{dica.titulo}</h3>
                  <p className={styles.dicaCardTexto}>{dica.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PERGUNTAS FREQUENTES */}
        <section id="perguntas-frequentes" className={styles.secao}>
          <div className={styles.secaoTituloWrapper}>
            <img src={iconeFAQ} alt="Ícone branco de um balão de fala com um ponto de interrogação no centro." className={styles.secaoIcone} />
            <h2 className={styles.secaoTitulo}>Perguntas Frequentes</h2>
          </div>

          <div className={styles.accordionLista}>
            {perguntasFrequentes.map((item, i) => (
              <AccordionItem
                key={i}
                pergunta={item.pergunta}
                resposta={item.resposta}
              />
            ))}
          </div>
        </section>

        {/* FALE COM A GENTE */}
        <section id="fale-conosco" className={styles.faleConosco}>
          <div className={styles.faleConoscoInterna}>
            <p className={styles.faleConoscoLabel}>FALE COM A GENTE</p>
            <h2 className={styles.faleConoscoTitulo}>
              Ainda não encontrou o que procura?
            </h2>
            <p className={styles.faleConoscoSubtitulo}>
              Nossa equipe está pronta para te ajudar pelos canais abaixo.
            </p>

            <div className={styles.canaisGrid}>
              {canaisAtendimento.map((canal, i) => (
                <div key={i} className={styles.canalCard}>
                  <img
                    src={canal.icone}
                    alt={canal.titulo}
                    className={styles.canalIcone}
                  />
                  <h3 className={styles.canalTitulo}>{canal.titulo}</h3>
                  <p className={styles.canalTexto}>{canal.texto}</p>
                  <a href="#" className={styles.canalLink}>
                    {canal.link}
                  </a>
                </div>
              ))}
            </div>

            <div className={styles.horarios}>
              <div className={styles.horarioItem}>
                <span className={styles.horarioDia}>SEG – SEX</span>
                <span className={styles.horarioHora}>8h às 21h</span>
              </div>
              <div className={styles.horarioItem}>
                <span className={styles.horarioDia}>SÁBADOS</span>
                <span className={styles.horarioHora}>10h às 18h</span>
              </div>
              <div className={styles.horarioItem}>
                <span className={styles.horarioDia}>DOM E FERIADOS</span>
                <span className={styles.horarioHora}>12h às 16h</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}