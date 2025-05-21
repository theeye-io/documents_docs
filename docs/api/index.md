# Documentación API

## Flow de Envío de comprobantes {#flow-de-envio-de-comprobantes}

![diagrama](/images/image97.png)

## Preparación {#preparación}

### Bearer Access Token

Para acceder a la API se debe contar con un AccessToken Bearer.

Para obtenerlo por el momento es solo posible solicitandolo al equipo de Digitai mediante el canal de soporte proporcionado en el momento del alta de su cuenta.

Es posible obtener un AccessToken que se obtiene luego de un login Basic utilizando el usuario y contraseña del panel web.
En caso de no tener un token de acceso de API, el token de acceso obtenido con login Basic sera util para realizar las operaciones que describiremos a continuación.
Tener en cuenta que este token caduca luego de 14 dias, durante ese periodo se mantendra la sesión abierta.
Por lo que no debe ser compartido

<ApiPlaygroundControls />

## Instalación de los requisitos

Para ejecutar los ejemplos necesitas instalar las dependencias:

::: code-group
```bash [Node.js]
# Pre-requisitos: Instalar nodejs y npm

# Paso 1 (opcional): Inicializamos el directorio
npm init -y

# Paso 2: Instalamos las dependencias
npm install form-data axios

# Paso 3: Ejecutamos el script
node procesar_documento.js './comprobante.pdf'
```

```bash [Python]
# Pre-requisitos: Instalar python y pip

# Paso 1: Instalamos la librería requests
pip install requests

# Paso 2: Ejecutamos el script
python procesar_documento.py './comprobante.pdf'
```
:::

## Variables de entorno

En el shell debemos setear el access token por variable de entorno para poder comunicarnos con la API.

::: code-group
```bash [Linux/macOS]
export API_ACCESS_TOKEN="ElTokenDeAcceso"
```

```shell [Windows]
set API_ACCESS_TOKEN="ElTokenDeAcceso"
```
:::


## Operaciones comunes {#operaciones-comunes}

### Basic Login {#basic-login}

<ApiEndpoint
  title="Basic Login"
  method="POST" 
  endpoint="/api/Session/login"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :hasBody="true"
  defaultBody='{"username":"user@domain.io","password":"youknowit"}'
  :hideTitle="true"
>

Este endpoint permite obtener un token de acceso mediante un login básico.

<template #example>

::: code-group
```bash [Curl]
curl -X POST \
       --header 'Content-Type: application/json' \
       --header 'Accept: application/json' \
       -d '{"username":"user%40domain.io","password":"youknowit"}' \
       'https://digitai-backend.theeye.io/api/Session/login'
```

```javascript [NodeJS]
const axios = require('axios');

async function login() {
  try {
    const response = await axios.post('https://digitai-backend.theeye.io/api/Session/login', {
      username: 'user@domain.io',
      password: 'youknowit'
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    // Guardar el token para usarlo en solicitudes posteriores
    const accessToken = response.data.id;
    console.log('Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error al iniciar sesión:', error.response?.data || error.message);
  }
}

login();
```

```python [Python]
import requests
import json

def login():
    try:
        response = requests.post(
            'https://digitai-backend.theeye.io/api/Session/login',
            json={
                'username': 'user@domain.io',
                'password': 'youknowit'
            },
            headers={
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()  # Raise exception for HTTP errors
        
        # Guardar el token para usarlo en solicitudes posteriores
        access_token = response.json()['id']
        print('Access Token:', access_token)
        return access_token
    except requests.exceptions.RequestException as e:
        print('Error al iniciar sesión:', e)

if __name__ == "__main__":
    login()
```
:::

El resultado de esta operación es un access token que se puede utilizar para consultar la API durante un periodo de tiempo especifico


</template>
</ApiEndpoint>

## Operaciones con Lotes (Batch) {#operaciones-con-lotes-batch}

### Obtener Todos los Lotes {#obtener-todos-los-lotes}

<ApiEndpoint
  title="Obtener Todos los Lotes"
  method="GET" 
  endpoint="/api/Batches"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[{name: 'access_token', placeholder: 'ElTokenDeAcceso'}]"
  :hideTitle="true"
>

Este endpoint permite obtener todos los lotes de documentos del cliente.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"

