import React, { useContext, useState } from "react";
import { Container, Button } from 'react-bootstrap';

import DenunciationContext from "../../../context/denunciation/DenunciationContext";
import FormDen from "./FormDen";
import MyTable from "./MyTable";
import BtnReturn from "../../BtnReturn";

const Denunciations = props => {

  //Obtener el state de Alerta
  const DenunciationsContext = useContext(DenunciationContext);
  const { denunciations, selectEdit, PressBtnAddDen, PressBtnEditDen } = DenunciationsContext;

  //Modal
  const [modal, setModal] = useState(false);
  //Titulo del formulario
  const [formTitle, setFormTitle] = useState(null);

  const HandleAdd = () => {
    setFormTitle("Nuevo registro de denuncias");
    ChangeModal();
    PressBtnAddDen();
  }
  const HandleEdit = () => {
    setFormTitle("Editar registro de denuncias");
    ChangeModal();
    PressBtnEditDen();
  }
  const ChangeModal = () => {
    setModal(!modal);
  }

  return(
      <Container>
        <h2>Información de Denuncias</h2>
        <div className='group-btn'>
          <Button onClick={HandleAdd}>Agregar</Button>
          <Button className="btn-edit" onClick={HandleEdit} disabled={!selectEdit}>Editar</Button>
          <BtnReturn props={props}/>
        </div>
        <FormDen modal={modal} ChangeModal={ChangeModal} formTitle={formTitle} />
        <MyTable register={denunciations}/>
      </Container>
  );
}

export default Denunciations;