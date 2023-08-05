import { defineStore } from 'pinia'
import { ref } from 'vue'
import db from '../firebase/urlFireStore.js'

export const useURLStore = defineStore('urlShorten', () => {
    const longURL = ref('');
    const shortenURL = ref('');
    const token = '1f9704f667e7be35a9cf112c69e26c371a1a1a1b';
    const isShortening = ref(false);

    const createShortURL = async () => {
        isShortening.value = true;
        const res = await fetch('https://api-ssl.bitly.com/v4/shorten', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                "long_url": longURL.value, 
                "domain": "bit.ly", 
                "group_guid": "" 
            })
        });
        const data = await res.json();
        shortenURL.value = data.link;
        isShortening.value = false;
    };

    return { longURL, shortenURL, createShortURL, isShortening }
})