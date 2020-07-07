import React from "react";
import { Alert } from 'react-bootstrap';

const MyAlert = (props) => {
    return (
        <Alert className='alert' variant={`${props.category}`}>{props.msg}</Alert>
    );
}

export default MyAlert;