import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Login from "./components/auth/Login";
import MyMap from "./components/map/MyMap";
import Activities from "./components/activities/Activities";
import Denunciations from "./components/denunciations/Denunciations";
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';
import CsvState from './context/csv/CsvState';
import ModalState from './context/modal/ModalState';

function App() {
  return (
    <AlertaState>
      <AuthState>
        <CsvState>
          <ModalState>
            <Router> 
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/map" component={MyMap}/>
                <Route exact path="/actividades" component={Activities}/>
                <Route exact path="/denuncias" component={Denunciations}/>
              </Switch>
            </Router>
          </ModalState>
        </CsvState>
      </AuthState>
    </AlertaState>
  );
}

export default App;
