<script setup lang="ts">
import { useURLStore } from '../stores/mmURLStore'

const urlStore = useURLStore();
</script>

<template>
    <div class="signup text-start bg-white shadow-sm p-4 p-md-5">
        <div class="card shadow p-5">
            <div class="greetings-wrapper d-flex justify-content-between align-items-center mb-4">
                <div class="brand-logo d-flex align-items-center">
                    <img src="/shortenURL.png" alt="" class="img-fluid" width="120">
                </div>
                <div class="greetings me-4">
                    <p class="fs-6 mb-3">New here?</p>
                    <p class="mb-0">Signing up is easy. It only takes a few steps</p>
                </div>
            </div>
            <div class="form-wrapper">
                <form @submit.prevent="urlStore.signUp">
                    <div class="form-group mb-3">
                        <input class="form-control shadow-none ps-4 py-3 rounded-0" type="email" placeholder="Email" v-model="urlStore.mail" required>
                    </div>
                    <div class="form-group mb-3">
                        <input class="form-control shadow-none ps-4 py-3 rounded-0" type="password" placeholder="Password" v-model="urlStore.pass" required>
                    </div>
                    <div class="form-group mb-3">
                        <input class="form-control shadow-none ps-4 py-3 rounded-0" type="text" placeholder="Username" v-model="urlStore.name">
                    </div>
                    <div class="form-group mb-3">
                        <input class="form-control shadow-none ps-4 py-3 rounded-0" type="text" placeholder="Full Name" v-model="urlStore.fullName">
                    </div>
                    <div class="d-flex align-items-center justify-content-between my-3">
                        <div class="ps-0">
                            <label class="form-check-label text-muted">
                                <input type="checkbox" class="form-check-input" v-model="urlStore.termAgree">
                                <span class="ms-2 text-muted">I agree to all Terms & Conditions</span>
                            </label>
                        </div>
                    </div>
                    <p class="text-danger" v-if="urlStore.agreeMsg">{{ urlStore.agreeMsg }}</p>
                    <button class="btn btn-primary btn-block px-5 py-2 mb-4" type="submit">SIGN UP</button>
                    <p class="text-center lead">
                        Already have an account?
                        <RouterLink :to="{ name: 'login' }">Login</RouterLink>
                    </p>
                </form>
            </div>
        </div>
      </div>
  </template>
