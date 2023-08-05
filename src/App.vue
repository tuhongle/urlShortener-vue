<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <main class="d-flex flex-column vh-100 pb-2">
    <RouterView />
    <footer class="mt-auto">
      <div class="container-fluid">
        <RouterLink :to="{ name: 'home' }" class="text-decoration-none text-dark">
          <i class="bi bi-house-door-fill me-2"></i>
          <span class="fw-bolder">Home</span>
        </RouterLink>
        <RouterLink :to="{ name: 'manage' }" class="text-decoration-none text-dark">
          <i class="bi bi-gear-fill me-2"></i>
          <span class="fw-bolder">Manage URLs</span>
        </RouterLink>
      </div>
    </footer>
  </main>

</template>
