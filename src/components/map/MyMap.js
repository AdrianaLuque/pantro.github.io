import React, { useContext, useEffect } from "react";
import { Map, TileLayer, Popup, CircleMarker } from "react-leaflet";
import LocateControl from './LocateControl';

import CsvContext from "../../context/csv/CsvContext";

const MyMap = props => {

  //Obtener el state de Alerta
  const CsvsContext = useContext(CsvContext);
  const { housesCsv, ReadCsv } = CsvsContext;
  
  //Mostrar el popup cuando se crea marker
  //Mostrar el popup cuando se crea circle
  useEffect(() => {
    ReadCsv();
    // eslint-disable-next-line
  }, []);

    
  const locateOptions = {
    position: 'topright',
    strings: {
        title: 'Mostrar mi ubicación'
    },
    onActivate: () => {} // callback before engine starts retrieving locations
  }
  
  return (
    <Map center={props.center} zoom={props.zoom}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <LocateControl options={locateOptions} startDirectly/>
      {housesCsv.map( house => (
        <CircleMarker 
          key = {house.UNICODE}
          center={[house.LATITUDE,house.LONGITUDE]}
          color="red"
          radius={8} 
        >
            <Popup>
              Nombre: Juan Perez <br />
              Direccion: Av Angamos 728 <br/>
              Celular: 9999999<br/>
            </Popup>
        </CircleMarker>
      ))}
    </Map>
  );
}

export default MyMap;

