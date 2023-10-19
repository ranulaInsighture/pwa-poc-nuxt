<!-- ImageCard.vue -->
<template>
  <div class="card-container">
    <div class="image-container">
      <img :src="imageData.imageText" alt="showing image" class="inline-block" />
    </div>
    <!-- <div class="update-button" @click="updater = true">click to update</div> -->
    <div class="delete-button text-center mt-2">
      <button @click="onDelete" class="btn btn-danger">
        <i class="fas fa-trash"></i> Delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  imageData: {
    type: Object,
    required: true
  }
});

const updater = ref(false);

const onDelete = () => {
  emit('delete-image', props.imageData);
};

const emit = defineEmits();
</script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<style scoped>
.card-container {
  padding: 20px;
  margin: 20px;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease-in-out, transform 0.3s ease-in-out;
  background-color: #fdecea;  /* A light reddish background */
}

.card-container:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transform: translateY(-5px);
}

.image-container img {
  width: 200px;
  border-radius: 10px;
  margin-bottom: 20px;
}

.update-button {
  padding: 10px 20px;
  border-radius: 8px;
  background-color: #ff6b6b;  /* A nice red shade */
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.update-button:hover {
  background-color: #ff4d4d;  /* A slightly darker red on hover */
}
</style>
