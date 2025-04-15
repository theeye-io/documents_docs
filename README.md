# DigitAI - Digitalizador de comprobantes

## Introducción

Reconocimiento de comprobantes de TheEye es una herramienta que permite definir plantillas de reconocimiento de documentos , las cuales son utilizadas para reconocer comprobantes del mismo tipo.
Mediante las distintas integraciones es posible trabajar tanto con la obtención de los documentos como con los resultados para utilizarlos en distintos sistemas.

### Funcionalidades y características de Reconocimiento de comprobantes de TheEye

* Permite definir la estructura de los comprobantes cuya información se desea digitalizar, mediante la creación de plantillas
* Obtención de datos de comprobantes a través de filtros y/o patrones
* Reconocimiento y digitalización de los comprobantes cuya estructura ha sido definida de manera automática y manual
* Capacidad de trabajar con múltiples páginas
* Integraciones
    * Toma de comprobantes desde casillas de correo
    * Envío de comprobantes y resultados vía API
    * conciliación contra AFIP (Argentina)


### Objetivos

Describir cómo crear y utilizar plantillas de reconocimiento de comprobantes 

## Desarrollo Local

Esta documentación está construida con [VitePress](https://vitepress.dev/), un generador de sitios estáticos moderno basado en Vue, con capacidades interactivas de documentación API mediante [Swagger UI](https://swagger.io/tools/swagger-ui/).

### Requisitos

- [Node.js](https://nodejs.org/) (v16.x o superior)
- npm (v7.x o superior)

### Instalación

Para comenzar a trabajar con la documentación localmente, sigue estos pasos:

1. Clona este repositorio
   ```bash
   git clone https://github.com/theeye-io/documents_docs.git
   cd documents_docs
   ```

2. Instala las dependencias
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo
   ```bash
   npm run docs:dev
   ```

Esto abrirá automáticamente tu navegador con la documentación y recargará la página cuando realices cambios en los archivos.

### Estructura del Proyecto

- `docs/`: Directorio principal para VitePress
  - `.vitepress/`: Configuración y temas de VitePress
    - `config.js`: Archivo de configuración principal
    - `theme/`: Personalización del tema
      - `components/`: Componentes Vue personalizados
        - `ApiExplorer.vue`: Componente Swagger UI para pruebas de API
  - `api/`: Documentación de la API con ejemplos interactivos
  - `*.md`: Archivos de documentación en formato Markdown
  - `public/`: Archivos estáticos
    - `swagger/`: Especificaciones de OpenAPI/Swagger

### Generación de Documentación Estática

Para generar la documentación estática para producción:

```bash
npm run docs:build
```

El resultado se guardará en el directorio `.vitepress/dist`.

### Previsualizando la Documentación de Producción

Para previsualizar la documentación compilada:

```bash
npm run docs:preview
```

### Uso del Componente ApiExplorer para Pruebas de API

Para incluir pruebas interactivas de API en cualquier página de documentación, usa el componente ApiExplorer:

```md
# Mi Documento

Descripción de la API...

<ApiExplorer spec-url="/swagger/my-api-spec.json" />
```

Esto incorporará un explorador de API interactivo que permite probar endpoints, cargar archivos, y visualizar respuestas JSON directamente en la documentación.
