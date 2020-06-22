import React from "react";
import { Button } from 'react-bootstrap';

const BtnReturn = (props) => {

    const BtnReturn = () => {
        props.props.history.goBack();
    };

    return (
        <Button className="btn-back" variant="primary" onClick={BtnReturn}>Atrás</Button>
    );
}

export default BtnReturn;