curl -X GET \
       --header 'Accept: application/json' \
       "https://digitai-backend.theeye.io/api/Batches?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function obtenerTodosLosLotes(accessToken) {
  try {
    const response = await axios.get(
      'https://digitai-backend.theeye.io/api/Batches', 
      {
        params: {
          access_token: accessToken
        },
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Todos los lotes:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener lotes:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
obtenerTodosLosLotes(accessToken);
```

```python [Python]
import requests

def obtener_todos_los_lotes(access_token):
    try:
        response = requests.get(
            'https://digitai-backend.theeye.io/api/Batches',
            params={
                'access_token': access_token
            },
            headers={
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Todos los lotes:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al obtener lotes:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    obtener_todos_los_lotes(access_token)
```
:::

Ejemplo de respuesta:

```json
[
  {
    "customer_id": "60a1b2c3d4e5f6a7b8c9d0e1",
    "name": "Lote de Facturas Enero 2023",
    "creation_date": "2023-06-01T10:15:30.000Z",
    "modification_date": "2023-06-01T10:15:30.000Z",
    "lifecycle": "pending",
    "lifecycle_details": "",
    "import_uuid": "550e8400-e29b-41d4-a716-446655440000",
    "id": "60a1b2c3d4e5f6a7b8c9d0e2",
    "documents_count": 5
  },
  {
    "customer_id": "60a1b2c3d4e5f6a7b8c9d0e1",
    "name": "Lote de Facturas Febrero 2023",
    "creation_date": "2023-07-01T09:10:20.000Z",
    "modification_date": "2023-07-01T09:10:20.000Z",
    "lifecycle": "processed",
    "lifecycle_details": "",
    "import_uuid": "660e8400-e29b-41d4-a716-446655440001",
    "id": "60a1b2c3d4e5f6a7b8c9d0e5",
    "documents_count": 8
  }
]
```

</template>
</ApiEndpoint>

### Crear Batch {#crear-batch}

<ApiEndpoint
  title="Crear Batch"
  method="POST" 
  endpoint="/api/Batches"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[{name: 'access_token', placeholder: 'ElTokenDeAcceso'}]"
  :hasBody="true"
  defaultBody='{"name":"Lote de Facturas Enero 2023","lifecycle":"on_hold","lifecycle_details":"En espera de validación","import_uuid":"550e8400-e29b-41d4-a716-446655440000"}'
  :initiallyExpanded="true"
  :hideTitle="true"
>

Este endpoint permite crear un nuevo lote para agrupar documentos.

Por defecto, el batch se crea con el lifecycle en "pending". Sin embargo, es posible especificar un lifecycle diferente al momento de la creación.

Los campos que se pueden especificar al crear un batch son:
- `name` (string, requerido): Nombre del lote
- `lifecycle` (string, opcional): Estado inicial del lote. Valores posibles: "pending" (default) o "on_hold"
- `lifecycle_details` (string, opcional): Detalles adicionales sobre el estado del lote
- `import_uuid` (string|boolean, opcional): UUID para identificar un proceso importación. Puede ser un UUID válido o `true` para que se genere automáticamente en el backend.

> **Nota sobre import_uuid**: 
> - Si se omite, será `null` por defecto
> - Si es `true`, se generará un UUID automáticamente
> - Si se proporciona un string, DEBE ser un UUID válido o se producirá un error
> - Cualquier otro valor producirá un error de validación

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"

curl -X POST \
       --header 'Content-Type: application/json' \
       --header 'Accept: application/json' \
       -d '{"name":"Lote de Facturas Enero 2023","lifecycle":"on_hold","lifecycle_details":"En espera de validación","import_uuid":"550e8400-e29b-41d4-a716-446655440000"}' \
       "https://digitai-backend.theeye.io/api/Batches?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function crearBatch(accessToken) {
  try {
    const response = await axios.post('https://digitai-backend.theeye.io/api/Batches', {
      name: 'Lote de Facturas Enero 2023',
      lifecycle: 'on_hold',
      lifecycle_details: 'En espera de validación',
      import_uuid: '550e8400-e29b-41d4-a716-446655440000'
    }, {
      params: {
        access_token: accessToken
      },
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    
    console.log('Batch creado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al crear batch:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
crearBatch(accessToken);
```

```python [Python]
import requests

def crear_batch(access_token):
    try:
        response = requests.post(
            'https://digitai-backend.theeye.io/api/Batches',
            json={
                'name': 'Lote de Facturas Enero 2023',
                'lifecycle': 'on_hold',
                'lifecycle_details': 'En espera de validación',
                'import_uuid': '550e8400-e29b-41d4-a716-446655440000'
            },
            params={
                'access_token': access_token
            },
            headers={
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Batch creado:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al crear batch:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    crear_batch(access_token)
```
:::

Ejemplo de respuesta:

```json
{
  "customer_id": "60a1b2c3d4e5f6a7b8c9d0e1",
  "name": "Lote de Facturas Enero 2023",
  "creation_date": "2023-06-01T10:15:30.000Z",
  "modification_date": "2023-06-01T10:15:30.000Z",
  "lifecycle": "on_hold",
  "lifecycle_details": "",
  "import_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "60a1b2c3d4e5f6a7b8c9d0e2"
}
```

</template>
</ApiEndpoint>

### Subir Documentos al Batch {#subir-documentos-al-batch}

<ApiEndpoint
  title="Subir Documentos al Batch"
  method="POST" 
  endpoint="/api/Batches/:batchId/upload"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'batchId', placeholder: '60a1b2c3d4e5f6a7b8c9d0e2'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hasBody="false"
  :hasFileUpload="true"
  :hideTitle="true"
>

Este endpoint permite subir documentos a un lote específico.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
batchId="60a1b2c3d4e5f6a7b8c9d0e2"

curl -X POST \
       "https://digitai-backend.theeye.io/api/Batches/${batchId}/upload?access_token=${accessToken}" \
       -F file=@"factura.pdf"
```

```javascript [NodeJS]
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function subirDocumentoAlBatch(accessToken, batchId, filePath) {
  try {
    const formData = new FormData();
    const fileStream = fs.createReadStream(filePath);
    formData.append('file', fileStream);
    
    const response = await axios.post(
      `https://digitai-backend.theeye.io/api/Batches/${batchId}/upload`, 
      formData, 
      {
        params: {
          access_token: accessToken
        },
        headers: {
          ...formData.getHeaders()
        }
      }
    );
    
    console.log('Documento subido:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al subir documento:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const batchId = '60a1b2c3d4e5f6a7b8c9d0e2';
const filePath = './factura.pdf';
subirDocumentoAlBatch(accessToken, batchId, filePath);
```

```python [Python]
import requests

def subir_documento_al_batch(access_token, batch_id, file_path):
    try:
        with open(file_path, 'rb') as file:
            files = {'file': file}
            
            response = requests.post(
                f'https://digitai-backend.theeye.io/api/Batches/{batch_id}/upload',
                files=files,
                params={
                    'access_token': access_token
                }
            )
            
            response.raise_for_status()
            
            print('Documento subido:', response.json())
            return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al subir documento:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    batch_id = '60a1b2c3d4e5f6a7b8c9d0e2'
    file_path = './factura.pdf'
    subir_documento_al_batch(access_token, batch_id, file_path)
```
:::

Ejemplo de respuesta:

```json
{
  "customer_id": "333333333333333333333333",
  "assignee_id": null,
  "miscomprobantes_id": null,
  "batch_id": "444444444444444444444444",
  "filename": "",
  "original_name": "5116.pdf",
  "keyPrefix": "documents/digitai/20250417/999999999999999999999999",
  "creation_date": "2025-04-17T11:52:45.894Z",
  "modification_date": "2025-04-17T11:52:45.894Z",
  "categories": [],
  "checksum": "76bd6b3a5eaa0398c01d405775514e87c3bfde02",
  "type": null,
  "lifecycle": "pending",
  "lifecycle_details": "",
  "lifecycle_error": "",
  "content_type": "application/pdf",
  "extension": "pdf",
  "manual_classification": null,
  "export_timestamp": null,
  "matched": false,
  "extractor": null,
  "secret": "88888888888888888888888888888888",
  "id": "999999999999999999999999"
}
```

</template>
</ApiEndpoint>

### Leer Batch por ID {#leer-batch-por-id}

<ApiEndpoint
  title="Leer Batch por ID"
  method="GET" 
  endpoint="/api/Batches/:batchId"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'batchId', placeholder: '60a1b2c3d4e5f6a7b8c9d0e2'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hideTitle="true"
>

Este endpoint permite obtener la información de un lote específico.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
batchId="60a1b2c3d4e5f6a7b8c9d0e2"

curl -X GET \
       --header 'Accept: application/json' \
       "https://digitai-backend.theeye.io/api/Batches/${batchId}?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function obtenerBatchPorId(accessToken, batchId) {
  try {
    const response = await axios.get(
      `https://digitai-backend.theeye.io/api/Batches/${batchId}`, 
      {
        params: {
          access_token: accessToken
        },
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Información del batch:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener batch:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const batchId = '60a1b2c3d4e5f6a7b8c9d0e2';
obtenerBatchPorId(accessToken, batchId);
```

```python [Python]
import requests

def obtener_batch_por_id(access_token, batch_id):
    try:
        response = requests.get(
            f'https://digitai-backend.theeye.io/api/Batches/{batch_id}',
            params={
                'access_token': access_token
            },
            headers={
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Información del batch:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al obtener batch:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    batch_id = '60a1b2c3d4e5f6a7b8c9d0e2'
    obtener_batch_por_id(access_token, batch_id)
```
:::

Ejemplo de respuesta:

```json
{
  "customer_id": "60a1b2c3d4e5f6a7b8c9d0e1",
  "name": "Lote de Facturas Enero 2023",
  "creation_date": "2023-06-01T10:15:30.000Z",
  "modification_date": "2023-06-01T10:15:30.000Z",
  "lifecycle": "pending",
  "lifecycle_details": "",
  "import_uuid": "550e8400-e29b-41d4-a716-446655440000",
  "id": "60a1b2c3d4e5f6a7b8c9d0e2",
  "documents_count": 5
}
```

</template>
</ApiEndpoint>

## Operaciones con Documentos {#operaciones-con-documentos}

### Obtener Todos los Documentos {#obtener-todos-los-documentos}

<ApiEndpoint
  title="Obtener Todos los Documentos"
  method="GET" 
  endpoint="/api/Documents"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[{name: 'access_token', placeholder: 'ElTokenDeAcceso'}]"
  :hideTitle="true"
>

Este endpoint permite obtener todos los documentos del cliente.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"

curl -X GET \
       --header 'Accept: application/json' \
       "https://digitai-backend.theeye.io/api/Documents?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function obtenerTodosLosDocumentos(accessToken) {
  try {
    const response = await axios.get(
      'https://digitai-backend.theeye.io/api/Documents', 
      {
        params: {
          access_token: accessToken
        },
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Todos los documentos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener documentos:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
obtenerTodosLosDocumentos(accessToken);
```

```python [Python]
import requests

def obtener_todos_los_documentos(access_token):
    try:
        response = requests.get(
            'https://digitai-backend.theeye.io/api/Documents',
            params={
                'access_token': access_token
            },
            headers={
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Todos los documentos:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al obtener documentos:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    obtener_todos_los_documentos(access_token)
```
:::

Ejemplo de respuesta:

```json
[
  {
    "customer_id": "60a1b2c3d4e5f6a7b8c9d0e1",
    "batch_id": "60a1b2c3d4e5f6a7b8c9d0e2",
    "filename": "factura1.pdf",
    "original_name": "factura1.pdf",
    "creation_date": "2023-06-01T10:20:15.000Z",
    "lifecycle": "processed",
    "id": "60a1b2c3d4e5f6a7b8c9d0e3"
  },
  {
    "customer_id": "60a1b2c3d4e5f6a7b8c9d0e1",
    "batch_id": "60a1b2c3d4e5f6a7b8c9d0e5",
    "filename": "factura2.pdf",
    "original_name": "factura2.pdf",
    "creation_date": "2023-07-01T09:15:45.000Z",
    "lifecycle": "processed",
    "id": "60a1b2c3d4e5f6a7b8c9d0e4"
  }
]
```

</template>
</ApiEndpoint>

### Leer Documento por ID {#leer-documento-por-id}

<ApiEndpoint
  title="Leer Documento por ID"
  method="GET" 
  endpoint="/api/Documents/:documentId"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'documentId', placeholder: '60a1b2c3d4e5f6a7b8c9d0e3'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hideTitle="true"
>

Este endpoint permite obtener la información de un documento específico.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
documentId="60a1b2c3d4e5f6a7b8c9d0e3"

curl -X GET \
       --header 'Accept: application/json' \
       "https://digitai-backend.theeye.io/api/Documents/${documentId}?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function obtenerDocumentoPorId(accessToken, documentId) {
  try {
    const response = await axios.get(
      `https://digitai-backend.theeye.io/api/Documents/${documentId}`, 
      {
        params: {
          access_token: accessToken
        },
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Información del documento:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener documento:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const documentId = '60a1b2c3d4e5f6a7b8c9d0e3';
obtenerDocumentoPorId(accessToken, documentId);
```

```python [Python]
import requests

def obtener_documento_por_id(access_token, document_id):
    try:
        response = requests.get(
            f'https://digitai-backend.theeye.io/api/Documents/{document_id}',
            params={
                'access_token': access_token
            },
            headers={
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Información del documento:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al obtener documento:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    document_id = '60a1b2c3d4e5f6a7b8c9d0e3'
    obtener_documento_por_id(access_token, document_id)
```
:::

Ejemplo de respuesta:

```json
{
  "_id": "60a1b2c3d4e5f6a7b8c9d0e1",
  "customer_id": "60a1b2c3d4e5f6a7b8c9d0e2",
  "assignee_id": null,
  "miscomprobantes_id": null,
  "batch_id": null,
  "filename": null,
  "original_name": "17614 CRT  BORRADOR.pdf",
  "keyPrefix": "documents/client_name/20250207/60a1b2c3d4e5f6a7b8c9d0e1",
  "creation_date": "2025-02-07T15:34:45.547Z",
  "modification_date": "2025-02-07T15:34:48.960Z",
  "categories": [],
  "checksum": "555fc1ac9929a2b62693caf3c12d3774f15d9216",
  "type": null,
  "lifecycle": "converted",
  "lifecycle_details": "",
  "lifecycle_error": "",
  "content_type": "application/pdf",
  "extension": "pdf",
  "manual_classification": null,
  "export_timestamp": null,
  "matched": false,
  "extractor": "pdf-extractor",
  "secret": "88888888888888888888888888888888",
  "id": "60a1b2c3d4e5f6a7b8c9d0e1"
}
```

</template>
</ApiEndpoint>

### Obtener Documentos por Batch ID {#obtener-documentos-por-batch-id}

<script setup>
const params = [
    {name: 'filter', placeholder: '{"where":{"batch_id":"6800eb313251642494ae877d"}}'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]
</script>
<ApiEndpoint
  title="Obtener Documentos por Batch ID"
  method="GET" 
  endpoint="/api/Documents"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="params"
  :hideTitle="true"
>

Este endpoint permite obtener todos los documentos asociados a un lote específico. El parámetro `filter` debe ser un objeto JSON codificado en URL que contenga la condición de filtrado.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
batchId="6800eb313251642494ae877d"
filter="{\"where\":{\"batch_id\":\"6800eb313251642494ae877d\"}}"

curl -X GET \
       --header 'Accept: application/json' \
       "https://digitai-backend.theeye.io/api/Documents?filter=${filter}&access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function obtenerDocumentosPorBatchId(accessToken, batchId) {
  try {
    const filter = JSON.stringify({
      where: {
        batch_id: batchId
      }
    });
    
    const response = await axios.get(
      'https://digitai-backend.theeye.io/api/Documents', 
      {
        params: {
          filter: filter,
          access_token: accessToken
        },
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Documentos del batch:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener documentos del batch:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const batchId = '6800eb313251642494ae877d';
obtenerDocumentosPorBatchId(accessToken, batchId);
```

```python [Python]
import requests
import json

def obtener_documentos_por_batch_id(access_token, batch_id):
    try:
        filter_data = json.dumps({
            'where': {
                'batch_id': batch_id
            }
        })
        
        response = requests.get(
            'https://digitai-backend.theeye.io/api/Documents',
            params={
                'filter': filter_data,
                'access_token': access_token
            },
            headers={
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Documentos del batch:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al obtener documentos del batch:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    batch_id = '6800eb313251642494ae877d'
    obtener_documentos_por_batch_id(access_token, batch_id)
```
:::

Ejemplo de respuesta:

```json
[
  {
    "customer_id": "60a1b2c3d4e5f6a7b8c9d0e1",
    "batch_id": "6800eb313251642494ae877d",
    "filename": "factura1.pdf",
    "original_name": "factura1.pdf",
    "creation_date": "2023-06-01T10:20:15.000Z",
    "lifecycle": "processed",
    "id": "60a1b2c3d4e5f6a7b8c9d0e3"
  },
  {
    "customer_id": "60a1b2c3d4e5f6a7b8c9d0e1",
    "batch_id": "6800eb313251642494ae877d",
    "filename": "factura2.pdf",
    "original_name": "factura2.pdf",
    "creation_date": "2023-06-01T10:25:45.000Z",
    "lifecycle": "processed",
    "id": "60a1b2c3d4e5f6a7b8c9d0e4"
  }
]
```

</template>
</ApiEndpoint>

## Reportes de Documentos {#reportes-de-documentos}

### Obtener Reporte de Documentos por Batch ID {#obtener-reporte-de-documentos-por-batch-id}

<ApiEndpoint
  title="Obtener Reporte de Documentos por Batch ID"
  method="GET" 
  endpoint="/api/Documents/report"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'filters[batch_id]', placeholder: '60a1b2c3d4e5f6a7b8c9d0e2'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hideTitle="true"
>

Este endpoint permite obtener un reporte detallado de todos los documentos asociados a un lote específico.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
batchId="60a1b2c3d4e5f6a7b8c9d0e2"

curl -X GET \
       --header 'Accept: application/json' \
       "https://digitai-backend.theeye.io/api/Documents/report?filters[batch_id]=${batchId}&access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function obtenerReportePorBatchId(accessToken, batchId) {
  try {
    const response = await axios.get(
      'https://digitai-backend.theeye.io/api/Documents/report', 
      {
        params: {
          'filters[batch_id]': batchId,
          access_token: accessToken
        },
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Reporte de documentos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener reporte:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const batchId = '60a1b2c3d4e5f6a7b8c9d0e2';
obtenerReportePorBatchId(accessToken, batchId);
```

```python [Python]
import requests

def obtener_reporte_por_batch_id(access_token, batch_id):
    try:
        response = requests.get(
            'https://digitai-backend.theeye.io/api/Documents/report',
            params={
                'filters[batch_id]': batch_id,
                'access_token': access_token
            },
            headers={
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Reporte de documentos:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al obtener reporte:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    batch_id = '60a1b2c3d4e5f6a7b8c9d0e2'
    obtener_reporte_por_batch_id(access_token, batch_id)
```
:::

Ejemplo de respuesta:

```json
[
  {
    "id": "60a1b2c3d4e5f6a7b8c9d0e3",
    "batch_id": "60a1b2c3d4e5f6a7b8c9d0e2",
    "filename": "factura1.pdf",
    "original_name": "factura1.pdf",
    "creation_date": "2023-06-01T10:20:15.000Z",
    "tags": [
      {
        "name": "numero_factura",
        "value": "A-0001-00000123",
        "confidence": 0.95
      },
      {
        "name": "fecha",
        "value": "2023-05-20",
        "confidence": 0.98
      },
      {
        "name": "monto_total",
        "value": "1500.00",
        "confidence": 0.92
      }
    ]
  },
  {
    "id": "60a1b2c3d4e5f6a7b8c9d0e4",
    "batch_id": "60a1b2c3d4e5f6a7b8c9d0e2",
    "filename": "factura2.pdf",
    "original_name": "factura2.pdf",
    "creation_date": "2023-06-01T10:25:45.000Z",
    "tags": [
      {
        "name": "numero_factura",
        "value": "A-0001-00000124",
        "confidence": 0.97
      },
      {
        "name": "fecha",
        "value": "2023-05-22",
        "confidence": 0.99
      },
      {
        "name": "monto_total",
        "value": "2300.50",
        "confidence": 0.94
      }
    ]
  }
]
```

</template>
</ApiEndpoint>

### Enviar Documentos a Procesar {#enviar-documentos-a-procesar}

<ApiEndpoint
  title="Enviar documentos a procesar"
  method="POST" 
  endpoint="/api/documents/upload"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hasFileUpload="true"
  :hideTitle="true"
>

Este endpoint permite enviar documentos a procesar directamente sin un lote.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"

curl -X POST "https://digitai-backend.theeye.io/api/documents/upload?access_token=${accessToken}" \
       -F file=@"archivocomprobante.pdf"
```

```javascript [NodeJS]
const axios = require('axios');
const fs = require('fs');
const FormData = require('form-data');

async function subirDocumento(accessToken, filePath) {
  try {
    const formData = new FormData();
    const fileStream = fs.createReadStream(filePath);
    formData.append('file', fileStream);
    
    const response = await axios.post(
      'https://digitai-backend.theeye.io/api/documents/upload', 
      formData, 
      {
        params: {
          access_token: accessToken
        },
        headers: {
          ...formData.getHeaders()
        }
      }
    );
    
    console.log('Documento subido:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al subir documento:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const filePath = './archivocomprobante.pdf';
subirDocumento(accessToken, filePath);
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
    host: 'digitai-backend.theeye.io',
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
          err.request = request
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

url = "https://digitai-backend.theeye.io/api/documents/upload?access_token=" + accessToken

payload = {}
files = [
  ('file', (basename, open(file, 'rb'), 'application/pdf'))
]
headers = {}

response = requests.request("POST", url, headers=headers, data=payload, files=files)

print(response.text)
```
:::

</template>
</ApiEndpoint>

## Operaciones con Lifecycle de Documentos {#operaciones-con-lifecycle-de-documentos}

### Obtener Lifecycle por ID {#obtener-lifecycle-por-id}

<ApiEndpoint
  title="Obtener Lifecycle por ID"
  method="GET" 
  endpoint="/api/DocumentLifecycles/:id"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'id', placeholder: '60a1b2c3d4e5f6a7b8c9d0e3'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hideTitle="true"
>

Este endpoint permite obtener información sobre el lifecycle de un documento específico.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
documentId="60a1b2c3d4e5f6a7b8c9d0e3"

curl -X GET \
       --header 'Accept: application/json' \
       "https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function obtenerCicloDeVidaPorId(accessToken, documentId) {
  try {
    const response = await axios.get(
      `https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}`, 
      {
        params: {
          access_token: accessToken
        },
        headers: {
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Información del lifecycle:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener lifecycle:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const documentId = '60a1b2c3d4e5f6a7b8c9d0e3';
obtenerCicloDeVidaPorId(accessToken, documentId);
```

```python [Python]
import requests

def obtener_ciclo_de_vida_por_id(access_token, document_id):
    try:
        response = requests.get(
            f'https://digitai-backend.theeye.io/api/DocumentLifecycles/{document_id}',
            params={
                'access_token': access_token
            },
            headers={
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Información del lifecycle:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al obtener lifecycle:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    document_id = '60a1b2c3d4e5f6a7b8c9d0e3'
    obtener_ciclo_de_vida_por_id(access_token, document_id)
```
:::

Ejemplo de respuesta:

```json
{
  "lifecycle": "invalidated",
  "lifecycle_details": ""
}
```

</template>
</ApiEndpoint>

### Marcar Documento como Completado {#marcar-documento-como-completado}

<ApiEndpoint
  title="Marcar Documento como Completado"
  method="PUT" 
  endpoint="/api/DocumentLifecycles/:id/completed"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'id', placeholder: '60a1b2c3d4e5f6a7b8c9d0e3'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hasBody="true"
  defaultBody='{"details":"Documento procesado correctamente"}'
  :hideTitle="true"
>

Este endpoint permite marcar un documento como completado en su lifecycle.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
documentId="60a1b2c3d4e5f6a7b8c9d0e3"

curl -X PUT \
       --header 'Content-Type: application/json' \
       --header 'Accept: application/json' \
       -d '{"details":"Documento procesado correctamente"}' \
       "https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}/completed?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function marcarDocumentoComoCompletado(accessToken, documentId, details) {
  try {
    const response = await axios.put(
      `https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}/completed`,
      { details },
      {
        params: {
          access_token: accessToken
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Documento marcado como completado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al marcar documento como completado:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const documentId = '60a1b2c3d4e5f6a7b8c9d0e3';
const details = 'Documento procesado correctamente';
marcarDocumentoComoCompletado(accessToken, documentId, details);
```

```python [Python]
import requests

def marcar_documento_como_completado(access_token, document_id, details):
    try:
        response = requests.put(
            f'https://digitai-backend.theeye.io/api/DocumentLifecycles/{document_id}/completed',
            json={
                'details': details
            },
            params={
                'access_token': access_token
            },
            headers={
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Documento marcado como completado:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al marcar documento como completado:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    document_id = '60a1b2c3d4e5f6a7b8c9d0e3'
    details = 'Documento procesado correctamente'
    marcar_documento_como_completado(access_token, document_id, details)
```
:::

Ejemplo de respuesta:

```json
{
  "lifecycle": "completed",
  "lifecycle_details": ""
}
```

</template>
</ApiEndpoint>

### Actualizar Detalles del Lifecycle {#actualizar-detalles-del-lifecycle}

<ApiEndpoint
  title="Actualizar Detalles del Lifecycle"
  method="PUT" 
  endpoint="/api/DocumentLifecycles/:id/details"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'id', placeholder: '60a1b2c3d4e5f6a7b8c9d0e3'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hasBody="true"
  defaultBody='{"details":"Procesando página 3 de 10"}'
  :hideTitle="true"
>

Este endpoint permite actualizar los detalles del lifecycle de un documento sin cambiar su estado.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
documentId="60a1b2c3d4e5f6a7b8c9d0e3"

curl -X PUT \
       --header 'Content-Type: application/json' \
       --header 'Accept: application/json' \
       -d '{"details":"Procesando página 3 de 10"}' \
       "https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}/details?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function actualizarDetallesCicloDeVida(accessToken, documentId, details) {
  try {
    const response = await axios.put(
      `https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}/details`,
      { details },
      {
        params: {
          access_token: accessToken
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
    });
    
    console.log('Detalles actualizados:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar detalles:', error.response?.data || error.message);
  }
}

// Uo
const accessToken = 'ElTokenDeAcceso';
const documentId = '60a1b2c3d4e5f6a7b8c9d0e3';
const details = 'Procesando página 3 de 10';
actualizarDetallesCicloDeVida(accessToken, documentId, details);
```

```python [Python]
import requests

def actualizar_detalles_ciclo_de_vida(access_token, document_id, details):
    try:
        response = requests.put(
            f'https://digitai-backend.theeye.io/api/DocumentLifecycles/{document_id}/details',
            json={
                'details': details
            },
            params={
                'access_token': access_token
            },
            headers={
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Detalles actualizados:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al actualizar detalles:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    document_id = '60a1b2c3d4e5f6a7b8c9d0e3'
    details = 'Procesando página 3 de 10'
    actualizar_detalles_ciclo_de_vida(access_token, document_id, details)
```
:::

Ejemplo de respuesta:

```json
{
  "id": "60a1b2c3d4e5f6a7b8c9d0e3",
  "documentId": "60a1b2c3d4e5f6a7b8c9d0e3",
  "status": "processing",
  "details": "Procesando página 3 de 10",
  "createdAt": "2023-06-01T10:20:15.000Z",
  "updatedAt": "2023-06-01T10:25:30.000Z"
}
```

</template>
</ApiEndpoint>

### Marcar Documento con Error {#marcar-documento-con-error}

<ApiEndpoint
  title="Marcar Documento con Error"
  method="PUT" 
  endpoint="/api/DocumentLifecycles/:id/error"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'id', placeholder: '60a1b2c3d4e5f6a7b8c9d0e3'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hasBody="true"
  defaultBody='{"error":"El documento está dañado y no puede ser procesado"}'
  :hideTitle="true"
>

Este endpoint permite marcar un documento con error en su lifecycle.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
documentId="60a1b2c3d4e5f6a7b8c9d0e3"

curl -X PUT \
       --header 'Content-Type: application/json' \
       --header 'Accept: application/json' \
       -d '{"error":"El documento está dañado y no puede ser procesado"}' \
       "https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}/error?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function marcarDocumentoConError(accessToken, documentId, error) {
  try {
    const response = await axios.put(
      `https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}/error`,
      { error },
      {
        params: {
          access_token: accessToken
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Documento marcado con error:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al marcar documento con error:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const documentId = '60a1b2c3d4e5f6a7b8c9d0e3';
const errorMsg = 'El documento está dañado y no puede ser procesado';
marcarDocumentoConError(accessToken, documentId, errorMsg);
```

```python [Python]
import requests

def marcar_documento_con_error(access_token, document_id, error_msg):
    try:
        response = requests.put(
            f'https://digitai-backend.theeye.io/api/DocumentLifecycles/{document_id}/error',
            json={
                'error': error_msg
            },
            params={
                'access_token': access_token
            },
            headers={
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Documento marcado con error:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al marcar documento con error:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    document_id = '60a1b2c3d4e5f6a7b8c9d0e3'
    error_msg = 'El documento está dañado y no puede ser procesado'
    marcar_documento_con_error(access_token, document_id, error_msg)
```
:::

Ejemplo de respuesta:

```json
{
  "lifecycle":"error",
  "lifecycle_details":""
}
```

</template>
</ApiEndpoint>

### Invalidar Documento {#invalidar-documento}

<ApiEndpoint
  title="Invalidar Documento"
  method="PUT" 
  endpoint="/api/DocumentLifecycles/:id/invalidated"
  :baseUrl="'https://digitai-backend.theeye.io'"
  :params="[
    {name: 'id', placeholder: '60a1b2c3d4e5f6a7b8c9d0e3'},
    {name: 'access_token', placeholder: 'ElTokenDeAcceso'}
  ]"
  :hasBody="true"
  defaultBody='{"reason":"El documento no cumple con los requisitos para ser procesado"}'
  :hideTitle="true"
>

Este endpoint permite marcar un documento como invalidado en su lifecycle.

<template #example>

::: code-group
```bash [Curl]
accessToken="ElTokenDeAcceso"
documentId="60a1b2c3d4e5f6a7b8c9d0e3"

curl -X PUT \
       --header 'Content-Type: application/json' \
       --header 'Accept: application/json' \
       -d '{"reason":"El documento no cumple con los requisitos para ser procesado"}' \
       "https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}/invalidated?access_token=${accessToken}"
```

```javascript [NodeJS]
const axios = require('axios');

async function invalidarDocumento(accessToken, documentId, reason) {
  try {
    const response = await axios.put(
      `https://digitai-backend.theeye.io/api/DocumentLifecycles/${documentId}/invalidated`,
      { reason },
      {
        params: {
          access_token: accessToken
        },
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }
    );
    
    console.log('Documento invalidado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al invalidar documento:', error.response?.data || error.message);
  }
}

// Uso
const accessToken = 'ElTokenDeAcceso';
const documentId = '60a1b2c3d4e5f6a7b8c9d0e3';
const reason = 'El documento no cumple con los requisitos para ser procesado';
invalidarDocumento(accessToken, documentId, reason);
```

```python [Python]
import requests

def invalidar_documento(access_token, document_id, reason):
    try:
        response = requests.put(
            f'https://digitai-backend.theeye.io/api/DocumentLifecycles/{document_id}/invalidated',
            json={
                'reason': reason
            },
            params={
                'access_token': access_token
            },
            headers={
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        )
        
        response.raise_for_status()
        
        print('Documento invalidado:', response.json())
        return response.json()
    except requests.exceptions.RequestException as e:
        print('Error al invalidar documento:', e)

# Uso
if __name__ == "__main__":
    access_token = 'ElTokenDeAcceso'
    document_id = '60a1b2c3d4e5f6a7b8c9d0e3'
    reason = 'El documento no cumple con los requisitos para ser procesado'
    invalidar_documento(access_token, document_id, reason)
```
:::

Ejemplo de respuesta:

```json
{
  "lifecycle":"invalidated",
  "lifecycle_details":""
}
```

</template>
</ApiEndpoint>
