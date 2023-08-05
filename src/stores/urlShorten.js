import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useURLStore = defineStore('urlShorten', () => {
    const abc = ref(0)

    return { abc }
})