export default {
  title: 'Digitai',
  description: 'Digitalizador de comprobantes',
  base: '/',
  vite: {
    resolve: {
      alias: {
        '/images/': '/public/images/'
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
      { text: 'Soporte', link: 'https://ayuda.theeye.io' }
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
          { text: 'Documentación API', link: '/api/' }
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
