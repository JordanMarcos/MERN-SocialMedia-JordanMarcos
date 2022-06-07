// J'importe React et hooks
import React, { useState } from "react";
// J'importe d'axios
import axios from "axios";

// Mon composant SignInForm (se connecter)
const SignInForm = () => {
  // States pour email et password
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Fonction handleLogin
  const handleLogin = (e) => {
    // on évite le rechargement pas la page
    e.preventDefault();

    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    // Je post la data avec axios
    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      // J'avais une erreur lors du fetch en me remontant withCredentials
      // je l'ai donc enlevé et maintenant ça marche
      // withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form action="" onSubmit={handleLogin} id="sign-up-form">
      <label htmlFor="email">Email</label>
      <br />
      <input
        type="text"
        name="email"
        id="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <div className="email error"></div>
      <br />
      <label htmlFor="password">Mot de passe</label>
      <br />
      <input
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <div className="password error"></div>
      <br />
      <input type="submit" value="Se connecter" />
    </form>
  );
};

// J'exporte mon composant
export default SignInForm;
