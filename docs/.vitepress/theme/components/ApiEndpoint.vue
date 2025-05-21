<template>
  <div class="api-endpoint">
    <h3 v-if="!hideTitle" :id="slug">{{ title }}</h3>
    
    <div class="endpoint-description">
      <slot></slot>
    </div>
    
    <div class="playground-wrapper">
      <ApiPlayground 
        :method="method" 
        :endpoint="fullEndpoint"
        :params="params"
        :hasBody="hasBody"
        :defaultBody="defaultBody"
        :hasFileUpload="hasFileUpload"
      />
    </div>
    
    <div v-if="$slots.example" class="endpoint-example">
      <slot name="example"></slot>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useApiBaseUrl } from '../composables/useApiBaseUrl'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true,
    validator: (value) => ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'].includes(value.toUpperCase())
  },
  endpoint: {
    type: String,
    required: true
  },
  baseUrl: {
    type: String,
    default: ''
  },
  params: {
    type: Array,
    default: () => []
  },
  hasBody: {
    type: Boolean,
    default: false
  },
  defaultBody: {
    type: String,
    default: '{}'
  },
  hasFileUpload: {
    type: Boolean,
    default: false
  },
  hideTitle: {
    type: Boolean,
    default: false
  }
})

const { getFullApiUrl, isCustomUrl } = useApiBaseUrl()

// Display only the endpoint path in the UI
const displayEndpoint = computed(() => {
  // If it's a full URL, extract just the path part
  if (props.endpoint.startsWith('http')) {
    try {
      const url = new URL(props.endpoint)
      return url.pathname + url.search + url.hash
    } catch (e) {
      return props.endpoint
    }
  }
  // If it's already a path, use it as is
  return props.endpoint
})

const fullEndpoint = computed(() => {
  // If baseUrl is provided, use it (for backward compatibility)
  if (props.baseUrl) {
    const base = props.baseUrl.endsWith('/') ? props.baseUrl.slice(0, -1) : props.baseUrl
    const path = props.endpoint.startsWith('/') ? props.endpoint.slice(1) : props.endpoint
    return `${base}/${path}`
  }
  // Otherwise use the custom URL from useApiBaseUrl
  return getFullApiUrl(props.endpoint)
})

const slug = computed(() => {
  return props.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
})
</script>

<style>
.api-endpoint {
  margin-bottom: 3rem;
}

.endpoint-description {
  margin-bottom: 1rem;
}

.playground-wrapper {
  margin-bottom: 1.5rem;
}

.endpoint-example {
  margin-top: 1.5rem;
}
</style> 