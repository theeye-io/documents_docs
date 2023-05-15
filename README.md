# **Introducción**

Reconocimiento de comprobantes de TheEye es una herramienta que permite definir plantillas de reconocimiento de documentos , las cuales son utilizadas para reconocer comprobantes del mismo tipo. Mediante las distintas integraciones es posible trabajar tanto con la obtención de los documentos como con los resultados para utilizarlos en distintos sistemas.


## Funcionalidades y características de Reconocimiento de comprobantes de TheEye



* Permite definir la estructura de los comprobantes cuya información se desea digitalizar, mediante la creación de de plantillas
* Obtención de datos de comprobantes a través de filtros y/o patrones
* Reconocimiento y digitalización de los comprobantes cuya estructura ha sido definida de manera automática y manual
* Capacidad de trabajar con múltiples páginas
* Integraciones
    * Toma de comprobantes desde casillas de correo
    * Envío de comprobantes y resultados vía API
    * conciliación contra AFIP (Argentina)


## Objetivos

Describir cómo crear y utilizar plantillas de reconocimiento de comprobantes 


# **Manual de Usuario**

El usuario puede generar, gestionar y digitalizar comprobantes desde la web:

**<span style="text-decoration:underline;">https://digitize.theeye.io/home</span>**

El usuario debe ingresar al formulario con su usuario y contraseña.


![alt_text](./images/image61.png "image_tooltip")



## Menú principal 

Una vez logeado el usuario podrá visualizar el siguiente menú principal: 


![alt_text](./images/image71.png "image_tooltip")


**Reporte de Documentos**: El usuario puede visualizar el historial de documentos digitalizados y obtener un reporte con los datos obtenidos. Desde esta sección puede también procesar los documentos, visualizar la información obtenida, descargar el documento reconocido y acceder a  modificar la planilla. 

**Reporte de Mails:** En caso de que cuenten con una solución donde los comprobantes son recuperados y descargados desde una casilla de correo el usuario podrá visualizar la información de los e-mails recibidos.

**Subir Documentos:** El usuario puede importar nuevos documentos para digitalizar y/o generar plantillas.

**Plantillas:** El usuario puede visualizar el listado de plantillas “templates” de documentos y modificar las plantillas, así como también puede habilitar o deshabilitar cualquier de ellas.

**Salir:** Cierra la sesión del usuario.


## Reportes de Documentos procesados

Los estados de los documentos se pueden visualizar en la sección de “Reporte de Documentos”


![alt_text](./images/image21.png "image_tooltip")


Donde se visualiza el listado de documentos digitalizados.


![alt_text](./images/image56.png "image_tooltip")



### **Estados:**

| Estado | Símbolo | Descripcion | 
|--------|---------|-------------|
| Procesando| ![alt_text](./images/image46.png "image_tooltip") | El proceso de reconocimiento y obtención de datos está en curso.|
| Procesado | ![alt_text](./images/image20.png "image_tooltip") | El proceso de reconocimiento finalizó con éxito. |
| Error | ![alt_text](./images/image53.png "image_tooltip") | El comprobante no pudo ser procesado. |



### **Coincidencias:**

| Coincidencias | Símbolo de Estado | Descripción |
|---------------|-------------------|-------------|
| **%** | ![alt_text](./images/image12.png "image_tooltip") | Indica el grado de coincidencia obtenido, respecto de la plantilla seleccionada por el proceso de reconocimiento. |



### **Acciones:**

| Estado | Símbolo | Descripcion | 
|--------|---------|-------------|
| Reprocesar | ![alt_text](./images/image34.png "image_tooltip") | Permite volver a procesar un comprobante ya digitalizado. Se puede utilizar para verificar que se hayan aplicado los cambios realizados en las plantillas. |
| Información obtenida| ![alt_text](./images/image43.png "image_tooltip") | Permite visualizar en pantalla la información reconocida del comprobante importado. |
| Descargar documento | ![alt_text](./images/descarga_comprobantes.png "descarga_documento") | Permite descargar el comprobante importado. (formato pdf) |
| Editar plantilla | ![alt_text](./images/image77.png "image_tooltip") | Permite editar plantilla modelo con el formato de comprobante |
| Visualizar plantilla | ![alt_text](./images/image25.png "image_tooltip") | Permite solo ver la plantilla modelo sobre el comprobante procesado |
| Procesar manualmente | ![alt_text](./images/image84.png "image_tooltip") | Permite completar a mano datos faltantes de un comprobante en particular. |




## Plantilla

El listado de plantillas (templates) creados se puede visualizar en la sección “Plantillas”


![alt_text](./images/image66.png "image_tooltip")
 

![alt_text](./images/image57.png "image_tooltip")


Seleccionar “Activar” ![alt_text](./images/image10.png "image_tooltip") para habilitar o deshabilitar una plantilla

