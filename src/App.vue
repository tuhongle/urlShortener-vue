<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
const home = ref(false);
</script>

<template>
  <main class="d-flex flex-column vh-100 pb-2">
    <RouterView />
    <footer class="mt-auto">
      <div class="container-fluid">
        <RouterLink :to="{ name: 'home' }" class="text-decoration-none text-dark" v-if="home" @click="home = !home">
          <i class="bi bi-house-door-fill me-2"></i>
          <span class="fw-bolder">Home</span>
        </RouterLink>
        <RouterLink :to="{ name: 'manage' }" class="text-decoration-none text-dark" v-else @click="home = !home">
          <i class="bi bi-gear-fill me-2"></i>
          <span class="fw-bolder">Manage URLs</span>
        </RouterLink>
      </div>
    </footer>
  </main>

</template>
