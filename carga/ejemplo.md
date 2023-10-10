# Ejemplo API

En este ejemplo usamos npm. Inicializamos un directorio

```shell

npm init -y

```

Instalamos las dependencias.
Podemos usar otras librerias como got, axios, node-fetch.
En este ejemplo usamos la libreria https nativa de nodejs y la libreria form-data que nos permite enviar archivos utilizando el header multiparted


```shell

npm install form-data

```

Creamos el archivo `index.js`. Copiamos y pegamos el siguiente codigo


```javascript

const path = require('path')
const fs = require('fs')
const https = require('https')
const FormData = require('form-data')

const accessToken = process.env.TAGGER_ACCESS_TOKEN

const main = async ([ filepath ]) => {
  const content =  fs.createReadStream(filepath)

  const formData = new FormData()
  formData.append('file', content)

  const request = https.request({
    method: 'post',
    host: 'tagger-api-dev.theeye.io',
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

Debemos setear el access token para poder comunicarnos con la API.

Si ejecutamos este ejemplo desde Linux sería de la siguiente manera.
hay que pasar el archivo a procesar como primer parámetro


```

export TAGGER_ACCESS_TOKEN="ElTokenDeAcceso"

```

para Windows usamos set

```

set TAGGER_ACCESS_TOKEN="ElTokenDeAcceso"

```

Finalmente ejecutamos el script

```

 node . ./file.pdf

```
