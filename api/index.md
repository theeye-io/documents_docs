
Para ejecutar este ejemplo debemos usar npm. inicializamos un directorio

```bash

npm init -y


```

luego vamos a instalar las dependencias.
podemos usar otras librerias como got, axios, node-fetch. en este ejemplo usamos la libreria https nativa de nodejs y la libreria form-data que nos permite enviar archivos utilizando el header multiparted


```bash

npm install form-data

```

creamos un archivo index.js y pegamos el siguiente codigo


```javascript


const FormData = require('form-data')
const path = require('path')
const fs = require('fs')

const https = require('https')
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

ahora debemos setear el access token para poder comunicarnos con la API.

si ejecutamos este ejemplo desde Linux sería de la siguiente manera.
hay que pasar el archivo a procesar como primer parámetro

```bash

TAGGER_ACCESS_TOKEN="ElTokenDeAcceso" node processar_documento.js ./file.pdf

```
