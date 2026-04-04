import Header from "../../components/Header/Header.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import styles from "./Produtos.module.css";

// como importar imagens e icones:
import imagem from "../../assets/img/produtos/img1.png";

export default function Produtos() {
  return (
    <>
      <Header />

      {/* não use a tag diretamente para estilizar, sempre crie uma classe ou id. */}
      <main className={styles.container}>

        <h1 className={styles.exemploClasse}>PRODUTOS</h1>

        {/* como exibir a imagem ou icone: */}
        <img className={styles.imagemColeira} id={styles.exemploId} src={imagem} alt="Imagem da coleira" />
      </main>

      <Footer />
    </>
  );
}
