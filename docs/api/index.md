# Documentación API

## Flow de Envío de comprobantes

![diagrama](./public/images/image97.png)

## Explorador Interactivo de API

Utilice el siguiente explorador interactivo para probar directamente los endpoints de la API:

<ApiExplorer spec-url="/swagger/sample-api.json" />

## Preparación

### Bearer Access Token

Para acceder a la API se debe contar con un AccessToken Bearer.

Para obtenerlo por el momento es solo posible solicitandolo al equipo de TheEye mediante el canal de soporte proporcionado en el momento del alta de su cuenta.

Es posible obtener un AccessToken que se obtiene luego de un login Basic utilizando el usuario y contraseña del panel web.
En caso de no tener un token de acceso de API, el token de acceso obtenido con login Basic sera util para realizar las operaciones que describiremos a continuación
Tener en cuenta que este token caduca luego de 14 dias, durante ese periodo se mantendra la sesión abierta.
Por lo que no debe ser compartido

## Operaciones comunes

### Basic Login

::: code-group
```bash [Curl]
curl -X POST \
       --header 'Content-Type: application/json' \
       --header 'Accept: application/json' \
       -d '{"email":"user%40domain.io","password":"youknowit"}' \
       'https://digitize-api.theeye.io/api/TaggerUsers/login'
```
:::

El resultado de esta operación es un access token que se puede utilizar para consultar la API durante un periodo de tiempo especifico


### Enviar documentos a procesar

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"

curl -X POST 'https://digitize-api.theeye.io/api/documents/upload?access_token=${accessToken}' \
       -F file=@"archivocomprobante.pdf"
```

```javascript [Node.js]
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

```python [Python]
import requests
import os
import sys

file = sys.argv[1]
basename = os.path.basename(file)
accessToken = os.getenv('API_ACCESS_TOKEN')

url = "https://digitize-api.theeye.io/api/documents/upload?access_token=" + accessToken

payload = {}
files = [
  ('file', (basename, open(file, 'rb'), 'application/pdf'))
]
headers = {}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
```
:::

## Instalación de los requisitos

Para ejecutar los ejemplos anteriores necesitas instalar las dependencias:

### Node.js

*Pre-requisitos. Instalar nodejs y npm*

#### Paso 1 (opcional)

Inicializamos el directorio donde colocaremos el script

```bash
npm init -y
```

#### Paso 2

Instalamos las dependencias.
En este ejemplo usamos la libreria https nativa de nodejs y la libreria form-data que nos permite enviar archivos utilizando el header multiparted.


```bash
npm install form-data
```

#### Paso 3

Luego podemos guardar el código en un archivo `procesar_documento.js` y ejecutarlo:

```bash
node procesar_documento.js './comprobante.pdf'
```

### Python

*Pre-requisitos. Instalar python y pip*

#### Paso 1

Instalamos la librería request. 

```bash
pip install requests
```

#### Paso 2

Guardamos el código en un archivo `procesar_documento.py` y lo ejecutamos:

```bash
python procesar_documento.py './comprobante.pdf'
```

## Variables de entorno

En el shell debemos setear el access token por variable de entorno para poder comunicarnos con la API.

Linux y macOS:

```bash
export API_ACCESS_TOKEN="ElTokenDeAcceso"
```

Windows:

```shell
set API_ACCESS_TOKEN="ElTokenDeAcceso"
``` 