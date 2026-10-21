import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './i18n';
import App from './App';
import './styles.css';

document.documentElement.classList.add('motion-ready');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '') || '/'}><App /></BrowserRouter></React.StrictMode>
);
