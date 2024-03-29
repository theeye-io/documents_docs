# Documentación API

## Flow de Envío de comprobantes

![diagrama de secuencia](../images/image97.png "diagrama")

## Preparacion

### Bearer Access Token

Para acceder a la API se debe contar con un AccessToken Bearer.

Para obtenerlo por el momento es solo posible solicitandolo al equipo de TheEye mediante el canal de soporte proporcionado en el momento del alta de su cuenta.

Es posible obtener un AccessToken que se obtiene luego de un login Basic utilizando el usuario y contraseña del panel web.
En caso de no tener un token de acceso de API, el token de acceso obtenido con login Basic sera util para realizar las operaciones que describiremos a continuación
Tener en cuenta que este token caduca luego de 14 dias, durante ese periodo se mantendra la sesión abierta.
Por lo que no debe ser compartido

## Operaciones comunes

### Basic Login

<!-- tabs:start -->
##### **Curl**

```bash
curl -X POST \
       --header 'Content-Type: application/json' \
       --header 'Accept: application/json' \
       -d '{"email":"user%40domain.io","password":"youknowit"}' \
       'https://digitize-api.theeye.io/api/TaggerUsers/login'

```
<!-- tabs:end -->

El resultado de esta operación es un access token que se puede utilizar para consultar la API durante un periodo de tiempo especifico


### Enviar documentos a procesar

<!-- tabs:start -->
##### **Curl**

```bash
accessToken="ElTokenDeAcceso"

curl -X POST 'https://digitize-api.theeye.io/api/documents/upload?access_token=${accessToken}' \
       -F file=@"archivocomprobante.pdf"
```

##### **Node.js**

*Pre-requisitos. Instalar nodejs y npm*

##### Paso 1 (opcional)

Inicializamos el directorio donde colocaremos el script

```bash
npm init -y
```

##### Paso 2

Instalamos las dependencias.
En este ejemplo usamos la libreria https nativa de nodejs y la libreria form-data que nos permite enviar archivos utilizando el header multiparted.


```bash
npm install form-data
```

##### Paso 3

Creamos un archivo `procesar_documento.js` y pegamos el siguiente codigo


```javascript
const FormData = require('form-data')
const path = require('path')
const fs = require('fs')

const https = require('https')
const accessToken = process.env.API_ACCESS_TOKEN

const main = async ([ filepath ]) => {
  const content =  fs.createReadStream(filepath)

  const formData = new FormData()
  formData.append('file', content)

  const request = https.request({
    method: 'post',
    host: 'digitize-api.theeye.io',
    path: `/api/documents/upload?access_token=${accessToken}`,
    headers: formData.getHeaders()
  })

  formData.pipe(request)

  request.on('response', res => {
    const data = []

    res.on('data', chunk => {
      data.push(chunk)
    })

    return new Promise( (resolve, reject) => {
      res.on('end', () => {
        let payload;
        const buffer = Buffer.concat(data).toString()

        // assuming that the response is always JSON.
        // But better would be to check the response content-type header
        //if (/json/.test(res.headers['content-type'])) {
        try {
          payload = JSON.parse(buffer)
        } catch (e) {
          payload = buffer
        }
        //}
        res.body = payload

        if (res.statusCode >= 400) {
          const err = new Error(`${res.statusCode}: ${res.body?.message||res.body}`)
          err.response = res
          err.request = req
          reject(err)
          return
        }

        // return the response object.
        // assign the body to a response property body
        console.log(res.statusCode)
        console.log(res.body)
        resolve(res)
      })
    })
  })

}

main(process.argv.slice(2)).then(console.log).catch(console.error)

```

##### Paso 4

En el shell debemos setear el access token por variable de entorno para poder comunicarnos con la API.

Linux

```bash
export API_ACCESS_TOKEN="ElTokenDeAcceso"
```

Windows

```shell
set API_ACCESS_TOKEN="ElTokenDeAcceso"
```

##### Paso 5

Pasar el archivo a procesar como primer parámetro


