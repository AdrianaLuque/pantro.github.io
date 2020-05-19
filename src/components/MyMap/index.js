import React from "react";
import { Map, TileLayer, Popup, CircleMarker } from "react-leaflet";

import CircleHouses from "./CircleHouses";
import Logic from "../../Logic";

const MyMap = props => {

  //Variales del mapa
  let center = [-16.4040494,-71.574117];
  const zoom = 10;
    
  return (
    <>
      <Logic/>
      <Map center={center} zoom={zoom} preferCanvas={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <CircleHouses/>
      </Map>
    </>
  );
}

export default MyMap;

