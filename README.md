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
  - `api/`: Directorio que contiene el playground personalizado para pruebas de API
  - `*.md`: Archivos de documentación en formato Markdown
  - `public/`: Archivos estáticos

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

## Despliegue en Producción

### Requisitos para Despliegue

- [AWS CLI](https://aws.amazon.com/cli/) instalado y configurado
- Permisos para acceder al bucket S3 y distribución CloudFront
- Node.js y npm (mismos requisitos que para desarrollo)

### Configuración de Despliegue

El proyecto utiliza AWS S3 para el almacenamiento de archivos estáticos y CloudFront como CDN. Para configurar el despliegue:

1. Copia el archivo `deploy-config.example.sh` a `deploy-config.sh`:
   ```bash
   cp scripts/deploy-config.example.sh scripts/deploy-config.sh
   ```

2. Edita `deploy-config.sh` con tus credenciales y configuración de AWS:
   ```bash
   # Ejemplo de configuración
   S3_BUCKET="nombre-de-tu-bucket"
   CLOUDFRONT_DISTRIBUTION_ID="tu-id-de-distribucion"
   AWS_REGION="tu-region"
   ```

### Despliegue Manual

Para desplegar manualmente el sitio de documentación a producción:

```bash
./scripts/deploy.sh
```

Este script realiza las siguientes acciones:
1. Compila la documentación en modo producción
2. Sincroniza los archivos generados con el bucket S3
3. Crea una invalidación en CloudFront para actualizar la caché

### Uso del API Playground Personalizado

Para utilizar el playground personalizado de API, accede al directorio `docs/api/`. El playground te permite probar endpoints, enviar solicitudes y visualizar respuestas directamente en la documentación.
