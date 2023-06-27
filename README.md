
# Digitize - Digitalizador de comprobantes

## Introducción

Reconocimiento de comprobantes de TheEye es una herramienta que permite definir plantillas de reconocimiento de documentos , las cuales son utilizadas para reconocer comprobantes del mismo tipo. Mediante las distintas integraciones es posible trabajar tanto con la obtención de los documentos como con los resultados para utilizarlos en distintos sistemas.

### Funcionalidades y características de Reconocimiento de comprobantes de TheEye

* Permite definir la estructura de los comprobantes cuya información se desea digitalizar, mediante la creación de de plantillas
* Obtención de datos de comprobantes a través de filtros y/o patrones
* Reconocimiento y digitalización de los comprobantes cuya estructura ha sido definida de manera automática y manual
* Capacidad de trabajar con múltiples páginas
* Integraciones
    * Toma de comprobantes desde casillas de correo
    * Envío de comprobantes y resultados vía API
    * conciliación contra AFIP (Argentina)


### Objetivos

Describir cómo crear y utilizar plantillas de reconocimiento de comprobantes 


## Manual de Usuario

El usuario puede generar, gestionar y digitalizar comprobantes desde la web:

**<span style="text-decoration:underline;">https://digitize.theeye.io/home</span>**

El usuario debe ingresar al formulario con su usuario y contraseña.


![alt_text](./images/image61.png "image_tooltip")


### Menú principal 

Una vez logeado el usuario podrá visualizar el siguiente menú principal: 


![alt_text](./images/image71.png "image_tooltip")


**Reporte de Documentos**: El usuario puede visualizar el historial de documentos digitalizados y obtener un reporte con los datos obtenidos. Desde esta sección puede también procesar los documentos, visualizar la información obtenida, descargar el documento reconocido y acceder a  modificar la planilla. 

**Reporte de Mails:** En caso de que cuenten con una solución donde los comprobantes son recuperados y descargados desde una casilla de correo el usuario podrá visualizar la información de los e-mails recibidos.

**Subir Documentos:** El usuario puede importar nuevos documentos para digitalizar y/o generar plantillas.

**Plantillas:** El usuario puede visualizar el listado de plantillas “templates” de documentos y modificar las plantillas, así como también puede habilitar o deshabilitar cualquier de ellas.

**Salir:** Cierra la sesión del usuario.


### Reportes de Documentos procesados

Los estados de los documentos se pueden visualizar en la sección de “Reporte de Documentos”


![alt_text](./images/image21.png "image_tooltip")


Donde se visualiza el listado de documentos digitalizados.


![alt_text](./images/image56.png "image_tooltip")



#### Estados

| Estado | Símbolo | Descripcion | 
|--------|---------|-------------|
| Procesando| ![alt_text](./images/image46.png "image_tooltip") | El proceso de reconocimiento y obtención de datos está en curso.|
| Procesado | ![alt_text](./images/image20.png "image_tooltip") | El proceso de reconocimiento finalizó con éxito. |
| Error | ![alt_text](./images/image53.png "image_tooltip") | El comprobante no pudo ser procesado. |



#### Coincidencias

| Coincidencias | Símbolo de Estado | Descripción |
|---------------|-------------------|-------------|
| **%** | ![alt_text](./images/image12.png "image_tooltip") | Indica el grado de coincidencia obtenido, respecto de la plantilla seleccionada por el proceso de reconocimiento. |



#### Acciones

