import React from 'react';
import './style/navbar.scss';

export default function Navbar() {
  return (
    <nav className="flex gap-5 pt-4">
      <a
        href="https://github.com/TomEsDE/yogalesson-creator-frontend"
        target={'_blank'}
      >
        Github Frontend
      </a>
      <a
        href="https://github.com/TomEsDE/yogalesson-creator-backend"
        target={'_blank'}
      >
        Github Backend
      </a>
    </nav>
  );
}
