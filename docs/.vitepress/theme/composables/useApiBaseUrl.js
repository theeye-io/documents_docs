import { ref, computed } from 'vue'

// Default production API URL
const DEFAULT_API_URL = 'https://digitai-backend.theeye.io'

// Create a shared state for the API base URL
const apiBaseUrl = ref(DEFAULT_API_URL)
const isCustomUrl = ref(false)

// Compute if we're on localhost (only client-side)
const isLocalhost = computed(() => {
  if (typeof window === 'undefined') return false
  return window.location.hostname === 'localhost' || 
         window.location.hostname === '127.0.0.1' ||
         window.location.hostname.startsWith('192.168.')
})

// If available, retrieve custom URL from localStorage on initial load
if (typeof window !== 'undefined') {
  const savedUrl = localStorage.getItem('digitai_api_base_url')
  if (savedUrl && savedUrl !== DEFAULT_API_URL) {
    apiBaseUrl.value = savedUrl
    isCustomUrl.value = true
  }
}

// Helper function to ensure URL has /api path
function ensureApiPath(url) {
  if (!url) return url;
  
  // Remove trailing slash if present
  let formattedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
  
  // Add /api if not already present
  if (!formattedUrl.includes('/api')) {
    formattedUrl = formattedUrl + '/api';
  }
  
  return formattedUrl;
}

export function useApiBaseUrl() {
  // Save URL to localStorage when it changes
  const setApiBaseUrl = (url) => {
    if (!url) {
      // If empty, reset to default
      resetApiBaseUrl()
      return
    }
    
    // Format URL to ensure it has /api path
    const formattedUrl = ensureApiPath(url)
    
    apiBaseUrl.value = formattedUrl
    isCustomUrl.value = formattedUrl !== DEFAULT_API_URL
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('digitai_api_base_url', formattedUrl)
    }
  }

  // Reset to default URL
  const resetApiBaseUrl = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('digitai_api_base_url')
    }
    apiBaseUrl.value = DEFAULT_API_URL
    isCustomUrl.value = false
  }

  // Function to transform an endpoint to use the current base URL
  const getFullApiUrl = (endpoint) => {
    if (endpoint.startsWith('http')) {
      // If it's already a full URL, find the /api part and replace everything before it
      const apiIndex = endpoint.indexOf('/api')
      if (apiIndex !== -1) {
        return apiBaseUrl.value + endpoint.substring(apiIndex + 4)
      }
      return endpoint // Keep as is if we can't transform it
    }
    
    // Otherwise, just append the endpoint to the base URL
    return endpoint.startsWith('/') 
      ? apiBaseUrl.value + endpoint 
      : `${apiBaseUrl.value}/${endpoint}`
  }

  return {
    apiBaseUrl,
    isCustomUrl,
    isLocalhost,
    setApiBaseUrl,
    resetApiBaseUrl,
    getFullApiUrl
  }
} 