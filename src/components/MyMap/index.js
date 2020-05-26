import React from "react";
import { Map, TileLayer, Popup, CircleMarker } from "react-leaflet";
import { Button } from 'react-bootstrap';

import CircleHouses from "./CircleHouses";
import MarkerParticipantsInmune from "./MarkerParticipantsInmune";
import MarkerHealthPosts from "./MarkerHealthPosts";
//import Logic from "../../Logic";

const MyMap = props => {

  //Variales del mapa
  let center = [-16.4040494,-71.574117];
  const zoom = 10;

  const BtnReturn = () => {
      props.history.goBack();
  }
    
  return (
    <>
      <Map center={center} zoom={zoom} preferCanvas={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <Button className="btn-back" variant="primary" onClick={BtnReturn}>Atrás</Button>
        <CircleHouses/>
        <MarkerParticipantsInmune/>
        <MarkerHealthPosts/>
      </Map>
    </>
  );
}

export default MyMap;

