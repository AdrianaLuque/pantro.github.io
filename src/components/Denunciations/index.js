import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from 'react-bootstrap';

import DenunciationContext from "../../context/denunciation/DenunciationContext";
import FormDen from "./FormDen";
import MyTable from "./MyTable";

const Denunciations = () => {

  //Obtener el state de Alerta
  const DenunciationsContext = useContext(DenunciationContext);
  const { denunciations, GetDenunciations, AddDenunciation, EditDenunciation } = DenunciationsContext;

  //Modal
  const [modal, setModal] = useState(false);
  //Titulo del formulario
  const [formTitle, setFormTitle] = useState(null);

  useEffect(() => {
      GetDenunciations();
      //Eliminamos advertencia por que sabemos que esta bien
      // eslint-disable-next-line
  }, []);

  const HandleAdd = () => {
    setFormTitle("Nuevo registro de denuncias");
    ChangeModal();
  }
  const HandleEdit = () => {
    setFormTitle("Editar registro de denuncias");
    ChangeModal();
  }

  const ChangeModal = () => {
    setModal(!modal);
  }

  return(
      <Container>
        <h2>Información de Denuncias</h2>
        <Button onClick={HandleAdd}>Agregar</Button>
        <Button onClick={HandleEdit}>Edita</Button>
        <FormDen modal={modal} ChangeModal={ChangeModal} formTitle={formTitle}/>
        <MyTable register={denunciations}/>
      </Container>
  );
}

export default Denunciations;