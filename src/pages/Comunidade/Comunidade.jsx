import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./Comunidade.module.css";

// como importar imagens e icones:
import iconeCachorro from "../../assets/img/comunidade/icon-cachorro.svg";

export default function Comunidade() {
  return (
    <>
      <Header />

      {/* não use a tag diretamente para estilizar, sempre crie uma classe ou id. */}
      <main className={styles.container}>

        <h1 className={styles.exemploClasse}>COMUNIDADE</h1>

        {/* como exibir a imagem ou icone: */}
        <img className={styles.icone} id={styles.exemploId} src={iconeCachorro} alt="Ícone de cachorro" />
      </main>
      
      <Footer />
    </>
  );
}
