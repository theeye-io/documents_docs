
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

### **Estados (figuran en la imagen del flujo)**

| Estado            | Mensaje                                     | Ícono | Descripción |
|------------------|---------------------------------|----------------|--------------|
| pending         | Pendiente de procesar          | ![alt_text](./images/pending.png "pending") | El documento se está procesando |
| converting      | Procesando                     | ![alt_text](./images/converting.png "converting") | El documento se está procesando |
| converted       | Procesado                      | ![alt_text](./images/converted.png "converted") | El documento fue procesado y la información está lista |
| error          | Error                          | ![alt_text](./images/error.png "error") | El proceso posterior a la digitalización finalizó con errores |
| not_matched_error | Error de conciliación con AFIP | ![alt_text](./images/not_matched.png "not_matched") | El proceso posterior a la digitalización finalizó con errores |
| submitted       | Despachado                     | ![alt_text](./images/submitted.png "submitted") | La información extraída del documento fue enviada a la URL del dispatcher |
| dispatched      | Disponible en el cliente       | ![alt_text](./images/dispatched.png "dispatched") | La información extraída del documento fue enviada a la URL del dispatcher |
| aborted        | **Falta definir**               | ![alt_text](./images/aborted.png "aborted") | **Falta definir** |
| queued         | Esperando                       | ![alt_text](./images/queued.png "queued") | Indica que está listo para comenzar el proceso posterior a la digitalización |
| completed      | Proceso del cliente finalizado  | ![alt_text](./images/completed.png "completed") | Indica el fin del proceso posterior a la digitalización |

---

### **Estados (no figuran en la imagen del flujo)**

| Estado          | Mensaje                             | Ícono | Descripción |
|---------------|---------------------------------|----------------|--------------|
| invalidated   | Documento invalidado manualmente | ![alt_text](./images/invalidated.png "invalidated") | El documento fue invalidado manualmente por un usuario |
| review        | Pendiente de revisión             | ![alt_text](./images/review.png "review") | El documento requiere una revisión manual antes de continuar |
| submit_error  | Error en carga del cliente        | ![alt_text](./images/error.png "submit_error") | Ocurrió un error al cargar el documento en el sistema del cliente |
| postponed     | Pendiente                         | ![alt_text](./images/postponed.png "postponed") | El documento fue postergado para su procesamiento en otro momento |
| matched       | Concilió con AFIP                 | ![alt_text](./images/matched.png "matched") | El documento fue conciliado correctamente con AFIP |
| imported      | El contenido del archivo fue importado | ![alt_text](./images/imported.png "imported") | La información contenida en el archivo fue importada exitosamente |


Estos estados se visualizan desde el reporte de documentos:


![alt_text](./images/image27.png "boton_reporte_documentos")

En la columna estado:

![alt_text](./images/reporteDocumentos.png "reporte_documentos")

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

