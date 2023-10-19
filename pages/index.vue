<template>
  <nav>
    <button class="custom-button" @click="showNotes">Show Notes</button>
    <button class="custom-button" @click="showImages">Show Images</button>
    <button class="custom-button" title="For testing purposes, this will  generate a large
      JSON file and store in IndexedDB.">
      Generate and Store Large JSON
    </button>
    <button class="status" :class="{ online: isOnline, offline: !isOnline }">
      {{ onlineStatus }}
    </button>
  </nav>
  <main>
    <pre>{{baseUrl}}</pre>
    <div class="row">
      <button v-if="displayNoteButton" class="add-buttons" @click="showNoteUpload">Add Note</button>
      <button v-else-if="displayImageButton" class="add-buttons">Add Images</button>
    </div>
  </main>
  <!-- Modal for add notes -->
  <div v-if="showNoteModal" class="modal-overlay">
    <div class="modal-custom-display">
      <h2>Add a note</h2>
      <textarea v-model="noteText" placeholder="Enter text..."></textarea>
      <div class="modal-actions">
        <button @click="showNoteModal = false">Cancel</button>
        <button @click="submitNote()">Submit</button>
      </div>
    </div>
  </div>
  <VitePwaManifest />
</template>
<script setup lang="ts">
import {ref, onMounted, onUnmounted, computed} from 'vue-demi';

const baseUrl = import.meta.env.VITE_BASE_URL;
const isOnline = ref(navigator.onLine);
const onlineStatus = computed(() => (isOnline.value ? 'Online' : 'Offline')); //todo what nuxt provide to identify browser status

  const displayNoteButton = ref(false);
const displayImageButton = ref(false);
const showNoteModal = ref(false);
const showImageModal = ref(false);
const noteText = ref('');

const showNotes = () => {
  displayNoteButton.value = true
  displayImageButton.value = false
  showNoteModal.value = false
}
const showImages = () => {
  displayImageButton.value = true
  displayNoteButton.value = false
  showImageModal.value = false
}
const showNoteUpload = () => {
  showImageModal.value = false;
  showNoteModal.value = true;
}
const updateOnlineStatus = () => {
  isOnline.value = navigator.onLine;
};
const submitNote = async () => {
  const textToSubmit = noteText.value.trim();
  console.log('Submitting:', textToSubmit);
  console.log('baseUrl.value:', baseUrl);

  if (!navigator.onLine) {
    //  Save offline
    // saveNoteOffline(textToSubmit);
  } else {
    try {
      // Make sure you have the BASE_URL in your environment variable
      const url = `${baseUrl}addNote`;

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: textToSubmit, timecode: Date.now() }),
      });

      if (response.status === 201) {
        alert('Note added successfully');
        // await fetchNotes();
        noteText.value = '';  // Clear the note
        // You need to handle showNoteModal based on your UI logic
      } else {
        console.error('Failed to add note');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
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