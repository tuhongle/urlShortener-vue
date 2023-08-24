<script setup lang="ts">
import { useURLStore } from '../stores/mmURLStore'

const urlStore = useURLStore();
</script>

<template>
    <div class="login text-start bg-white shadow-sm p-4 p-md-5">
        <div class="card shadow p-5">
            <div class="greetings-wrapper d-flex justify-content-between align-items-center mb-4">
                <div class="brand-logo d-flex align-items-center">
                    <img src="/shortenURL.png" alt="" class="img-fluid" width="120">
                </div>
                <div class="greetings me-4">
                    <p class="lead mb-3">Hello! let's get started</p>
                    <p class="mb-0">Sign in to continue.</p>
                </div>
            </div>
            <div class="form-wrapper">
                <form @submit.prevent="urlStore.logIn">
                    <div class="form-group mb-3">
                        <input class="form-control shadow-none ps-4 py-3 rounded-0" type="text" placeholder="Email" v-model="urlStore.mail" required>
                    </div>
                    <div class="form-group mb-3">
                        <input class="form-control shadow-none ps-4 py-3 rounded-0" type="password" placeholder="Password" v-model="urlStore.pass" required>
                    </div>
                    <button class="btn btn-primary btn-lg btn-block px-5 py-3" type="submit">SIGN IN</button>
                    <div class="d-flex align-items-center justify-content-between my-3">
                        <div class="">
                            <label class="form-check-label">
                                <input type="checkbox" class="form-check-input">
                                <span class="ms-2 text-muted">Keep me signed in</span>
                            </label>
                        </div>
                        <a href="#" class="text-dark">Forgot password?</a>
                    </div>
            <!--                 <button class="facebook btn btn-primary btn-block py-3 px-4 mb-4">
                        <i class="ti-facebook"></i>
                        Connect using facebook
                    </button> -->
                    <p class="text-center lead">
                        Don't have an account?
                        <RouterLink :to="{ name: 'signup' }">Create</RouterLink>
                    </p>
                </form>
            </div>
        </div>
    </div>
</template>