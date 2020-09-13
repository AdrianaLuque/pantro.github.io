import React, { useContext } from "react";
import { Map, TileLayer } from "react-leaflet";

import CircleHouses from "./CircleHouses";
import MarkerParticipantsInmune from "./MarkerParticipantsInmune";
import MarkerHealthPosts from "./MarkerHealthPosts";
import BtnReturn from "../BtnReturn";
import InformationDen from "../Activities/Denunciations/InformationDen";
import InspectionContext from "../../context/inspection/InspectionContext";
import RociadoContext from "../../context/rociados/RociadoContext";

const MyMap = props => {
  
  //debugger
  //Obtener el inspecciones
  const InspectionsContext = useContext(InspectionContext);
  const { inspections, inspPasive, inspActive } = InspectionsContext;

  //Obtener valores de rociadosState
  const RociadosContext = useContext(RociadoContext);
  const {statusBtnRoc } = RociadosContext;
  
  //Variales del mapa
  let center = [-16.4040494,-71.574117];
  const zoom = 10;
 
  return (
    <>
      <Map center={center} zoom={zoom} preferCanvas={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <BtnReturn props={props}/>
        {inspPasive? 
          <InformationDen/>:null
        }

        <CircleHouses inspections={inspections} inspPasive={inspPasive} inspActive={inspActive} rociado={statusBtnRoc}/>
        <MarkerParticipantsInmune/>
        <MarkerHealthPosts/>
      </Map>
    </>
  );
}

export default MyMap;

