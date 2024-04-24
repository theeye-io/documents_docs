
# FAQs - Preguntas frecuentes



## ¿Cómo digitalizar un documento?

Cargar los documentos del mismo tipo en la plataforma del siguiente modo:

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

Dirigirse a la sección "Reporte de documentos" para verificar los resultados de las plantillas creadas, haciendo clic en el ícono de TheEye.


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

## ¿Cómo descargar reportes de documentos ? 

Dirigirse a la sección "Reporte de documentos" para verificar los resultados de las plantillas creadas, haciendo clic en el logo de TheEye.

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


## ¿Cómo cambiar el documento base de la plantilla?

Para cambiar el documento base de la plantilla hay que exportar y volver a importar la plantilla sobre el nuevo documento base.

El primer paso es exportar la plantilla. Esto se logra con el botón `Exportar plantilla` que se encuentra en la sección general de la pantalla de edición de plantillas.

![alt_text](./images/image91.png "image_tooltip")

El segundo paso es identificar el documento en la pantalla de documentos procesados y haciendo click en el botón de 3 puntitos de la derecha, elegir la última opción del menú desplegable, importar plantilla

![alt_text](./images/image92.png "image_tooltip")

Después de hacer esto se deberia borrar o deshabilitar la plantilla anterior, así les queda una sola versión.

Si necesitan por una única vez ver como una plantilla afecta a un documento, pueden visualizarla con el botón del ojo en el menú del documento

![alt_text](./images/image89.png "image_tooltip")

## ¿Cuál es la diferencia entre los filtros de número, importe y moneda?

- Número: este filtro recibe un string y remueve todos los símbolos dejando solo números.
- Importe: verifica que el valor sea un importe válido. si es válido lo convierte a un importe con separador decimal punto.
- Moneda: verifica que un texto encontrado se corresponda con un valor de moneda conocido, como puede ser USD, dólar, ARS o peso.

El filtro de importe tiene en cuenta los símbolos separadores de decimales y de miles.
 
