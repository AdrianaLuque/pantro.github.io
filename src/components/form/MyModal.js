import React, { useContext } from "react";
import { Modal, Button } from 'react-bootstrap';
import ModalContext from "../../context/modal/ModalContext";
import Denunciation from "./Denunciation";

const MyModal = () => {

    //Obtener el state de modal
    const ModalsContext = useContext(ModalContext);
    const { modal, CloseModal } = ModalsContext;

    const SaveAlert = () => {
        CloseModal();
    }

    return (
        <Modal show={modal} onHide={CloseModal}>
            <Modal.Header closeButton>
            <Modal.Title>Nuevo registro de denuncias</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Denunciation/>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={CloseModal}>
                Close
            </Button>
            <Button variant="primary" onClick={SaveAlert}>
                Save Changes
            </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;