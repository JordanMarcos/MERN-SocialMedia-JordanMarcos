// J'importe React
import React from "react";
// J'importe React-dom
import ReactDOM from "react-dom/client";
// J'importe le composant racine App
import App from "./App";
// J'importe les styles
import './styles/index.scss';

// Je réconcilie mon DOM virtuel au DOM réel 'root'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
  </>
);
