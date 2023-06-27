
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



## ¿Cómo digitalizar un documento?

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



## ¿Cómo verificar los datos obtenidos por la plantilla creada ?

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


## ¿Cómo modificar una plantilla existente ?

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



## ¿Cómo modificar la etiqueta de un bloque?

Una vez dentro del modo edición de la plantilla, en el menu reglas de extraccion, seleccionar el lapiz del bloque que a cambiar: 


![alt_text](./images/image72.png "image_tooltip")


Cambiar el nombre, seleccionar el tilde 


![alt_text](./images/image24.png "image_tooltip")


Guardar el template: 


![alt_text](./images/image42.png "image_tooltip")



## ¿Cómo descargar reportes de documentos ? 

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


