import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      <Header />
      <main className="main-content container">
        {children}
      </main>
      <Footer />
    </div>
  );
}