```shell
node processar_documento.js './FacturaDigital(2)(1).pdf'
```

##### **Python**

*Pre-requisitos. Instalar python y pip*

##### Paso 1

Instalamos la librería request. 

```bash
pip install requests
```

##### Paso 2

Creamos el archivo `procesar_documento.py` y pegamos el codigo.

```python
import requests
import os
import sys

file = sys.argv[1]
basename = os.path.basename(file)
accessToken = os.getenv('API_ACCESS_TOKEN')

url = "https://digitize-api.theeye.io/api/documents/upload?access_token=" + accessToken

payload = {}
files=[ ('file', (basename, open(file,'rb'),'application/pdf')) ]
headers = {}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
```

##### Paso 3

En el shell debemos setear el access token por variable de entorno para poder comunicarnos con la API.

Linux

```bash
export API_ACCESS_TOKEN="ElTokenDeAcceso"
```

Windows

```shell
set API_ACCESS_TOKEN="ElTokenDeAcceso"
```

##### Paso 4

Pasar el archivo a procesar como primer parámetro


```shell
python processar_documento.py './FacturaDigital(2)(1).pdf'
```

<!-- tabs:end -->

La respuesta debe ser un JSON similar al siguiente

```json
{
  customer_id: '648af81f5a0d5b45943da170',
  assignee_id: null,
  miscomprobantes_id: null,
  filename: null,
  original_name: 'FacturaDigital(2)(1).pdf',
  keyPrefix: 'documents/organization/20230615/648b0e6647df4ecd5f1f98d0',
  creation_date: '2022-06-15T13:13:10.254Z',
  modification_date: '2022-06-15T13:13:10.254Z',
  categories: [],
  checksum: '1ec0ad6513dfcedf9cdd01a369cda34fe6849bed',
  lifecycle: 'converting',
  lifecycle_details: '',
  lifecycle_error: '',
  id: '648b0e6647df4ecd5f1f98d0'
}
```

Con el ID devuelto en la operación anterior es posible consultar el estado del documento y el resultado.


### Consultar estado de un comprobante

<!-- tabs:start -->
##### **Curl**

```bash
accessToken="ElTokenDeAcceso"

curl -X GET --header 'Accept: application/json' \
      'https://digitize-api.theeye.io/api/Documents/6363ed5eb1a2cc0cc2e056c8?access_token=${accessToken}'
```
<!-- tabs:end -->

*Respuesta*

```json
{
  "customer_id": "6363c704c740e7ace739fb34",
  "assignee_id": null,
  "miscomprobantes_id": null,
  "filename": null,
  "original_name": "FA-B-0003-00091963.pdf",
  "keyPrefix": "documents/demo/20230615/648b733d28f369d638f7e79b",
  "creation_date": "2023-06-15T20:23:25.952Z",
  "modification_date": "2023-06-15T20:23:29.916Z",
  "categories": [],
  "checksum": "c80f525768850938e38f7a47e0ecc2f685dfe182",
  "lifecycle": "submitted",
  "lifecycle_details": "",
  "lifecycle_error": "",
  "pages_number": 1,
  "id": "648b733d28f369d638f7e79b"
}
```

### Obtener el resultado de un comprobante

<!-- tabs:start -->
##### **Curl**

```bash
accessToken="ElTokenDeAcceso"

curl -X GET --header 'Accept: application/json' \
      'https://digitize-api.theeye.io/api/Documents/6363ed5eb1a2cc0cc2e056c8/documentTags?access_token=${accessToken}'
```
<!-- tabs:end -->

*Respuesta*

