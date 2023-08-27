<template>
    <div class="container-fluid py-3">
        <div class="row align-items-center mb-4 border-bottom pb-3" v-for="url in URLs" :key="url.id">
            <div class="col col-md-7 mb-2 mb-md-0">
                <p class="text-truncate mb-0" data-bs-toggle="tooltip" data-bs-placement="top" :data-bs-title="url.longUrl">
                    {{ url.longUrl }}
                </p>
            </div>
            <div class="col">
                <p class="text-truncate mb-0 button">{{ url.shortenUrl }}</p>
            </div>
            <div class="col d-flex">
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

const copyURL = (el: MouseEvent, data : any) => {
    try {
        navigator.clipboard.writeText(data);
        (el.target! as HTMLElement).innerText = 'copied';
        setTimeout(() => {
            (el.target! as HTMLElement).innerText = 'copy';
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
