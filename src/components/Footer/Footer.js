import React from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./footer.module.css";

export default function Footer() {
    return (


        
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.brand}>
                    <Image
                        src="/images/logo-showroom.png"
                        alt="Showroom"
                        width={140}
                        height={60}
                        className={styles.logo}
                    />
                    <p className={styles.copy}>© {new Date().getFullYear()} Showroom</p>
                    <div className={styles.addressWrap}>
                        <svg
                            className={styles.locationIcon}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width="18"
                            height="18"
                            aria-hidden="true"
                        >
                            <path fill="none" d="M0 0h24v24H0z" />
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="#ff4d6d" />
                        </svg>
                        <address className={styles.address}>
                            <span className={styles.addressLine}>Salguero 2223</span>
                            <span className={styles.addressLine}>San Martin, Argentina</span>
                        </address>
                    </div>
                </div>

                <nav className={styles.nav} aria-label="Enlaces principales">
                    <ul className={styles.linkList}>
                        <li><Link href="/">Inicio</Link></li>
                        <li><Link href="/productos">Catalogo</Link></li>
                        <li><Link href="/contacto">Contacto</Link></li>
                        <li><Link href="/admin/login">Iniciar Sesión</Link></li>
                        
                    </ul>
                </nav>

                <div className={styles.contact}>
                    <p className={styles.contactTitle}>Contactanos via:</p>
                    <div className={styles.social}>
                        <a target="_blank" href="https://www.instagram.com/rox.showroom24/" aria-label="Instagram" className={styles.socialLink}><img src="/icons/logotipo-instagram.png" alt="Instagram" className={styles.socialIcon} /></a>
                        <a target="_blank" href="https://api.whatsapp.com/send/?phone=1144160737&text&type=phone_number&app_absent=0" aria-label="Facebook" className={styles.socialLink}><img src="/icons/whatsapp.png" alt="WhatsApp" className={styles.socialIcon}  /></a>
                        <a target="_blank" href="mailto:shop.nature2020@gmail.com?subject=Consulta%20desde%20la%20tienda&body=Hola%2C%20quiero%20consultar%20por%20un%20producto." aria-label="Email" className={styles.socialLink}><img src="/icons/correo-electronico.png" alt="Email" className={styles.socialIcon}  /></a>
                    </div>
                </div>
            </div>
            
            <div className={styles.credit}>
                Creado por: <span className={styles.author}>Lucas.H</span>
            </div>
        </footer>
    );
}
