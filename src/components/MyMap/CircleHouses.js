import React, { useContext, useEffect } from "react";
import { Popup, CircleMarker } from "react-leaflet";

import AuthenticationContext from "../../context/authentication/AuthenticationContext";
import CsvContext from "../../context/csv/CsvContext";
import InspectionContext from "../../context/inspection/InspectionContext";
import { InnerJoin, Merge } from "../../Functions";

const CircleHouses = () => {

    //Obtener el state de Usuario
    const AuthenticationsContext = useContext(AuthenticationContext);
    const { user } = AuthenticationsContext;
    //Obtener viviendas
    const CsvsContext = useContext(CsvContext);
    let { houses, CsvHouses, UpdateHouses } = CsvsContext;
    //Obtener el inspecciones
    const InspectionsContext = useContext(InspectionContext);
    const { inspections, GetInspections } = InspectionsContext;
        
    useEffect(() => {  
      CsvHouses(user.USU_CATCHMENT_AREA);
      GetInspections();
      // eslint-disable-next-line
    }, [user]);
    
    //- LOGICA
    //Para asegurar que ingresa una sola vez
    if (houses.length > 0) {
      //const codeLoc = [...new Set(total_ca.map(house => house.codeLoc))];
      if (inspections.length > 0) {
        let visitedHousesInspection = InnerJoin(houses, inspections, "UNICODE", "UNICODE");    
        
        //Recorriendo todas las viviendas para poner popup
        houses.forEach(element => {
          //element.inspectionText = `` ;
          element.inspectionText = <div><b>{element.UNICODE}</b><br/>Ult. visita : --:--</div>;
        });
        //Actualizar popup segun inspecciones
        visitedHousesInspection.forEach(visited => {
          houses.some(element => {
            if (visited.UNICODE === element.UNICODE) {
              element.inspectionText = <div><b>{element.UNICODE}</b><br/>Ult. visita: <b>{visited.FECHA}</b><br/> Estado en Inspec: <b>{visited.STATUS_INSPECCION}</b></div>;
              return true;
            } else {
              return false;
            }
          });
        });                                                                                                                                                                  
      }
    }
    
    return (
        houses.map( element => (
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