Al seleccionar ![alt_text](./images/image14.png "image_tooltip") se visualiza el editor de la plantilla.

![alt_text](./images/image70.png "image_tooltip")

### **Acciones**

| Acciones |Símbolo | Descripción |
|----------|--------|-------------|
| Menú de edición | ![alt_text](./images/image54.png "image_tooltip") | Abrir el menú de edición para agregar los filtros y etiquetas del template. Ver ¿Cómo hago para digitalizar un documento? |
| Guardar template | ![alt_text](./images/image60.png "image_tooltip") | Guardar el template asignando un nombre. |
| Quitar etiquetas | ![alt_text](./images/image11.png "image_tooltip") | Visualizar o no las etiquetas creadas. |
| Mostrar información de reconocimiento IA | ![alt_text](./images/image15.png "image_tooltip") | Visualizar o no la información de reconocimiento de IA. |
| Ajuste de pantalla | ![alt_text](./images/image50.png "image_tooltip") | Permite acercar, alejar o ajustar la visualización del documento en pantalla. |


Dentro del menú de edición: 

**Sección configuración general**


| Acciones | Símbolo | Descripción |
| -------- | ------- |-------------|
| Exportar plantilla | ![alt_text](./images/image6.png "image_tooltip") | Permite exportar la plantilla en formato .json |
| Importar plantilla | ![alt_text](./images/image37.png "image_tooltip") | Permite importar una plantilla en formato .json |
| Cambiar nombre | ![alt_text](./images/image31.png "image_tooltip") | Permite cambiar el nombre a la plantilla  |
| Multipágina | ![alt_text](./images/image52.png "image_tooltip") | Habilita el reconocimiento de varias páginas. <br>Se debe activar para poder digitalizar documentos con N páginas. |
| Eliminar plantilla | ![alt_text](./images/image8.png "image_tooltip") | Permite eliminar de forma permanente la plantilla |
| Definir como plantilla por defecto | ![alt_text](./images/image67.png" image_tooltip") | Permite definir a la plantilla como predeterminada. |



**Sección reglas de extracción**

Permite crear reglas de extracción de datos.

 Ver ¿Como crear una plantilla ?


![alt_text](./images/image33.png "image_tooltip") ![alt_text](./images/image58.png "image_tooltip")



## Reporte de eMails (integración)


![alt_text](./images/image23.png "image_tooltip")


## Subir Documentos (integración)


![alt_text](./images/image3.png "image_tooltip")



# FAQs - Preguntas frecuentes


## ¿Cómo crear una nueva plantilla?

Para digitalizar un documento lo primero que debemos hacer es crear una plantilla, para ello será necesario contar con varias copias del tipo de documento que deseamos digitalizar.

Se recomienda comenzar con al menos diez copias del mismo tipo de documento, aunque el proceso puede realizarse con menos cantidad. En esta instancia es importante darle un nombre a los archivos que identifique su tipo. En el ejemplo utilizaremos “AFIP_B” como prefijo de todos los nombres de documentos, para indicar que todos ellos son del mismo tipo (estructura).

Lo primero que debemos hacer es es cargar los documentos del mismo tipo en la plataforma del siguiente modo:

Ir a la sección “Subir Documentos”.


![alt_text](./images/image3.png "image_tooltip")


Arrastrar o seleccionar los documentos a digitalizar


![alt_text](./images/image51.png "image_tooltip")


El progreso de la carga se visualiza a medida que los documentos son cargados:


![alt_text](./images/image74.png "image_tooltip")


Una vez cargados los documentos, procedemos a crear una plantilla de clasificación, para ello debemos:

1- Ir a la sección “Documentos procesados“ para visualizar los documentos cargados


![alt_text](./images/image48.png "image_tooltip")


2- Verificar que los documentos se han cargado y seleccionarlos.

Notar que el campo “coincidencias” así como también el campo “plantilla” están vacíos,  esto significa que no se pudo reconocer el documento porque no tiene ningún template creado para ese tipo de documento.


![alt_text](./images/image30.png "image_tooltip")


Seleccionar los documentos:


![alt_text](./images/image83.png "image_tooltip")


3- Generar la  plantilla, haciendo click en “Generar plantilla”


![alt_text](./images/image4.png "image_tooltip")


Al darle click a “Generar plantilla” la plataforma creará una plantilla, que servirá para identificar todos los documentos del mismo tipo.


![alt_text](./images/image55.png "image_tooltip")


 La plantilla aparecerá en la sección de plantillas con un nombre genérico como por ejemplo “plantilla autogenerada 1674073143726”.

Una vez creada la plantilla autogenerada, deberemos editarla para indicarle los datos a digitalizar y darle un nombre representativo

Ir a plantillas:


