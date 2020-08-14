
import React, { useContext } from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

import SpinnerContext from '../../../context/spinner/SpinnerContext';
import Spinner from '../../Spinner';
import MyAlert from "../../MyAlert";
import AlertContext from '../../../context/alert/AlertContext';
import DenunciationContext from "../../../context/denunciation/DenunciationContext";

const MyTable = ({ register }) => {

  //Spinner
  const SpinnersContext = useContext(SpinnerContext);
  const { spinner } = SpinnersContext;
  //Para enviar mensajes por pantalla
  const AlertsContext = useContext(AlertContext);
  const { alert, ShowAlert } = AlertsContext;
  //Obtener context de denuncias
  const DenunciationsContext = useContext(DenunciationContext);
  const { UpdateDenunciation, DisableEditDen } = DenunciationsContext;
  
  const onRowSelect = (row, isSelected, rowIndex, e) => {
    if ( isSelected ) {
      if ( row.DEN_ID_CUSTOM !== "DEN-XXXXXX") {
        let obj = {};
        for(var prop in row){
          
          if (prop === 'DEN_FECHA_PROBABLE_INSPECCION') {
            let obj = [];
            let aux = row[prop];
            //Identificando si es un array de fechas o si es el string de la base de datos (&)
            if (Array.isArray(aux)){
              obj = aux;
            } else if (aux !== null && aux !== "NA") {
              aux = aux.split('&');
              for (let i = 0; i < aux.length; i++) {
                obj.push(new Date(aux[i]));
              }
            } else {
              obj = null;
            } 
            row[prop] = obj;
          } else if (prop === 'DEN_OTRO_TELEFONO') {
            if(row[prop] === '1')
              row[prop] = true;
            else 
              row[prop] = false;
          } 
          if(row[prop] === 'NA')
              row[prop] = '';
          obj[prop.toLowerCase()]=row[prop];
        }
        
        UpdateDenunciation(obj);
      } else {
        //Mensaje
        ShowAlert("No se puede editar una denuncia recien ingresada", "danger");
      }
    } else {
      DisableEditDen();
    }
  }
  const selectRowProp = {
    mode: 'radio',
    bgColor: '#5bc0de', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
    //hideSelectColumn: true,  // enable hide selection column.
    clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
    onSelect: onRowSelect
  };
  
  return (
    <>
      { spinner ? (<Spinner/>) : null }
      { alert ? (<MyAlert msg={alert.msg} category={alert.category}/>) : null }
      <BootstrapTable 
          keyField="DEN_ID_CUSTOM"
          data={ register } 
          selectRow= {selectRowProp} 
      >   
          <TableHeaderColumn width='150' dataField='DEN_ID_CUSTOM'>CÓDIGO</TableHeaderColumn>
          <TableHeaderColumn width='210' dataField='DEN_FECHA_RECEPCION'>FECHA DE RECEPCIÓN</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='USU_CUENTA'>USUARIO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_MEDIO'>MEDIO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_TIPO'>TIPO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_AGENTE_NOMBRE'>AGENTE</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_INSECTO'>INSECTO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_INSECTO_OTRO'>OTRO INSECTO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_INSECTO_OTRO2'>OTRO INSECTO 2</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_HABITANTE_NOMBRE'>HABITANTE</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_HABITANTE_TELEFONO1'>TELEFONO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_HABITANTE_TELEFONO2'>OTRO TELEFONO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_PROVINCIA'>PROVINCIA</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_DISTRITO'>DISTRITO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_LOCALIDAD'>LOCALIDAD</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_DIRECCION'>DIRECCIÓN</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_REFERENCIA'>REFERENCIA</TableHeaderColumn>
          <TableHeaderColumn width='300' dataField='DEN_FECHA_PROBABLE_INSPECCION'>FECHAS PROBABLE INSPECCIÓN</TableHeaderColumn>
      </BootstrapTable>
    </>
  );
}

export default MyTable;