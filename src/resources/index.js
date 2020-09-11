/*********************
- VARIABLES GLOBALES -
**********************/
//Colores de rociado
export const COLOR_INSPECCION_POSITIVA = "blue";
export const COLOR_INSPECCION_NEGATIVA = "black";
export const COLOR_SIN_INSPECCION = "gray";
export const COLOR_DEFECTO = "#00FFFFFF";
export const COLOR_ROCIADO_ACTIVO = "green";
//Fecha en español
export const es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
};
//Ubigeo
export const provincias_aqp =[
    { provinciaId:"Arequipa", provinciaName:"Arequipa"},
    { provinciaId:"Camana", provinciaName:"Camaná"},
    { provinciaId:"Caraveli", provinciaName:"Caravelí"},
    { provinciaId:"Castilla", provinciaName:"Castilla"},
    { provinciaId:"Caylloma", provinciaName:"Caylloma"},
    { provinciaId:"Condesuyos", provinciaName:"Condesuyos"},
    { provinciaId:"Islay", provinciaName:"Islay"},
    { provinciaId:"La Union", provinciaName:"La Unión"}
];
export const distritos_aqp = {
    "":[],
    "Arequipa":[
        {distritoId:"Alto Selva Alegre", distritoName:"Alto Selva Alegre"},
        {distritoId:"Cercado", distritoName:"Arequipa(Cercado)"},
        {distritoId:"Cayma", distritoName:"Cayma"},
        {distritoId:"Cerro Colorado", distritoName:"Cerro Colorado"},
        {distritoId:"Characato", distritoName:"Characato"},
        {distritoId:"Chiguata", distritoName:"Chiguata"},
        {distritoId:"Jacobo Hunter", distritoName:"Jacobo Hunter"},
        {distritoId:"Jose Luis Bustamante y Rivero", distritoName:"José Luis Bustamante y Rivero"},
        {distritoId:"La Joya", distritoName:"La Joya"},
        {distritoId:"Mariano Melgar", distritoName:"Mariano Melgar"},
        {distritoId:"Miraflores", distritoName:"Miraflores"},
        {distritoId:"Mollebaya", distritoName:"Mollebaya"},
        {distritoId:"Paucarpata", distritoName:"Paucarpata"},
        {distritoId:"Pocsi", distritoName:"Pocsi"},
        {distritoId:"Polobaya", distritoName:"Polobaya"},
        {distritoId:"Quequenha", distritoName:"Quequeña"},
        {distritoId:"Sabandia", distritoName:"Sabandía"},
        {distritoId:"Sachaca", distritoName:"Sachaca"},
        {distritoId:"San Juan de Siguas", distritoName:"San Juan de Siguas"},
        {distritoId:"San Juan de Tarucani", distritoName:"San Juan de Tarucani"},
        {distritoId:"Santa Isabel de Siguas", distritoName:"Santa Isabel de Siguas"},
        {distritoId:"Santa Rita de Siguas", distritoName:"Santa Rita de Siguas"},
        {distritoId:"Socabaya", distritoName:"Socabaya"},
        {distritoId:"Tiabaya", distritoName:"Tiabaya"},
        {distritoId:"Uchumayo", distritoName:"Uchumayo"},
        {distritoId:"Vitor", distritoName:"Vítor"},
        {distritoId:"Yanahuara", distritoName:"Yanahuara"},
        {distritoId:"Yarabamba", distritoName:"Yarabamba"},
        {distritoId:"Yura", distritoName:"Yura"}
    ],
    "Camana":[
        {distritoId:"Camana", distritoName:"Camaná"},
        {distritoId:"Jose Maria Quimper", distritoName:"José María Quimper"},
        {distritoId:"Mariano Nicolas Valcarcel", distritoName:"Mariano Nicolás Valcárcel"},
        {distritoId:"Mariscal Caceres", distritoName:"Mariscal Cáceres"},
        {distritoId:"Nicolas de Pierola", distritoName:"Nicolás de Piérola"},
        {distritoId:"Oconha", distritoName:"Ocoña"},
        {distritoId:"Quilca", distritoName:"Quilca"},
        {distritoId:"Samuel Pastor", distritoName:"Samuel Pastor"}
    ],
    "Caraveli":[
        {distritoId:"Acari", distritoName:"Acarí"},
        {distritoId:"Atico", distritoName:"Atico"},
        {distritoId:"Atiquipa", distritoName:"Atiquipa"},
        {distritoId:"Bella Union", distritoName:"Bella Unión"},
        {distritoId:"Cahuacho", distritoName:"Cahuacho"},
        {distritoId:"Caraveli", distritoName:"Caravelí"},
        {distritoId:"Chala", distritoName:"Chala"},
        {distritoId:"Chaparra", distritoName:"Chaparra"},
        {distritoId:"Huanuhuanu", distritoName:"Huanuhuanu"},
        {distritoId:"Jaqui", distritoName:"Jaqui"},
        {distritoId:"Lomas", distritoName:"Lomas"},
        {distritoId:"Quicacha", distritoName:"Quicacha"},
        {distritoId:"Yauca", distritoName:"Yauca"},
    ],
    "Castilla":[
        {distritoId:"Andahua", distritoName:"Andahua"},
        {distritoId:"Aplao", distritoName:"Aplao"},
        {distritoId:"Ayo", distritoName:"Ayo"},
        {distritoId:"Chachas", distritoName:"Chachas"},
        {distritoId:"Chilcaymarca", distritoName:"Chilcaymarca"},
        {distritoId:"Choco", distritoName:"Choco"},
        {distritoId:"Huancarqui", distritoName:"Huancarqui"},
        {distritoId:"Machaguay", distritoName:"Machaguay"},
        {distritoId:"Orcopampa", distritoName:"Orcopampa"},
        {distritoId:"Pampacolca", distritoName:"Pampacolca"},
        {distritoId:"Tipan", distritoName:"Tipán"},
        {distritoId:"Unhon", distritoName:"Uñón"},
        {distritoId:"Uraca", distritoName:"Uraca"},
        {distritoId:"Viraco", distritoName:"Viraco"}        
    ],
    "Caylloma":[
        {distritoId:"Achoma", distritoName:"Achoma"},
        {distritoId:"Cabanaconde", distritoName:"Cabanaconde"},
        {distritoId:"Callalli", distritoName:"Callalli"},
        {distritoId:"Caylloma", distritoName:"Caylloma"},
        {distritoId:"Chivay", distritoName:"Chivay"},
        {distritoId:"Coporaque", distritoName:"Coporaque"},
        {distritoId:"Huambo", distritoName:"Huambo"},
        {distritoId:"Huanca", distritoName:"Huanca"},
        {distritoId:"Ichupampa", distritoName:"Ichupampa"},
        {distritoId:"Lari", distritoName:"Lari"},
        {distritoId:"Lluta", distritoName:"Lluta"},
        {distritoId:"Maca", distritoName:"Maca"},
        {distritoId:"Madrigal", distritoName:"Madrigal"},
        {distritoId:"Majes", distritoName:"Majes"},
        {distritoId:"San Antonio de Chuca", distritoName:"San Antonio de Chuca"},
        {distritoId:"Sibayo", distritoName:"Sibayo"},
        {distritoId:"Tapay", distritoName:"Tapay"},
        {distritoId:"Tisco", distritoName:"Tisco"},
        {distritoId:"Tuti", distritoName:"Tuti"},
        {distritoId:"Yanque", distritoName:"Yanque"},
    ],
    "Condesuyos":[
        {distritoId:"Andaray", distritoName:"Andaray"},
        {distritoId:"Cayarani", distritoName:"Cayarani"},
        {distritoId:"Chichas", distritoName:"Chichas"},
        {distritoId:"Chuquibamba", distritoName:"Chuquibamba"},
        {distritoId:"Iray", distritoName:"Iray"},
        {distritoId:"Rio Grande", distritoName:"Río Grande"},
        {distritoId:"Salamanca", distritoName:"Salamanca"},
        {distritoId:"Yanaquihua", distritoName:"Yanaquihua"}
    ],
    "Islay":[
        {distritoId:"Cocachacra", distritoName:"Cocachacra"},
        {distritoId:"Dean Valdivia", distritoName:"Deán Valdivia"},
        {distritoId:"Islay", distritoName:"Islay"},
        {distritoId:"Mejia", distritoName:"Mejía"},
        {distritoId:"Mollendo", distritoName:"Mollendo"},
        {distritoId:"Punta de Bombon", distritoName:"Punta de Bombón"}
    ],
    "La Union":[
        {distritoId:"Alca", distritoName:"Alca"},
        {distritoId:"Charcana", distritoName:"Charcana"},
        {distritoId:"Cotahuasi", distritoName:"Cotahuasi"},
        {distritoId:"Huaynacotas", distritoName:"Huaynacotas"},
        {distritoId:"Pampamarca", distritoName:"Pampamarca"},
        {distritoId:"Puyca", distritoName:"Puyca"},
        {distritoId:"Quechualla", distritoName:"Quechualla"},
        {distritoId:"Sayla", distritoName:"Sayla"},
        {distritoId:"Tauria", distritoName:"Tauría"},
        {distritoId:"Tomepampa", distritoName:"Tomepampa"},
        {distritoId:"Toro", distritoName:"Toro"}
    ]
};
export const initDenunciation = {
    den_id_custom: 'DEN-XXXXXX',
    usu_cuenta: '',
    usu_microred: '',
    den_fecha_recepcion: new Date(),
    den_medio: '',
    den_agente_nombre:'',
    den_tipo: '',
    den_insecto: '',
    den_insecto_otro:'',
    den_insecto_otro2:'',
    //-falta variable imagen
    den_habitante_nombre:'',
    den_habitante_telefono1:'',
    den_otro_telefono: false,
    den_habitante_telefono2:'',
    den_provincia: '',
    den_distrito:'',
    den_localidad:'',
    den_direccion:'',
    den_referencia:'',
    den_fecha_probable_inspeccion: null,
    den_denunciante: 'NA',
    den_cant_colindantes: 0,
    den_estado: 1
};

