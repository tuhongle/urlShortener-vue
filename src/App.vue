<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useURLStore } from './stores/mmURLStore'
const urlStore = useURLStore();
</script>

<template>
  <main class="d-flex flex-column pb-2">
    <RouterView />
  </main>
  <footer class="mt-auto py-3">
    <div class="container-fluid">
      <div class="row justify-content-between align-items-center">
        <div class="col text-start">
          <RouterLink :to="{ name: 'home' }" class="text-decoration-none text-dark" v-if="urlStore.home" @click="urlStore.home = !urlStore.home">
            <i class="bi bi-house-door-fill me-2"></i>
            <span class="fw-bolder">Home</span>
          </RouterLink>
          <RouterLink :to="{ name: 'manage' }" class="text-decoration-none text-dark" v-else @click="urlStore.home = !urlStore.home">
            <i class="bi bi-gear-fill me-2"></i>
            <span class="fw-bolder">Manage URLs</span>
          </RouterLink>
        </div>
        <div class="col-4 text-end" v-if="!urlStore.isAuth">
          <div class="row align-items-center">
            <div class="col-6">
              <RouterLink :to="{ name: 'login' }" active-class="active" class="text-decoration-none text-dark">
                <span class="fw-bolder text-center d-block d-md-inline-block">Log in</span>
              </RouterLink>
            </div>
            <div class="col-6">
              <RouterLink :to="{ name: 'signup' }" active-class="active" class="text-decoration-none text-dark">
                <span class="fw-bolder text-center d-block d-md-inline-block">Sign Up</span>
              </RouterLink>
            </div>
          </div>
        </div>
        <div class="col d-flex text-end" v-else>
          <p class="mb-0">
            <span>Hi, </span>
            <span class="fst-italic text-info" v-if="urlStore.userName">{{ urlStore.userName }}</span>
            <span class="fst-italic text-info" v-else>{{ urlStore.userMail }}</span>
          </p>
          <button class="bg-transparent border-0 shadow-none ms-4 text-danger text-decoration-underline opacity-50" @click="urlStore.logOut">Sign out</button>
        </div>
      </div>
    </div>
  </footer>

</template>
