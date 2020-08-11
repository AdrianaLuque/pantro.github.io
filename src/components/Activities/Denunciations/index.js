import React, { useContext, useState } from "react";
import { Container, Button } from 'react-bootstrap';

import DenunciationContext from "../../../context/denunciation/DenunciationContext";
import FormDen from "./FormDen";
import MyTable from "./MyTable";
import BtnReturn from "../../BtnReturn";

const Denunciations = props => {

  //Obtener el state de Alerta
  const DenunciationsContext = useContext(DenunciationContext);
  const { denunciations, selectEdit, PressBtnAddDen, PressBtnEditDen, CleanBtnDen } = DenunciationsContext;

  console.log("Desde index - Denunciations")
  console.log("denunciations");
  console.log(denunciations);
  console.log(selectEdit);
  console.log(PressBtnAddDen);
  console.log(PressBtnEditDen);

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
    //Cuando se cierra el modal
    if (modal) {
      CleanBtnDen();
    }
    setModal(!modal);
  }

  console.log("Estos son los props que recibe denunciations");
  console.log(props)

  console.log("state formTiltle");
  console.log(formTitle);

  console.log("state modal");
  console.log(modal);

  console.log("Press BTN ADD");
  console.log(PressBtnAddDen);

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