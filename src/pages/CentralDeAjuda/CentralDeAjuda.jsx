import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./CentralDeAjuda.module.css";

// como importar imagens e icones:
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

export default function CentralDeAjuda() {
  return (
    <>
      <Header />
      
      {/* não use a tag diretamente para estilizar, sempre crie uma classe ou id. */}
      <main className={styles.container}>

        <h1 className={styles.exemploClasse}>CENTRAL DE AJUDA</h1>

        {/* como exibir a imagem ou icone: */}
        <img className={styles.icone} id={styles.exemploId} src={iconeBalao} alt="Ícone de balão de conversa" />
        <img className={styles.icone} src={iconeChave} alt="Ícone de chave" />
        <img className={styles.icone} src={iconeCoracao} alt="Ícone de coração" />
        <img className={styles.icone} src={iconeEmail} alt="Ícone de e-mail" />
        <img className={styles.icone} src={iconeFAQ} alt="Ícone de interrogação" />
        <img className={styles.icone} src={iconeForm} alt="Ícone de formulário" />
        <img className={styles.icone} src={iconeLampada} alt="Ícone de lâmpada" />
        <img className={styles.icone} src={iconeRobo} alt="Ícone de rôbo" />
        <img className={styles.icone} src={iconeSinal} alt="Ícone de sinal" />
        <img className={styles.icone} src={iconeTelefone} alt="Ícone de telefone" />
      </main>
      
      <Footer />
    </>
  );
}
