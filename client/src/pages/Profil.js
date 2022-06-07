// J'importe React
import React from 'react';
// J'importe Log component
import Log from '../components/Log';

// Mon composant Profil
const Profil = () => {
  return (
    <div>
        <div className="profil-page">
          <div className="log-container">
            <Log signin={false} signup={true}>
              
            </Log>
            <div className="img-container">
              <img src="./img/log.svg" alt="img-log" />
            </div>
          </div>
        </div>
    </div>
  );
}

// J'exporte mon composant
export default Profil;