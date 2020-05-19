import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Login from "./components/Login";
import MyMap from "./components/MyMap";
import Activities from "./components/Activities";
import Denunciations from "./components/Denunciations";
import AlertaState from './context/alertas/alertaState';
import AuthState from './context/auth/authState';
import DenunciationState from './context/denunciation/DenunciationState';
import InspectionState from './context/inspection/InspectionState';
import CsvState from './context/csv/CsvState';
import ModalState from './context/modal/ModalState';

function App() {
  return (
    <AlertaState>
      <AuthState>
        <DenunciationState>
          <InspectionState>
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
          </InspectionState>
        </DenunciationState>
      </AuthState>
    </AlertaState>
  );
}

export default App;
