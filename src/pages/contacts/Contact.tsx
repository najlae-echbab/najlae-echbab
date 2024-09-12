import React from 'react';
import './Contact.css';
import { Link } from "react-router-dom";

const Contact = () => {

  const onSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key", "1a1df17b-c4e8-448f-9383-76661f4ef3f0");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json
    }).then((res) => res.json());

    if (res.success) {
      console.log("Success", res);
    }
  };

  return (
    <section className="contact">
      <form onSubmit={onSubmit}>  {/* Correction ici */}
        <h2>Formulaire de contact</h2>

        <div className="input-box">
          <label>Nom complet</label>
          <input
            type="text"
            className="field"
            placeholder="Entrez votre nom"
            name="name"
            required
          />
        </div>

        <div className="input-box">
          <label>Adresse e-mail</label>
          <input
            type="email"
            className="field"
            placeholder="Entrez votre email"
            name="email"
            required
          />
        </div>

        <div className="input-box">
          <label>Votre message</label>
          <textarea
            name="message"
            id="message"
            className="field mess"
            placeholder="Entrez votre message"
            required
          ></textarea>
        </div>

        <button type="submit">Envoyer un message</button>
      </form>
    </section>
  );
};

export default Contact;
