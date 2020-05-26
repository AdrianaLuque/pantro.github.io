import React, { useContext, useEffect } from "react";
import { Popup, CircleMarker } from "react-leaflet";

import AuthenticationContext from "../../context/authentication/AuthenticationContext";
import CsvContext from "../../context/csv/CsvContext";

const CircleHouses = () => {

    //Obtener el state de Usuario
    const AuthenticationsContext = useContext(AuthenticationContext);
    const { user } = AuthenticationsContext;
    //Obtener viviendas
    const CsvsContext = useContext(CsvContext);
    const { houses, CsvHouses } = CsvsContext;
    useEffect(() => {
        CsvHouses(user.USU_CATCHMENT_AREA);
        // eslint-disable-next-line
    }, []); 

    let total_ca = houses;
    //Agregando texto popup a total_ca
    total_ca.forEach(element => {
      element.inspectionText = "Ult. visita : --" ;
    });                                                                                                                                                          
  
    return (
        total_ca.map( element => (
          <CircleMarker 
            key = {element.UNICODE}
            center={[parseFloat(element.LATITUDE),parseFloat(element.LONGITUDE)]}
            fillColor = {element.color}
            radius = {6}
            //// = {true}
            color = "black"
            weight = {0.2}
            fillOpacity = {1}
          >
              <Popup>
                {element.inspectionText}
              </Popup>
          </CircleMarker>
        ))
    );
}

export default CircleHouses;