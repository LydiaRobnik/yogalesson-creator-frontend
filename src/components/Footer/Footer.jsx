import React from 'react';
import './footer.scss';

export default function Footer() {
  return (
    <footer>
      <div className="font-peg md:font-raleway">Footer</div>
      <div className="ml-2 sm:ml-3 md:ml-4 lg:ml-5">Tailwind Beispiel</div>
      <div className="margin-left-ausgelagert">Tailwind ausgelagert</div>
    </footer>
  );
}
