
import React from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

const MyTable = ({ register }) => {//extends React.Component {

  const selectRowProp = {
    mode: 'radio',
    bgColor: '#5bc0de', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
    //hideSelectColumn: true,  // enable hide selection column.
    clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
  };

  return (
      <BootstrapTable 
          keyField="DEN_ID_CUSTOM"
          data={ register } 
          selectRow= {selectRowProp} 
          //ref = 'table'
      >   
          <TableHeaderColumn width='150' dataField='DEN_ID_CUSTOM'>CÓDIGO</TableHeaderColumn>
          <TableHeaderColumn width='210' dataField='DEN_FECHA_RECEPCION'>FECHA DE RECEPCIÓN</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='USU_CUENTA'>USUARIO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_MEDIO'>MEDIO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_TIPO'>TIPO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_AGENTE_NOMBRE'>AGENTE</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_INSECTO'>INSECTO</TableHeaderColumn>
          <TableHeaderColumn width='150' dataField='DEN_INSECTO_OTRO'>OTRO INSECTO</TableHeaderColumn>
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
  );
}

export default MyTable;