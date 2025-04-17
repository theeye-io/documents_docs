import DefaultTheme from 'vitepress/theme'
import ApiExplorer from './components/ApiExplorer.vue'
import ApiPlayground from './components/ApiPlayground.vue'
import ApiEndpoint from './components/ApiEndpoint.vue'
import ApiPlaygroundControls from './components/ApiPlaygroundControls.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ApiExplorer', ApiExplorer)
    app.component('ApiPlayground', ApiPlayground)
    app.component('ApiEndpoint', ApiEndpoint)
    app.component('ApiPlaygroundControls', ApiPlaygroundControls)
  }
} 