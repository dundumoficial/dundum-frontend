// TermosCondicoes.jsx
import { useState, useEffect } from "react";
import styles from "./TermosCondicoes.module.css";
import Footer from "../../components/Footer/Footer";
import logo from "../../assets/img/logo-branco.webp";

/* ─── DATA ─── */
const SECTIONS = [
  {
    blockId: "termos",
    blockTag: "Termos de Uso",
    blockTitle: "Termos e Condições de Uso",
    items: [
      {
        id: "aceitacao",
        num: "1",
        title: "Aceitação dos Termos",
        content: [
          {
            type: "p",
            text: "Ao acessar e utilizar este site, você concorda com os presentes Termos e Condições. Caso não concorde, não utilize nossos serviços.",
          },
        ],
      },
      {
        id: "servico",
        num: "2",
        title: "Sobre o Serviço",
        content: [
          {
            type: "p",
            text: "Nosso site oferece a venda de coleiras inteligentes para animais de estimação, capazes de monitorar batimentos cardíacos, localização via GPS e outros dados relevantes.",
          },
        ],
      },
      {
        id: "cadastro",
        num: "3",
        title: "Cadastro do Usuário",
        content: [
          {
            type: "p",
            text: "Para acessar determinadas funcionalidades, o usuário deverá realizar cadastro, fornecendo informações verdadeiras, completas e atualizadas.",
          },
        ],
      },
      {
        id: "uso-produto",
        num: "4",
        title: "Uso do Produto",
        content: [
          {
            type: "p",
            text: "A coleira deve ser utilizada conforme instruções fornecidas. Não nos responsabilizamos por uso inadequado ou danos decorrentes de mau uso.",
          },
        ],
      },
      {
        id: "responsabilidade",
        num: "5",
        title: "Limitação de Responsabilidade",
        content: [
          {
            type: "p",
            text: "Os dados fornecidos pela coleira são informativos e não substituem avaliação veterinária profissional.",
          },
        ],
      },
      {
        id: "propriedade",
        num: "6",
        title: "Propriedade Intelectual",
        content: [
          {
            type: "p",
            text: "Todo o conteúdo do site é protegido por direitos autorais e não pode ser reproduzido sem autorização.",
          },
        ],
      },
      {
        id: "alteracoes-termos",
        num: "7",
        title: "Alterações",
        content: [
          {
            type: "p",
            text: "Podemos atualizar estes termos a qualquer momento, sendo responsabilidade do usuário revisá-los periodicamente.",
          },
        ],
      },
    ],
  },
  {
    blockId: "privacidade",
    blockTag: "Privacidade",
    blockTitle: "Política de Privacidade",
    items: [
      {
        id: "coleta",
        num: "1",
        title: "Coleta de Dados",
        content: [
          {
            type: "p",
            text: "Coletamos informações pessoais como nome, e-mail, localização e dados do pet, além de dados gerados pela coleira (como batimentos cardíacos e localização).",
          },
        ],
      },
      {
        id: "uso-dados",
        num: "2",
        title: "Uso das Informações",
        content: [
          { type: "p", text: "Os dados são utilizados para:" },
          {
            type: "ul",
            items: [
              "Fornecer e melhorar nossos serviços",
              "Monitoramento da saúde do animal",
              "Personalização da experiência do usuário",
            ],
          },
        ],
      },
      {
        id: "compartilhamento",
        num: "3",
        title: "Compartilhamento",
        content: [
          {
            type: "p",
            text: "Não vendemos dados pessoais. Podemos compartilhar informações com parceiros tecnológicos quando necessário para funcionamento do serviço.",
          },
        ],
      },
      {
        id: "armazenamento",
        num: "4",
        title: "Armazenamento",
        content: [
          {
            type: "p",
            text: "Os dados são armazenados de forma segura e protegida contra acessos não autorizados.",
          },
        ],
      },
      {
        id: "direitos",
        num: "5",
        title: "Direitos do Usuário",
        content: [
          {
            type: "p",
            text: "O usuário pode solicitar acesso, correção ou exclusão de seus dados a qualquer momento.",
          },
        ],
      },
    ],
  },
  {
    blockId: "cookies",
    blockTag: "Cookies",
    blockTitle: "Política de Cookies",
    items: [
      {
        id: "o-que-sao",
        num: "1",
        title: "O que são Cookies",
        content: [
          {
            type: "p",
            text: "Cookies são pequenos arquivos armazenados no dispositivo do usuário para melhorar a experiência de navegação.",
          },
        ],
      },
      {
        id: "como-utilizamos",
        num: "2",
        title: "Como utilizamos",
        content: [
          { type: "p", text: "Utilizamos cookies para:" },
          {
            type: "ul",
            items: [
              "Manter sessões ativas",
              "Analisar comportamento de navegação",
              "Personalizar conteúdo",
            ],
          },
        ],
      },
      {
        id: "gerenciamento",
        num: "3",
        title: "Gerenciamento",
        content: [
          {
            type: "p",
            text: "O usuário pode desativar cookies nas configurações do navegador.",
          },
        ],
      },
    ],
  },
  {
    blockId: "seguranca",
    blockTag: "Segurança",
    blockTitle: "Política de Segurança",
    items: [
      {
        id: "protecao",
        num: "1",
        title: "Proteção de Dados",
        content: [
          {
            type: "p",
            text: "Adotamos medidas técnicas e administrativas para proteger os dados dos usuários.",
          },
        ],
      },
      {
        id: "criptografia",
        num: "2",
        title: "Criptografia",
        content: [
          {
            type: "p",
            text: "Utilizamos protocolos de segurança para garantir a transmissão segura das informações.",
          },
        ],
      },
      {
        id: "acesso-restrito",
        num: "3",
        title: "Acesso Restrito",
        content: [
          {
            type: "p",
            text: "Somente pessoas autorizadas têm acesso aos dados, mediante controle rigoroso.",
          },
        ],
      },
      {
        id: "atualizacoes",
        num: "4",
        title: "Atualizações",
        content: [
          {
            type: "p",
            text: "Nossos sistemas são constantemente atualizados para garantir maior segurança.",
          },
        ],
      },
    ],
  },
];

