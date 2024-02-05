<template>
  <form class="flex w-11/12 lg:w-6/12 mt-10 mx-auto bg-white p-4 rounded-lg border-2 shadow-md">
    <div v-if="!editing" @click="startEditing" class="cursor-text w-full">
      <p class="text-gray-500">Take a note...</p>
    </div>
    <div v-else class="w-full">
      <input v-model="title" class="text-gray-500 w-full mb-2 focus:outline-none" placeholder="Title" autofocus required/>
      <textarea v-model="content" class="w-full focus:outline-none" placeholder="Take a note"></textarea>

      <div class="flex flex-wrap mt-2">
        <button @click.prevent="saveNote" class="mr-2 justify-start border-2 p-2 rounded-lg hover:shadow-md hover:bg-slate-400 bg-slate-300">Save</button>
        <div class="grid grid-cols-4 gap-1 md:gap-2 md:grid-cols-8 mx-auto mt-2 ">
          <div v-for="(colorOption, index) in colorOptions" :key="index" class="mr-4">
            <input type="radio" :id="colorOption" v-model="selectedColor" :value="colorOption" class="hidden"/>
            <label :for="colorOption" :style="{ backgroundColor: colorOption }" class="inline-block w-5 lg:w-6 xl:w-7 h-5 lg:h-6 xl:h-7 rounded-full cursor-pointer border-2 border-gray-400">
              <span v-if="selectedColor === colorOption" class="relative text-sm xl:text-lg bottom-1 right-0.5 lg:right-0 lg:bottom-0.5">&#10004;</span>
            </label>
          </div>
        </div>
        <button @click.prevent="cancelEditing" class="ml-auto border-2 p-2 rounded-lg hover:shadow-md hover:bg-slate-400 bg-slate-300">Cancel</button>
      </div>

    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useNotesStore } from '@/stores/ProductStore';


const notesStore = useNotesStore();


const editing = ref(false);
const title = ref('');
const content = ref('');
const selectedColor = ref('#FFFFFF');


const colorOptions = ['#FFFFFF', '#FFC0CB', '#FFD700', '#90EE90', '#ADD8E6', '#FFA07A', '#20B2AA', '#87CEFA'];


const startEditing = () => {
  editing.value = true;
};


const saveNote = () => {
  const newNote = {
    title: title.value,
    content: content.value,
    color: selectedColor.value,
    timeCreated: ''
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
</script>
