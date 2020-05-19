import React, { useContext, useEffect } from "react";
import { Popup, Marker } from "react-leaflet";
import L from "leaflet";

import CsvContext from "../../context/csv/CsvContext";
import { Merge } from "../../Functions";

const MarkerHealthPosts = () => {

    //Obtener el state de Alerta
    const CsvsContext = useContext(CsvContext);
    const { houses, healthPosts, CsvHealthPosts } = CsvsContext;
    
    useEffect(() => {
        CsvHealthPosts();
        // eslint-disable-next-line
    }, []); 
    
    //AGREGANDO PUESTOS DE SALUD
    //Obteniendo los puestos de salud que corresponden a este catchment-area
    let health_posts = Merge(houses, healthPosts, "UNICODE");
    //Agregando texto de PUESTOS DE SALUD
    if ( health_posts.length > 0 ) {
      health_posts.forEach(element => {
        element.inspectionText = "Ult. visita : --" ;
      });
    }

    //Icono
    const customMarker = L.icon({ 
      iconUrl: require('../../icons/icon-health-posts.png'), 
      iconSize: new L.Point(30, 34),//iconSize: [30, 40]
    });
    
    return (
        health_posts.map( element => (
          <Marker 
            key = {element.UNICODE}
            position={[parseFloat(element.LATITUDE),parseFloat(element.LONGITUDE)]}
            icon = {customMarker}
          >
              <Popup>
                {element.inspectionText}
              </Popup>
          </Marker>
        ))
    );
}

export default MarkerHealthPosts;