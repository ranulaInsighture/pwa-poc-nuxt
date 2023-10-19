<template>
  <div class="content-card">
    <h2 class="title">Added Notes</h2>
    <div v-for="(item, index) in items" :key="index">
      <p class="description">
        {{ item.text }}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
});
</script>