<template>
  <div class="api-playground">
    <div class="playground-header">
      <div class="request-header">
        <div class="method-badge" :class="method.toLowerCase()">{{ method }}</div>
        <div class="endpoint">{{ displayEndpoint }}</div>
      </div>
      <button @click="togglePlayground" class="toggle-button">
        {{ isExpanded ? '▲' : '▼' }}
      </button>
    </div>
    
    <div v-if="isExpanded" class="playground-container">
      <div class="request-section">
        <div v-if="isLocalhost && actualEndpoint !== displayEndpoint" class="custom-url-indicator">
          <span class="indicator-icon">⚠️</span>
          <span>Usando URL personalizada: <code>{{ actualEndpoint }}</code></span>
        </div>
        
        <div v-if="hasParams" class="params-section">
          <h4>Parámetros</h4>
          <div v-for="(param, index) in displayParams" :key="index" class="param-item">
            <label :for="`param-${index}`">{{ param.name }}:</label>
            <input 
              :id="`param-${index}`" 
              v-model="paramValues[param.name]" 
              :placeholder="param.placeholder || param.name"
              class="param-input" 
            />
          </div>
        </div>
        
        <div v-if="hasBody" class="body-section">
          <h4>Cuerpo de la solicitud</h4>
          <textarea 
            v-model="requestBody" 
            class="body-input" 
            rows="6" 
            placeholder="Ingrese el cuerpo JSON de la solicitud"
          ></textarea>
        </div>
        
        <div v-if="hasFileUpload" class="file-section">
          <h4>Archivo a enviar</h4>
          <div class="file-upload">
            <label for="file-upload" class="file-label">
              {{ fileSelected ? file.name : 'Seleccionar archivo...' }}
            </label>
            <input 
              id="file-upload" 
              type="file" 
              @change="handleFileUpload" 
              class="file-input" 
            />
          </div>
        </div>
        
        <div class="action-section">
          <button 
            class="execute-button" 
            @click="executeRequest" 
            :disabled="isLoading"
          >
            {{ isLoading ? 'Ejecutando...' : 'Ejecutar' }}
          </button>
        </div>
      </div>
      
      <div v-if="showResponse" class="response-section">
        <div class="response-header">
          <div class="status-badge" :class="getStatusClass(responseStatus)">
            {{ responseStatus }}
          </div>
          <div class="response-time" v-if="responseTime">
            Tiempo: {{ responseTime }}ms
          </div>
        </div>
        
        <pre class="response-content"><code>{{ formattedResponse }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useApiToken } from '../composables/useApiToken'
import { useApiBaseUrl } from '../composables/useApiBaseUrl'