//estas variables son auxiliares, no van a la base de datos
export const initAux = {
    roc_techo:false,
    roc_techo_perro:false,
    roc_techo_gato:false,
    roc_techo_ave:false,
    roc_techo_cuy:false,
    roc_techo_conejo:false,
    roc_techo_animales_otro:false,
    roc_patio:false,
    roc_patio_perro:false,
    roc_patio_gato:false,
    roc_patio_ave:false,
    roc_patio_cuy:false,
    roc_patio_conejo:false,
    roc_patio_animales_otro:false,
    roc_observaciones:false
};

export const initInspection = {
    user_name: '',
    den_id_custom:'',
    insp_den_colin: '',
    unicode: '',
    code_locality: '',
    observaciones: false,//No DB
    obs_unicode: '',
    obs_text1: '',//No DB
    obs_text2: '',//No DB
    obs_text: '',
    fecha: new Date(),
    caract_predio: 'casa_regular',
    tipo_lp: '',
    status_inspeccion: 'C',
    entrevista: '',
    motivo_volver: '',
    fecha_volver: '',
    renuente: '',
    renuente_otro: '',//No DB
    insp_habitante_telefono: '',
    intra_inspeccion: false,
    intra_chiris: false,
    intra_rastros: false,
    peri_inspeccion: false,
    peri_chiris: false,
    peri_rastros: false,
    personas_predio: '',
    perros: false,//No DB
    cant_perros: '',
    gatos: false,//No DB
    cant_gatos: '',
    aves_corral: false,//No DB
    cant_aves_corral: '',
    cuyes: false,//No DB
    cant_cuyes: '',
    conejos: false,//No DB
    cant_conejos: '',
    otros: false,//No DB
    text_otros: '',
    cant_otros: '',
    hora_inicio: '',
    hora_fin: ''
};