```json
[
  {
    "document_id": "648b733d28f369d638f7e79b",
    "customer_id": "6363c704c740e7ace739fb34",
    "filtered_values": {
      "cuitProveedor": null,
      "fechaCae": null,
      "fechaEmision": null,
      "cae": "70189034020441",
      "tipoCae": "CAE.",
      "codigoDocumento": 6,
      "tipoDocumento": "FACTURA",
      "puntoVenta": null,
      "numeroComprobante": null,
      "importeNetoGravado": "",
      "domicilioProveedor": "CONDIC",
      "domicilioJuridica": "",
      "razonSocialProveedor": "",
      "importeTotal": null,
      "copiaDocumentoOriginal": "",
      "afip": "",
      "labelAfip": "",
      "tables": {}
    },
    "classification_confidence": 30,
    "classification_label": "afip_patterns",
    "creation_date": "2023-06-15T20:23:29.870Z",
    "origin": "prediction",
    "id": "648b734136b27c0a15b3a7be",
    "hrtime_ms": 2361,
    "modification_date": "2023-06-15T20:23:29.870Z"
  }
]
```

## Callback URL

Al finalizar el procesamiento de un comprobante Digitize puede utilizar un callback URL para enviar el resultado del procesamiento.
La respuesta contiene los siguientes datos

```json
{
  "state":"review",
  "label":"FacugonTemplate",
  "confidence":98.2873335223038,
  "origin":"tagger",
  "filename":"FACUGON_FC-A-0018-00012445_ARGENTINA_ORIG.pdf",
  "tagger":"https://digitai.theeye.io/tagger-processing?id=666666666666666666666666",
  "document_id":"65df64b2917f9bbac3510598",
  "organization_uuid":"49359628-6755-5fd6-9bac-cdda63c9f80f",
  "values":{
    "codigoDocumento":1,
    "numeroFactura":"0018-00012445",
    "puntoVenta":"0018",
    "numeroComprobante":"00012445",
    "fechaEmision":"26/01/2024",
    "moneda":"ARS",
    "cae":"77777777777777",
    "subtotal":444444.08,
    "iva21":104.35784,
    "total":601299.92,
    "cuitEmisor":"33333333333",
    "razonSocialProveedor":"FACUGON S.A.",
    ...
  }
}
```

### Detalle de cada campo


| Nombre      | Descripcion                                                                                                                                           | Tipo     | Valor                      | 
| -----       | -----                                                                                                                                                 | -----    | -----                      | 
| origin      | Origen del proceso de conversion                                                                                                                      | string   | tagger o prediction        | 
| filename    | Nombre original del archivo                                                                                                                           | string   |                            | 
| state       | Estado del documento que toma según el resultado del proceso de extracción y las condiciones predeterminadas en el sistema (Dispatcher Flag)          | string   | ready / invalid / review   | 
| tagger      | Cuando el documento fue revisado manualmente URL de la interfaz origen. Cuando el origen es el proceso automatico, URL del ambiente asociado a la API | url      | https://digitize.theeye.io | 
| values      | Conjunto datos extraidos del proceso. Normalmente asociados a los bloques y patrones del template utilizado                                           | object   | {}                         | 
| label       | Nombre de la plantilla utilizada                                                                                                                      | string   |                            | 
| confidence  | Porcentaje de coincidencia del documento con la plantilla utilizada                                                                                   | number   |                            | 
| document_id | ID asignado al documento dentro del sistema                                                                                                           | objectId |                            | 
| organization_uuid |                                                                                                                                                 | string   |                            | 


### Configuracion admitida

| Nombre         | Descripcion                                                                                                   | Type    | Valor por Defecto | 
| -----          | -----                                                                                                         | -----   | -----             | 
| url            | webhook url                                                                                                   | url     |                   | 
| bearer_token   | en caso de que la api remota necesite autenticación con token bearer. solo admite token fijo sin vencimiento  | string  |                   | 
| method         | metodo http                                                                                                   | string  | post              | 
| headers        | http headers                                                                                                  | object  |                   | 
| payload_format | formato del payload enviado. posibles valores: json , array , values                                          | string  | array             | 
| encoded_tags   | si payload_format es array ,  utilizar base64 encode en el campo values                                       | boolean | true              | 
| basic_username | usuario para autenticacion basic                                                                              | string  |                   | 
| basic_password | password para autenticacion basic                                                                             | string  |                   | 

#### Payload Format. Ejemplos

<!-- tabs:start -->

