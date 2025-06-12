import Image from 'next/image';
import styles from './page.module.css';
import bannerLogo from '../app/Recursos/img/logoTecNM-ITSC-ISC.png';
import personaLaptop from './Recursos/img/undraw_developer-avatar_f6ac.svg';
import administreImg from './Recursos/img/undraw_add-notes_9xls.svg';
import publiqueImg from './Recursos/img/undraw_publish-post_7g2z.svg';
export default function Home() {
  const tasks = [
    {
      title: 'Crea Artículos y Publicaciones',
      description:
        'Redacte, edite y publique artículos de noticias atractivas con facilidad.',
      icon: personaLaptop,
    },
    {
      title: 'Administre Contenidos',
      description:
        'Organice categorías, etiquetas y medios para un flujo de contenido fluido.',
      icon: administreImg,
    },
    {
      title: 'Publique y Comparta',
      description:
        'Publique contenidos al instante. Reciba comentarios y reacciones de su audiencia.',
      icon: publiqueImg,
    },
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <Image
          src={bannerLogo}
          alt="Tabloide-Tek"
          width={860}
          height={133}
          priority
        />
        <h1 className={styles.title}>Tabloide-Tek</h1>
        <p className={styles.description}>
          Gestor de tabloide informativo de la comunidad TecNM Campus Cananea
        </p>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.cardsGrid}>
          {tasks.map((task, index) => (
            <div key={index} className={styles.card}>
              <Image
                src={task.icon}
                alt="Tabloide-Tek"
                style={{ marginBottom: '10px', opacity: '1' }}
                width={160}
                height={160}
                priority
              />
              <h2 className={styles.cardTitle}>{task.title}</h2>
              <p className={styles.cardDescription}>{task.description}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          Acerca del Proyecto
        </a>
        <a href="#" target="_blank" rel="noopener noreferrer">
          ISC - Programación Web 2025
        </a>
      </footer>
    </div>
  );
}
