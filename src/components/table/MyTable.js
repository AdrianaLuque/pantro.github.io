
import React, { useContext } from "react";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import { Container, Button } from 'react-bootstrap';

import MyModal from "../form/MyModal";
import ModalContext from "../../context/modal/ModalContext";

var products = [{
      DEN_ID_CUSTOM: 'DEN_020001',
      DEN_FECHA_RECEPCION: "Product1",
      USU_CUENTA: 'V13V',
      DEN_MEDIO:'AGENTE',
      DEN_TIPO:'VERBAL',
      DEN_AGENTE_NOMBRE:'PRUEBA',
      DEN_INSECTO:'CHINCHES_CAMA',
      DEN_INSECTO_OTRO:'NA',
      DEN_HABITANTE_NOMBRE: 'PRUEBA',
      DEN_HABITANTE_TELEFONO1: '0',
      DEN_HABITANTE_TELEFONO2: 'NA',
      DEN_PROVINCIA: 'AREQUIPA',
      DEN_DISTRITO: 'ALTO SELVA ALEGRE',
      DEN_LOCALIDAD: 'LOS EUCALIPTOS',
      DEN_DIRECCION: 'LAS TORRES E7',
      DEN_REFERENCIA: 'LA CAPILLA'
  }, {
      DEN_ID_CUSTOM: 'DEN_020002',
      DEN_FECHA_RECEPCION: "Product1",
      USU_CUENTA: 'V13V',
      DEN_MEDIO:'AGENTE',
      DEN_TIPO:'VERBAL',
      DEN_AGENTE_NOMBRE:'PRUEBA',
      DEN_INSECTO:'CHINCHES_CAMA',
      DEN_INSECTO_OTRO:'NA',
      DEN_HABITANTE_NOMBRE: 'PRUEBA',
      DEN_HABITANTE_TELEFONO1: '0',
      DEN_HABITANTE_TELEFONO2: 'NA',
      DEN_PROVINCIA: 'AREQUIPA',
      DEN_DISTRITO: 'ALTO SELVA ALEGRE',
      DEN_LOCALIDAD: 'LOS EUCALIPTOS',
      DEN_DIRECCION: 'LAS TORRES E7',
      DEN_REFERENCIA: 'LA CAPILLA'
  },{
      DEN_ID_CUSTOM: 'DEN_020003',
      DEN_FECHA_RECEPCION: "Product1",
      USU_CUENTA: 'V13V',
      DEN_MEDIO:'AGENTE',
      DEN_TIPO:'VERBAL',
      DEN_AGENTE_NOMBRE:'PRUEBA',
      DEN_INSECTO:'CHINCHES_CAMA',
      DEN_INSECTO_OTRO:'NA',
      DEN_HABITANTE_NOMBRE: 'PRUEBA',
      DEN_HABITANTE_TELEFONO1: '0',
      DEN_HABITANTE_TELEFONO2: 'NA',
      DEN_PROVINCIA: 'AREQUIPA',
      DEN_DISTRITO: 'ALTO SELVA ALEGRE',
      DEN_LOCALIDAD: 'LOS EUCALIPTOS',
      DEN_DIRECCION: 'LAS TORRES E7',
      DEN_REFERENCIA: 'LA CAPILLA'
  }
];

const selectRowProp = {
  mode: 'radio',
  bgColor: '#5bc0de', // you should give a bgcolor, otherwise, you can't regonize which row has been selected
  //hideSelectColumn: true,  // enable hide selection column.
  clickToSelect: true,  // you should enable clickToSelect, otherwise, you can't select column.
};

const MyTable = ({ register }) => {//extends React.Component {
  
  /*EditDenunciation() {
    //Here is your answer
    console.log(this.refs.table.state.selectedRowKeys);
  }*/

  //Obtener el state de modal
  const ModalsContext = useContext(ModalContext);
  const { ShowModal } = ModalsContext;

  //render(){
    return (
        <Container>
            <h2>Información de Denuncias</h2>
            <Button>Agregar</Button>
            <Button onClick={ShowModal}>Edita</Button> {/*onClick={this.EditDenunciation.bind(this)}>Editar</Button>*/}
            <BootstrapTable 
                data={ register } 
                selectRow= {selectRowProp} 
                //ref = 'table'
            >   
                <TableHeaderColumn width='150' dataField='DEN_ID_CUSTOM' isKey={ true }>CÓDIGO</TableHeaderColumn>
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
            </BootstrapTable>
            <MyModal/>
        </Container>
    );
  //}
}

export default MyTable;