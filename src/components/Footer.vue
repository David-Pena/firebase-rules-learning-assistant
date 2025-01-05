<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
</script>

<template>
  <footer class="border-t border-tertiary bg-secondary py-4 px-8">
    <div class="max-w-7xl mx-auto flex justify-between items-center gap-8">
      <div class="flex gap-4">
        <p class="text-sm text-gray-400">
          <router-link to="/" class="text-accent hover:text-accent-hover transition-colors">
            Home
          </router-link>
        </p>

         <p class="text-sm text-gray-400">
          <router-link to="/ai" class="text-accent hover:text-accent-hover transition-colors">
            /ai manifesto
          </router-link>
        </p>
      </div>
      
      <div class="flex items-center gap-6">
        <p class="text-sm text-gray-400 flex items-center gap-2">
          Created by 
          <a 
            href="https://davidpena.dev" 
            target="_blank" 
            rel="noopener"
            class="text-accent hover:text-accent-hover transition-colors"
          >
            Unans
          </a>
          with 
          <a 
            href="https://bolt.new" 
            target="_blank" 
            rel="noopener"
            class="text-accent hover:text-accent-hover transition-colors"
          >
            Bolt
          </a>
          <Heart class="w-3.5 h-3.5 text-red-400" />
        </p>
      </div>
    </div>
  </footer>
</template>