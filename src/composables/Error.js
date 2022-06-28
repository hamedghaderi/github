import { ref } from 'vue'
import { useToast } from 'vue-toastification'

export function useError() {
  const errorMsg = ref(null)

  const displayError = error => {
    errorMsg.value = error.message
    const toast = useToast()

    toast.error(errorMsg.value, {
      position: 'bottom-right',
    })
  }

  return { displayError, errorMsg }
}
