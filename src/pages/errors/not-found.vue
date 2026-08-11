<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'
</script>

<template>
  <div class="text-center pa-6">
    <p class="text-label-large text-primary">404</p>
    <h1 class="text-headline-large mt-2">Page not found</h1>
    <p class="text-body-medium mt-3 mx-auto" style="opacity: 0.7; max-width: 400px">
      Sorry, we couldn't find the page you're looking for. It may have been
      moved or deleted.
    </p>
    <div class="d-flex justify-center ga-2 mt-6">
      <EBtn to="/">Go back home</EBtn>
      <EBtnGhost :prepend-icon="ArrowLeft" @click="$router.back()">Go back</EBtnGhost>
    </div>
  </div>
</template>
