import React from "react";

import Points from './Points';
import SignOut from '../../components/Login/SignOut';

const Header = () => {
    return(
        <header>
            <Points/>
            <SignOut/>
        </header>
    );
}

export default Header;