
# DigitAI - Trazabilidad

### Flujos de procesamiento de un comprobante

Cuando el ingreso de documentos a digitalizar se realiza mediante un proceso automático, puede ser necesario realizar el seguimiento del proceso de digitalización de cada uno de los documentos ingresados.

<!-- tabs:start -->
##### **Correo Electrónico**

Digitize tiene integrada la importación de documentos a través de la lectura de casillas de correo electrónico.<br>
El flujo responde al siguiente diagrama:

![alt_text](./images/image87.png "flow")

##### **API**

Digitize tiene una API que permite importar documentos directamente desde otro sistema y la opción de recibir por Webhook la información extraída al finalizar su procesamiento <br>
El flujo responde al siguiente diagrama:

![alt_text](./images/image98.png "flow")
<!-- tabs:end -->

### Ciclo de vida de un documento

Cada documento pasa por distintos estados durante el ciclo de vida del proceso, hasta que o bien termina con su proceso del lado del cliente o es rechazado o abortado por algún error del proceso. En el siguiente diagrama se muestran esos estados que estarán visibles desde las vistas que ofrece Digitize.

![alt_text](./images/image88.png "flow_status")

### **Estados**

| Estado            | Mensaje                                   | Ícono | Descripción |
|------------------|---------------------------------|----------------|--------------|
| pending         | Pendiente de procesar          | ![pending](./images/pending.png "pending") | El documento está en cola para ser procesado. |
| converting      | Procesando                     | ![converting](./images/converting.png "converting") | El documento está siendo digitalizado y procesado. |
| converted       | Procesado                      | ![converted](./images/converted.png "converted") | El documento fue procesado y la información está lista. |
| imported     | El contenido del archivo ha sido importado | ![imported](./images/imported.png "imported")   | La información contenida en el archivo ha sido importada exitosamente. |
| matched      | Concilió contra AFIP                   | ![matched](./images/matched.png "matched")           | El documento fue conciliado correctamente contra AFIP. |
| error          | Error                          | ![error](./images/error.png "error") | Ocurrió un error en el procesamiento del documento. |
| not_matched | No concilió contra AFIP | ![not_matched](./images/not_matched.png "not_matched") | El documento no pudo ser conciliado con AFIP. |
| postponed    | Pendiente                           | ![postponed](./images/postponed.png "postponed")      | El documento fue postergado para su procesamiento en otro momento. |
| submitted       | Despachado                     | ![submitted](./images/submitted.png "submitted") | La información fue enviada a la URL del dispatcher para su procesamiento. |
| dispatched      | Disponible en el cliente       | ![dispatched](./images/dispatched.png "dispatched") | La información fue enviada y está disponible para el cliente. |
| queued         | Esperando                       | ![queued](./images/queued.png "queued") | El documento está en espera para iniciar el procesamiento posterior a la digitalización. |
| completed      | Proceso del cliente finalizado  | ![completed](./images/completed.png "completed") | El proceso posterior a la digitalización ha finalizado. |
| invalidated  | Documento invalidado manualmente    | ![invalidated](./images/invalidated.png "invalidated") | El documento fue invalidado manualmente por el usuario. |


Estos estados se visualizan desde el reporte de documentos:

![boton_reporte_documentos](./images/image27.png "boton_reporte_documentos")

En la columna estado:

![reporteDocumentos](./images/reporteDocumentos.png "reporte_documentos")

<br>

### Caso Práctico


#### ¿Cómo obtenemos el estado del procesamiento de un documento que fue enviado por e-mail?

El primer paso es acceder al reporte de emails desde la pantalla de inicio :

![alt_text](./images/home_emails.png "home_emails") 

Se mostrarán los correos procesados, y por cada adjunto descargado, aparecerá un registro: 
<br>

Las columnas muestran la fecha de recepción del e-mail, el remitente, el asunto, el nombre del adjunto, y el estado del proceso de descarga del adjunto. <br>

En la sección de acciones se puede descargar el archivo adjunto asociado ![alt_text](./images/descarga_comprobantes.png "descarga_documento"). En caso de que el documento ya se haya procesado, se podrá visualizar la información obtenida de la digitalización ![alt_text](./images/datos_comprobantes.png "datos_comprobantes"), y además tendrá un acceso directo al documento generado por el proceso ![alt_text](./images/informacion_proceso_documento.png "datos_proceso"), para poder visualizar el estado del ciclo de vida del mismo.
<br>
<br>
![alt_text](./images/reporte_emails.png "reporte_emails") 
<br>

Presionando ![alt_text](./images/informacion_proceso_documento.png "datos_proceso") se puede acceder a la pantalla de proceso del documento “Reporte de Documentos”:
<br>

![alt_text](./images/documento_filtrado.png "documento_filtrado")

De este modo podremos saber el estado de proceso del documento. Notar que se utilizó el filtro para seleccionar el documento en cuestión.

