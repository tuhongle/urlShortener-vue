<template>
    <div class="container-fluid py-3">
        <div class="row mb-5">
            <input class="form-control border-0 shadow-none fw-bolder" type="text" placeholder="paste a long url" v-model="urlStore.longURL" required>
        </div>
        <div class="row mb-5">
            <input class="form-control border-0 shadow-none fw-bolder" type="text" placeholder="optional custom alias">
        </div>
        <div class="row mb-5">
            <div class="col">
                <span class="button">
                    <button class="btn px-0 border-0 fw-bolder fs-5" @click="createURL" v-if="!urlStore.isShortening">shorten</button>
                    <span class="fw-bolder fs-5" v-else>shortening...</span>
                </span>
            </div>
        </div>
        <div class="row">
            <p class="fw-bolder position-relative d-inline-block" v-if="!isInvalid">
                <span class="button">{{ urlStore.shortenURL }}</span>
                <button class="btn btn-secondary copy position-absolute" v-if="urlStore.shortenURL">Copy</button>
            </p>
            <p class="button fw-medium fst-italic" v-else>Please paste an URL to shorten</p>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useURLStore } from '../stores/urlShorten.js'

const urlStore = useURLStore();
const isInvalid = ref(false)

const createURL = () => {
    if (urlStore.longURL) {
        urlStore.createShortURL();
    } else {
        isInvalid.value = true;
    }
    urlStore.longURL = '';
}
</script>
