import { useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import styles from "./Dashboard.module.css";
import { useTema } from "../../contexts/ThemeContext.jsx";
import { useAuth } from "../../contexts/AuthContext.jsx";
import {
  useDashboard,
  DEFAULT_DATA,
  calcularPermissoes,
} from "../../hooks/useDashboard.js";

import logoBranco from "../../assets/img/logo-branco.webp";
import logoAzul from "../../assets/img/logo-azul.webp";
import petFoto from "../../assets/img/home/img1.webp";
import iconeConfiguracao from "../../assets/img/dashboard/icon-configuracao.svg";
import iconeCoracao from "../../assets/img/dashboard/icon-coracao.svg";
import iconeDashboard from "../../assets/img/dashboard/icon-dashboard.svg";
import iconeLocalizacao from "../../assets/img/dashboard/icon-localizacao.svg";
import iconeNotificacao from "../../assets/img/dashboard/icon-notificacao.svg";
import iconeNotificacaoBlue from "../../assets/img/dashboard/icon-notificacao-blue.svg";
import iconePlano from "../../assets/img/dashboard/icon-plano.svg";
import iconeRelatorio from "../../assets/img/dashboard/icon-relatorio.svg";
import iconeMenu from "../../assets/img/menu.svg";
import iconeClose from "../../assets/img/close.svg";

import Sidebar from "./components/sidebar.jsx";
import {
  SecaoSaude,
  SecaoLocalizacao,
  SecaoRelatorios,
} from "./components/sections.jsx";
import { ModalPerfil } from "../../modals/ModalPerfil/ModalPerfil.jsx";
import { ModalNotificacoes } from "../../modals/ModalNotificacoes/ModalNotificacoes.jsx";
import { ModalConfiguracoes } from "../../modals/ModalConfiguracoes/ModalConfiguracoes.jsx";
import { ModalPlano } from "../../modals/ModalPlano/ModalPlano.jsx";
import { ModalPet } from "../../modals/ModalPet/ModalPet.jsx";
import { ModalCompartilhar } from "../../modals/ModalCompartilhar/ModalCompartilhar.jsx";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icone: iconeDashboard },
  { id: "saude", label: "Saúde", icone: iconeCoracao },
  { id: "localizacao", label: "Localização", icone: iconeLocalizacao },
  { id: "relatorios", label: "Relatórios", icone: iconeRelatorio },
];

const ICONES = {
  menu: iconeMenu,
  close: iconeClose,
  notificacao: iconeNotificacao,
  configuracao: iconeConfiguracao,
  plano: iconePlano,
};

// skeleton de carregamento
function DashboardSkeleton() {
  return (
    <div
      className={styles.layout}
      aria-busy="true"
      aria-label="Carregando dashboard..."
    >
      <div className={styles.skeletonSidebar} />
      <div className={styles.conteudo}>
        <div className={styles.skeletonTopbar} />
        <div className={styles.skeletonGreeting} />
        <div className={styles.skeletonBanner} />
      </div>
    </div>
  );
}

// estado de erro
function ErrorState({ message }) {
  return (
    <div className={styles.errorState} role="alert">
      <p>{message || "Não foi possível carregar seus dados."}</p>
      <button
        onClick={() => window.location.reload()}
        className={styles.errorBtn}
      >
        Tentar novamente
      </button>
    </div>
  );
}

