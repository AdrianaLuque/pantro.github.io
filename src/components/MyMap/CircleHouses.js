import React, { useContext, useState } from "react";
import { Popup, CircleMarker } from "react-leaflet";
import { Button } from 'react-bootstrap';

import CsvContext from "../../context/csv/CsvContext";
import InspectionContext from "../../context/inspection/InspectionContext";
import { InnerJoin } from "../../Functions";
import FormInsp from "../Inspections/FormInsp";

const CircleHouses = () => {

    //Obtener viviendas
    const CsvsContext = useContext(CsvContext);
    let { houses, UpdateHouses } = CsvsContext;
    //Obtener el inspecciones
    const InspectionsContext = useContext(InspectionContext);
    const { inspections } = InspectionsContext;
    //Modal
    const [modal, setModal] = useState(false);
    //Titulo del formulario
    const [formTitle, setFormTitle] = useState(null);
    //Titulo del formulario
    const [unicode, setUnicode] = useState(null);
            
    const HandleAdd = ( valUnicode ) => {
      setUnicode(valUnicode);
      setFormTitle("Ingresar registro de inspecciones");
      ChangeModal();
    }

    const ChangeModal = () => {
      setModal(!modal);
    }

    //- LOGICA
    //Para asegurar que ingresa una sola vez
    if (houses.length > 0) {
      //const codeLoc = [...new Set(total_ca.map(house => house.codeLoc))];
      if (inspections.length > 0) {
        let visitedHousesInspection = InnerJoin(houses, inspections, "UNICODE", "UNICODE");    
        
        //Recorriendo todas las viviendas para poner popup
        houses.forEach(element => {
          //element.inspectionText = `` ;
          element.inspectionText = <div>
                                    Ult. visita : --:--
                                   </div>;
        });
        //Actualizar popup segun inspecciones
        visitedHousesInspection.forEach(visited => {
          houses.some(element => {
            if (visited.UNICODE === element.UNICODE) {
              element.inspectionText = <div>Ult. visita: <b>{visited.FECHA}</b><br/> Estado en Inspec: <b>{visited.STATUS_INSPECCION}</b></div>;
              return true;
            } else {
              return false;
            }
          });
        });                                                                                                                                                                  
      }
    }
    
    return (
      <>
        {houses.map( element => (
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
                <b>{element.UNICODE}</b>
                {element.inspectionText}
                <Button onClick={()=>HandleAdd(element.UNICODE)}>Ingresar Datos</Button>
              </Popup>
          </CircleMarker>
        ))}
        <FormInsp modal={modal} ChangeModal={ChangeModal} formTitle={formTitle} unicode={unicode}/>
      </>
    );
}

export default CircleHouses;