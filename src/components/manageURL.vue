<template>
    <div class="container-fluid py-3">
        <div class="row align-items-center mb-4 border-bottom" v-for="url in URLs" :key="url.id">
            <div class="col-7">
                <p class="text-truncate mb-0" data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="url.longUrl">
                    {{ url.longUrl }}
                </p>
            </div>
            <div class="col-3">
                <p class="text-truncate mb-0">{{ url.shortenUrl }}</p>
            </div>
            <div class="col-2 d-flex">
                <button class="fw-bolder btn border-0" @click="copyURL($event, url.shortenUrl)">
                    <span>copy</span>
                </button>
                <button class="fw-bolder btn border-0" @click="deleteLink(url.id)"><span>delete</span></button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { type url } from '../types/URLsTypes';
import { useURLStore } from '../stores/mmURLStore';
import { Tooltip } from "bootstrap"

const urlStore = useURLStore();
const URLs = ref<url[]>([]);

onMounted(async () => {
    URLs.value = await urlStore.getURLs();
})

const deleteLink = async (data: string) => {
    await urlStore.deleteURL(data);
    URLs.value = await urlStore.getURLs();
}

const copyURL = (el, data : string) => {
    try {
        navigator.clipboard.writeText(data);
        el.target.innerText = 'copied';
        setTimeout(() => {
            el.target.innerText = 'copy';
        }, 2000)
    }
    catch (err) {
        console.log(err)
    }
}

// tooltip settings
new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']",
})

</script>
