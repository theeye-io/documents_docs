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

        <!-- Profile Information Section -->
        <div v-if="isTokenSet && !isEditing && profileInfo" class="profile-section">
          <h5>Información del Perfil</h5>
          <div class="profile-details">
            <div class="profile-item">
              <span class="profile-label">Nombre:</span>
              <span class="profile-value">{{ profileInfo.name }}</span>
            </div>
            <div class="profile-item">
              <span class="profile-label">Email:</span>
              <span class="profile-value">{{ profileInfo.email }}</span>
            </div>
            <div class="profile-item">
              <span class="profile-label">Credencial:</span>
              <span class="profile-value">{{ profileInfo.credential }}</span>
            </div>
            <div v-if="profileInfo.customer && profileInfo.customer.name" class="profile-item">
              <span class="profile-label">Cliente:</span>
              <span class="profile-value">{{ profileInfo.customer.name }}</span>
            </div>
          </div>
        </div>
        <div v-else-if="isTokenSet && !isEditing && isLoading" class="profile-loading">
          Cargando información del perfil...
        </div>
        <div v-else-if="isTokenSet && !isEditing && profileError" class="profile-error">
          Error: {{ profileError }}
        </div>

        <!-- API URL Configuration (always visible) -->
        <div class="api-url-section">
          <h5>URL de la API</h5>
          <div v-if="isCustomApiUrl" class="custom-url-alert">
            <span class="alert-icon">⚠️</span>
            <span>Usando URL personalizada: <code>{{ displayApiBaseUrl }}</code></span>
            <button 
              class="url-reset-btn control-btn" 
              @click="resetApiUrl"
            >
              Restaurar URL por defecto
            </button>
          </div>
          <div v-else class="default-url-status">
            <span class="url-status-icon">✓</span> 
            <span>Usando URL por defecto: <code>{{ displayApiBaseUrl }}</code></span>
          </div>

          <!-- Development mode controls -->
          <template v-if="isLocalhost">
            <p class="url-description">
              Configure la URL base de la API para pruebas en entorno de desarrollo.
            </p>
            <div class="url-input-container">
              <input 
                v-model="localApiUrl" 
                type="text" 
                class="url-input"
                placeholder="https://api-dev.example.com"
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
                  class="url-clear-btn control-btn" 
                  @click="resetApiUrl"
                >
                  Limpiar
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useApiToken } from '../composables/useApiToken'
import { useApiBaseUrl } from '../composables/useApiBaseUrl'

// Token management
const { token, hasToken, clearToken } = useApiToken()
const localToken = ref('')
const isEditing = ref(false)

// Profile data
const profileInfo = ref(null)
const isLoading = ref(false)
const profileError = ref(null)

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

// Display URL without /api for UI
const displayApiBaseUrl = computed(() => {
  if (!apiBaseUrl.value) return '';
  return apiBaseUrl.value.endsWith('/api') 
    ? apiBaseUrl.value.slice(0, -4) 
    : apiBaseUrl.value;
})

onMounted(() => {
  localToken.value = token.value
  
  // Set local API URL without /api for display
  localApiUrl.value = displayApiBaseUrl.value
  
  // Fetch profile if token exists
  if (token.value) {
    fetchProfile(token.value)
  }
})

// Watch for token changes to fetch profile
watch(token, (newToken) => {
  if (newToken) {
    fetchProfile(newToken)
  } else {
    profileInfo.value = null
    profileError.value = null
  }
})

async function fetchProfile(tokenValue) {
  if (!tokenValue) return
  
  isLoading.value = true
  profileError.value = null
  profileInfo.value = null
  
  try {
    // Use the base URL and compose the endpoint properly
    const baseUrl = apiBaseUrl.value
    const response = await fetch(`${baseUrl}/api/session/profile?access_token=${tokenValue}`)
    
    if (!response.ok) {
      throw new Error(`Error de servidor: ${response.status}`)
    }
    
    profileInfo.value = await response.json()
  } catch (error) {
    console.error("Error fetching profile:", error)
    profileError.value = error.message || "Error al obtener información del perfil"
  } finally {
    isLoading.value = false
  }
}

function saveToken() {
  if (localToken.value) {
    token.value = localToken.value
    isEditing.value = false
    // Profile will be fetched via the watcher
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
  profileInfo.value = null
  profileError.value = null
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

function clearUrlStorage() {
  // Clear custom URL from storage and reset to default
  resetApiUrl()
  // Clear the input field
  localApiUrl.value = ''
  // Force a refresh of the display URL
  localApiUrl.value = displayApiBaseUrl.value
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
  padding-bottom: 1.5rem;
  margin-bottom: 1.5rem;
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

/* Profile section styles */
.profile-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-brand);
}

.profile-section h5 {
  margin-top: 0;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  color: var(--vp-c-text-1);
}

.profile-details {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.profile-item {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.profile-label {
  font-weight: 600;
  min-width: 110px;
}

.profile-value {
  color: var(--vp-c-text-2);
  word-break: break-word;
}

.profile-loading {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--vp-c-bg);
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-brand);
  color: var(--vp-c-text-2);
}

.profile-error {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background-color: var(--vp-c-danger-soft);
  border-radius: 6px;
  border-left: 4px solid var(--vp-c-danger);
  color: var(--vp-c-danger);
}

.custom-url-alert {
  margin: 10px 0;
  padding: 10px;
  background-color: #fff3cd;
  border: 1px solid #ffeeba;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.alert-icon {
  font-size: 1.2em;
}

.default-url-status {
  margin: 10px 0;
  padding: 10px;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.url-reset-btn {
  margin-left: auto;
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.url-reset-btn:hover {
  background-color: #c82333;
}

code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 2px 4px;
  border-radius: 3px;
  font-family: monospace;
}
</style> 