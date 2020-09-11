import React, { useContext, useState, Fragment} from "react";
import { Popup, CircleMarker } from "react-leaflet";
import { Button } from 'react-bootstrap';

import CsvContext from "../../context/csv/CsvContext";
import RociadoContext from "../../context/rociados/RociadoContext";
import {  COLOR_INSPECCION_POSITIVA, 
          COLOR_INSPECCION_NEGATIVA, 
          COLOR_SIN_INSPECCION, 
          COLOR_ROCIADO_ACTIVO,
          COLOR_DEFECTO,  
          InnerJoin } from "../../resources";

import FormInsp from "../Activities/Inspections/FormInsp";
import FormRociado from "../Activities/Rociados/FormRociado";

const CircleHouses = (props) => {

    debugger
    //Obtener viviendas
    const CsvsContext = useContext(CsvContext);
    let { houses, UpdateHouses } = CsvsContext;
    //Context-Rociados
    const RociadosContext = useContext(RociadoContext);
    const {rociados, statusBtnAddRoc, PressBtnAddRoc} = RociadosContext;

    //Modal
    const [modal, setModal] = useState(false);
    //Titulo del formulario
    const [formTitle, setFormTitle] = useState(null);
    //Titulo del formulario
    const [unicode, setUnicode] = useState(null);
    //Hora de inicio
    const [startTime, setStartTime] = useState(new Date());
    //Inspecciones que vienen desde el padre
    const inspections = props.inspections;
    //Si es inspeccion PASIVA que viene del padre
    const inspPasive = props.inspPasive;
    //Si es inspeccion ACTIVA que viene del padre
    const inspActive = props.inspActive;

    //Boton de rociados - viene de MyMap
    const btnRociado = props.rociado;
            
    const HandleAdd = ( valUnicode ) => {
      if(inspActive === true){
        setUnicode(valUnicode);
        setFormTitle("Ingresar registro de inspecciones");
        ChangeModal();
        setStartTime(new Date());
      }else{
        if(btnRociado === true){
          setUnicode(valUnicode);
          setFormTitle("Ingresar registro de rociados");
          ChangeModal();
          setStartTime(new Date());
          PressBtnAddRoc();
        }
      }
      
    }

    const ChangeModal = () => {
      setModal(!modal);
    }

    //LOGICA
    if(houses.length > 0) {
      //Recorriendo todas las viviendas para poner informacion en el POPUP
      houses.forEach(element => {
        element.inspectionText =<div>
                                  Ult. visita : --:--
                                </div>;
        element.rociadoText =  <div>
                                  Ult. visitaRociada : --:--
                                </div>;

        //element.sprayed = COLOR_SIN_INSPECCION;
        element.sprayed = COLOR_DEFECTO;
      });

      //Inspecciones

      if(inspections.length > 0){
        let visitedHousesInspections = InnerJoin(houses, inspections, "UNICODE", "UNICODE");

        //Actualizar lo que se va a mostrar en el popup
        visitedHousesInspections.forEach(visited => {
          houses.some(element => {
            if(visited.UNICODE === element.UNICODE){
              element.inspectionText =  <div> 
                                          Ult. visita: <b>{visited.FECHA}</b>
                                          <br/>
                                          Estado Inspeccion: <b>{visited.STATUS_INSPECCION}</b>
                                        </div>;
              //Poner color a la columna sprayed
              if(visited.STATUS_INSPECCION === "inspeccion") {
                /*
                if(1 === visited.INTRA_CHIRIS || 1 === visited.PERI_CHIRIS) {
                  element.sprayed = COLOR_INSPECCION_POSITIVA;
                }else{
                  element.sprayed = COLOR_INSPECCION_NEGATIVA;
                }*/

                if("1" === visited.INTRA_CHIRIS || "1" === visited.PERI_CHIRIS) {
                  element.sprayed = COLOR_INSPECCION_POSITIVA;
                }else{
                  element.sprayed = COLOR_INSPECCION_NEGATIVA;
                }
              }

              return true;
            }else{
              return false;
            }
          });
        });
      }
      

      //Rociados

      if(rociados.length > 0) {
        let housesRociadas = InnerJoin(houses, rociados, "UNICODE", "UNICODE");

        //Actualizar los atributos de cada objeto de houses
        housesRociadas.forEach(visita => {
          houses.some(house => {
            if(visita.UNICODE === house.UNICODE) {
              house.rociadoText = <div>
                                    Ult. visita: <b>{visita.ROC_FECHA}</b>
                                    <br/>
                                    Estado Rociado: <b>{visita.ROC_TRATAMIENTO_RESIDUAL} </b>
                                  </div>

              //Poner color al atributo sprayed
              if(visita.ROC_TRATAMIENTO_RESIDUAL === "T" || (visita.ROC_TRATAMIENTO_RESIDUAL === "DES" & visita.ROC_DESHABITADA_ROCIADA === "1")) {
                house.sprayed = COLOR_ROCIADO_ACTIVO;
              }
              return true;
            }else {
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
            fillColor = { btnRociado
                          ?
                            element.sprayed
                          :(inspPasive
                            ?
                              "gray"
                            :(inspActive
                              ?
                                element.color
                              :element.sprayed
                             )
                           )
                        }
            radius = {6}
            color = "black"
            weight = {0.2}
            fillOpacity = { btnRociado
                            ?
                              1
                            :1
                          }
          >
              <Popup>
                <b>{element.UNICODE}</b>
                <b>{element.sprayed}</b>
                { inspActive
                  ?
                    element.inspectionText
                  :(btnRociado
                    ?
                      element.rociadoText
                    :null
                   )
                }
                <Button onClick={()=>HandleAdd(element.UNICODE)}>Ingresar Datos</Button>
              </Popup>
          </CircleMarker>
        ))}

        {inspActive?
          <FormInsp modal={modal} ChangeModal={ChangeModal} formTitle={formTitle} unicode={unicode} startTime={startTime}/>
          :null
        }

        {statusBtnAddRoc ?
          <FormRociado modal={modal} ChangeModal={ChangeModal} formTitle={formTitle} unicode={unicode} />
          :null
        }
      </>
    );

}

export default CircleHouses;