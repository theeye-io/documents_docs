export default {
  title: 'Digitai',
  description: 'Digitalizador de comprobantes',
  base: '/',
  vite: {
    resolve: {
      alias: {
        'images': '/public/images/'
      }
    }
  },
  themeConfig: {
    logo: 'https://cdn.theeye.io/logo/theeye.png',
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Trazabilidad', link: '/trazabilidad' },
      { text: 'Convenciones', link: '/convenciones/' },
      { text: 'API', link: '/api/' },
      { text: 'Developers', link: '/developers/' },
      { text: 'Soporte', link: 'https://ayuda.theeye.io' },
      {
        text: 'Versión',
        items: [
          { text: 'v1.1.0 (Actual)', link: '/' },
          //{ text: 'v1.0.0', link: '/v1.0.0/' },
          { text: 'Todas las versiones', link: '/versions' }
        ]
      }
    ],
    sidebar: [
      {
        text: 'Introducción',
        items: [
          { text: 'Inicio', link: '/' },
          { text: 'Trazabilidad', link: '/trazabilidad' }
        ]
      },
      {
        text: 'Referencia',
        items: [
          { text: 'Convenciones', link: '/convenciones/' }
        ]
      },
      {
        text: 'API Reference',
        items: [
          { 
            text: 'Documentación API', 
            link: '/api/',
            items: [
              {
                text: 'Preparación',
                link: '/api/#preparación'
              },
              {
                text: 'Operaciones comunes',
                link: '/api/#operaciones-comunes',
                items: [
                  { text: 'Basic Login', link: '/api/#basic-login' }
                ]
              },
              {
                text: 'Operaciones con Documentos',
                link: '/api/#operaciones-con-documentos',
                items: [
                  { text: 'Subir documentos', link: '/api/#subir-documentos' },
                  { text: 'Obtener Todos los Documentos', link: '/api/#obtener-todos-los-documentos' },
                  { text: 'Leer Documento por ID', link: '/api/#leer-documento-por-id' },
                  { text: 'Obtener Documentos por Batch ID', link: '/api/#obtener-documentos-por-batch-id' }
                ]
              },
              {
                text: 'Reportes de Documentos',
                link: '/api/#reportes-de-documentos',
                items: [
                  { text: 'Obtener Reporte de Documentos por Batch ID', link: '/api/#obtener-reporte-de-documentos-por-batch-id' }
                ]
              },
              {
                text: 'Operaciones con Lifecycle de Documentos',
                link: '/api/#operaciones-con-lifecycle-de-documentos',
                items: [
                  { text: 'Obtener Lifecycle por ID', link: '/api/#obtener-lifecycle-por-id' },
                  { text: 'Marcar Documento como Completado', link: '/api/#marcar-documento-como-completado' },
                  { text: 'Actualizar Detalles del Lifecycle', link: '/api/#actualizar-detalles-del-lifecycle' },
                  { text: 'Marcar Documento con Error', link: '/api/#marcar-documento-con-error' },
                  { text: 'Invalidar Documento', link: '/api/#invalidar-documento' }
                ]
              },
              {
                text: 'Operaciones con Lotes (Batch)',
                link: '/api/#operaciones-con-lotes-batch',
                items: [
                  { text: 'Obtener Todos los Lotes', link: '/api/#obtener-todos-los-lotes' },
                  { text: 'Crear Batch', link: '/api/#crear-batch' },
                  { text: 'Cambiar Batch a Estado Pendiente', link: '/api/#cambiar-batch-a-estado-pendiente' },
                  { text: 'Subir Documentos al Batch', link: '/api/#subir-documentos-al-batch' },
                  { text: 'Leer Batch por ID', link: '/api/#leer-batch-por-id' }
                ]
              }
            ]
          }
        ]
      },
      {
        text: 'Guía para Desarrolladores',
        items: [
          {
            text: 'Integración mediante iframes',
            link: '/developers/',
            items: [
              { text: 'Cómo funciona', link: '/developers/#cómo-funciona' },
              { text: 'Implementación paso a paso', link: '/developers/#implementación-paso-a-paso' },
              { text: 'Ejemplo completo', link: '/developers/#ejemplo-completo-de-implementación' },
              { text: 'Consideraciones de seguridad', link: '/developers/#consideraciones-de-seguridad' }
            ]
          }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/theeye-io/documents_docs' }
    ],
    footer: {
      message: 'Publicado bajo Licencia ISC.',
      copyright: 'Copyright © 2023-present TheEye'
    },
    search: {
      provider: 'local'
    }
  }
} 
