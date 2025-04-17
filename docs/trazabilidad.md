# Trazabilidad

### Flujos de procesamiento de un comprobante

Cuando el ingreso de documentos a digitalizar se realiza mediante un proceso automático, puede ser necesario realizar el seguimiento del proceso de digitalización de cada uno de los documentos ingresados.

#### Correo Electrónico

Digitai tiene integrada la importación de documentos a través de la lectura de casillas de correo electrónico.

El flujo responde al siguiente diagrama:

![flow](./public/images/image87.png)

---

#### API

Digitai tiene una API que permite importar documentos directamente desde otro sistema y la opción de recibir por Webhook la información extraída al finalizar su procesamiento.

El flujo responde al siguiente diagrama:

![flow](./public/images/image98.png)

### Ciclo de vida de un documento

Cada documento pasa por distintos estados durante el ciclo de vida del proceso, hasta que o bien termina con su proceso del lado del cliente o es rechazado o abortado por algún error del proceso. En el siguiente diagrama se muestran esos estados que estarán visibles desde las vistas que ofrece Digitai.

![flow_status](./public/images/image102.png)


### **Estados**

| Estado            | Detalle                                   | Ícono | Descripción |
|------------------|---------------------------------|----------------|--------------|
| pending         | Pendiente de procesar          | ![pending](./public/images/pending.png) | Documento en recepción. Pendiente de ser procesado. |
| converting     | Procesando                     | ![converting](./public/images/converting.png) | El documento está siendo procesado. |
| converted       | Procesado                      | ![converted](./public/images/converted.png) | Datos extraídos. Puede requerir intervención. |
| imported     | El contenido del archivo ha sido importado | ![imported](./public/images/imported.png)   | Importación finalizada. |
| error          | Error                          | ![error](./public/images/error.png) | El proceso posterior a la digitalización finalizó con errores. Reportar. |
| postponed    | Postergado                           | ![postponed](./public/images/postponed.png)      | El documento fue postergado para su procesamiento en otro momento. |
| submitted/dispatched       | Entregado al cliente          | ![submitted](./public/images/submitted.png) | La información extraída del documento está disponible en el cliente. |
| queued         | Esperando                       | ![queued](./public/images/queued.png) | Información lista y a la espera de ser cargada en el sistema del cliente. |
| completed      | Proceso del cliente finalizado  | ![completed](./public/images/completed.png) | La información fue procesada exitosamente por el cliente. |
| invalidated  | Documento invalidado manualmente    | ![invalidated](./public/images/invalidated.png) | El documento fue invalidado manualmente por el usuario. |


Estos estados se visualizan desde el reporte de documentos:

![boton_reporte_documentos](./public/images/image27.png)

En la columna estado:

![reporte_documentos](./public/images/reporteDocumentos.png)

<br>

### Caso Práctico

#### ¿Cómo obtenemos el estado del procesamiento de un documento que fue enviado por e-mail?

El primer paso es acceder al reporte de emails desde la pantalla de inicio:

![home_emails](./public/images/home_emails.png) 

Se mostrarán los correos procesados, y por cada adjunto descargado, aparecerá un registro:
<br>

Las columnas muestran la fecha de recepción del e-mail, el remitente, el asunto, el nombre del adjunto, y el estado del proceso de descarga del adjunto. <br>

En la sección de acciones se puede descargar el archivo adjunto asociado ![descarga_documento](./public/images/descarga_comprobantes.png). En caso de que el documento ya se haya procesado, se podrá visualizar la información obtenida de la digitalización ![datos_comprobantes](./public/images/datos_comprobantes.png), y además tendrá un acceso directo al documento generado por el proceso ![datos_proceso](./public/images/informacion_proceso_documento.png), para poder visualizar el estado del ciclo de vida del mismo.
<br>
<br>
![reporte_emails](./public/images/reporte_emails.png) 
<br>

Presionando ![datos_proceso](./public/images/informacion_proceso_documento.png) se puede acceder a la pantalla de proceso del documento "Reporte de Documentos":
<br>

![documento_filtrado](./public/images/documento_filtrado.png)

De este modo podremos saber el estado de proceso del documento. Notar que se utilizó el filtro para seleccionar el documento en cuestión. 