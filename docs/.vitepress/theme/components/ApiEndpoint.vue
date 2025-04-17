<template>
  <div class="api-endpoint">
    <h3 :id="slug">{{ title }}</h3>
    
    <div class="endpoint-description">
      <slot></slot>
    </div>
    
    <div class="playground-wrapper">
      <ApiPlayground 
        :method="method" 
        :endpoint="endpoint"
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
  }
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