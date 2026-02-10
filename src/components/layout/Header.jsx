import React from "react";
//import { ShieldCheck } from 'lucide-react';
import "./Header.css";
import logoSrc from "../../assets/consulfines.svg";

export default function Header() {
  return (
    <header className="header">
      <div className="header-content container">
        <div className="logo-container">
          <img
            src={logoSrc}
            alt="Consulfines"
            className="logo-img"
            /*   onError={(e) => {
              e.currentTarget.style.display = "none";
              // We can show an icon if image fails
              const icon = document.getElementById("fallback-logo-icon");
              if (icon) icon.style.display = "block";
            }} */
          />
          {/*     <ShieldCheck
            id="fallback-logo-icon"
            className="logo-icon"
            size={40}
            style={{ display: "none", color: "var(--color-primary)" }}
          /> */}
        </div>
        <div className="title-container">
          <h1 className="header-title">Calculadora de Seguro de Vida Ideal</h1>
          <p className="header-slogan">Your Partner for Life!!</p>
        </div>
      </div>
    </header>
  );
}
