import React, { useContext, useEffect } from "react";
import { Popup, Marker } from "react-leaflet";
import L from "leaflet";

import CsvContext from "../../context/csv/CsvContext";
import { Merge } from "../../Functions";

const MarkerParticipantsInmune = () => {

    //Obtener el state de Alerta
    const CsvsContext = useContext(CsvContext);
    const { houses, participantsInmune, CsvParticipantsInmune } = CsvsContext;
    
    useEffect(() => {
        CsvParticipantsInmune();
        // eslint-disable-next-line
    }, []); 
    
    //AGREGANDO AGENTES
    //Eliminar al participante que no tiene unicode de vivienda
    let participants_inmune = participantsInmune.filter(element => element.UNICODE !== "");
    //Realizando merge con total_ca
    participants_inmune = Merge(houses, participants_inmune, "UNICODE");
    //Agregando texto de visita a agente
    if ( participants_inmune.length > 0 ) {
      participants_inmune.forEach(element => {
        element.inspectionText = "Ult. visita : --" ;
      });
    }
    //Icono
    const customMarker = L.icon({ 
      iconUrl: require('../../icons/icon-participants-inmune.png'), 
      iconSize: new L.Point(30, 34),//iconSize: [30, 40]
    });
    
    return (
        participants_inmune.map( element => (
          <Marker 
            key = {element.UNICODE}
            position={[parseFloat(element.LATITUDE),parseFloat(element.LONGITUDE)]}
            icon = {customMarker}
          >
              <Popup>
                Nombre: {element.NOMBRE} <br />
                Direccion: {element.DIRECCION} <br/>
                Celular: {element.TELEFONO}<br/>
              </Popup>
          </Marker>
        ))
    );
}

export default MarkerParticipantsInmune;