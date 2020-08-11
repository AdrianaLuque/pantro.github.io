import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Login from "./components/Login";
import MyMap from "./components/MyMap";
import Activities from "./components/Activities";
import Denunciations from "./components/Activities/Denunciations";
import Rociados from "./components/Activities/Rociados"


import AlertState from './context/alert/AlertState';
import AuthenticationState from './context/authentication/AuthenticationState';
import DenunciationState from './context/denunciation/DenunciationState';
import InspectionState from './context/inspection/InspectionState';
import RociadoState from './context/rociados/RociadoState';
import CimexState from './context/cimex/CimexState';
import CsvState from './context/csv/CsvState';
import SpinnerState from './context/spinner/SpinnerState';

function App() {
  return (
    <SpinnerState>
      <AlertState>
        <CsvState>
          <DenunciationState>
            <InspectionState>
              <RociadoState>
                <CimexState>
                  <AuthenticationState>
                    <Router> 
                      <Switch>
                        <Route exact path="/" component={Login}/>
                        <Route exact path="/actividades" component={Activities}/>
                        <Route exact path="/actividades/denuncias" component={Denunciations}/>
                        <Route exact path="/actividades/mapa" component={MyMap}/>
                        <Route exact path="/actividades/rociados" component={Rociados} />
                      </Switch>
                    </Router>
                  </AuthenticationState>
                </CimexState>
              </RociadoState>
            </InspectionState>
          </DenunciationState>
        </CsvState>
      </AlertState>
    </SpinnerState>
  );
}

export default App;
