"use client";

import { useState } from "react";
import { whatsappLink, CONTACT_EMAIL } from "@/lib/config";
import styles from "./contactForm.module.css";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const buildMessage = () => {
    const lines = [
      `Hola! Soy ${name || "(nombre)"}.`,
      phone ? `Mi teléfono: ${phone}` : "",
      "",
      message.trim() || "Quiero hacer una consulta.",
    ];
    return lines.filter(Boolean).join("\n");
  };

  const sendWhatsApp = () => {
    setSent(true);
    setTimeout(() => setSent(false), 2400);
    window.open(whatsappLink(buildMessage()), "_blank");
  };

  const sendEmail = () => {
    const subject = encodeURIComponent("Consulta desde la tienda");
    const body = encodeURIComponent(
      `${name}${phone ? `\nTel: ${phone}` : ""}\n\n${message}`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        sendWhatsApp();
      }}
    >
      <h2 className={styles.title}>Enviá tu consulta</h2>
      <p className={styles.hint}>
        Completá tus datos y te respondemos por el medio que elijas.
      </p>

      <label className={styles.label} htmlFor="name">
        Nombre <span className={styles.required}>*</span>
      </label>
      <input
        id="name"
        className={styles.input}
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Tu nombre"
        required
        autoComplete="name"
      />

      <label className={styles.label} htmlFor="phone">
        Teléfono / WhatsApp
      </label>
      <input
        id="phone"
        className={styles.input}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="11 2345 6789"
        autoComplete="tel"
      />

      <label className={styles.label} htmlFor="message">
        Mensaje <span className={styles.required}>*</span>
      </label>
      <textarea
        id="message"
        className={styles.textarea}
        rows={5}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Contanos qué necesitás..."
        required
      />

      <div className={styles.buttons}>
        <button type="submit" className={styles.primary}>
          {sent ? "✓ Apertura WhatsApp" : "Enviar por WhatsApp"}
        </button>
        <button type="button" onClick={sendEmail} className={styles.secondary}>
          Enviar por email
        </button>
      </div>
    </form>
  );
}