| Estado | Símbolo | Descripcion | 
|--------|---------|-------------|
| Reprocesar | ![alt_text](./images/image34.png "image_tooltip") | Permite volver a procesar un comprobante ya digitalizado. Se puede utilizar para verificar que se hayan aplicado los cambios realizados en las plantillas. |
| Información obtenida| ![alt_text](./images/image43.png "image_tooltip") | Permite visualizar en pantalla la información reconocida del comprobante importado. |
| Descargar documento | ![alt_text](./images/descarga_comprobantes.png "descarga_documento") | Permite descargar el comprobante importado. (formato pdf) |
| Editar plantilla | ![alt_text](./images/image77.png "image_tooltip") | Permite editar plantilla modelo con el formato de comprobante |
| Visualizar plantilla | ![alt_text](./images/image25.png "image_tooltip") | Permite solo ver la plantilla modelo sobre el comprobante procesado |
| Procesar manualmente | ![alt_text](./images/image84.png "image_tooltip") | Permite completar a mano datos faltantes de un comprobante en particular. |



### Plantilla

El listado de plantillas (templates) creados se puede visualizar en la sección “Plantillas”


![alt_text](./images/image66.png "image_tooltip")
 

![alt_text](./images/image57.png "image_tooltip")


Seleccionar “Activar” ![alt_text](./images/image10.png "image_tooltip") para habilitar o deshabilitar una plantilla

Al seleccionar ![alt_text](./images/image14.png "image_tooltip") se visualiza el editor de la plantilla.

![alt_text](./images/image70.png "image_tooltip")

#### Acciones

| Acciones |Símbolo | Descripción |
|----------|--------|-------------|
| Menú de edición | ![alt_text](./images/image54.png "image_tooltip") | Abrir el menú de edición para agregar los filtros y etiquetas del template. Ver ¿Cómo hago para digitalizar un documento? |
| Guardar template | ![alt_text](./images/image60.png "image_tooltip") | Guardar el template asignando un nombre. |
| Quitar etiquetas | ![alt_text](./images/image11.png "image_tooltip") | Visualizar o no las etiquetas creadas. |
| Mostrar información de reconocimiento IA | ![alt_text](./images/image15.png "image_tooltip") | Visualizar o no la información de reconocimiento de IA. |
| Ajuste de pantalla | ![alt_text](./images/image50.png "image_tooltip") | Permite acercar, alejar o ajustar la visualización del documento en pantalla. |


Dentro del menú de edición: 

##### Sección configuración general

| Acciones | Símbolo | Descripción |
| -------- | ------- |-------------|
| Exportar plantilla | ![alt_text](./images/image6.png "image_tooltip") | Permite exportar la plantilla en formato .json |
| Importar plantilla | ![alt_text](./images/image37.png "image_tooltip") | Permite importar una plantilla en formato .json |
| Cambiar nombre | ![alt_text](./images/image31.png "image_tooltip") | Permite cambiar el nombre a la plantilla  |
| Multipágina | ![alt_text](./images/image52.png "image_tooltip") | Habilita el reconocimiento de varias páginas. <br>Se debe activar para poder digitalizar documentos con N páginas. |
| Eliminar plantilla | ![alt_text](./images/image8.png "image_tooltip") | Permite eliminar de forma permanente la plantilla |
| Definir como plantilla por defecto | ![alt_text](./images/image67.png" image_tooltip") | Permite definir a la plantilla como predeterminada. |


##### Sección reglas de extracción

Permite crear reglas de extracción de datos.

 Ver ¿Como crear una plantilla ?


![alt_text](./images/image33.png "image_tooltip") ![alt_text](./images/image58.png "image_tooltip")


### Reporte de eMails (integración)


![alt_text](./images/image23.png "image_tooltip")


### Subir Documentos (integración)


![alt_text](./images/image3.png "image_tooltip")


## Trazabilidad

### Flujos de procesamiento de un comprobante

Cuando el ingreso de documentos a digitalizar se realiza mediante un proceso automático, puede ser necesario realizar el segumiento del proceso de digitialización de cada uno de los documentos ingresados.

<!-- tabs:start -->
##### **Correo Electrónico**

Digitize tiene integrada la incorporación de documentos a través de correos electrónicos.<br>
El flujo responde al siguiente diagrama:

![alt_text](./images/image87.png "flow")

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
