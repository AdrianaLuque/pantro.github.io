/*********************
- VARIABLES GLOBALES -
**********************/
//Fecha en español
export const es = {
    firstDayOfWeek: 1,
    dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
    dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
    dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
    monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
    monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"]
};

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
        if (data0[i][field] == data1[j][field]) {
        var obj = {};
        for (var key in data0[i])
            obj[key] = data0[i][key];
        for (var key in data1[j]) {
            if (key != field)
            obj[key] = data1[j][key];
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

