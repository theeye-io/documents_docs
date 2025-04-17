import DefaultTheme from 'vitepress/theme'
import ApiPlayground from './components/ApiPlayground.vue'
import ApiEndpoint from './components/ApiEndpoint.vue'
import ApiPlaygroundControls from './components/ApiPlaygroundControls.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('ApiPlayground', ApiPlayground)
    app.component('ApiEndpoint', ApiEndpoint)
    app.component('ApiPlaygroundControls', ApiPlaygroundControls)
  }
} 