import React from "react";
import { Modal, Button } from 'react-bootstrap';

const MyModal = (props) => {

    const SaveAlert = () => {
        //CloseModal();
        console.log("entro no se porque");
    }

    return (
        <Modal show={props.modal} onHide={props.ChangeModal}>
            <Modal.Header closeButton>
            <Modal.Title>{props.formTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {props.children}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.ChangeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;