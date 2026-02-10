import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="copyright">© {new Date().getFullYear()} Consulfines. All rights reserved.</p>
        <p className="address">Bogotá Colombia</p>
      </div>
    </footer>
  );
}
