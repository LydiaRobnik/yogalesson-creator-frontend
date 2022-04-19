import React, { StrictMode } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style/index.css';
import './style/tailwind.css';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <Router>
    <StrictMode>
      <App />
    </StrictMode>
  </Router>
);
