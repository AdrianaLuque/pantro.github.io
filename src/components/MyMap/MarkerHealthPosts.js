import React, { useContext, useState } from "react";
import { Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { Button } from 'react-bootstrap';

import CsvContext from "../../context/csv/CsvContext";
import FormHP from "../Activities/Inspections/FormHP";
import { Merge } from "../../Resources";

const MarkerHealthPosts = () => {

    //Obtener el state de Alerta
    const CsvsContext = useContext(CsvContext);
    const { houses, healthPosts } = CsvsContext;
    //Modal
    const [modal, setModal] = useState(false);
    //Titulo del formulario
    const [formTitle, setFormTitle] = useState(null);
    
    const HandleAdd = () => {
      setFormTitle("Ingresar registro de visitas a puestos de salud");
      ChangeModal();
    }

    const ChangeModal = () => {
      setModal(!modal);
    }

    //AGREGANDO PUESTOS DE SALUD
    //Obteniendo los puestos de salud que corresponden a este catchment-area
    let health_posts = Merge(houses, healthPosts, "UNICODE");
    //Agregando texto de PUESTOS DE SALUD
    if ( health_posts.length > 0 ) {
      health_posts.forEach(element => {
        element.inspectionText = <div>
                                    <b>{element.UNICODE}</b><br/>
                                    Ult. visita : --:--<br/>
                                    <Button variant="success" onClick={HandleAdd}>Visita Puesto de Salud</Button>
                                   </div>;
      });
    }

    //Icono
    const customMarker = L.icon({ 
      iconUrl: require('../../img/icon-health-posts.png'), 
      iconSize: new L.Point(30, 34),//iconSize: [30, 40]
    });
    
    return (
      <>
        {health_posts.map( element => (
          <Marker 
            key = {element.UNICODE}
            position={[parseFloat(element.LATITUDE),parseFloat(element.LONGITUDE)]}
            icon = {customMarker}
          >
              <Popup>
                {element.inspectionText}
              </Popup>
          </Marker>
        ))}
        <FormHP modal={modal} ChangeModal={ChangeModal} formTitle={formTitle}/>
      </>
    );
}

export default MarkerHealthPosts;