/* ─── HELPERS ─── */
function RenderContent({ content }) {
  return content.map((block, i) => {
    if (block.type === "p") {
      return (
        <p key={i} className={styles.sectionText}>
          {block.text}
        </p>
      );
    }
    if (block.type === "ul") {
      return (
        <ul key={i} className={styles.sectionList}>
          {block.items.map((item, j) => (
            <li key={j} className={styles.sectionListItem}>
              <span className={styles.bullet} />
              {item}
            </li>
          ))}
        </ul>
      );
    }
    return null;
  });
}

/* ─── COMPONENT ─── */
export default function TermosCondicoes() {
  const [activeId, setActiveId] = useState("aceitacao");

  useEffect(() => {
    const allIds = SECTIONS.flatMap((s) => s.items.map((item) => item.id));
    const observers = [];

    allIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: "-15% 0px -70% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <div className={styles.root}>
        <div className={styles.page}>
          {/* ── HEADER ── */}
          <header className={styles.header}>
            <a href="/" className={styles.logo}>
              <img src={logo} className={styles.logo} />
            </a>
            <a href="/" className={styles.back}>
              <span className={styles.backArrow}>←</span>
              Voltar ao site
            </a>
          </header>

          {/* ── LAYOUT ── */}
          <div className={styles.layout}>
            {/* ── SIDEBAR ── */}
            <aside className={styles.sidebar}>
              <span className={styles.sidebarLabel}>Navegação</span>
              <nav className={styles.nav}>
                {SECTIONS.map((section) => (
                  <div key={section.blockId} className={styles.navGroup}>
                    <span className={styles.navGroupLabel}>
                      {section.blockTag}
                    </span>
                    {section.items.map((item) => (
                      <a
                        key={item.id}
                        href={`#${item.id}`}
                        className={
                          activeId === item.id
                            ? `${styles.navLink} ${styles.navLinkActive}`
                            : styles.navLink
                        }
                        onClick={(e) => {
                          e.preventDefault();
                          scrollTo(item.id);
                        }}
                      >
                        {item.num}. {item.title}
                      </a>
                    ))}
                  </div>
                ))}
              </nav>
            </aside>

            {/* ── MAIN ── */}
            <main className={styles.content}>
              <h1 className={styles.pageTitle}>
                Termos &amp;{" "}
                <span className={styles.pageTitleAccent}>Políticas</span>
              </h1>

              {SECTIONS.map((section, sIdx) => (
                <div key={section.blockId}>
                  <div className={styles.policyBlock} id={section.blockId}>
                    <div className={styles.blockHeader}>
                      <h2 className={styles.blockTitle}>
                        {section.blockTitle}
                      </h2>
                    </div>

                    {section.items.map((item, iIdx) => (
                      <div
                        key={item.id}
                        id={item.id}
                        className={
                          iIdx === section.items.length - 1
                            ? `${styles.section} ${styles.sectionLast}`
                            : styles.section
                        }
                      >
                        <h3 className={styles.sectionHeading}>
                          <span className={styles.sectionNum}>{item.num}</span>
                          {item.title}
                        </h3>
                        <RenderContent content={item.content} />
                      </div>
                    ))}
                  </div>

                  {sIdx < SECTIONS.length - 1 && (
                    <div className={styles.divider} />
                  )}
                </div>
              ))}

              {/* Contact */}
              <div className={styles.divider} />
              <div className={styles.contactBox}>
                <h3 className={styles.contactTitle}>Contato</h3>
                <p className={styles.contactText}>
                  Em caso de dúvidas sobre estas políticas, entre em contato
                  através dos nossos canais oficiais disponíveis no site.
                </p>
              </div>
            </main>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