![alt_text](./images/image66.png "image_tooltip")


Buscar la última generada:


![alt_text](./images/image79.png "image_tooltip")


Luego editar la plantilla mediante la acción 

Se visualizará uno de los documentos cargados en “modo plantilla”:


![alt_text](./images/image81.png "image_tooltip")


Se recomienda cambiar el nombre utilizando el “lápiz” para dejarle un nombre representativo


![alt_text](./images/image59.png "image_tooltip")


Por cada dato de interés se debe crear una etiqueta. Para ello se debe seleccionar el dato encuadrando con el puntero del mouse, tal como se muestra a continuación:


![alt_text](./images/image38.png "image_tooltip")


Una vez encuadrado el dato, se le debe dar un nombre  a la etiqueta y luego presionar ”OK”

En el menú derecho se mostrará la nueva etiqueta creada. Se puede editar seleccionando el filtro  desde el menú derecho para establecer configuraciones adicionales.


![alt_text](./images/image7.png "image_tooltip")


**Formato:** se le puede indicar el formato de acuerdo al tipo de dato. Por ejemplo, si es un número, importe, fecha o carácter se le aplicará el formato de acuerdo al tipo de dato. 

**Expresión regular:** para los usuarios con conocimiento de programación, se puede escribir una expresión regular para filtrar la información capturada. 

**Define estructura:** Es un dato de clasificación que se utiliza para decidir qué plantilla utilizar en el proceso de reconocimiento. 

**La posición no es fija:** El dato a reconocer puede variar en posición dentro del documento. 

Por ejemplo, los importes totales de un comprobante pueden variar en posición dependiendo de la cantidad de ítems que haya en la descripción o incluso dependiendo de la cantidad de hojas que tiene el documento. 

**Ocurrencia múltiple**: Al marcarla, el proceso de reconocimiento, utilizará el patrón definido en la expresión regular y cada vez que se cumpla, sumará la coincidencia a un listado de valores. En caso de no estar marcado devolverá un único dato con la primera ocurrencia que coincida con el patrón de la expresión regular.


![alt_text](./images/image13.png "image_tooltip") Borrar: borrar el filtro.


![alt_text](./images/image35.png "image_tooltip")
Filtros adicionales:  permite seleccionar las palabras a incluir o excluir al momento de obtener el dato.

Arrastrar las palabras que desea excluir o incluir y seleccionar Aceptar.


![alt_text](./images/image73.png "image_tooltip")


**Validar:** permite previsualizar el dato a digitalizar. Al hacer click en Validar, nos mostrará en el documento, el valor seleccionado y en caso de haberle aplicado filtros de formato, el valor formateado


![alt_text](./images/image41.png "image_tooltip")


 

Repetir los pasos anteriores para identificar todos los datos a reconocer en el documento. 

Guardar el template armado seleccionando ![alt_text](./images/image60.png "image_tooltip")


Seleccionar guardar.


![alt_text](./images/image19.png "image_tooltip")


Asignar un nombre al template.


![alt_text](./images/image64.png "image_tooltip")


Al guardar el template correctamente se muestra el mensaje:


![alt_text](./images/image65.png "image_tooltip")


Si no se detectaron cambios para guardar se muestra el mensaje: 


![alt_text](./images/image86.png "image_tooltip")


En caso de querer capturar datos de páginas siguientes se deberá repetir el procedimiento para las siguientes páginas. Para avanzar o retroceder de página se deben utilizar las flechas ![alt_text](./images/image32.png "image_tooltip")

Cada modificación que se realice en cada una de las páginas debe ser guardada, utilizando la opción de guardar 


![alt_text](./images/image16.png "image_tooltip")



### ¿Cómo digitalizar un documento?

cargar los documentos del mismo tipo en la plataforma del siguiente modo:

Ir a la sección “Subir Documentos”.


![alt_text](./images/image3.png "image_tooltip")


Arrastrar o seleccionar los documentos a digitalizar.Se pueden importar varios documentos a la vez.


![alt_text](./images/image51.png "image_tooltip")


El progreso de la carga se visualiza a medida que los documentos son cargados:


![alt_text](./images/image74.png "image_tooltip")


Una vez cargados los documentos, procedemos a revisar el estado de los documentos.

#### 1- Ir a la sección “Documentos procesados“ para visualizar los documentos cargados


![alt_text](./images/image48.png "image_tooltip")


#### 2- Verificar que los documentos se han cargado y reconocido.

Si los documento fueron reconocidos con excitó su estado será ![alt_text](./images/image20.png "image_tooltip") “Procesado”, tendrán asignado una PLANTILLA y un valor de COINCIDENCIA. 

Seleccionando en ![alt_text](./images/image43.png "image_tooltip")
 “Información obtenida “ se pueden visualizar los datos extraidos. 


