import '@fontsource/bebas-neue/400.css';
import '@fontsource-variable/crimson-pro';
import '@fontsource-variable/crimson-pro/wght-italic.css';
import '@fontsource-variable/archivo';
import './styles/global.css';
import './styles/site.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import { App } from './App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
