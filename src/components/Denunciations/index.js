import React, { useContext, useEffect } from "react";
import { Container, Button } from 'react-bootstrap';


import DenunciationContext from "../../context/denunciation/DenunciationContext";
import MyModal from "./form/MyModal";
import ModalContext from "../../context/modal/ModalContext";
import MyTable from "./MyTable";

const Denunciations = () => {

    //Obtener el state de Alerta
  const DenunciationsContext = useContext(DenunciationContext);
  const { denunciations, GetDenunciations, AddDenunciation, EditDenunciation } = DenunciationsContext;
  
  //Obtener el state de modal
  const ModalsContext = useContext(ModalContext);
  const { ShowModal } = ModalsContext;

  useEffect(() => {
      GetDenunciations();
      //Eliminamos advertencia por que sabemos que esta bien
      // eslint-disable-next-line
  }, []);

    return(
        <Container>
          <h2>Información de Denuncias</h2>
          <Button onClick={ShowModal}>Agregar</Button>
          <Button >Edita</Button> {/*onClick={this.EditDenunciation.bind(this)}>Editar</Button>*/}
          <MyModal/>
          <MyTable register={denunciations}/>
        </Container>
    );
}

export default Denunciations;