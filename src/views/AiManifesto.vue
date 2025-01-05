<script setup lang="ts">
import Footer from '../components/Footer.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <main class="flex-1 container mx-auto px-8 py-12 max-w-3xl">
      <h1 class="text-4xl font-bold mb-8">AI Usage</h1>
      
      <div class="prose prose-invert">
        <p class="text-lg mb-6">
          This website was 95% made by AI.
        </p>

        <p>
          5% was manual intervention within Bolt or Stackblitz to fix some bugs.
        </p>

        <p>
          You might want to checkout <a href="https://www.bydamo.la/p/ai-manifesto" target="_blank" rel="noopener">this article on the /ai manifesto</a>
        </p>
      </div>
    </main>
    <Footer />
  </div>
</template>