import React, { useContext } from "react";

import { DateFull } from "../Functions";

import CsvContext from "../context/csv/CsvContext";
import InspectionContext from "../context/inspection/InspectionContext";
import { InnerJoin, Merge } from "../Functions";

const Logic = () => {
    
    //Obtener el csv
    const CsvsContext = useContext(CsvContext);
    const { housesCsv, participantsInmune, healthPosts } = CsvsContext;

    //Obtener el inspecciones
    const InspectionsContext = useContext(InspectionContext);
    const { inspections } = InspectionsContext;

    //VARIABLES
    const userName = "TEST_TIABAYA";
    const varApp = "vectorpoint";
    const microred = "1";
    //Nombres de los inspectores de nosotros
    const v_inspectorUPCH = ["V1V","V2V", "V5V", "V6V", "V8V", "V9V", "V13V","V1P","V2P", "V5P", "V6P", "V8P", "V9P", "V13P", "TEST1", "TEST2", "TEST_TIABAYA"];
  
    
    //Ordenar OBLIGATORIAMENTE por "group_num" y por "order"
    if (varApp === "bluepoint") {
        console.table(this.carros.sort(((a, b) => b.modelo - a.modelo)));
        //total_ca <- total_ca[order(total_ca$group_num, total_ca$order),]
    }

    /*if (n_row > 1) {
    for(i in 2:n_row){
        new_ca <- read.csv(paste("catchment_area/",names_ca[i],".csv", sep = ""), stringsAsFactors = FALSE)
        #Ordenar OBLIGATORIAMENTE por "group_num" y por "order"
        if (varApp == "bluepoint") {
        new_ca <- new_ca[order(new_ca$group_num, new_ca$order),]
        }
        total_ca <- rbind(total_ca, new_ca)      
    }  
    }*/

    //Csv
    let total_ca = housesCsv;
    //Eliminando viviendas que no tienen GPS
    total_ca = total_ca.filter(register => register.LATITUDE !== "" && register.LATITUDE !== "NA");
    
    //VIVIENDAS QUE YA FUERON VISITADAS
    //Obteniendo solo visitas desde cutoff
    const reduceDays = (24*60*60*1000) * 365;
    const currentDate = new Date();
    const cutoff = DateFull(new Date(currentDate -  reduceDays));
    //Almacenando inspecciones de la base de datos
    let visitedHousesInspection = inspections;
    //Seleccionando solo viviendas que pertenecen al catchment-area
    //* df_inspecciones_original <- visitedHousesInspection[!(visitedHousesInspection$UNICODE%in%total_ca$UNICODE),]
    visitedHousesInspection = InnerJoin(total_ca, visitedHousesInspection, "UNICODE", "UNICODE");    
    //Seleccionando solo las viviendas que cumplen la fecha CUTOFF
    visitedHousesInspection = visitedHousesInspection.filter(element => element.FECHA >= cutoff);
    //NOTA: se tiene que conservar todas las visitas ya que con eso funciona BLUEPOINT
          
    /*#ROCIADO
    updateSelectizeInput(session, "roc_nombre_rociador", choices = nombres_rociadores, server = TRUE)
    #Poniendole color deacuerdo a su estado: 
    # - Inspeccionada positiva = rojo
    # - Inspeccionada negativa = verde
    # - Otras viviendas visitadas = gris
    c_positiva <- "red"
    c_negativa <- "green"
    c_sinInspeccion <- "gray"
    #Creando columna de COLOR ROCIADO con todas las viviendas de color sin inspeccion
    total_ca$COLOR_ROCIADO <- c_sinInspeccion
    #HIPOTESIS: No puede haber dos viviendas con estado "inspeccion" dentro del CUTTOFF
    rociado <- visitedHousesInspection["inspeccion"==visitedHousesInspection$STATUS_INSPECCION,]
    if ( nrow(rociado)>0 ) {
      for (i in 1:nrow(rociado)) {
        if (1 == rociado$INTRA_CHIRIS[i] | 1 == rociado$PERI_CHIRIS[i]) {
          total_ca$COLOR_ROCIADO[ rociado$UNICODE[i] == total_ca$UNICODE] <- c_positiva
        } else {
          total_ca$COLOR_ROCIADO[ rociado$UNICODE[i] == total_ca$UNICODE] <- c_negativa 
        }
      }
    }
    #Consultando a la base de datos de rociado
    visitedHousesSprayed <- load_data_mysql(tableName = dbGlobalConfig$sprayedTable)
    visitedHousesSprayed <<- visitedHousesSprayed[visitedHousesSprayed$UNICODE %in% total_ca$UNICODE,]
    #--------------------------------------------
    */  
    
    //Solo de muestra agentes y puestos de salud en nuestros inspectores
    if (v_inspectorUPCH.includes(userName)) {
      //AGREGANDO AGENTES
      //Eliminar al participante que no tiene unicode de vivienda
      let participants_inmune = participantsInmune.filter(element => element.UNICODE !== "");
      //Realizando merge con total_ca
      participants_inmune = Merge(total_ca, participants_inmune, "UNICODE");
      //Agregando texto de visita a agente
      if ( participants_inmune.length > 0 ) {
        participants_inmune.forEach(element => {
          element.inspectionText = "Ult. visita : --" ;
        });
      }
      //Obteniendo los puestos de salud que corresponden a este catchment-area
      let health_posts = Merge(total_ca, healthPosts, "UNICODE");
      //Agregando texto de PUESTOS DE SALUD
      if ( health_posts.length > 0 ) {
        health_posts.forEach(element => {
          element.inspectionText = "Ult. visita : --" ;
        });
      }
    }
    
    //Agregando texto popup a total_ca
    total_ca.forEach(element => {
      element.inspectionText = "Ult. visita : --" ;
    });
      
    //Solo en BLUEPOINT
    /*if (varApp == "bluepoint") {
      #Seleccionando solo los campos que utilizamos 
      total_ca <- total_ca[,c("UNICODE", "codeLoc", "LATITUDE", "LONGITUDE", "recent_insp", "group_num", "order", "color_contorno", "inspectionText")]
      
      #Eliminar las viviendas que no tienen grupo
      total_ca <- total_ca[!is.na(total_ca$group_num),]
      #Poniendole color deacuerdo a su orden: 
      # - Color principal = azul
      # - Color secundario = gris
      c_principal <- "blue"
      c_secundario <- "gray"
      c_inspeccion_positiva <- "cruznegra"
      c_inspeccion_negativa <- "black"
      total_ca$color <- ifelse(total_ca$order==1,c_principal, c_secundario)
      
      #-------------------
      #- Logica para las viviendas inspeccionadas en bluepoint
      #--------------------------
      visitedBP <- visitedHousesInspection
      #Basta con que exista un registro
      if (nrow(visitedBP) > 0) {
        for (i in 1:nrow(visitedBP)) {
          indexHouse <- which(total_ca$UNICODE%in%visitedBP$UNICODE[i])
          #Creando popup
          total_ca$inspectionText[indexHouse] <- paste0("Ult. visita: <b style='color: black;'>",visitedBP$FECHA[i],"</b><br> Estado en Inspec: <b style='color: black;'>",visitedBP$STATUS_INSPECCION[i],"</b>")
          if (total_ca$color[indexHouse] == c_principal) {
            if (visitedBP$STATUS_INSPECCION[i] == "inspeccion") {
              #Cambiando la visita reciente
              total_ca$recent_insp[indexHouse] <- visitedBP$FECHA[i]
              
              if (visitedBP$INTRA_CHIRIS[i] == 1 || visitedBP$PERI_CHIRIS[i] == 1 ){
                #poniendo color si es positiva
                total_ca$color[indexHouse] <- c_inspeccion_positiva
              } else {
                #poniendo color si es negativa
                total_ca$color[indexHouse] <- c_inspeccion_negativa
              }
            } else {
              #Cambiando a gris vivienda
              total_ca$color[indexHouse] <- c_secundario
              #poniendo contorno si es cualquier otro estado
              total_ca$color_contorno[indexHouse] <- c_sinInspeccionContorno
              #Obteniendo el indice inferior para hacerlo mas eficiente
              n_orden <- total_ca$order[indexHouse]
              indiceInferior <- indexHouse-n_orden+1
              #Empiezo a recorrer el grupo
              bool <- TRUE
              indexNextHouse <- indexHouse+1
              while (bool) {
                if (total_ca$group_num[indexNextHouse] == total_ca$group_num[indexHouse]) {
                  #Pregunto si ultima visita reciente es de mas de 365 dias
                  if ( is.na(total_ca$recent_insp[indexNextHouse]) || total_ca$recent_insp[indexNextHouse] < cutoff) {
                    #Poniendo color a nueva vivienda
                    total_ca$color[indexNextHouse] <- c_principal
                    bool <- FALSE
                  } else {
                    indexNextHouse <- indexNextHouse+1
                  }
                } else {
                  indexNextHouse <- indiceInferior
                }
              }
            }
          } else {
            #Vienen para aca si la vivienda inspeccionada no era de color principal (azul)
            if (visitedBP$STATUS_INSPECCION[i] == "inspeccion") {
              #Cambiando la visita reciente
              total_ca$recent_insp[indexHouse] <- visitedBP$FECHA[i]
              
              if (visitedBP$INTRA_CHIRIS[i] == 1 || visitedBP$PERI_CHIRIS[i] == 1 ){
                #poniendo color si es positiva
                total_ca$color[indexHouse] <- c_inspeccion_positiva;
              } else {
                #poniendo color si es negativa
                total_ca$color[indexHouse] <- c_inspeccion_negativa;
              }
            }
          }
        } 
      }
    } else if (varApp == "vectorpoint"){
      //Seleccionando solo los campos que utilizamos 
      total_ca <- total_ca[,c("UNICODE", "codeLoc", "LATITUDE", "LONGITUDE", "color", "color_contorno", "inspectionText")]
      
      #---------------
      #- Vivienda inspeccionada mata todo en vectorpoint
      #---------------
      visitedVP <- visitedHousesInspection
      if ( nrow(visitedVP) > 0 ) {
        visitedInspection <- visitedVP[visitedVP$STATUS_INSPECCION=="inspeccion",]
        #Ordenar en forma inversa para poder obtener solo una ocurrencia en el siguiente paso
        visitedInspection <- visitedInspection[with(visitedInspection, order(-visitedInspection$ID)), ]
        #Obtener solo una ocurrencia
        visitedInspection <- visitedInspection[!duplicated(visitedInspection$UNICODE),]
        #Eliminar de la lista general de visitadas todas las ocurrencias que tengo inspecciopnadas
        visitedVP <- visitedVP[!visitedVP$UNICODE%in%visitedInspection$UNICODE,]
        #Solo continua si tiene mas de dos registros
        if ( nrow(visitedVP) > 1 ) {
          #Ordenamos en forma descendente para poder obtener el mas reciente ingresado
          visitedVP <- visitedVP[with(visitedVP, order(-visitedVP$ID)), ]
          #Obtener solo una ocurrencia
          visitedVP <- visitedVP[!duplicated(visitedVP$UNICODE),]
        }
        #Juntamos las soluciones
        visitedVP <- rbind(visitedVP, visitedInspection)
        #Creando popup
        total_ca$inspectionText[total_ca$UNICODE%in%visitedVP$UNICODE] <- paste0("Ult. visita: <b style='color: black;'>",visitedVP$FECHA,"</b><br> Estado en Inspec: <b style='color: black;'>",visitedVP$STATUS_INSPECCION,"</b>")
      }
    }
    #--------------------------------------------
    
      #Almacenando en variables globales
      catchment_area <<- as.data.table( total_ca )
      codLoc <<- unique(catchment_area$codeLoc)
      
      #-------------------------------------------
      #Reemplazando lo codigos de localidades por lo nombres reales
      infLoc <- read.csv(paste("files/nombre_localidades_AQP.csv", sep = ""), stringsAsFactors = FALSE)
      #Variable donde se almacenaran los nombres de las localidades que se vana mostrar en la APP
      #HIPOTESIS: Nunca va a haber un catchemnt-area sin menos de una localidad
      nomLoc <- infLoc$LOCALIDAD[codLoc[1]==infLoc$UNICODE]
      if (length(codLoc) > 1) {
        for (i in 2:length(codLoc)) {
          nomLoc <- paste(nomLoc, infLoc$LOCALIDAD[codLoc[i]==infLoc$UNICODE], sep = "&")
        }
      }
      #-------------------------------------------
      
      #Para poder utilizarlo desde javascript
      output$codLoc <- renderText({codLoc})
      outputOptions(output, 'codLoc', suspendWhenHidden = FALSE)  #keeps on top
      output$nomLoc <- renderText({nomLoc})
      outputOptions(output, 'nomLoc', suspendWhenHidden = FALSE)  #keeps on top
      output$varApp <- renderText({varApp})
      outputOptions(output, 'varApp', suspendWhenHidden = FALSE)  #keeps on top
      
      #Poligonos para las localidades
      locPoligono <- read.csv(paste("files/poligonos_localidades.csv", sep = ""),sep = ";", stringsAsFactors = FALSE)
      locPoligono <- locPoligono[,c(2,4,5)]
      #Seleccionando solo las localidades del cathment-area
      locPoligono <- locPoligono[locPoligono$ident%in%codLoc,]
      #Formato para que se pueda dibujar poligono en JS
      x<-NULL  
      y<-NULL
      n_row <- nrow(locPoligono)+1
      forPoligono <- data.frame(codLoc=NA,x=NA,y=NA)
      ind <- 1
      for (i in 2:n_row) {
        if (!is.na(locPoligono$lat[i])) {
          x<-paste(x,locPoligono$lat[i], sep = ",")
          y<-paste(y,locPoligono$long[i], sep = ",")
        }
        else{
          forPoligono$codLoc[ind] <- locPoligono$ident[i-1]
          forPoligono$x[ind] <- substr(x, 2, nchar(x))
          forPoligono$y[ind] <- substr(y, 2, nchar(y))
          x<-NULL
          y<-NULL
          ind <- ind+1
          forPoligono[ind,] <- NA
        }
      }
      #Eliminando el NA de la columna final
      forPoligono <<- forPoligono[1:(nrow(forPoligono)-1),]
      #----------------------------------------------------------------------------------------------------------------------------------#
      # PUNTOS NUEVOS GPS
      # se añade a catchment_area los puntos GPS que fueron creados y 
      # que no estan en ningun CSV, se diferencian los unicodes que tengan
      # guion, y despues se compara que los unicodes padres esten dentro de 
      # catchment_area
      #----------------------------------------------------------------------------------------------------------------------------------#
      #df_inspecciones_original esta filtrado vs catchment_area, quedando solamente las inspecciones de BD y que no esten en catchment
      df_inspecciones_guion <- df_inspecciones_original[grep("-",df_inspecciones_original$UNICODE),]
      if(nrow(df_inspecciones_guion)>0){
        df_inspecciones_guion <- df_inspecciones_guion[, c("UNICODE", "CODE_LOCALITY" ,"FECHA","STATUS_INSPECCION", "INTRA_CHIRIS", "PERI_CHIRIS",
                                                           "RISK_COLOR", "LAT", "LNG")]
        lst_guion <- strsplit( as.character(df_inspecciones_guion$UNICODE),"-", fixed=TRUE )
        
        df_unicode_guion <- as.data.frame(matrix(unlist(lst_guion), nrow=length(unlist(lst_guion[1]))))
        
        v_unicodes_padre <- unique(as.vector(unlist(df_unicode_guion[1,])))
        
        v_unicodes_padre <- v_unicodes_padre[v_unicodes_padre %in% catchment_area$UNICODE ]
        if(length(v_unicodes_padre)>0){
          #Existen unicodes padre que no estan en catchment area
          df_inspecciones_guion <- df_inspecciones_guion[lapply (strsplit(df_inspecciones_guion$UNICODE, "-"), '[',1 ) %in% v_unicodes_padre,]
          options(digits=10)
          browser()
          if (varApp == "bluepoint") {
            df_inspecciones_guion$recent_insp <- NA
            df_inspecciones_guion$group_num <- NA
            df_inspecciones_guion$order <- NA
            df_inspecciones_guion$color_contorno <- "transparent"
            df_inspecciones_guion$inspeccionText <- paste0("Ult. visita: <b style='color: black;'>",df_inspecciones_guion$FECHA,"</b><br> Estado en Inspec: <b style='color: black;'>",df_inspecciones_guion$STATUS_INSPECCION,"</b>")
            df_inspecciones_guion$color <- "gray"
            df_inspecciones_guion$color[df_inspecciones_guion=="inspeccion"] <- "black"
            df_inspecciones_guion$color[df_inspecciones_guion=="inspeccion" && (df_inspecciones_guion$INTRA_CHIRIS == 1 || df_inspecciones_guion$PERI_CHIRIS == 1 )] <- "cruznegra"
            #Seleccionando columna necesarias
            df_inspecciones_guion <- df_inspecciones_guion[,c("UNICODE", "CODE_LOCALITY", "LAT", "LNG", "recent_insp", "group_num", "order", "color_contorno", "inspeccionText", "color")]  
            
          } else if (varApp == "vectorpoint") {
            df_inspecciones_guion <- cbind(df_inspecciones_guion$UNICODE , df_inspecciones_guion$CODE_LOCALITY, 
                                           as.numeric(df_inspecciones_guion$LAT), as.numeric(df_inspecciones_guion$LNG),  
                                           recent_insp=NA, group_num=NA, order=NA,  color_contorno="transparent",
                                           InspeccionText=paste0("Ult. visita: <b style='color: black;'>",df_inspecciones_guion$FECHA,"</b><br> Estado en Inspec: <b style='color: black;'>",df_inspecciones_guion$STATUS_INSPECCION,"</b>"),
                                           color=ifelse(df_inspecciones_guion$STATUS_INSPECCION=="inspecciones", black, gray))
          }
          df_catchment_final <- rbind(catchment_area, df_inspecciones_guion, use.names=FALSE)
          transform(df_catchment_final, LATITUDE = round(as.numeric(LATITUDE), digits = 10))
          transform(df_catchment_final, LONGITUDE = round(as.numeric(LONGITUDE), digits = 10))
          df_catchment_final$LATITUDE <- as.numeric(df_catchment_final$LATITUDE)
          df_catchment_final$LONGITUDE <- as.numeric(df_catchment_final$LONGITUDE)
          catchment_area <<- as.data.table(df_catchment_final)
        }
      }
      #----------------------------------------------------------------------------------------------------------------------------------#
      #-----------------------------------------------------------------#
      #se calcula el puntaje del usuario en particular, (acumulado)
      #-----------------------------------------------------------------#
      if(loginSuccess[[3]]=="vectorpoint"){
        #df_inspecciones <- load_data_mysql(tableName = dbGlobalConfig$inspectionsTable)
        df_inspecciones <- visitedHousesInspection
        vc_colores <-c("#BD0026", "#F03B20", "#FD8D3C", "#FECC5C", "#FFFFB2")
        vc_valores <-c(5:1)
        df_valores <- data.frame(vc_colores, vc_valores)
        names(df_valores) <- c('vcolor', 'nvalor')
        df_variable3 <- df_inspecciones[c("ID", "USER_NAME", "FECHA", "RISK_COLOR", "STATUS_INSPECCION")]
        df_variable4 <- df_variable3[df_variable3$USER_NAME==toupper(input$username),]
        df_variable4 <- df_variable4[substr(df_variable4$FECHA, 1, 4)==format(Sys.Date(), "%Y"),]
        df_variable4 <- df_variable4[df_variable4$STATUS_INSPECCION=="inspeccion",]
        df_variable4 <- merge(df_variable4, df_valores, by.x="RISK_COLOR", by.y="vcolor")
        #df_variable4 %>% group_by(FECHA) %>% summarise(nacumulado = mean(nvalor))
        df_acumulado <- df_variable4 %>% group_by(USER_NAME) %>% summarise(nacumulado = sum(nvalor))
        #df_acumulado <- df_acumulado[df_acumulado$FECHA == max(df_acumulado$nacumulado, na.rm = TRUE),]
        if(nrow(df_variable4)>0){
          npuntaje <- df_acumulado['nacumulado']
        }else{
          npuntaje <- 0
        }
        updateTextInput(session, "hid_nacumulado", value = paste("", npuntaje))
        html("div_puntaje_acumulado", paste(npuntaje,"pts", sep=""))
      }
      #-----------------------------------------------------------------#
*/
    return(
        <div>HOLAAAAA</div>
    );
}

export default Logic;