<template>
  <nav>
    <button class="custom-button">Show Notes</button>
    <button class="custom-button">Show Images</button>
    <button class="custom-button" title="For testing purposes, this will  generate a large
      JSON file and store in IndexedDB.">
      Generate and Store Large JSON
    </button>
    <button class="status" :class="{ online: isOnline, offline: !isOnline }">
      {{ onlineStatus }}
    </button>
  </nav>
<!--  <VitePwaManifest />-->
</template>
<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed} from 'vue-demi';
const isOnline = ref(navigator.onLine);
const onlineStatus = computed(() => (isOnline.value ? 'Online' : 'Offline')); //todo what nuxt provide to identify browser status
const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine;
};

// Lifecycle hooks for component mount and unmount events, is this correct to use ?
onMounted(() => {
  window.addEventListener('online', updateOnlineStatus);
  window.addEventListener('offline', updateOnlineStatus);
});

onUnmounted(() => {
  window.removeEventListener('online', updateOnlineStatus);
  window.removeEventListener('offline', updateOnlineStatus);
});
</script>