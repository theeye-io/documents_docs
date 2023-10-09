
# Digitize - Manual de Usuario

El usuario puede generar, gestionar y digitalizar comprobantes desde la web:

**<span style="text-decoration:underline;">https://digitize.theeye.io/home</span>**

El usuario debe ingresar al formulario con su usuario y contraseña.


![alt_text](./images/image61.png "image_tooltip")


### Menú principal 

Luego del Login el usuario accede al menú principal 


![alt_text](./images/image71.png "image_tooltip")


#### **Documentos Procesados**

Desde la sección *Documentos Procesados* se visualiza el historial de documentos digitalizados y obtienen reportes de los datos extraidos.

Las principales acciones

* reprocesar de documentos
* visualizar información obtenida por documento
* descargar los documentos originales enviados
* acceder a la información de la clasificación, plantillas utilizadas y el resultado del reconocimiento
* seleccionar documentos para crear plantillas automáticas

#### **Reporte de Mails**

En caso de que cuenten con la solución de recuperación de comprobantes desde una casilla de correo electrónico puede acceder a la sección *Reporte de Mails* podrá visualizar la información de los correos electrónicos recibidos.
El ícono se encuentra oculto hasta activar la integración de MailBot.

#### **Subir Documentos**

Desde la sección *Subir Documentos* se importan los documentos para digitalizar.
A partir de los documentos importados se generan las plantillas.

#### **Plantillas**

En la sección *Plantillas* puede visualizar el listado de plantillas "templates" disponibles.

Otras acciones disponibles

* editar
* exportar / importar
* activar plantillas

#### **Configuración**

En la sección *Configuración* se accede a parámetros adicionales que modifican el proceso de extración de información de los documentos.


### Documentos Procesados

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



### Plantillas

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



