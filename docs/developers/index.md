# Guía para Desarrolladores

## Integración mediante iframes

Digitai permite la integración directa con sus aplicaciones mediante la visualización de documentos en iframes. Esta funcionalidad le permite mostrar documentos para revisión sin necesidad de redirigir a los usuarios fuera de su aplicación.

### Cómo funciona

La integración mediante iframes utiliza un enlace secreto compuesto por un ID de documento y una clave secreta. Este enlace permite acceder directamente a la página de revisión del documento.

![Diagrama de integración de iframes](/images/iframe-integration.svg)

### Implementación paso a paso

#### 1. Obtener el ID y clave secreta del documento

Para cada documento que desea mostrar, necesitará:
- El ID del documento
- La clave secreta asociada

Estos valores se pueden obtener a través de:
- La respuesta de la API al subir un documento
- Los callbacks recibidos cuando un documento es procesado

#### 2. Construir la URL del documento

La URL para acceder al documento tiene la siguiente estructura:

```
https://[dominio]/document/[document_id]/secret/[secret_key]/review
```

Por ejemplo:
```
https://digitai.theeye.io/document/67fdbec6f062ccb06fa8aae6/secret/350e7b349585920ad37323c4d6f9a4dd/review
```

#### 3. Implementar el iframe en su aplicación

Añada un iframe a su aplicación y establezca la URL como el atributo `src`:

```html
<iframe 
  id="documentFrame" 
  src="https://digitai.theeye.io/document/[document_id]/secret/[secret_key]/review"
  width="100%" 
  height="700px" 
  allowfullscreen
></iframe>
```

#### 4. Manejar eventos de cierre

Cuando el usuario hace clic en "Cerrar" dentro del visor de documentos, el iframe enviará un mensaje que su aplicación puede capturar:

```javascript
window.addEventListener('message', function(event) {
    // Verificar origen del mensaje (opcional pero recomendado)
    // if (event.origin !== 'https://digitai.theeye.io') return;
    
    if (event.data && event.data.action === 'close') {
        console.log('Documento cerrado:', event.data);
        
        // Realizar acciones adicionales, como:
        // - Ocultar el iframe
        // - Mostrar otra vista
        // - Actualizar datos
    }
});
```

El mensaje recibido contiene información del documento y puede incluir datos adicionales según la configuración.

## Ejemplo completo de implementación

