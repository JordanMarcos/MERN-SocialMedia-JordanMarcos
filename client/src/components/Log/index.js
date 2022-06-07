// J'importe React ET useState
import React, { useState } from "react";
// J'importe mes composants
import SignUpForm from "./SignUpForm";
import SignInForm from "./SignInForm";

// Mon composant Log
const Log = ({signin, signup}) => {
  // states pour modals register ou login
  const [signUpModal, setSignUpModal] = useState(signup);
  const [signInModal, setSignInModal] = useState(signin);

  // Fonction "toggle" handleModals
  const handleModals = (e) => {
    if (e.target.id === "register") {
      setSignInModal(false);
      setSignUpModal(true);
    } else if (e.target.id === "login") {
      setSignUpModal(false);
      setSignInModal(true);
    }
  };

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
          <li
            onClick={handleModals}
            id="register"
            className={signUpModal ? "active-btn" : null}
          >
            s'inscrire
          </li>
          <li
            onClick={handleModals}
            id="login"
            className={signInModal ? "active-btn" : null}
          >
            se connecter
          </li>
        </ul>
        {signUpModal && <SignUpForm />}
        {signInModal && <SignInForm />}
      </div>
    </div>
  );
};

// J'exporte mon composant
export default Log;
