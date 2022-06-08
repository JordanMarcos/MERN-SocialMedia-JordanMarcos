// J'importe React
import React, { useContext } from 'react';
// J'importe Log component
import Log from '../components/Log';
// J'importe UidContext
import { UidContext } from '../components/AppContext';

// Mon composant Profil
const Profil = () => {
  // Je dois stocker uid dans une var afin de l'utiliser
  const uid = useContext(UidContext);

  return (
    <div>
        <div className="profil-page">
          {uid ? (
            <h1>UPDATE PAGE</h1>
          ) : (
          <div className="log-container">
            <Log signin={false} signup={true}>
              
            </Log>
            <div className="img-container">
              <img src="./img/log.svg" alt="img-log" />
            </div>
          </div>
          )}
        </div>
    </div>
  );
}

// J'exporte mon composant
export default Profil;