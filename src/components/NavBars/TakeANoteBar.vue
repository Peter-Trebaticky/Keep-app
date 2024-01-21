<template>
  <form class="mx-auto w-full bg-white p-4 rounded-lg border-2 shadow-md">
    <div v-if="!editing" @click="startEditing" class="cursor-text">
      <p class="text-gray-500">Take a note...</p>
    </div>
    <div v-else>
      <input v-model="title" class="text-gray-500 w-full mb-2 focus:outline-none" placeholder="Title" autofocus />
      <textarea v-model="content" class="w-full focus:outline-none" placeholder="Take a note"></textarea>

      <div class="flex mt-2">
        <div v-for="(colorOption, index) in colorOptions" :key="index" class="color-picker">
          <input type="radio" :id="colorOption" v-model="selectedColor" :value="colorOption" />
          <label :for="colorOption" :style="{ backgroundColor: colorOption }"></label>
        </div>
      </div>

      <div class="flex mt-2">
        <button @click.prevent="saveNote" class="mr-2 justify-start">Save</button>
        <button @click.prevent="cancelEditing" class="ml-auto">Cancel</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { ref, Ref } from 'vue';
import { useNotesStore } from '@/stores/ProductStore';

export default {
  setup() {
    const notesStore = useNotesStore();
    const editing: Ref<boolean> = ref(false);
    const title: Ref<string> = ref('');
    const content: Ref<string> = ref('');
    const selectedColor: Ref<string> = ref('#FFFFFF'); // Vychodzia farba

    // Farby
    const colorOptions: string[] = ['#FFC0CB', '#FFD700', '#90EE90', '#ADD8E6', '#FFA07A', '#20B2AA', '#87CEFA', '#778899'];

    const startEditing = () => {
      editing.value = true;
    };

    const saveNote = () => {
      const newNote = {
        title: title.value,
        content: content.value,
        color: selectedColor.value
      };
      notesStore.addNote(newNote);
      cancelEditing();
    };

    const cancelEditing = () => {
      editing.value = false;
      title.value = '';
      content.value = '';
      selectedColor.value = '#FFFFFF';
    };

    return { editing, title, content, selectedColor, colorOptions, startEditing, saveNote, cancelEditing };
  },
};
</script>

<style scoped>
.color-picker {
  margin-right: 8px;
}

.color-picker label {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  cursor: pointer;
}
</style>
