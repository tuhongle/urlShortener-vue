<template>
    <div class="container-fluid py-3">
        <div class="row">
            <input class="form-control border-0 shadow-none fw-bolder" type="text" placeholder="alias" required v-model="urlStore.alias">
        </div>
        <div class="row">
            <div class="col">
                <span class="button">
                    <button class="fw-bolder px-0 fs-5 btn border-0" @click="deleteLink">delete</button>
                </span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useURLStore } from '../stores/mmURLStore';

const urlStore = useURLStore();

const deleteLink = () => {
    urlStore.deleteURL();
};

</script>
