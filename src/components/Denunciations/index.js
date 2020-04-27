import React, {useContext, useEffect} from "react";
import MyTable from "./MyTable";

import DenunciationContext from "../../context/denunciation/DenunciationContext";

const Denunciations = () => {

    //Obtener el state de Alerta
    const DenunciationsContext = useContext(DenunciationContext);
    const { denunciations, GetDenunciations } = DenunciationsContext;

    useEffect(() => {
        GetDenunciations();
        //Eliminamos advertencia por que sabemos que esta bien
        // eslint-disable-next-line
    }, []);

    return(
        <MyTable register={ denunciations }/>
    );
}

export default Denunciations;