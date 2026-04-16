import styles from "../Dashboard.module.css";

export default function Sidebar({
  aberto,
  onAbrir,
  onFechar,
  secao,
  onSecao,
  notifNaoLidas,
  onModal,
  bateria,
  pet,
  navItems,
  logosBranco,
  icones,
}) {
  return (
    <>
      <aside className={`${styles.aside} ${aberto ? styles.asideAberto : ""}`}>
        <div className={styles.asideLogo}>
          <img src={logosBranco} alt="DunDum" className={styles.logoImg} />
          <button
            className={styles.asideClose}
            onClick={onFechar}
            aria-label="Recolher menu"
          >
            <img src={icones.close} alt="Fechar" />
          </button>
        </div>

        {/* Botão abrir */}
        <button
          className={styles.asideOpen}
          onClick={onAbrir}
          aria-label="Abrir menu"
        >
          <img src={icones.menu} alt="Menu" />
        </button>

        {/* Pet */}
        <button className={styles.petCard} onClick={() => onModal("pet")}>
          <img src={pet.foto} alt={pet.nome} className={styles.petCardFoto} />
          <div>
            <p className={styles.petCardNome}>{pet.nome}</p>
            <p className={styles.petCardRaca}>{pet.raca}</p>
          </div>
          <span className={styles.petCardArrow}>›</span>
        </button>

        {/* Nav principal */}
        <p className={styles.navLabel}>PRINCIPAL</p>
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`${styles.navItem} ${secao === item.id ? styles.navItemAtivo : ""}`}
            onClick={() => {
              onSecao(item.id);
              onFechar();
            }}
          >
            <img src={item.icone} alt="" className={styles.navIcone} />
            <span className={styles.navLabelItem}>{item.label}</span>
          </button>
        ))}

        {/* Nav sistema */}
        <p className={styles.navLabel}>SISTEMA</p>
        <button
          className={styles.navItem}
          onClick={() => onModal("notificacoes")}
        >
          <img src={icones.notificacao} alt="" className={styles.navIcone} />
          <span className={styles.navLabelItem}>Notificações</span>
          {notifNaoLidas > 0 && (
            <span className={styles.navBadge}>{notifNaoLidas}</span>
          )}
        </button>
        <button
          className={styles.navItem}
          onClick={() => onModal("configuracoes")}
        >
          <img src={icones.configuracao} alt="" className={styles.navIcone} />
          <span className={styles.navLabelItem}>Configurações</span>
        </button>

        {/* Bateria */}
        <div className={styles.bateria}>
          <div className={styles.bateriaHeader}>
            <span>Bateria da coleira</span>
            <span className={styles.bateriaPct}>{bateria}%</span>
          </div>
          <div className={styles.bateriaBar}>
            <div
              className={styles.bateriaFill}
              style={{ width: `${bateria}%` }}
            />
          </div>
        </div>

        {/* Plano */}
        <button className={styles.planoCard} onClick={() => onModal("plano")}>
          <img src={icones.plano} alt="" className={styles.planoIcone} />
          <div>
            <p className={styles.planoNome}>Plano</p>
            <p className={styles.planoTipo}>Premium</p>
          </div>
          <span className={styles.petCardArrow}>›</span>
        </button>
      </aside>
    </>
  );
}
