import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';

// Punto de entrada: monta toda la aplicacion React en el div#root.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
