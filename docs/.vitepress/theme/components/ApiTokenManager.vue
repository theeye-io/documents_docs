<template>
  <div class="api-token-manager">
    <h3>API Token</h3>
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
          class="token-save-btn" 
          @click="saveToken"
          :disabled="!localToken"
        >
          Guardar
        </button>
        
        <button 
          v-if="isTokenSet && !isEditing" 
          class="token-edit-btn" 
          @click="startEditing"
        >
          Editar
        </button>
        
        <button 
          v-if="isTokenSet" 
          class="token-clear-btn" 
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
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useApiToken } from '../composables/useApiToken'

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

onMounted(() => {
  localToken.value = token.value
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
</script>

<style>
.api-token-manager {
  margin: 2rem 0;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.api-token-manager h3 {
  margin-top: 0;
  margin-bottom: 1rem;
}

.token-input-container {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.token-input, .token-display {
  flex: 1;
  padding: 0.5rem;
  border-radius: 4px;
  font-family: monospace;
  font-size: 0.9rem;
}

.token-input {
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg);
}

.token-display {
  background-color: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  display: flex;
  align-items: center;
}

.token-actions {
  display: flex;
  gap: 0.5rem;
}

.token-save-btn, .token-edit-btn, .token-clear-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;
}

.token-save-btn {
  background-color: var(--vp-c-brand);
  color: white;
}

.token-save-btn:hover {
  background-color: var(--vp-c-brand-dark);
}

.token-save-btn:disabled {
  background-color: var(--vp-c-gray);
  cursor: not-allowed;
}

.token-edit-btn {
  background-color: var(--vp-c-gray-light-4);
  color: var(--vp-c-text-1);
}

.token-edit-btn:hover {
  background-color: var(--vp-c-gray-light-3);
}

.token-clear-btn {
  background-color: var(--vp-c-danger);
  color: white;
}

.token-clear-btn:hover {
  background-color: var(--vp-c-danger-dark);
}

.token-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.token-status-icon {
  color: var(--vp-c-green);
  font-weight: bold;
}
</style> 