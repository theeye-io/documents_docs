# Convenciones Utilizadas

## Estructura de datos para Facturas emitidas en Argentina

La API de Digitai disponibilizará un endpoint para recibir el archivo (PDF), junto con las credenciales al que responderá con el identificador del documento (en desarrollo)
Podemos pensarlo como un POST a urlAPI/documents/upload

#### Ejemplo de invocacion a la api de Upload:

```bash
curl -X POST 'https://digitai-api-dev.theeye.io/api/documents/upload?access_token=URklzVT6dg7YjG1oCsHnSAhcFEd1DfGSUkgZcNh06jSsjEDgj5fX5yEOegmJMDO' -F file=@AFIP_Consumidor_Final.pdf
```

#### Respuesta:

```json
{
  "filename":null,
  "original_name":"AFIP_Consumidor_Final.pdf",
  "url":null,
  "keyPrefix":"documents/theeye-dev/20210707",
  "creation_date":"2021-07-07T16:08:51.896Z",
  "modification_date":"2021-07-07T16:08:51.896Z",
  "checksum":"90fc253d1676b8786ab390fab1a1ac53327821f4",
  "assignee_id":null,
  "customer_id":"60e5cffe4e98850c0a911d8a",
  "lifecycle":"pending",
  "lifecycle_error":"",
  "miscomprobantes_id":null,
  "id":"60e5d1932e6040d725ea4229"
}
```

Al finalizar el proceso de extracción y de haber sido configurado un callback URL, el sistema envia los datos obtenidos inmediatamente.
También es posible aplicar validaciones, transformaciones de datos y customizaciones todos los documentos o para documentos de forma particular.


### Diccionario de datos

Uilizando las plantillas confeccionadas por TheEye para comprobantes de Argentina se obtienen los siguientes datos en formato JSON.

Si algún dato no pudo ser identificado correctamente se devuelve "null". En los casos donde el tipo de dato definido es una lista (array/collection) se obtendrá un array vacío.


| Campo del Json  | Significado / Dominio | Valores Aceptados | Filtro | Tipo de Dato | 
| ----- | ----- | ----- | ----- | ----- |
| copiaDocumento  | | Original / Copia | |String    | 
| tipoDocumento   | Tipo de comprobante. | "factura" / "nota de crédito" / "nota de débito". | | String  | 
| codigoDocumento | Codificación según AFIP del tipo de comprobante. | 1, 2, 3, 6, 7, 8, 11,  12,  13,  19, 20, 21,  51, 52,  53,  201, 202, 203, 206, 207, 208, 211, 212, 213 | numero | Number(1-3)  | 
| letraDocumento  | Se arma de acuerdo al código de documento  | | String | 
| cuitJuridica    | CUIT del receptor del comprobante. | Debe contener 11 dígitos. Con el último dígito se puede verificar que sea un CUIT correcto.  En Comprobantes a Consumidor Final puede NO estar presente | cuit | String (11)  | 
| cuitProveedor | CUIT del emisor del comprobante. | Debe contener 11 dígitos. Con el último dígito se puede verificar que sea un CUIT correcto | cuit | String (11) |
| fechaEmision | Fecha de emisión del comprobante. |  | date | Date(dd/mm/aaaa) |
| importeTotal | Importe total (final) del comprobante |  | importe | Decimal |
| puntoVenta | Punto de venta del comprobante | Debe contener 4 o 5 dígitos y conservar los ceros a la izquierda | number | String(6) |
| numeroComprobante | Número del comprobante sin el punto de venta. | Conserva los ceros a la izquierda. | number | String(14)|
| numeroFactura | Contiene el número de factura completo |  ${puntoVenta}-${numeroComprobante} | | String(21) |
| condicionVenta | Representa la condición de pago del comprobante. | | | String |
| tipoCae | Tipo de código autoimpresor del comprobante. | CAE / CAEA / CAI. | | String(4) |
| cae / caea / cai | Codigo de autorización emitido por AFIP. Solo numeros. | | cae | String(13) |
| fechaCae | Fecha de vencimiento del cae. | | fecha | Date(dd/mm/aaaa) |
| fechaVencimiento | Fecha de vencimiento del pago. |  | fecha | Date(dd/mm/aaaa) |
| iva{xx} | Impuesto al valor agreado según porcentaje {xx}. El campo lleva en su nombre el tipo de IVA reconocido. (iva21/iva10_5 etc) Por lo tanto habrá tantos campos "ivaxx" como tipos de IVA tenga el comprobante y se expondrán todos aquellos que han sido reconocidos.  Lleva en su valor el monto total del ivaxx. Por ejemplo si el comprobante es una factura, tiene items gravados con un IVA del 21 %, existirá el campo "iva21", si está discriminado en la factura. | | importe | Decimal |
| ivaJuridica | Condición de iva del receptor | | | string |
| importeNetoGravado  |  | | importe | decimal |
| importeNetoGravado{xx}  | importe neto según alícutoa de iva  | | importe | decimal |
| importeNetoGravado{xx}_{n}  | importe neto según alícutoa de iva en los casos donde no está totalizado | | importe | decimal |
| importeNoGravado | | | importe | decimal |
| importeExento | | | importe | decimal |
| importeTotal | Contiene el valor del total Neto del comprobante | | importe | decimal |
| moneda | Reconoce expresiones para Pesos Argentinos (ARS) , Dolares (USD) y Euros (EUR). | | moneda | String |
| tipoCambio | | | importe |decimal |
| codigoBarra | Se puede utilizar para realizar una doble validación de los campos detectados. Según AFIP debe contener el cuitproveedor, puntoVenta y numeroCae. |  | | String |

