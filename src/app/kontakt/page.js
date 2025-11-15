import styles from "./styles.module.scss";
import { FaFacebookF, FaInstagram } from "react-icons/fa";
import ContactForm from "./ContactForm";
import Navigation from "@/components/landing/herosection/Navigation";
import Footer from "@/components/landing/Footer";
import FAQSection from "@/components/landing/FAQSection";
import './styles.css'

// Metadata for better SEO
export const metadata = {
  title: "Контакт - Wedibox",
  description: "Контактирајте не за информации за вашиот онлине настан. Поддршка за корисници на телефон 0800 444 00 и email support@wedibox.mk",
  keywords: "контакт, свадба, настан, дигитален албум, wedibox mk, svadba, nastan, поддршка, телефон, email",
  openGraph: {
    title: "Контакт - Wedibox",
    description: "Контактирајте не за информации за вашиот онлине настан. Поддршка за корисници на телефон 0800 444 00 и email support@wedibox.mk",
    type: "website",
  },
};

export default function ContactUs() {
  return (
    <> 
    <Navigation/>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.columns}>
            {/* LEFT: FORM - Now server-side rendered with client component for interactivity */}
            <div className={styles.left}>
              <h1 className={styles.title}>Контактирајте не</h1>
              <p className={styles.subtitle}>Имате прашање или ви треба помош? <br/>Пополнете го формуларот и испратете ни порака.</p>
              
              {/* Client component for form interactivity */}
              <ContactForm />
            </div>

            {/* RIGHT: INFO - Fully server-side rendered */}
            <div className={styles.right}>
              <h2 className={styles.infoTitle}>Ти треба помош?</h2>
              
              {/* Semantic HTML for better SEO */}
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <strong className={styles.contactLabel}>Телефон за поддршка:</strong>
                  <a href="tel:080044400" className={styles.infoPhone} aria-label="Телефон за поддршка 0800 444 00">
                    0800 444 00
                  </a>
                </div>
                
                <div className={styles.contactItem}>
                  <strong className={styles.contactLabel}>Е-пошта:</strong>
                  <a href="mailto:support@ananas.mk" className={styles.infoEmail} aria-label="Е-пошта за поддршка support@ananas.mk">
                    support@ananas.mk
                  </a>
                </div>
              </div>

              <div className={styles.workingHours}>
                <p className={styles.infoLabel}>Работно време</p>
                <p className={styles.infoTime}>
                  Понедeлник - Недела: 08:00 - 16:00 часот
                </p>
              </div>

              {/* Social media with proper semantic markup */}
              <div className={styles.socialSection}>
                <p className={styles.socialTitle}>Следете не на социјални мрежи</p>
                <div className={styles.socials}>
                  <a 
                    href="https://facebook.com" 
                    aria-label="Следете не на Facebook" 
                    className={styles.socIconLink}
                    rel="noopener noreferrer"
                  >
                    <FaFacebookF className={styles.socialIcon} />
                  </a>
                  <a 
                    href="https://instagram.com" 
                    aria-label="Следете не на Instagram" 
                    className={styles.socIconLink}
                    rel="noopener noreferrer"
                  > 
                    <FaInstagram className={styles.socialIcon} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
      <FAQSection showCTA={false}/>
      <Footer/>
    </>
  );
}