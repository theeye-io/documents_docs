
# Digitize - Plantillas

## Clasificación de comprobantes - Coincidencia

Luego de procesar un documento aparecerá visible en la pantalla de Documentos Procesados.
La columna *COINCIDENCIA* muestra el porcentaja utilizado por el sistema para elegir de forma automática la plantilla mas acorde al comprobante procesado.
El porcentaje de *COINCIDENCIA* representa la cantidad de coincidencias de estructura encontradas entre la plantilla y el comprobante.

En caso de no encontrar una plantilla que superer el porcentaje mínimo deseado la columna aparecerá vacía al igual que la columna *PLANTILLA*.
El porcentaje de *COINCIDENCIA* puede ser ajustado de forma global en la sección *CONFIGURACION* y también puede ser ajustado en cada plantilla individualmente.


Al momento de armar una plantilla nueva usando la opción *AUTOPLANTILLA* el sistema calcula y construye la estructura de la plantilla basandose en las estructuras de todos los comprobantes seleccionados.
Cuantos mas documentos se utilicen para armar la plantilla y cuanto mas similares sean entre si estos documentos, mas precisa va a ser la estructura de la plantilla final.

*NOTA*

Las reglas particulares de clasificación de estructura no se ven reflejadas en este porcentaje.
Estas reglas particulares se aplican luego, y aumentan o disminuyen las chances de usar las plantillas.



## Campo Obligatorio

El check de *campo obligatorio* es utilizado por la interfaz de procesamiento manual de comprobantes para indicar al operador los campos necesarios para poder completar con el procesamiento del documento.
Los campos obligatorios serían los requeridos para su posterior carga en caso de tener una integración con *dispatcher* o envío hacía un sistema remoto, ERP, etc. 


En la sección de trazabilidad se pueden observar los flujos de trabajo asociados a la carga de comprobantes en sistema remotos con intervención manual.

[Flujos de Trabajo](/#/trazabilidad?id=flujos-de-procesamiento-de-un-comprobante/)

El proceso de carga manual se puede utilizar en combinación con los procesos de conciliación y verificación.

El sistema puede ser configurado para frenar el envío del comprobante al sistema de gestión y dejarlo en espera hasta que el usuario tome una acción.

En otros casos el comprobante es enviado al sistema encargado de continuar el proceso de carga inmediatamente después de que se termina de procesar sin pasar por el proceso de verificación manual.
En este caso el chequeo de campo obligatorio no tiene ninguna validez.

## Define Estructura

Cuando ingresa un documento nuevo, el sistema busca una plantilla que mas coincida entre todas las disponibles. A esto le llamamos "clasificación" y da como resultado la plantilla que se va a utilizar para el resto del proceso de extracción.

Cuando usar filtros de *define estructura*

* Los documentos son muy similares entre si, y el proceso de clasificación los confunde y elige la plantilla incorrecta.

* Para diferenciar facturas de diferentes tipos por algún criterio.

* Para identificar rápidamente documentos de un lote

Si se tienen muchos documentos con la misma estructura y se necesita separarlos por proveedor, usaríamos un filtro de *definen estructura* para identificar un texto que siempre se encuentra en los documentos de un proveedor, como por ejemplo la razón social del proveedor o el cuit.

Las reglas de estructura aumentan o disminuyen las posibilidades de usar una plantilla.

### Regla Condicional

Tildando la opción de *Regla condicional* se puede adaptar el filtro para excluir directamente las plantillas durante la clasificación evitando que se usen dando falsos positivos.

![regla condicional](../images/image96.png)

En algunos comprobantes se puede observar que durante la clasificación el porcentaje de coincidencia con las plantillas disponibles da por debajo del 80%, incluso con documentos similares a los que fueron utilizados para armar la plantilla.

![resultado clasificacion](../images/image93.png)

Todas las plantillas son creadas con un porcentaje de aceptación mínimo de 80% por defecto.
Ese valor puede ser modificado en cada plantilla para que esta sea mas o menos permisiva.
El parámetro se puede cambiar entrando al modo edición desde la sección de "configuración de la página" del menu lateral izquierdo.

De esta forma es posible clasificar las facturas según el parámetro de Tarifa usando esta regla.


## Plantilla por Defecto

