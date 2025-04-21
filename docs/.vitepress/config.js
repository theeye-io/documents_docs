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
                text: 'Operaciones con Lotes (Batch)',
                link: '/api/#operaciones-con-lotes-batch',
                items: [
                  { text: 'Obtener Todos los Lotes', link: '/api/#obtener-todos-los-lotes' },
                  { text: 'Crear Batch', link: '/api/#crear-batch' },
                  { text: 'Subir Documentos al Batch', link: '/api/#subir-documentos-al-batch' },
                  { text: 'Leer Batch por ID', link: '/api/#leer-batch-por-id' }
                ]
              },
              {
                text: 'Operaciones con Documentos',
                link: '/api/#operaciones-con-documentos',
                items: [
                  { text: 'Obtener Todos los Documentos', link: '/api/#obtener-todos-los-documentos' },
                  { text: 'Leer Documento por ID', link: '/api/#leer-documento-por-id' },
                  { text: 'Obtener Documentos por Batch ID', link: '/api/#obtener-documentos-por-batch-id' }
                ]
              },
              {
                text: 'Reportes de Documentos',
                link: '/api/#reportes-de-documentos',
                items: [
                  { text: 'Obtener Reporte de Documentos por Batch ID', link: '/api/#obtener-reporte-de-documentos-por-batch-id' },
                  { text: 'Enviar documentos a procesar', link: '/api/#enviar-documentos-a-procesar' }
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
              }
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