//Inicio Rociados
export const inicioRociado = {

    usu_cuenta: '',
    //usu_microred: '',
    roc_unicode:'',
    roc_fecha: new Date(),
    roc_tratamiento_residual:'',
    roc_deshabitada_rociada:'',
    roc_nombre_rociador:'',
    roc_nombre_insecticida:'',
    roc_jefe_familia:'',
    roc_cant_personas:'',
    roc_intra_cant_ambientes:'',
    roc_intra_ambientes_cerrados:'',
    roc_intra_material_predominante: '',
    roc_intra_grietas:'',
    roc_intra_cant_capturados:'',
    roc_peri_cant_ambientes:'',
    roc_peri_material_predominante: '',
    roc_peri_grietas:'',
    roc_peri_cant_capturados:'',
    roc_techo_cant_perros:'0',
    roc_techo_cant_gatos:'0',
    roc_techo_cant_aves_corral:'0',
    roc_techo_cant_cuyes:'0',
    roc_techo_cant_conejos:'0',
    roc_techo_text_otros:'',
    roc_techo_cant_otros:'',
    roc_patio_cant_perros:'0',
    roc_patio_cant_gatos:'0',
    roc_patio_cant_aves_corral:'0',
    roc_patio_cant_cuyes:'0',
    roc_patio_cant_conejos:'0',
    roc_patio_text_otros:'',
    roc_patio_cant_otros:'',
    roc_cant_insecticida:parseInt(0),
    roc_superficie_tratada:parseInt(0),
    roc_observaciones_text:''

}
/*********************
- FUNCIONES PARA ROCIADO -
**********************/

