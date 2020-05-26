import React, { useContext } from "react";
import { Button } from 'react-bootstrap';
import { withRouter } from "react-router";
//import iconPerson from "../../icons/icon-person.png";

import AuthenticationContext from "../../context/authentication/AuthenticationContext";

const SignOut = (props) => {

    //Obtener el state de Usuario
    const AuthenticationsContext = useContext(AuthenticationContext);
    const { user, Logout } = AuthenticationsContext;

    const BtnSignOut = () => {
        Logout();
        props.history.goBack();
    }

    return(
        <>
            <div className="sign-out">
                {/*<img src={iconPerson} alt="imagen-persona"/>*/}
                <div>Bienvenido <b>{user.USU_CUENTA}</b></div>
                <Button variant="danger" onClick={BtnSignOut}>Cerrar Sesión</Button>
            </div>
        </>
    );
}

export default withRouter((SignOut));