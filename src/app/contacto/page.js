import Link from "next/link";
import ContactForm from "./ContactForm";
import {
  INSTAGRAM_URL,
  CONTACT_EMAIL,
  ADDRESS,
  SITE_URL,
  whatsappLink,
} from "@/lib/config";
import styles from "./contacto.module.css";

export const metadata = {
  title: "Contacto",
  description:
    "Contactate con Showroom Rox por WhatsApp, Instagram o email. Consultá por productos, envíos y disponibilidad.",
  alternates: { canonical: "/contacto" },
};

const FAQ = [
  {
    q: "¿Cómo coordino mi pedido?",
    a: "Sumá tus productos al carrito y enviá el pedido por WhatsApp. Ahí confirmamos disponibilidad, precio final y coordinamos la entrega o el retiro.",
  },
  {
    q: "¿Hacen envíos?",
    a: "Sí, coordinamos envíos a San Martín y zona. Día y forma se acuerdan por WhatsApp antes de finalizar la compra.",
  },
  {
    q: "¿Cuáles son los medios de pago?",
    a: "Al consultar por WhatsApp coordinamos el medio que mejor te quede, de forma ágil y segura.",
  },
  {
    q: "¿Puedo ver los productos en persona?",
    a: "Podés. Contactanos y coordinamos un turno para que veas todo en el showroom.",
  },
];

export default function Contacto() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Contacto" },
    ],
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
      <header className={styles.banner}>
        <div className={styles.bannerInner}>
          <nav className={styles.breadcrumb} aria-label="Miga de pan">
            <Link href="/">Inicio</Link>
            <span>/</span>
            <span aria-current="page">Contacto</span>
          </nav>
          <h1 className={styles.title}>Contacto</h1>
          <p className={styles.subtitle}>
            ¿Tenés una consulta? Escribinos y te respondemos a la brevedad.
          </p>
        </div>
      </header>

      <main className={styles.layout}>
        <ContactForm />

        <aside className={styles.aside}>
          <h2 className={styles.asideTitle}>O comunicate directo</h2>

          <a
            href={whatsappLink("Hola! Quiero hacer una consulta.")}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <span className={`${styles.channelIcon} ${styles.waIcon}`}>
              <img src="/icons/whatsapp.png" alt="" width={22} height={22} />
            </span>
            <span className={styles.channelBody}>
              <span className={styles.channelName}>WhatsApp</span>
              <span className={styles.channelNote}>Respuesta rápida</span>
            </span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.channel}
          >
            <span className={`${styles.channelIcon} ${styles.igIcon}`}>
              <img
                src="/icons/logotipo-instagram.png"
                alt=""
                width={22}
                height={22}
              />
            </span>
            <span className={styles.channelBody}>
              <span className={styles.channelName}>Instagram</span>
              <span className={styles.channelNote}>@rox.showroom24</span>
            </span>
          </a>

          <a href={`mailto:${CONTACT_EMAIL}`} className={styles.channel}>
            <span className={`${styles.channelIcon} ${styles.mailIcon}`}>
              <img
                src="/icons/correo-electronico.png"
                alt=""
                width={22}
                height={22}
              />
            </span>
            <span className={styles.channelBody}>
              <span className={styles.channelName}>Email</span>
              <span className={styles.channelNote}>{CONTACT_EMAIL}</span>
            </span>
          </a>

          <div className={styles.location}>
            <span className={styles.locationPin} aria-hidden="true">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 1 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <address className={styles.address}>
              <strong>Ubicación</strong>
              <span>{ADDRESS.street}</span>
              <span>{ADDRESS.city}</span>
            </address>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${ADDRESS.street}, ${ADDRESS.city}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapLink}
            >
              Cómo llegar →
            </a>
          </div>
        </aside>
      </main>

      <section className={styles.faq}>
        <div className={styles.faqHeader}>
          <span className={styles.faqKicker}>Ayuda rápida</span>
          <h2 className={styles.faqTitle}>Preguntas frecuentes</h2>
        </div>

        <div className={styles.faqList}>
          {FAQ.map((f) => (
            <details key={f.q} className={styles.faqItem}>
              <summary className={styles.faqQuestion}>
                {f.q}
                <span className={styles.faqChevron} aria-hidden="true">
                  ▾
                </span>
              </summary>
              <p className={styles.faqAnswer}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}