A continuación se muestra un ejemplo completo de una página HTML que implementa la visualización de un documento en un iframe:

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Visualizador de Documentos</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
        }
        .header {
            background-color: #3f51b5;
            color: white;
            padding: 15px;
            border-radius: 5px 5px 0 0;
        }
        .content {
            background-color: white;
            padding: 20px;
            border-radius: 0 0 5px 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .iframe-container {
            width: 100%;
            height: 700px;
            margin: 20px 0;
            border: 1px solid #ddd;
        }
        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
        .status {
            padding: 10px;
            margin-top: 20px;
            background-color: #e8f5e9;
            border-left: 4px solid #4caf50;
            display: none;
        }
        button {
            background-color: #3f51b5;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 10px;
        }
        button:hover {
            background-color: #303f9f;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Visualizador de Documentos</h1>
        </div>
        <div class="content">
            <h2>Documento</h2>
            <p>Utilice los botones para cargar o recargar el documento.</p>
            
            <button id="loadButton">Cargar Documento</button>
            <button id="reloadButton" style="display: none;">Recargar Documento</button>
            
            <div id="iframeContainer" class="iframe-container" style="display: none;">
                <iframe id="documentFrame" src="about:blank" allowfullscreen></iframe>
            </div>
            
            <div id="status" class="status">
                <h3>Mensaje Recibido:</h3>
                <pre id="messageContent"></pre>
            </div>
        </div>
    </div>

    <script>
        // URL del documento a cargar (reemplace con sus valores)
        const documentId = '67fdbec6f062ccb06fa8aae6';
        const secretKey = '350e7b349585920ad37323c4d6f9a4dd';
        const documentUrl = `https://digitai.theeye.io/document/${documentId}/secret/${secretKey}/review`;
        
        // Obtener elementos del DOM
        const loadButton = document.getElementById('loadButton');
        const reloadButton = document.getElementById('reloadButton');
        const iframeContainer = document.getElementById('iframeContainer');
        const documentFrame = document.getElementById('documentFrame');
        const statusElement = document.getElementById('status');
        const messageContentElement = document.getElementById('messageContent');
        
        // Escuchar mensajes del iframe
        window.addEventListener('message', function(event) {
            // Verificar origen del mensaje (opcional pero recomendado en producción)
            // if (event.origin !== 'https://digitai.theeye.io') return;
            
            console.log('Mensaje recibido:', event.data);
            
            // Mostrar el mensaje recibido
            if (event.data && event.data.action === 'close') {
                statusElement.style.display = 'block';
                messageContentElement.textContent = JSON.stringify(event.data, null, 2);
                
                // Ocultar iframe y mostrar botón de recarga
                iframeContainer.style.display = 'none';
                loadButton.style.display = 'none';
                reloadButton.style.display = 'inline-block';
            }
        });
        
        // Evento de clic en botón de carga
        loadButton.addEventListener('click', function() {
            documentFrame.src = documentUrl;
            iframeContainer.style.display = 'block';
            loadButton.style.display = 'none';
            reloadButton.style.display = 'inline-block';
            statusElement.style.display = 'none';
        });
        
        // Evento de clic en botón de recarga
        reloadButton.addEventListener('click', function() {
            documentFrame.src = documentUrl;
            iframeContainer.style.display = 'block';
            statusElement.style.display = 'none';
        });
    </script>
</body>
</html>
```

## Consideraciones de seguridad

Al implementar esta funcionalidad, tenga en cuenta lo siguiente:

1. **Validación de origen**: En producción, siempre verifique el origen de los mensajes recibidos:
   ```javascript
   if (event.origin !== 'https://digitai.theeye.io') return;
   ```

2. **Protección de enlaces**: Los enlaces secretos deben tratarse con la misma seguridad que las credenciales:
   - No los almacene en código fuente público
   - No los transmita a través de canales no seguros
   - Utilice HTTPS para todas las comunicaciones

3. **Temporalidad**: Los enlaces tienen una validez temporal limitada. Si necesita acceso permanente, considere utilizar la API.

## Demos y recursos adicionales

- [Código de ejemplo en GitHub](https://github.com/theeye-io/documents_docs/docs/public/examples/)
- <a href="/examples/iframe-example.html" download class="custom-button">Descargar ejemplo HTML</a>
- <a href="/examples/iframe-example.html" target="_blank" class="custom-button">Ver demo de integración con iframes</a>

> La demo de integración con iframes ahora permite:
> - Pasar parámetros por URL (`?documentId=ID&secretKey=KEY&environmentUrl=URL`)
> - Personalizar la URL base del entorno (por defecto: https://digitai-api.theeye.io)
> - Ingresar manualmente el ID y clave secreta
> - Ingresar directamente la URL completa del documento
> - Abrir documentos en una nueva pestaña como alternativa cuando el servidor no permite iframes

<style>
.custom-button {
  display: inline-block;
  font-weight: 600;
  font-size: 0.9rem;
  line-height: 1.4;
  border-radius: 4px;
  padding: 0.75em 1.5em;
  border: 1px solid transparent;
  background-color: #3b5eca;
  color: white !important;
  transition: background-color 0.25s;
  text-decoration: none !important;
}

.custom-button:hover {
  background-color: #2c498f;
  color: white !important;
  text-decoration: none !important;
}

/* Override any link styles from VitePress theme */
a.custom-button {
  color: white !important;
  text-decoration: none !important;
}

a.custom-button:hover, 
a.custom-button:focus, 
a.custom-button:active {
  color: white !important;
  text-decoration: none !important;
}
</style> 