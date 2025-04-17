<template>
  <div class="api-playground-controls">
    <div class="controls-container">
      <div class="controls-section">
        <h4>Configuración API</h4>

        <!-- Token Manager Section -->
        <div class="token-manager-section">
          <h5>Token de Acceso</h5>
          <p class="token-description">Configure su token de acceso aquí para utilizarlo automáticamente en todas las peticiones API.</p>
          <div class="token-input-container">
            <input 
              v-if="!isTokenSet || isEditing" 
              v-model="localToken" 
              type="text" 
              class="token-input"
              placeholder="Ingrese su token de acceso"
              @keyup.enter="saveToken"
            />
            
            <div v-else class="token-display">
              <span class="token-mask">{{ maskedToken }}</span>
            </div>
            
            <div class="token-actions">
              <button 
                v-if="!isTokenSet || isEditing" 
                class="token-save-btn control-btn" 
                @click="saveToken"
                :disabled="!localToken"
              >
                Guardar
              </button>
              
              <button 
                v-if="isTokenSet && !isEditing" 
                class="token-edit-btn control-btn" 
                @click="startEditing"
              >
                Editar
              </button>
              
              <button 
                v-if="isTokenSet" 
                class="token-clear-btn control-btn" 
                @click="clearTokenHandler"
              >
                Borrar
              </button>
            </div>
          </div>
          <div class="token-status" v-if="isTokenSet && !isEditing">
            <span class="token-status-icon">✓</span> 
            <span>Token configurado. Se usará automáticamente en todas las peticiones API.</span>
          </div>
        </div>

        <!-- API URL Configuration (only on localhost) -->
        <div v-if="isLocalhost" class="api-url-section">
          <h5>URL de la API (Modo Desarrollo)</h5>
          <p class="url-description">
            Configure la URL base de la API para pruebas en entorno de desarrollo.
          </p>
          <div class="url-input-container">
            <input 
              v-model="localApiUrl" 
              type="text" 
              class="url-input"
              placeholder="https://api-dev.example.com/api"
              @keyup.enter="saveApiUrl"
            />
            
            <div class="url-actions">
              <button 
                class="url-save-btn control-btn" 
                @click="saveApiUrl"
                :disabled="!localApiUrl"
              >
                Guardar URL
              </button>
              
              <button 
                v-if="isCustomApiUrl" 
                class="url-reset-btn control-btn" 
                @click="resetApiUrl"
              >
                Restaurar Default
              </button>
            </div>
          </div>
          <div class="api-url-status" v-if="isCustomApiUrl">
            <span class="url-status-icon">✓</span> 
            <span>URL personalizada configurada: <code>{{ apiBaseUrl }}</code></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApiToken } from '../composables/useApiToken'
import { useApiBaseUrl } from '../composables/useApiBaseUrl'

// Token management
const { token, hasToken, clearToken } = useApiToken()
const localToken = ref('')
const isEditing = ref(false)

const isTokenSet = computed(() => hasToken.value)

const maskedToken = computed(() => {
  if (!token.value) return ''
  
  // Show first 4 and last 4 chars, mask the rest
  const tokenLength = token.value.length
  if (tokenLength <= 8) return token.value
  
  const firstPart = token.value.substring(0, 4)
  const lastPart = token.value.substring(tokenLength - 4)
  const maskedLength = tokenLength - 8
  
  return `${firstPart}${'•'.repeat(maskedLength)}${lastPart}`
})

// API URL management
const { apiBaseUrl, isCustomUrl: isCustomApiUrl, isLocalhost, setApiBaseUrl, resetApiBaseUrl } = useApiBaseUrl()
const localApiUrl = ref('')

onMounted(() => {
  localToken.value = token.value
  localApiUrl.value = apiBaseUrl.value
})

function saveToken() {
  if (localToken.value) {
    token.value = localToken.value
    isEditing.value = false
  }
}

function startEditing() {
  localToken.value = token.value
  isEditing.value = true
}

function clearTokenHandler() {
  localToken.value = ''
  clearToken()
  isEditing.value = false
}

function saveApiUrl() {
  if (localApiUrl.value) {
    setApiBaseUrl(localApiUrl.value)
  }
}

function resetApiUrl() {
  localApiUrl.value = ''
  resetApiBaseUrl()
}
</script>

<style>
.api-playground-controls {
  margin: 2rem 0;
}

.controls-container {
  padding: 1.5rem;
  border-radius: 8px;
  background-color: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-divider);
}

.controls-section h4 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
  color: var(--vp-c-text-1);
}

.token-manager-section,
.api-url-section {
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
}

.token-manager-section {
  border-bottom: 1px solid var(--vp-c-divider-light);
}

.token-manager-section h5,
.api-url-section h5 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.token-description,
.url-description {
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.token-input-container,
.url-input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  flex-wrap: wrap;
}

@media (max-width: 640px) {
  .token-input-container,
  .url-input-container {
    flex-direction: column;
  }
  
  .token-actions,
  .url-actions {
    align-self: flex-start;
  }
}

.token-input, 
.token-display,
.url-input {
  flex: 1;
  min-width: 0; /* Important for text overflow to work */
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}

.token-input,
.url-input {
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.token-display {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
  max-width: 100%;
  overflow: hidden;
}

.token-mask {
  overflow: hidden;
  text-overflow: ellipsis;
}

.token-status,
.api-url-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
  margin-top: 0.75rem;
}

.token-status-icon,
.url-status-icon {
  color: var(--vp-c-brand);
  font-weight: bold;
}

.token-actions,
.url-actions {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.9rem;
  cursor: pointer;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
  transition: background-color 0.2s;
}

.control-btn:hover:not(:disabled) {
  background-color: var(--vp-c-gray-light-4);
}

.control-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.token-save-btn,
.url-save-btn {
  background-color: var(--vp-c-brand-dimm);
  color: var(--vp-c-brand-contrast);
}

.token-save-btn:hover:not(:disabled),
.url-save-btn:hover:not(:disabled) {
  background-color: var(--vp-c-brand);
}

.token-clear-btn,
.url-reset-btn {
  background-color: var(--vp-c-danger-dimm);
  color: var(--vp-c-danger);
}

.token-clear-btn:hover:not(:disabled),
.url-reset-btn:hover:not(:disabled) {
  background-color: var(--vp-c-danger-soft);
}
</style> 