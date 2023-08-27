<template>
    <div class="container-fluid py-3">
        <div class="row mb-5">
            <input ref="longURLInput" class="form-control border-0 shadow-none fw-bolder" type="text" placeholder="paste a long url" v-model="urlStore.longURL" required @focus="onfocus = true, urlStore.longURL = ''">
        </div>
        <div class="row mb-5">
            <div class="col">
                <span class="button">
                    <button class="btn px-0 border-0 fw-bolder fs-5" @click="createURL" v-if="!urlStore.isShortening">shorten</button>
                    <span class="fw-bolder fs-5" v-else>shortening...</span>
                </span>
            </div>
        </div>
        <div class="row" v-if="!onfocus">
            <p class="fw-bolder position-relative d-inline-block" v-if="!isInvalid">
                <span class="button">{{ urlStore.shortenURL }}</span>
                <button id="copy" class="btn btn-primary position-absolute ms-3" :data-clipboard-text="urlStore.shortenURL" v-if="urlStore.shortenURL" :disabled="isCopied">
                    <span v-if="!isCopied">
                        <i class="bi bi-clipboard"></i>
                    </span>
                    <span v-else>Copied</span>
                </button>
            </p>
            <p class="button fw-medium fst-italic" v-else>Please paste an URL to shorten</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useURLStore } from '../stores/mmURLStore'
import ClipboardJS from 'clipboard'

const clipboard = new ClipboardJS('#copy');
const urlStore = useURLStore();
const isInvalid = ref<boolean>(false);
const isCopied = ref<boolean>(false);
const onfocus = ref<boolean>(false);
const longURLInput = ref();

const createURL = async () => {
    if (urlStore.longURL) {
        isInvalid.value = false;
        onfocus.value = false;
        await urlStore.createShortURL();
        await urlStore.addURL();
        if (longURLInput.value as HTMLInputElement) {
            longURLInput.value.style.opacity = 0.5;
        }
    } else {
        isInvalid.value = true;
        onfocus.value = false;
    }
    // urlStore.longURL = '';
};

clipboard.on('success', function() {
    isCopied.value = true;
});

onMounted(() => {
    if (urlStore.longURL) {
        onfocus.value = false;
        longURLInput.value.style.opacity = 0.5;
    } else {
        onfocus.value = true;
    }
});

</script>
