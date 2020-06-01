import React, { useContext, useState } from "react";
import { Popup, Marker } from "react-leaflet";
import L from "leaflet";
import { Button } from 'react-bootstrap';

import CsvContext from "../../context/csv/CsvContext";
import FormPI from "../ParticipantsInmune/FormPI";
import { Merge } from "../../Functions";

const MarkerParticipantsInmune = () => {

    //Obtener el state de Alerta
    const CsvsContext = useContext(CsvContext);
    const { houses, participantsInmune } = CsvsContext;
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
      <>
        {participants_inmune.map( element => (
          <Marker 
            key = {element.UNICODE}
            position={[parseFloat(element.LATITUDE),parseFloat(element.LONGITUDE)]}
            icon = {customMarker}
          >
              <Popup>
                Nombre: {element.NOMBRE} <br />
                Direccion: {element.DIRECCION} <br/>
                Celular: {element.TELEFONO}<br/>
                <Button onClick={HandleAdd}>Ingresar Datos</Button>
              </Popup>
          </Marker>
        ))}
        <FormPI modal={modal} ChangeModal={ChangeModal} formTitle={formTitle}/>
      </>
    );
}

export default MarkerParticipantsInmune;