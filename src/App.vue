<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useURLStore } from './stores/mmURLStore'
const urlStore = useURLStore();
const home = ref(false);
</script>

<template>
  <main class="d-flex flex-column vh-100 pb-2">
    <RouterView />
    <footer class="mt-auto py-3">
      <div class="container-fluid d-flex justify-content-between">
        <div class="left">
          <RouterLink :to="{ name: 'home' }" class="text-decoration-none text-dark" v-if="home" @click="home = !home">
            <i class="bi bi-house-door-fill me-2"></i>
            <span class="fw-bolder">Home</span>
          </RouterLink>
          <RouterLink :to="{ name: 'manage' }" class="text-decoration-none text-dark" v-else @click="home = !home">
            <i class="bi bi-gear-fill me-2"></i>
            <span class="fw-bolder">Manage URLs</span>
          </RouterLink>
        </div>
        <div class="right" v-if="!urlStore.isAuth">
          <RouterLink :to="{ name: 'login' }" active-class="active" class="text-decoration-none text-dark me-4">
            <span class="fw-bolder">Log in</span>
          </RouterLink>
          <RouterLink :to="{ name: 'signup' }" active-class="active" class="text-decoration-none text-dark">
            <span class="fw-bolder">Sign Up</span>
          </RouterLink>
        </div>
        <div class="right d-flex" v-else>
          <p class="mb-0">
            <span>Hi, </span>
            <span class="fst-italic text-info" v-if="urlStore.name">{{ urlStore.name }}</span>
            <span class="fst-italic text-info" v-else>{{ urlStore.mail }}</span>
          </p>
          <button class="bg-transparent border-0 shadow-none ms-4 text-danger text-decoration-underline opacity-50" @click="urlStore.logOut">Sign out</button>
        </div>
      </div>
    </footer>
  </main>

</template>