![alt_text](./images/image56.png "image_tooltip")



![alt_text](./images/image68.png "image_tooltip")



### ¿Cómo verificar los datos obtenidos por la plantilla creada ?

Dirigirse a la sección “Reporte de documentos”  para verificar los resultados de las plantillas creadas, haciendo clic en el ícono de ThEye:


![alt_text](./images/image9.png "image_tooltip")
  

Y luego en:


![alt_text](./images/image27.png "image_tooltip")


Luego procesar el documento en cuestión. ![alt_text](./images/image34.png "image_tooltip"). 


![alt_text](./images/image22.png "image_tooltip")
 

![alt_text](./images/image47.png "image_tooltip")


Una vez procesado, se visualiza la plantilla reconocida, el porcentaje de coincidencia y el estado.


![alt_text](./images/image18.png "image_tooltip")


Se pueden verificar los resultados (datos obtenidos) haciendo click en el ícono de información ![alt_text](./images/image85.png "image_tooltip")



![alt_text](./images/image17.png "image_tooltip")


Verificamos los datos obtenidos:


![alt_text](./images/image69.png "image_tooltip")


La información obtenida muestra todos los datos etiquetados y reconocidos de acuerdo a la plantilla aplicada.


### ¿Cómo modificar una plantilla existente ?

En caso de que la información obtenida no sea acorde con la información buscada, habrá que modificar la plantilla creada.

Existen 2 formas de acceder a una plantilla existente, ya sea desde la sección de plantillas o desde la sección de “Reporte de documentos”

**Desde la sección de Reporte de Documentos**, podemos ubicar la plantilla utilizando el filtro por documento (con el que se armó la plantilla) o bien con el nombre de la plantilla


![alt_text](./images/image75.png "image_tooltip")


Desde la sección de Plantillas, podemos buscar utilizando el filtro con el nombre de la plantilla:


![alt_text](./images/image1.png "image_tooltip")


Luego debemos hacer click en el ícono de edición de plantillas ![alt_text](./images/image77.png "image_tooltip")

Nos llevará a la misma pantalla donde creamos la plantilla:


![alt_text](./images/image26.png "image_tooltip")


Podemos editar o agregar etiquetas del mismo modo en que se hizo al momento de la creación:


![alt_text](./images/image62.png "image_tooltip")


Una vez realizado los cambios, recordar guardar las modificaciones, utilizando el ícono del disco: 


![alt_text](./images/image16.png "image_tooltip")



#### **¿Cómo modificar la etiqueta de un bloque?**

Una vez dentro del modo edición de la plantilla, en el menu reglas de extraccion, seleccionar el lapiz del bloque que a cambiar: 


![alt_text](./images/image72.png "image_tooltip")


Cambiar el nombre, seleccionar el tilde 


![alt_text](./images/image24.png "image_tooltip")


Guardar el template: 


![alt_text](./images/image42.png "image_tooltip")



### ¿Cómo descargar reportes de documentos ? 

Dirigirse a la sección “Reporte de documentos”  para verificar los resultados de las plantillas creadas, haciendo clic en el ícono de TheEye:


![alt_text](./images/image9.png "logo_theeye")
  

Y luego en:


![alt_text](./images/image27.png "reporte_documentos")


Desde la pantalla de reportes, seleccionar un rango de fechas:


![alt_text](./images/image63.png "image_tooltip")


Luego hacer clic en ![alt_text](./images/image40.png "image_tooltip")

Se descargará un listado de comprobantes en formato EXCEL, como por ejemplo:


![alt_text](./images/image39.png "image_tooltip")



![alt_text](./images/image78.png "image_tooltip")


Pueden resultar de interés los campos:
* “**Original_name**”: Nombre de archivo con el que se subió el comprobante.
* “**Classification_label**”: Nombre de la plantilla utilizada
* “**Creation_date**”: Fecha de creación del documento

<br>
<br>

# **Trazabilidad**
Cuando el ingreso de documentos a digitalizar se realiza mediante un proceso automático, puede ser necesario realizar el segumiento del proceso de digitialización de cada uno de los documentos ingresados. Digitize tiene integrada la incorporación de documentos a través de correos electrónicos.<br>
El flujo responde al siguiente diagrama:

![alt_text](./images/image87.png "flow")

<br>
Cada documento pasa por distintos estados durante el ciclo de vida del proceso, hasta que o bien termina con su proceso del lado del cliente o es rechazado o abortado por algún error del proceso. En el siguiente diagrama se muestran esos estados que estarán visibles desde las vistas que ofrece Digitize.


![alt_text](./images/image88.png "flow_status")



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

## Caso Práctico
### ¿Cómo hacemos para obtener el estado del procesamiento de un documento que fué enviado a  por e-mail?

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