const props = defineProps({
  method: {
    type: String,
    default: 'GET',
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

const { token, hasToken } = useApiToken()
const { getFullApiUrl, isLocalhost } = useApiBaseUrl()
const paramValues = ref({})
const requestBody = ref(props.defaultBody)
const responseContent = ref({})
const responseStatus = ref(null)
const responseTime = ref(null)
const isLoading = ref(false)
const showResponse = ref(false)
const file = ref(null)
const fileSelected = computed(() => file.value !== null)
const isExpanded = ref(false)

// Display the original endpoint in the UI but use the transformed URL for API calls
const displayEndpoint = computed(() => props.endpoint)
const actualEndpoint = computed(() => getFullApiUrl(props.endpoint))

// Create a filtered params list that excludes access_token if we have a global token
const displayParams = computed(() => {
  if (!hasToken.value) return props.params
  return props.params.filter(param => param.name !== 'access_token')
})

const hasParams = computed(() => displayParams.value.length > 0)

const formattedResponse = computed(() => {
  try {
    return JSON.stringify(responseContent.value, null, 2)
  } catch (e) {
    return String(responseContent.value)
  }
})

function togglePlayground() {
  isExpanded.value = !isExpanded.value
}

function getStatusClass(status) {
  if (!status) return ''
  if (status >= 200 && status < 300) return 'success'
  if (status >= 300 && status < 400) return 'redirect'
  if (status >= 400 && status < 500) return 'client-error'
  if (status >= 500) return 'server-error'
  return ''
}

function handleFileUpload(event) {
  file.value = event.target.files[0]
}

async function executeRequest() {
  isLoading.value = true
  showResponse.value = false
  
  try {
    // Build URL with query parameters
    let url = actualEndpoint.value
    const queryParams = new URLSearchParams()
    
    // Add stored token if available
    if (hasToken.value && token.value) {
      queryParams.append('access_token', token.value)
    }
    
    for (const [key, value] of Object.entries(paramValues.value)) {
      if (value) {
        // Check if param is part of the URL path (replace :paramName)
        if (url.includes(`:${key}`)) {
          url = url.replace(`:${key}`, encodeURIComponent(value))
        } else {
          queryParams.append(key, value)
        }
      }
    }
    
    // Add query params to URL if any
    if (queryParams.toString()) {
      url += (url.includes('?') ? '&' : '?') + queryParams.toString()
    }
    
    const startTime = Date.now()
    
    let response
    
    // Handle file uploads
    if (props.hasFileUpload && file.value) {
      const formData = new FormData()
      formData.append('file', file.value)
      
      response = await fetch(url, {
        method: props.method,
        body: formData
      })
    } else {
      // Prepare request options for JSON requests
      const options = {
        method: props.method,
        headers: {
          'Accept': 'application/json'
        }
      }
      
      // Add body for methods that support it
      if (['POST', 'PUT', 'PATCH'].includes(props.method) && props.hasBody) {
        options.headers['Content-Type'] = 'application/json'
        try {
          // Try to parse the body as JSON for proper submission
          const parsedBody = JSON.parse(requestBody.value)
          options.body = JSON.stringify(parsedBody)
        } catch (e) {
          // If parsing fails, send as is (might be invalid JSON)
          options.body = requestBody.value
        }
      }
      
      // Execute the request
      response = await fetch(url, options)
    }
    
    const endTime = Date.now()
    
    responseTime.value = endTime - startTime
    responseStatus.value = response.status
    
    // Parse response
    try {
      responseContent.value = await response.json()
    } catch (e) {
      responseContent.value = await response.text()
    }
    
    showResponse.value = true
  } catch (error) {
    responseContent.value = { error: error.message }
    responseStatus.value = 0
    showResponse.value = true
  } finally {
    isLoading.value = false
  }
}
</script>

<style>
.api-playground {
  width: 100%;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
}

.playground-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
}

.playground-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
}

.request-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.toggle-button {
  background: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
}

.toggle-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.method-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.8rem;
  text-transform: uppercase;
  color: white;
}

.method-badge.get {
  background-color: #61affe;
}

.method-badge.post {
  background-color: #49cc90;
}

.method-badge.put {
  background-color: #fca130;
}

.method-badge.delete {
  background-color: #f93e3e;
}

.method-badge.patch {
  background-color: #50e3c2;
}

.endpoint {
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  word-break: break-all;
}

.request-section {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.custom-url-indicator {
  background-color: var(--vp-c-warning-soft);
  border-left: 4px solid var(--vp-c-warning);
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.indicator-icon {
  font-size: 1rem;
}

.params-section,
.body-section,
.file-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.param-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.param-input,
.body-input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 4px;
  background-color: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
}

.body-input {
  resize: vertical;
  min-height: 100px;
}

.file-upload {
  display: flex;
  align-items: center;
}

.file-label {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--vp-c-brand);
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.file-input {
  display: none;
}

.action-section {
  display: flex;
  justify-content: flex-end;
}

.execute-button {
  padding: 0.5rem 1.5rem;
  background-color: var(--vp-c-brand);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.execute-button:hover {
  background-color: var(--vp-c-brand-dark);
}

.execute-button:disabled {
  background-color: var(--vp-c-gray);
  cursor: not-allowed;
}

.response-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1rem;
}

.response-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.status-badge {
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 0.8rem;
  color: white;
}

.status-badge.success {
  background-color: #49cc90;
}

.status-badge.redirect {
  background-color: #fca130;
}

.status-badge.client-error {
  background-color: #f93e3e;
}

.status-badge.server-error {
  background-color: #f93e3e;
}

.response-time {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
}

.response-content {
  margin: 0;
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-radius: 4px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.9rem;
  overflow-wrap: break-word;
  white-space: pre-wrap;
  max-height: 400px;
  overflow-y: auto;
}
</style> 