"use client";

import { useState } from "react";
import styles from "./styles.module.scss";

export default function ContactForm() {
  const [form, setForm] = useState({
    email: "", 
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("Пораката се испраќа...");

    try {
      const res = await fetch("http://localhost:8001/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email, 
          message: form.message,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("✅ Пораката е успешно испратена!");
        setForm({ email: "", message: "" });
      } else {
        setStatus(`❌ ${data.detail}`);
      }
    } catch (err) {
      setStatus("❌ Настана грешка. Обидете се повторно.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="email" className={styles.label}>
            Вашиот е-маил *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="вашата.email@пример.com"
            value={form.email}
            onChange={handleChange}
            className={styles.input}
            required
            disabled={isLoading}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="message" className={styles.label}>
            Вашата порака *
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Напишете ја вашата порака овде..."
            value={form.message}
            onChange={handleChange}
            rows={4}
            className={styles.textarea}
            required
            disabled={isLoading}
          />
        </div>
 
        <button 
          type="submit" 
           className="items-center gap-2 transition-all duration-300 group-hover:gap-3"
                id="custom-button-id-form"
          disabled={isLoading}
          aria-label={isLoading ? "Пораката се испраќа" : "Испрати порака"}
        >
          {isLoading ? "Се испраќа..." : "Испрати порака"}
        </button>
      </form>
      {status && (
        <p 
          className={`${styles.status} ${
            status.includes("✅") ? styles.success : styles.error
          }`}
          role="alert"
          aria-live="polite"
        >
          {status}
        </p>
      )}
    </>
  );
}