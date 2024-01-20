<template>
    <form class="mx-auto w-full bg-white p-4 rounded-lg border-2 shadow-md">
        <div v-if="!editing" @click="startEditing" class="cursor-text">
            <p class="text-gray-500">Take a note...</p>
        </div>
        <div v-else>
            <input v-model="title" class="text-gray-500 w-full mb-2 focus:outline-none" placeholder="Title" autofocus />
            <textarea v-model="content" class="w-full focus:outline-none" placeholder="Take a note"></textarea>
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
    // Získanie prístupu k Pinia store
    const notesStore = useNotesStore();
    
    // Deklarácia reaktivných premenných
    const editing: Ref<boolean> = ref(false);  // Sledovanie stavu úprav
    const title: Ref<string> = ref('');        // Sledovanie nadpisu poznámky
    const content: Ref<string> = ref('');      // Sledovanie obsahu poznámky

    // Funkcia na spustenie úprav poznámky
    const startEditing = () => {
      editing.value = true;
    };

    // Funkcia na uloženie poznámky
    const saveNote = () => {
      // Pridanie novej poznámky do store a resetovanie stavu
      notesStore.addNote(`${title.value}: ${content.value}`);
      cancelEditing();
    };

    // Funkcia na zrušenie úprav a resetovanie stavu
    const cancelEditing = () => {
      editing.value = false;
      title.value = '';
      content.value = '';
    };

    // Exponovanie premenných a funkcií pre šablónu
    return { editing, title, content, startEditing, saveNote, cancelEditing };
  },
};
</script>

