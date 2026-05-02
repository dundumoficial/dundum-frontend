import { useState, useRef } from "react";
import "leaflet/dist/leaflet.css";
import styles from "./Dashboard.module.css";
import { useTema } from "./ThemeContext.jsx";

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
import { ModalPerfil } from "../../modals/ModalPerfil/ModalPerfil.jsx";
import { ModalNotificacoes } from "../../modals/ModalNotificacoes/ModalNotificacoes.jsx";
import { ModalConfiguracoes } from "../../modals/ModalConfiguracoes/ModalConfiguracoes.jsx";
import { ModalPlano } from "../../modals/ModalPlano/ModalPlano.jsx";
import { ModalPet } from "../../modals/ModalPet/ModalPet.jsx";
import { ModalCompartilhar } from "../../modals/ModalCompartilhar/ModalCompartilhar.jsx";

import {
  SecaoSaude,
  SecaoLocalizacao,
  SecaoRelatorios,
} from "./components/sections.jsx";

import {
  useUsuario,
  usePet,
  useBatimentos,
  useRespiracao,
  usePassos,
  useSono,
  useRelatorio,
  useNotificacoes,
  useEstadoEmocional,
  useBateria,
  usePetPos,
} from "../../hooks/useDashboard.js";

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

export default function Dashboard() {
  const { tema } = useTema();
  const [secao, setSecao] = useState("dashboard");
  const [menuAberto, setMenuAberto] = useState(true);
  const [modalAberto, setModalAberto] = useState(null);
  const [perfilAberto, setPerfilAberto] = useState(false);
  const [compartilharAberto, setCompartilharAberto] = useState(false);
  const perfilRef = useRef(null);

  const { data: usuario } = useUsuario();
  const { data: pet } = usePet();
  const { data: batimentos } = useBatimentos();
  const { data: respiracao } = useRespiracao();
  const { data: passos } = usePassos();
  const { data: sono } = useSono();
  const { data: relatorio } = useRelatorio();
  const { data: notificacoes } = useNotificacoes();
  const { data: emocional } = useEstadoEmocional();
  const { data: bateria } = useBateria();
  const { data: petPos } = usePetPos();

  if (!usuario || !pet || !batimentos) return null;

  const naoLidas = notificacoes?.filter((n) => !n.lido).length ?? 0;
  const hoje = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const petComFoto = { ...pet, foto: petFoto };

  const renderConteudo = () => {
    const props = {
      batimentos,
      respiracao,
      passos,
      sono,
      petPos,
      petNome: pet.nome,
    };

    if (secao === "saude") return <SecaoSaude {...props} />;
    if (secao === "localizacao")
      return <SecaoLocalizacao petPos={petPos} petNome={pet.nome} />;
    if (secao === "relatorios")
      return (
        <SecaoRelatorios
          relatorio={relatorio}
          estadoEmocional={emocional}
          notificacoes={notificacoes}
          onCompartilhar={() => setCompartilharAberto(true)}
        />
      );

    return (
      <>
        <SecaoSaude {...props} />
        <SecaoLocalizacao petPos={petPos} petNome={pet.nome} />
        <SecaoRelatorios
          relatorio={relatorio}
          estadoEmocional={emocional}
          notificacoes={notificacoes}
          onCompartilhar={() => setCompartilharAberto(true)}
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
        />
      )}

      <div className={styles.conteudo}>
        {/* Topbar mobile */}
        <header className={styles.topbar}>
          <div className={styles.topbarEsquerda}>
            <button
              className={styles.hamburger}
              onClick={() => setMenuAberto(true)}
            >
              <img src={iconeMenu} alt="Menu" />
            </button>
            <img
              src={tema === "escuro" ? logoBranco : logoAzul}
              alt="DunDum"
              className={styles.logoImgMobile}
            />
          </div>
          <div className={styles.topbarDireita}>
            <button className={styles.notifIcone}>
              <img
                src={
                  tema === "escuro" ? iconeNotificacao : iconeNotificacaoBlue
                }
                onClick={() => setModalAberto("notificacoes")}
                alt="Notificações"
              />
              {naoLidas > 0 && <span className={styles.notifDot} />}
            </button>
            <div className={styles.avatarWrap} ref={perfilRef}>
              <button
                className={styles.avatar}
                onClick={() => setPerfilAberto((v) => !v)}
              >
                {usuario.iniciais}
              </button>
            </div>
          </div>
        </header>

        {/* Greeting */}
        <div className={styles.greeting}>
          <div>
            <h1 className={styles.greetingNome}>Olá, {usuario.nome}</h1>
            <p className={styles.greetingData}>
              {hoje.charAt(0).toUpperCase() + hoje.slice(1)} · Última
              atualização: agora
            </p>
          </div>
          <div className={styles.greetingDireita}>
            <button className={styles.notifIcone}>
              <img
                src={
                  tema === "escuro" ? iconeNotificacao : iconeNotificacaoBlue
                }
                onClick={() => setModalAberto("notificacoes")}
                alt="Notificações"
              />
              {naoLidas > 0 && <span className={styles.notifDot} />}
            </button>
            <div className={styles.avatarWrap} ref={perfilRef}>
              <button
                className={styles.avatar}
                onClick={() => setPerfilAberto((v) => !v)}
              >
                {usuario.iniciais}
              </button>
            </div>
          </div>
        </div>

        {/* Banner do pet */}
        <div className={styles.petBanner}>
          <img src={petFoto} alt={pet.nome} className={styles.petBannerFoto} />
          <div className={styles.petBannerInfo}>
            <h2 className={styles.petBannerNome}>{pet.nome}</h2>
            <div className={styles.petBannerTags}>
              <span>{pet.idade}</span>
              <span>{pet.raca}</span>
              <span>♂ {pet.sexo}</span>
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

        <div className={styles.secoes}>{renderConteudo()}</div>

        <footer className={styles.footer}>
          Copyright © 2026 DunDum - Todos os direitos reservados
        </footer>
      </div>

      {/* MODAIS */}
      {perfilAberto && (
        <ModalPerfil usuario={usuario} onClose={() => setPerfilAberto(false)} />
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
        <ModalConfiguracoes onClose={() => setModalAberto(null)} />
      )}
      {modalAberto === "plano" && (
        <ModalPlano onClose={() => setModalAberto(null)} />
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
