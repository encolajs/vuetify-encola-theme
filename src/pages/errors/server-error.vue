<script setup lang="ts">
import { RefreshCw } from '@lucide/vue'
</script>

<template>
  <div class="text-center pa-6">
    <p class="text-label-large text-error">500</p>
    <h1 class="text-headline-large mt-2">Something went wrong</h1>
    <p class="text-body-medium mt-3 mx-auto" style="opacity: 0.7; max-width: 400px">
      An unexpected error occurred on our side. We've been notified and are
      looking into it.
    </p>
    <div class="d-flex justify-center ga-2 mt-6">
      <EBtn :prepend-icon="RefreshCw" @click="$router.go(0)">Try again</EBtn>
      <EBtnGhost to="/">Go back home</EBtnGhost>
    </div>
  </div>
</template>
