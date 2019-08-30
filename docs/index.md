# Que es Tagger ?

Tagger de The Eye es una herramienta que permite de forma automática reconocer información contenida en comprobantes de la República Argentina. Mediante técnicas de Inteligencia Artificial, el sistema es capaz reconocer y extraer la información relevante de los documentos con mucha precisión. Tagger usa The Eye como orquestador, lo que le permite integrarse a cualquier ERP y cargar la información extraída automáticamente, con baja intervención manual reduciendo el tiempo de carga.

Actualmente el sistema fue entrenado para extraer la información de los siguientes tipos de comprobantes:

* Facturas

* Notas de Crédito

* Notas de Débito

La precisión del reconocimiento varía según la calidad del documento a reconocer. Los mejores resultados se obtienen con documentos Digitales, como por ejemplo las facturas de AFIP. Las principales características que influyen en la precisión del proceso son:

* Nitidez

* Alineación del texto en relación a los bordes

* Alineación de los datos

* Manchas, rayones

* Ubicación y formato del texto

* Digital o manuscrita

En caso de ser un escaneos, la nitidez, alineación, manchas, imágenes de fondo, etc. influyen mucho en el reconocimiento y la probabilidad de fallar o no detectar la información es mucho mayor.

Luego de leerse y procesarse los documentos, el sistema verifica si la información extraída es correcta. En caso de encontrarse información incorrecta, que se detecten inconsistencias o falta de información, el usuario deberá validar el documento usando la interfaz de revisión.



# Validación y corrección de datos de un comprobante

Cuando los comprobantes pasan por el proceso de reconocimiento pueden requerir revisión manual para validar los datos encontrados. Esta validación se realiza desde una interfaz Web como la que se muestra en la siguiente imagen:


![](https://github.com/theeye-io/documents_docs/blob/master/docs/files/contags%20sintags.gif?raw=true)


Cada uno de los datos detectados del comprobante está representado por un **tag**  o etiqueta (e.g. cuitProveedor, razonSocialProveedor). El dato marcado con cada tag puede ser corregido o incluso re-asignado a otro tag usando la interfaz. A continuación se muestra cómo asignar y/o corregir un tag.


![](https://github.com/theeye-io/documents_docs/blob/master/docs/files/taggear%20texto.gif?raw=true)

Para seleccionar texto y asignarle un tag, se debe hacer click y arrastrar formando un cuadro sobre todo el texto deseado y luego soltar. 

***

# Herramientas de la Interfaz

La lista completa de TAGS se encuentra oculto en el panel lateral derecho.
Usando la pestaña con el icono de tres líneas (hamburger):

![](https://github.com/theeye-io/documents_docs/blob/master/docs/files/hamburguesa.png?raw=true)

se despliega la lista completa de los tags para los datos que comúnmente pueden aparecer en los documentos. Tómese algún tiempo para familiarizarse con las etiquetas más comunes. Si no encuentra la etiqueta para algún dato, contactenos.

Al lado del título “TAGS” se encuentra el botón (-) que oculta todos los tags vacíos, al presionarlo nuevamente vuelven a aparecer.

![](https://github.com/theeye-io/documents_docs/blob/master/docs/files/barra%20tags.gif?raw=true)


Al lado del título de cada uno de los tags se encuentra el botón (+). Este botón permite ingresar un dato cuando no se encuentra presente en el documento, ya sea por fallos en el OCR, en los casos de documentos multipágina o porque requieren ingreso manual.

En ocasiones es necesario editar los datos seleccionados.
