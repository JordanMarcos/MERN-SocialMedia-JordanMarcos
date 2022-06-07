// J'importe la bibliothèque React (V5.2.0)
import React from 'react';
// J'importe des bibliothèques de react-router-dom
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
// J'importe la page Home
import Home from '../../pages/Home';
// J'importe la page Profil
import Profil from '../../pages/Profil';
// J'importe la page Trending
import Trending from '../../pages/Trending';

// Mon composant index qui contient les routes
const index = () => {
  return (
    <Router> 
        <Switch>
            <Route path ="/" exact component={Home}/>
            <Route path ="/profil" exact component={Profil}/>
            <Route path ="/trending" exact component={Trending}/>
            <Redirect to="/" />
        </Switch>  
    </Router>
  );
}

// J'exporte mon composant
export default index;