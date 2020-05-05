import React, { useState, useContext, useEffect } from "react";
import { Map, TileLayer, Popup, CircleMarker } from "react-leaflet";

import CsvContext from "../../context/csv/CsvContext";

const MyMap = props => {

  //Variales del mapa
  let center = [-16.4040494,-71.574117];
  const zoom = 10;

  //Obtener el state de Alerta
  const CsvsContext = useContext(CsvContext);
  const { housesCsv, ReadCsv } = CsvsContext;
  
  useEffect(() => {
    ReadCsv();
    //const lat = Mean(housesCsv, 'LATITUDE');
    //const lng = Mean(housesCsv, 'LONGITUDE');
    //center = [lat, lng];
    // eslint-disable-next-line
  }, []);
  
  /*const Mean = (data, select) => {
    var n = data.length;
    var total = 0;
    for (var i=0; i < data.length; i++) {
      if (isNaN(data[i][select]))
        n = n - 1;
      else
        total = total + parseFloat(data[i][select]);
    }
    return total/n;
  }*/

  return (
    <>
      <Map center={center} zoom={zoom} preferCanvas={true}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {housesCsv.map( house => (
          <CircleMarker 
            key = {house.UNICODE}
            center={[parseFloat(house.LATITUDE),parseFloat(house.LONGITUDE)]}
            fillColor = 'red'
            radius = {5}
            stroke = {true}
            color = "black"
            weight = {0.4}
            fillOpacity = {1}
          >
              <Popup>
                Nombre: Juan Perez <br />
                Direccion: Av Angamos 728 <br/>
                Celular: 9999999<br/>
              </Popup>
          </CircleMarker>
        ))}
      </Map>
    </>
  );
}

export default MyMap;

