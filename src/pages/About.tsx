import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SlideImage from "/img/custom/slide.png"; // Ensure the image path is correct
import flag from "../../../public/img/custom/flag.png"; // Ensure the image path is correct
import { Link } from "react-router-dom";

const About: React.FC = () => {
  return (
    <>
     {/* Overlay text */}
        <div className="relative">
  {/* Background Image */}
  <img src={SlideImage} alt="Slider" className="w-full h-screen object-cover" />

  {/* Text Overlay */}
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 p-8">
    <h1 className="text-4xl md:text-4xl text-white text-font italic mb-10 text-center">
      Chez Piessa, nous offrons une gamme complète de services pour vous aider à trouver les pièces auto dont vous avez besoin !
    </h1>
    <p className="text-lg text-white italic leading-relaxed max-w-4xl text-left">
      1. <span className="font-bold">Plateforme de Vente de Pièces Auto</span> : Accédez à une vaste sélection de pièces de rechange pour tous types de véhicules. Nos vendeurs partenaires mettent à votre disposition des produits variés, allant des pièces moteur aux accessoires de carrosserie.
      <br /><br />
      2. <span className="font-bold">Service de Recherche Avancée</span> : Utilisez notre outil de recherche pour filtrer les résultats par type de pièce, marque, modèle, carburant, et ville. Trouvez facilement les pièces compatibles avec votre véhicule et comparez les offres des différents vendeurs.
      <br /><br />
      3. <span className="font-bold">Gestion des Utilisateurs</span> : Inscrivez-vous en tant que vendeur pour proposer vos produits ou en tant qu'acheteur pour accéder à notre catalogue. Les administrateurs du site bénéficient d'une interface dédiée pour gérer les utilisateurs et assurer le bon fonctionnement de la plateforme.
      <br /><br />
      4. <span className="font-bold">Support Client</span> : Notre service client est disponible pour vous aider à chaque étape de votre achat. Que vous ayez des questions sur un produit, besoin d'assistance pour passer une commande, ou nécessitiez des informations sur la livraison, nous sommes là pour vous aider.
    </p>
  </div>
</div>

      
     

      
    </>
  );
};

export default About;
