import { defineStore } from 'pinia'
import { ref } from 'vue'
import db from '../firebase/urlFireStore.js'
import { collection, addDoc, query, onSnapshot, doc, deleteDoc } from 'firebase/firestore'

export const useURLStore = defineStore('urlShorten', () => {
    const longURL = ref('');
    const shortenURL = ref('');
    const token = '1f9704f667e7be35a9cf112c69e26c371a1a1a1b';
    const isShortening = ref(false);
    const alias = ref('');

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

    const addURL = async () => {
        await addDoc(collection(db, "URLs"), {
            longUrl: longURL.value,
            shortUrl: shortenURL.value
        });
    }

    const q = query(collection(db, "URLs"));
    const getURLs = onSnapshot(q, (querySnapshot) => {
        const URLs = [];
        querySnapshot.forEach((doc) => {
            URLs.push(doc.data().shortUrl);
        });
      });

    const deleteURL = async () => {
        await deleteDoc(doc(db, "URLs", alias.value));
    };

    return { longURL, shortenURL, createShortURL, isShortening, addURL, getURLs, deleteURL }
})