export default function Dashboard() {
  const { tema } = useTema();
  const { usuario: usuarioAuth } = useAuth();
  const [secao, setSecao] = useState("dashboard");
  const [menuAberto, setMenuAberto] = useState(true);
  const [modalAberto, setModalAberto] = useState(null);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [compartilharAberto, setCompartilharAberto] = useState(false);
  const perfilRef = useRef(null);

  const { data, loading, error, recarregar } = useDashboard();

  if (loading) return <DashboardSkeleton />;

  if (error)
    return <ErrorState message="Não foi possível carregar seus dados." />;

  const {
    usuario,
    plano: planoDashboard,
    pet,
    bateria,
    batimentos,
    respiracao,
    passos,
    sono,
    localizacao,
    notificacoes,
    relatorio,
  } = data;

  const plano = usuarioAuth?.plano ?? planoDashboard ?? "gratuito";

  const permissoes = calcularPermissoes(plano);

  const iniciais =
    usuarioAuth?.iniciais ??
    usuario?.iniciais ??
    usuario?.nome?.charAt(0).toUpperCase() ??
    "?";
  const usuarioComIniciais = {
    ...usuario,
    iniciais,
    foto: usuarioAuth?.foto ?? usuario?.foto ?? null,
  };

  const naoLidas = notificacoes?.filter((n) => !n.lido).length ?? 0;
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const petComFoto = pet ? { ...pet, foto: petFoto } : null;

  const renderConteudo = () => {
    const props = {
      batimentos,
      respiracao,
      passos,
      sono,
      petPos: localizacao,
      petNome: pet?.nome ?? "—",
      permissoes,
    };

    if (secao === "saude") return <SecaoSaude {...props} />;
    if (secao === "localizacao")
      return (
        <SecaoLocalizacao petPos={localizacao} petNome={pet?.nome ?? "—"} />
      );
    if (secao === "relatorios")
      return (
        <SecaoRelatorios
          relatorio={relatorio}
          notificacoes={notificacoes}
          onCompartilhar={() => setCompartilharAberto(true)}
          permissoes={permissoes}
        />
      );

    return (
      <>
        <SecaoSaude {...props} />
        <SecaoLocalizacao petPos={localizacao} petNome={pet?.nome ?? "—"} />
        <SecaoRelatorios
          relatorio={relatorio}
          notificacoes={notificacoes}
          onCompartilhar={() => setCompartilharAberto(true)}
          permissoes={permissoes}
        />
      </>
    );
  };

  return (
    <div className={styles.layout} data-theme={tema}>
      <Sidebar
        aberto={menuAberto}
        onAbrir={() => setMenuAberto(true)}
        onFechar={() => setMenuAberto(false)}
        secao={secao}
        onSecao={setSecao}
        notifNaoLidas={naoLidas}
        onModal={setModalAberto}
        plano={plano}
        bateria={bateria}
        pet={petComFoto}
        navItems={NAV_ITEMS}
        logosBranco={logoBranco}
        icones={ICONES}
      />

      {menuAberto && (
        <div
          className={styles.overlayMobile}
          onClick={() => setMenuAberto(false)}
          aria-hidden="true"
        />
      )}

      <div className={styles.conteudo}>
        {/* Topbar mobile */}
        <header className={styles.topbar}>
          <div className={styles.topbarEsquerda}>
            <button
              className={styles.hamburger}
              onClick={() => setMenuAberto(true)}
              aria-label="Abrir menu"
            >
              <img src={iconeMenu} alt="Menu" aria-hidden="true" />
            </button>
            <img
              src={tema === "escuro" ? logoBranco : logoAzul}
              alt="Logo DunDum"
              className={styles.logoImgMobile}
            />
          </div>
          <div className={styles.topbarDireita}>
            <button
              className={styles.notifIcone}
              onClick={() => setModalAberto("notificacoes")}
              aria-label={`Notificações${naoLidas > 0 ? `, ${naoLidas} não lidas` : ""}`}
            >
              <img
                src={
                  tema === "escuro" ? iconeNotificacao : iconeNotificacaoBlue
                }
                alt="Ícone de Notificações"
                aria-hidden="true"
              />
              {naoLidas > 0 && (
                <span className={styles.notifDot} aria-hidden="true" />
              )}
            </button>
            <div className={styles.avatarWrap} ref={perfilRef}>
              <button
                className={styles.avatar}
                onClick={() => setPerfilAberto((v) => !v)}
                aria-label="Perfil do usuário"
              >
                {usuarioComIniciais.foto ? (
                  <img
                    src={usuarioComIniciais.foto}
                    alt={`Foto de ${usuario?.nome ?? "usuário"}`}
                    className={styles.avatarFoto}
                  />
                ) : (
                  iniciais
                )}
              </button>
            </div>
          </div>
        </header>
        {/* Greeting */}
        <div className={styles.greeting}>
          <div>
            <h1 className={styles.greetingNome}>Olá, {usuario?.nome}</h1>
            <p className={styles.greetingData}>
              {hoje.charAt(0).toUpperCase() + hoje.slice(1)} · Última
              atualização: agora
            </p>
          </div>
          <div className={styles.greetingDireita}>
            <button
              className={styles.notifIcone}
              onClick={() => setModalAberto("notificacoes")}
              aria-label={`Notificações${naoLidas > 0 ? `, ${naoLidas} não lidas` : ""}`}
            >
              <img
                src={
                  tema === "escuro" ? iconeNotificacao : iconeNotificacaoBlue
                }
                alt="Ícone de Notificações"
                aria-hidden="true"
              />
              {naoLidas > 0 && (
                <span className={styles.notifDot} aria-hidden="true" />
              )}
            </button>
            <div className={styles.avatarWrap} ref={perfilRef}>
              <button
                className={styles.avatar}
                onClick={() => setPerfilAberto((v) => !v)}
                aria-label="Perfil do usuário"
              >
                {usuarioComIniciais.foto ? (
                  <img
                    src={usuarioComIniciais.foto}
                    alt={`Foto de ${usuario?.nome ?? "usuário"}`}
                    className={styles.avatarFoto}
                  />
                ) : (
                  iniciais
                )}
              </button>
            </div>
          </div>
        </div>
        {/* Banner do pet */}
        {pet ? (
          <div className={styles.petBanner}>
            <img
              src={petFoto}
              alt={pet.nome}
              className={styles.petBannerFoto}
              loading="lazy"
            />
            <div className={styles.petBannerInfo}>
              <h2 className={styles.petBannerNome}>{pet.nome}</h2>
              <div className={styles.petBannerTags}>
                <span>{pet.idade}</span>
                <span>{pet.raca}</span>
                <span>{pet.sexo === "Macho" ? "♂ Macho" : "♀ Fêmea"}</span>
                <span>{pet.peso}</span>
                <span>Coleira {pet.coleira}</span>
              </div>
            </div>
            <span
              className={`${styles.petBannerStatus} ${pet.ativo ? styles.statusAtivo : ""}`}
            >
              {pet.ativo ? "● Ativo" : "○ Inativo"}
            </span>
          </div>
        ) : (
          <div className={styles.petBanner}>
            <div className={styles.petBannerInfo}>
              <h2 className={styles.petBannerNome}>
                Nenhum cachorro cadastrado
              </h2>
              <p style={{ color: "var(--color-white)", fontSize: 13 }}>
                Adicione um cachorro para começar a monitorar.
              </p>
            </div>
          </div>
        )}
        <div className={styles.secoes}>{renderConteudo()}</div>
        <footer className={styles.footer}>
          Copyright © 2026 DunDum - Todos os direitos reservados
        </footer>
      </div>

      {/* MODAIS */}
      {perfilAberto && (
        <ModalPerfil
          usuario={usuarioComIniciais}
          onClose={() => setPerfilAberto(false)}
        />
      )}
      {modalAberto === "pet" && (
        <ModalPet pet={petComFoto} onClose={() => setModalAberto(null)} />
      )}
      {modalAberto === "notificacoes" && (
        <ModalNotificacoes
          notificacoes={notificacoes}
          onClose={() => setModalAberto(null)}
        />
      )}
      {modalAberto === "configuracoes" && (
        <ModalConfiguracoes
          pet={pet}
          onClose={() => setModalAberto(null)}
          permissoes={permissoes}
        />
      )}
      {modalAberto === "plano" && (
        <ModalPlano
          onClose={() => setModalAberto(null)}
          onPlanoAlterado={() => {
            setModalAberto(null);
            recarregar();
          }}
        />
      )}
      {compartilharAberto && (
        <ModalCompartilhar
          relatorio={relatorio}
          onClose={() => setCompartilharAberto(false)}
        />
      )}
    </div>
  );
}
