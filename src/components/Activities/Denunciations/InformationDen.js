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
        setFormTitle("Informacion de las denuncias");
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
                            <b>Nombre: </b><div>{denunciation.DEN_HABITANTE_NOMBRE}</div>
                            <b>Teléfono: </b><div>{denunciation.DEN_HABITANTE_TELEFONO1}</div>
                            <b>Dirección: </b><div>{denunciation.DEN_DIRECCION}</div>
                            <b>Referencia: </b><div>{denunciation.DEN_REFERENCIA}</div>
                        </div>
                    </div>
                )}
            </MyModal>
        </>
    );
}

export default InformationDen;