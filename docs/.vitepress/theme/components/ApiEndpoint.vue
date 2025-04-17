<template>
  <div class="api-endpoint">
    <h3 :id="slug">{{ title }}</h3>
    
    <div class="endpoint-description">
      <slot></slot>
    </div>
    
    <div class="playground-controls">
      <button 
        class="toggle-playground-btn" 
        @click="togglePlayground"
        :aria-expanded="isVisible"
      >
        {{ isVisible ? 'Ocultar Playground' : 'Mostrar Playground' }}
        <span class="toggle-icon" :class="{ 'is-open': isVisible }">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </span>
      </button>
    </div>
    
    <div v-show="isVisible" class="playground-wrapper">
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
import { ref, computed, watch } from 'vue'
import { usePlaygroundVisibility } from '../composables/usePlaygroundVisibility'

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
  },
  initiallyExpanded: {
    type: Boolean,
    default: false
  }
})

// Local state for individual playground visibility
const localVisibility = ref(props.initiallyExpanded)

// Get global visibility state
const { globalVisibility } = usePlaygroundVisibility()

// Compute actual visibility based on both local and global state
const isVisible = computed(() => globalVisibility.value || localVisibility.value)

// Update local visibility when global visibility changes
watch(globalVisibility, (newGlobalVisibility) => {
  if (newGlobalVisibility === false) {
    // When global visibility is turned off, follow it
    localVisibility.value = false
  }
  // When global visibility is turned on, we don't change local visibility
  // This ensures that when "Hide All" is clicked after "Show All", all playgrounds will be hidden
})

const slug = computed(() => {
  return props.title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
})

function togglePlayground() {
  localVisibility.value = !localVisibility.value
}
</script>

<style>
.api-endpoint {
  margin-bottom: 3rem;
}

.endpoint-description {
  margin-bottom: 1rem;
}

.playground-controls {
  margin-bottom: 1rem;
}

.toggle-playground-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--vp-c-text-1);
  cursor: pointer;
  transition: background-color 0.2s;
}

.toggle-playground-btn:hover {
  background-color: var(--vp-c-gray-light-4);
}

.toggle-icon {
  display: inline-flex;
  transition: transform 0.2s;
}

.toggle-icon.is-open {
  transform: rotate(180deg);
}

.playground-wrapper {
  margin-bottom: 1.5rem;
}

.endpoint-example {
  margin-top: 1.5rem;
}
</style> 