##### **Json**

```
  {
    origin: "prediction",
    filename: "#5645387152.pdf",
    state: "review",
    tagger: https://digitize.theeye.io,
    values: {
      tables: {
        segun_facturacion: [],
        segun_empleados: []
      },
      cuitJuridica: null,
      cuitProveedor: null,
      fechaCae: null,
      fechaEmision: null,
      cae: null,
      tipoCae: null,
      codigoDocumento: null,
      tipoDocumento: "FACTURA",
      puntoVenta: null,
      numeroComprobante: null,
      ...
    },
    label: "CATEGORIZACION PYME",
    confidence: 20.13166962644007,
    document_id: "64997da69344103de1ba9362"
  }
```

##### **Array**

Este formato es compatible con los inputs de ejecución de tareas de TheEye

```
[
  "tagger",
  "#5645387152.pdf",
  "review",
  "https://digitize.theeye.io",
  "{\"tables\":{\"segun_facturacion\":[[null,null,null,null,[\"Base\"],null],[[\"Neto\"],null,null,null,null,[\"181,03\"]],[[\"n EU services\"],[\"VAT\"],[\"0,00 %\"],null,[\"181,03\"],[\"0,00\"]],[[\"dad Total\"],null,null,null,null,[\"181,03\"]],[[\"88308291\"],[\"Su Referencia:\"],null,null,null,null],[[\"usan\"],[\"Lugar de\"],[\"recibo: Busan\"],[\"Barco/Viaje:\"],[\"SAN VICENTE/947W\"],null],[[\"uenos Aires\"],[\"Lugar de\"],[\"entrega: Buenos Aires\"],null,null,null],[[\"0-Nov-2019\"],[\"ETA:\"],[\"05-Jan-2020\"],null,null,null]],\"segun_empleados\":[[null,null,null,[\"Valor\"],[\"Total:\"],[\"181,03\"]],[[\"Número de\"],[\"Tamaño/\"],[\"Tipo Servicio\"],[\"PCD\"],null,null],[[\"Contenedor\"]],[[\"TCNU7017994\"],[\"40/9' 6/DRY\"],[\"CY/CY\"],[\"20. Nov.2019\"]],[[\"ero de Contrato:\"],[\"2263230\"],null,null,null,null]]},\"cuitJuridica\":null,\"cuitProveedor\":null,\"fechaCae\":null,\"fechaEmision\":null,\"cae\":null,\"tipoCae\":null,\"codigoDocumento\":null,\"tipoDocumento\":\"FACTURA\",\"puntoVenta\":null,\"numeroComprobante\":null,\"importeNetoGravado\":null,\"domicilioProveedor\":null,\"domicilioJuridica\":null,\"razonSocialProveedor\":null,\"importeTotal\":null,\"razonSocialJuridica\":null,\"iva21\":null,\"condicionVenta\":null,\"ivaJuridica\":null,\"periodoFacturadoDesde\":null,\"periodoFacturadoHasta\":null,\"iibb\":null,\"inicioActividad\":null,\"fechaVencimiento\":null,\"copiaDocumentoOriginal\":null,\"afip\":null,\"labelAfip\":null}",
  "CATEGORIZACION PYME",
  "20.13166962644007",
  "64997da69344103de1ba9362"
]
```

El indice 4 contiene los valores extraidos del documento. Si se encuentran inconvenientes para recibir el payload por problemas de encoding del campo de datos se puede utilizar el flag `encoded_tags` para que este indice sea convertido a base 64 antes de ser enviado al callback.


##### **Values**

Solo los valores obtenidos del documento

```
    {
      tables: {
        segun_facturacion: [],
        segun_empleados: []
      },
      cuitJuridica: null,
      cuitProveedor: null,
      fechaCae: null,
      fechaEmision: null,
      cae: null,
      tipoCae: null,
      codigoDocumento: null,
      tipoDocumento: "FACTURA",
      puntoVenta: null,
      numeroComprobante: null,
      ...
    }

```

<!-- tabs:end -->
