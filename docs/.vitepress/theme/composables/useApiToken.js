import { ref, watch } from 'vue'

// Create a shared token state that persists between component instances
const tokenValue = ref('')
const hasSetToken = ref(false)

// If available, retrieve token from localStorage on initial load
if (typeof window !== 'undefined') {
  const savedToken = localStorage.getItem('digitai_api_token')
  if (savedToken) {
    tokenValue.value = savedToken
    hasSetToken.value = true
  }
}

export function useApiToken() {
  // Save token to localStorage when it changes
  watch(tokenValue, (newValue) => {
    if (typeof window !== 'undefined' && newValue) {
      localStorage.setItem('digitai_api_token', newValue)
      hasSetToken.value = true
    }
  })

  // Clear token from state and storage
  function clearToken() {
    tokenValue.value = ''
    hasSetToken.value = false
    if (typeof window !== 'undefined') {
      localStorage.removeItem('digitai_api_token')
    }
  }

  return {
    token: tokenValue,
    hasToken: hasSetToken,
    clearToken
  }
} 