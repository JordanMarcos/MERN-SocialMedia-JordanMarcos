// J'importe React
import React, { useEffect, useState } from "react";
// Je prends UidContext
import { UidContext } from "./components/AppContext";
// J'importe les routes
import Routes from "./components/Routes";
// J'importe axios
import axios from "axios";

// Composant racine App
const App = () => {
  // je créer un state pour l'uid(context)
  const [uid, setUid] = useState(null);

  // j'utilise les useEffects hooks pour controler le token de l'user
  useEffect(() => {
    const fetchToken = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}jwtid`,
        // withCredentials: true
      })
        .then((res) => {
          setUid(res.data);
        })
        .catch((err) => console.log("No token"));
    };
    fetchToken();
    // [uid] useeffect est lancé quand l'uid change
  }, [uid]);

  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};

// J'exporte mon composant
export default App;
