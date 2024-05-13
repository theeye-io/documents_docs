
# DigitAI - Trazabilidad

### Flujos de procesamiento de un comprobante

Cuando el ingreso de documentos a digitalizar se realiza mediante un proceso automático, puede ser necesario realizar el segumiento del proceso de digitialización de cada uno de los documentos ingresados.

<!-- tabs:start -->
##### **Correo Electrónico**

Digitize tiene integrada la importación de documentos a través de la lectura de casillas de correo electrónico.<br>
El flujo responde al siguiente diagrama:

![alt_text](./images/image87.png "flow")

##### **API**

Digitize tiene API que permite importar documentos directamente desde otro sistema y la opción de recibir por Webhook la información extraida al finalizar su procesamiento <br>
El flujo responde al siguiente diagrama:

![alt_text](./images/image98.png "flow")
<!-- tabs:end -->

### Ciclo de vida de un documento

Cada documento pasa por distintos estados durante el ciclo de vida del proceso, hasta que o bien termina con su proceso del lado del cliente o es rechazado o abortado por algún error del proceso. En el siguiente diagrama se muestran esos estados que estarán visibles desde las vistas que ofrece Digitize.

![alt_text](./images/image88.png "flow_status")

#### Estados

| Estado | Ícono | Descripción |
| -------- | ------- |-------------|
| converting | ![alt_text](./images/image46.png "converting") | El documento se está procesando |
| submitted | ![alt_text](./images/submitted.png "submitted") | Es necesario tomar acciones del lado del cliente en caso de que la conciliación este activada |
| queued | ![alt_text](./images/queued.png "qeued") | Indica que está listo para comenzar el proceso posterior a la digitalización  |
| completed | ![alt_text](./images/image12.png "completed") | Indica fin del proceso posterior a la digitalización |
| aborted | ![alt_text](./images/aborted.png "aborted") | El proceso posterior a la digitalización no se pudo completar |
| error | ![alt_text](./images/image53.png " error") | El proceso posterior a la digitalización finalizó con errores |

Estos estados se visualizan desde el reporte de documentos:

![alt_text](./images/image27.png "boton_reporte_documentos")

En la columna estado:

![alt_text](./images/reporteDocumentos.png "reporte_documentos")

<br>

### Caso Práctico

#### ¿Cómo hacemos para obtener el estado del procesamiento de un documento que fué enviado a  por e-mail?

El primer paso es acceder al reporte de eMails desde la pantalla de inicio :

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

