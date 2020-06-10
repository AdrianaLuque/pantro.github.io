import React from "react";
import imgSpinner from '../../img/preloader.gif';

const Spinner = () => {
    return(
        <div className='spinner'>
            <img src={imgSpinner} alt='preloading'/>
        </div>
    );
}

export default Spinner;