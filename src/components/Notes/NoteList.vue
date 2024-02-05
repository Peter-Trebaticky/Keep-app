<template>
    <draggable v-model="localNotes" :animation="300" :item-key="index" tag="ul" @end="onEndDrag"  class="w-11/12 mx-auto mt-20 gap-8 columns-1 md:columns-3 lg:columns-4 2xl:w-7/12">
        <template #item="{ element: note, index }">
            <NoteCard :key="note.id" :note="note" :index="index" :removeNote="removeNote"/>
        </template>
    </draggable>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useNotesStore } from '@/stores/ProductStore';
import NoteCard from './NoteCard.vue';
import draggable from 'vuedraggable';

const notesStore = useNotesStore();
const localNotes = ref([...notesStore.notes]);
const { index } = defineProps(['note', 'index']);


watch(() => notesStore.notes, (newNotes) => {
    localNotes.value = [...newNotes];
}, { deep: true });


const saveNotesToLocalStorage = () => {
    localStorage.setItem('notes', JSON.stringify(localNotes.value));
};


onMounted(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        localNotes.value = JSON.parse(savedNotes);
    } else {
        saveNotesToLocalStorage();
    }
});


watch(localNotes, () => {
    saveNotesToLocalStorage();
}, { deep: true });

const onEndDrag = () => {
    notesStore.setNotes(localNotes.value);
    saveNotesToLocalStorage();
};

const removeNote = (index: number) => {
    notesStore.removeNote(index);
};
</script>
