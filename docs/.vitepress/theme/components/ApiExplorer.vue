<template>
  <div class="api-explorer">
    <div v-if="!loaded" class="loading">
      Cargando explorador de API...
    </div>
    <div ref="swaggerContainer" class="swagger-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { useData } from 'vitepress'

const props = defineProps({
  specUrl: {
    type: String,
    required: true
  },
  defaultModelsExpandDepth: {
    type: Number,
    default: 1
  },
  displayOperationId: {
    type: Boolean,
    default: false
  },
  filter: {
    type: Boolean,
    default: false
  },
  deepLinking: {
    type: Boolean,
    default: true
  },
  tryItOutEnabled: {
    type: Boolean,
    default: true
  }
})

const { isDark } = useData()
const swaggerContainer = ref(null)
const loaded = ref(false)

onMounted(async () => {
  // Dynamically import Swagger UI
  const { default: SwaggerUIBundle } = await import('swagger-ui-dist/swagger-ui-bundle.js')
  
  // Import Swagger CSS
  const swaggerCss = document.createElement('link')
  swaggerCss.rel = 'stylesheet'
  swaggerCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.2.0/swagger-ui.min.css'
  document.head.appendChild(swaggerCss)

  // Initialize Swagger UI
  watchEffect(() => {
    if (swaggerContainer.value) {
      const ui = SwaggerUIBundle({
        url: props.specUrl,
        domNode: swaggerContainer.value,
        defaultModelsExpandDepth: props.defaultModelsExpandDepth,
        displayOperationId: props.displayOperationId,
        filter: props.filter,
        deepLinking: props.deepLinking,
        tryItOutEnabled: props.tryItOutEnabled,
        presets: [SwaggerUIBundle.presets.apis],
        plugins: [SwaggerUIBundle.plugins.DownloadUrl],
        layout: "BaseLayout",
        supportedSubmitMethods: ["get", "put", "post", "delete", "options", "head", "patch", "trace"],
        theme: isDark.value ? 'dark' : 'light',
      })
      
      loaded.value = true
      
      // Add theme change watcher
      watchEffect(() => {
        if (ui && typeof ui.setTheme === 'function') {
          ui.setTheme(isDark.value ? 'dark' : 'light')
        }
      })
    }
  })
})
</script>

<style>
.api-explorer {
  margin: 2rem 0;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
}

.loading {
  padding: 2rem;
  text-align: center;
  color: var(--vp-c-text-2);
}

.swagger-container .swagger-ui .opblock .opblock-summary-path {
  max-width: 500px;
  overflow-x: hidden;
  text-overflow: ellipsis;
}

/* Dark mode overrides */
.dark .swagger-ui .opblock .opblock-summary-operation-id, 
.dark .swagger-ui .opblock .opblock-summary-path, 
.dark .swagger-ui .opblock .opblock-summary-path__deprecated {
  color: var(--vp-c-text-1);
}

.swagger-ui img {
  display: inline;
  margin: 0;
}
</style> 