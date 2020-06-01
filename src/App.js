import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Login from "./components/Login";
import MyMap from "./components/MyMap";
import Activities from "./components/Activities";
import Denunciations from "./components/Denunciations";
import AlertaState from './context/alertas/alertaState';
import AuthenticationState from './context/authentication/AuthenticationState';
import DenunciationState from './context/denunciation/DenunciationState';
import InspectionState from './context/inspection/InspectionState';
import CsvState from './context/csv/CsvState';

function App() {
  return (
    <AlertaState>
      <CsvState>
        <DenunciationState>
          <InspectionState>
            <AuthenticationState>
              <Router> 
                <Switch>
                  <Route exact path="/" component={Login}/>
                  <Route exact path="/actividades" component={Activities}/>
                  <Route exact path="/actividades/denuncias" component={Denunciations}/>
                  <Route exact path="/actividades/inspecciones-activas" component={MyMap}/>
                </Switch>
              </Router>
            </AuthenticationState>
          </InspectionState>
        </DenunciationState>
      </CsvState>
    </AlertaState>
  );
}

export default App;
