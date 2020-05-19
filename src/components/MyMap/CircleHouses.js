import React, { useContext, useEffect } from "react";
import { Popup, CircleMarker } from "react-leaflet";

import CsvContext from "../../context/csv/CsvContext";

const CircleHouses = () => {

    //Obtener el state de Alerta
    const CsvsContext = useContext(CsvContext);
    const { housesCsv, ReadCsv } = CsvsContext;
    console.log(housesCsv);
    useEffect(() => {
        ReadCsv();
        // eslint-disable-next-line
    }, []);                                                                                                                                                           
  
    return (
        housesCsv.map( house => (
          <CircleMarker 
            key = {house.UNICODE}
            center={[parseFloat(house.LATITUDE),parseFloat(house.LONGITUDE)]}
            fillColor = {house.color}
            radius = {6}
            //// = {true}
            color = "black"
            weight = {0.2}
            fillOpacity = {1}
          >
              <Popup>
                Nombre: Juan Perez <br />
                Direccion: Av Angamos 728 <br/>
                Celular: 9999999<br/>
              </Popup>
          </CircleMarker>
        ))
    );
}

export default CircleHouses;