export const MaterialIntra = (materialI) => {
    const arr=[];
    for (var item in materialI) {
        if(materialI[item].isChecked === true) {
            arr.push(materialI[item].value);
            arr.push("-")
        }
    }
    const arrToString = arr.toString();
    const materialIntra = arrToString.replace(/,/g,"");
    return materialIntra;
}


export const MaterialPeri = (materialP) => {
    const arr=[];
    for (var item in materialP) {
        if(materialP[item].isChecked === true) {
            arr.push(materialP[item].value);
            arr.push("-");
        }
    }
    const MPtoString = arr.toString();
    const materialPeri = MPtoString.replace(/,/g,"");
    return materialPeri;
}

/*********************
- FUNCIONES GLOBALES -
**********************/
//Funcion para obtener la fecha en el formato yyyy-mm-dd
export const DateFull = ( date ) => {
    const year = date.getFullYear();
    let month = date.getMonth()+1;
    let day = date.getDate();
    if(month < 10){
        month = "0"+ month;
    }
    if ( day < 10) {
        day = "0"+day;
    }
    return(`${year}-${month}-${day}`);
}
//Funcion para obtener los datos de fecha de probable inspeccion
export const SeveralDates= ( arrayDate ) => {
    let result = 'NA';
    if ( arrayDate!== null) {
        result = DateFull(arrayDate[0]);
        if (arrayDate.length > 1) {
            for (let i = 1; i < arrayDate.length; i++) {
                result = result +'&'+ DateFull(arrayDate[i]);
            }
        }
    }
    return (result);
};
//Funcion poner NA en donde sea ""
export const PutNA = ( obj ) => {
    for (const prop in obj) {
        if ( obj[prop] === "")
            obj[prop] = "NA";
    }
}

//Funcion para realizar un innerjoin con dos arreglos y sus respectivos nombres de columnas a comparar
export const InnerJoin = (array1, array2, nameCol1, nameCol2 ) => {
    let result = [];
    for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
            if (array1[i][nameCol1] === array2[j][nameCol2]) {
                result.push(array2[j]);
            }            
        }
    }
    
    return result;
}

//Funcion Merge
export const Merge = (data0, data1, field) => {
    var result = [];
    for (var i = 0; i < data0.length; i++) {
    for (var j = 0; j < data1.length; j++) {
        if (data0[i][field] === data1[j][field]) {
        var obj = {};
        for (var key1 in data0[i])
            obj[key1] = data0[i][key1];
        for (var key2 in data1[j]) {
            if (key2 !== field)
            obj[key2] = data1[j][key2];
        }
        result.push(obj);
        break;
        }
    }
    }
    return result;
}

//Funcion promedio
export const Mean = (data, select) => {
    var n = data.length;
    var total = 0;
    for (var i=0; i < data.length; i++) {
        if (isNaN(data[i][select]))
        n = n - 1;
        else
        total = total + parseFloat(data[i][select]);
    }
    return total/n;
}

