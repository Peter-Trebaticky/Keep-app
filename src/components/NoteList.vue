<template>
    <ul class="w-10/12 mx-auto mt-20 grid gap-8 lg:grid-cols-4">
        <li v-for="(note, index) in notes" :key="index" class="rounded-lg border-2 p-7 hover:shadow-2xl">
            <NoteCard :note="note" />
        </li>
    </ul>
</template>

<script lang="ts" setup>
import { useNotesStore } from '@/stores/ProductStore';
import NoteCard from './NoteCard.vue';

const notesStore = useNotesStore();
const notes = notesStore.notes;
</script>
