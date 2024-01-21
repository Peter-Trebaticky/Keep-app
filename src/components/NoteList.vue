<template>
    <draggable v-model="localNotes" :animation="300" :item-key="index" tag="ul" @end="onEndDrag" class="w-10/12 mx-auto mt-20 grid gap-8 lg:grid-cols-4">
        <template #item="{ element: note, index }">
            <li :key="note.id" class="rounded-lg border-2 rounded-lg hover:shadow-2xl">
                <NoteCard :note="note" :index="index" :removeNote="removeNote"/>
            </li>
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

// Aktualizuje localNotes pri zmene v notesStore
watch(() => notesStore.notes, (newNotes) => {
    localNotes.value = [...newNotes];
}, { deep: true });

// Funkcia na uloženie poznámok do Local Storage
const saveNotesToLocalStorage = () => {
    localStorage.setItem('notes', JSON.stringify(localNotes.value));
};

// Načítanie poznámok z Local Storage pri načítaní komponentu
onMounted(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
        localNotes.value = JSON.parse(savedNotes);
    } else {
        saveNotesToLocalStorage();
    }
});

// Sledovanie zmien v lokalnom poli poznámok a ich uloženie
watch(localNotes, () => {
    saveNotesToLocalStorage();
}, { deep: true });

const onEndDrag = () => {
    notesStore.setNotes(localNotes.value);
    saveNotesToLocalStorage();
};
//Vymazanie poznamky
const removeNote = (index: number) => {
    notesStore.removeNote(index);
};
</script>
