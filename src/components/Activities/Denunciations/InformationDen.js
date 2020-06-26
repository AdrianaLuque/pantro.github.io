import React, { useContext, useState } from "react";
import { Button } from 'react-bootstrap';

import MyModal from "../../Modal/MyModal";
import DenunciationContext from '../../../context/denunciation/DenunciationContext';

const InformationDen = () => {

    //Obtener variables de denuncias
    const DenunciationsContext = useContext(DenunciationContext);
    const { denunciations } = DenunciationsContext;
    
    //Modal
    const [modal, setModal] = useState(false);
    //Titulo del formulario
    const [formTitle, setFormTitle] = useState(null);

    const HandleInfoDen = () => {
        setFormTitle("Información de las denuncias");
        ChangeModal();
    }
    const ChangeModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <Button className="btn-info-den" variant="primary" onClick={HandleInfoDen}>Denuncias</Button>
            <MyModal modal={modal} ChangeModal={ChangeModal} formTitle={formTitle}>
                {denunciations.map( denunciation => 
                    <div className='wrapper-info-den' key={denunciation.DEN_ID_CUSTOM}>
                        <h5>{denunciation.DEN_ID_CUSTOM}</h5>
                        <div>
                            <div><b>Nombre: </b>{denunciation.DEN_HABITANTE_NOMBRE}</div>
                            <div><b>Teléfono: </b><a href={"tel:+51"+denunciation.DEN_HABITANTE_TELEFONO1}>{denunciation.DEN_HABITANTE_TELEFONO1}</a></div>
                            <div><b>Dirección: </b>{denunciation.DEN_DIRECCION}</div>
                            <div><b>Referencia: </b>{denunciation.DEN_REFERENCIA}</div>
                        </div>
                    </div>
                )}
            </MyModal>
        </>
    );
}

export default InformationDen;