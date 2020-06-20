import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from 'react-bootstrap';

import DenunciationContext from "../../../context/denunciation/DenunciationContext";
import FormDen from "./FormDen";
import MyTable from "./MyTable";

const Denunciations = () => {

  //Obtener el state de Alerta
  const DenunciationsContext = useContext(DenunciationContext);
  const { denunciations, GetDenunciations, boolEdit } = DenunciationsContext;

  //Modal
  const [modal, setModal] = useState(false);
  //Titulo del formulario
  const [formTitle, setFormTitle] = useState(null);
  //Titulo del formulario
  const [btnPressed, setBtnPressed] = useState(null);

  useEffect(() => {
      GetDenunciations();
      //Eliminamos advertencia por que sabemos que esta bien
      // eslint-disable-next-line
  }, []);

  const HandleAdd = () => {
    setFormTitle("Nuevo registro de denuncias");
    ChangeModal();
    setBtnPressed("add");
  }
  const HandleEdit = () => {
    setFormTitle("Editar registro de denuncias");
    ChangeModal();
    setBtnPressed("edit");
  }
  const ChangeModal = () => {
    setModal(!modal);
  }

  return(
      <Container>
        <h2>Información de Denuncias</h2>
        <Button onClick={HandleAdd}>Agregar</Button>
        <Button className="btn-edit" onClick={HandleEdit} disabled={!boolEdit}>Editar</Button>
        <FormDen modal={modal} ChangeModal={ChangeModal} formTitle={formTitle} btnPressed={btnPressed}/>
        <MyTable register={denunciations}/>
      </Container>
  );
}

export default Denunciations;