### Percepciones

A continuación se detallan los nombres utilizados para identificar las percepciones que se pueden llegar a encontrar en los comprobantes.

| Nombre |
| ----- |
| percepcionGanancia  |
| percepcionIIBBB  |
| percepcionIIBBBsAs  |
| percepcionIIBBCABA  |
| percepcionIIBBCABAElectro   |
| percepcionIIBBCorrientes    |
| percepcionIIBBCatamarca  |
| percepcionIIBBChaco  |
| percepcionIIBBChubut  |
| percepcionIIBBCordoba  |
| percepcionIIBBCorrientes  |
| percepcionIIBBEntreRios  |
| percepcionIIBBFormosa    |
| percepcionIIBBJujuy  |
| percepcionIIBBLaPampa  |
| percepcionIIBBLaRioja  |
| percepcionIIBBMendoza  |
| percepcionIIBBMisiones  |
| percepcionIIBBNeuquen  |
| percepcionIIBBRioNegro  |
| percepcionIIBBSalta  |
| percepcionIIBBSanJuan   |
| percepcionIIBBSanLuis  |
| percepcionIIBBSantaCruz  |
| percepcionIIBBSantaFe  |
| percepcionIIBBSantiagoDelEstero  |
| percepcionIIBBTierraDelFuego  |
| percepcionIIBBTucuman  |
| percepcionIVARes2955  |
| percepcionIVARes3411  |
| percepcionIVA  |
| importeOtrosTributos  |
| importeOtrosTributos_{n}  |


### Campos Particulares

Estos casos pueden estar presentes en algunos comprobantes y fueron solicitados por distintos clientes según para sus necesidad de negocio.

| Campo del Json | Significado / Dominio | Tipo de dato |
| ----- | ----- | ----- | 
| numeroRecepcion | Listado de números de recepción | Array[String] |
| embarque | Listado de números de embarque | Array[String] |
| guia | Listado de números de guía | Array[String] |
| ordenCompra | Listado de números de órdenes de compra | Array[String] |


## Ejemplo de valores obtenidos 

```json
{
  copiaDocumento: "Original",
  tipoDocumento: "FACTURA",
  numeroRecepcion: [
    "58464"
  ],
  numeroFactura: "0004-00003765",
  cae: "71224988226189",
  tipoCae: "cae",
  fecha: [
    "1 2-700",
    "00 0.00",
    "10/01/2005",
    "0.00 105",
    "18/05/2021"
  ],
  condicionVenta: "Dias FF",
  domicilioProveedor: "",
  domicilioJuridica: "",
  codigoBarraData: {},
  fechaEmision: "28/05/2021",
  guia: [],
  embarque: [],
  ordenCompra: [],
  detectedIva: [],
  codigoDocumento: "19",
  letraDocumento: "E",
  tipoDocumentoCode: null,
  numeroComprobante: "00003765",
  puntoVenta: "00004",
  fechaCae: "07/06/2021",
  importeTotal: 105112.7,
  tipoCambio: 1,
  moneda: "ARS",
  importeNoGravado: 105112.7,
  cuitJuridica: "30666666665",
  cuitProveedor: "30999999994",
  razonSocialProveedor: "VILLA HNOS SA",
  creationDate: "2021-06-01T16:18:17.555Z",
  id: "60b65ebc2cdd0106756198f9",
  customer_group_id: "604234de7f470961f4edeb5b",
  conciliado: false,
  tipoDocumentoProveedor: "CUIT"
}
``` 