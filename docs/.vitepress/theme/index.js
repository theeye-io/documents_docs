import DefaultTheme from 'vitepress/theme'
import ApiExplorer from './components/ApiExplorer.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ApiExplorer', ApiExplorer)
  }
} 