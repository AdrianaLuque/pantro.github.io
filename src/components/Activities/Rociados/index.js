import React, {Fragment, useState, useContext} from 'react';
import { Button } from 'react-bootstrap';

//importando Context
import RociadoContext from "../../../context/rociados/RociadoContext";
import FormRociado from './FormRociado';

const Rociados = (props) => {

    //Llamar al context
    const RociadosContext = useContext(RociadoContext);

    //Extrayendo los datos que se enviaron desde context
    // Yo estoy extrayendo el statusBtnAddRoc - para probar (como se hizo en MERN)
    const {statusBtnAddRoc, PressBtnAddRoc} = RociadosContext;

    //state para modificar los titulos
    const [formTitle, setFormTitle] = useState(null);

    //state para asignar esta de false o true para el modal
    const [modal, setModal] = useState(false);

    const ChangeModal = () => {
        //cambia el estado del modal
        setModal(!modal);
    }



    // Funcion al hacer click Agregar
    const HandleAdd = () => {

        //Cambiando el state del formTitle
        setFormTitle("Nuevo registro de rociados");
        ChangeModal();
        PressBtnAddRoc();
    }

    console.log("Desde ROciados");
    console.log(statusBtnAddRoc);
    console.log(modal);


    return ( 
        <Fragment>
            <h2 className = "subtitulo-espacio">
                Informacion de Rociados</h2>

            <div className="group-btn">
                <Button variant = "primary" onClick={HandleAdd}>Agregar Rociado</Button>
            </div>

            {statusBtnAddRoc ?
                    <FormRociado modal={modal} ChangeModal={ChangeModal} formTitle={formTitle} />
                :null
                
            }


        </Fragment>
     );
}
 
export default Rociados;