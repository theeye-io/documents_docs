import { ref } from 'vue'

// Create a shared state for playground visibility
const globalVisibility = ref(false)

export function usePlaygroundVisibility() {
  // Show all playgrounds
  function showAllPlaygrounds() {
    globalVisibility.value = true
  }

  // Hide all playgrounds
  function hideAllPlaygrounds() {
    globalVisibility.value = false
  }

  // Toggle visibility of all playgrounds
  function toggleAllPlaygrounds() {
    globalVisibility.value = !globalVisibility.value
  }

  return {
    globalVisibility,
    showAllPlaygrounds,
    hideAllPlaygrounds,
    toggleAllPlaygrounds
  }
} 