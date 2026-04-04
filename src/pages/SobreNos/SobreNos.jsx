import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./SobreNos.module.css";

// como importar imagens e icones:
import iconeGitHub from "../../assets/img/sobrenos/icon-github.svg";

export default function SobreNos() {
  return (
    <>
      <Header />

      {/* não use a tag diretamente para estilizar, sempre crie uma classe ou id. */}
      <main className={styles.container}>

        <h1 className={styles.exemploClasse}>SOBRE NÓS</h1>

        {/* como exibir a imagem ou icone: */}
        <img className={styles.icone} id={styles.exemploId} src={iconeGitHub} alt="Ícone do GitHub" />
      </main>

      <Footer />
    </>
  );
}
