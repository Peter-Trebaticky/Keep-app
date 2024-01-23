<template>
    <li :style="{ backgroundColor: props.note.color }" class="break-inside-avoid h-min border-2 mb-8 hover:shadow-2xl rounded-lg p-2 flex flex-col overflow-x-auto">
        <h1 class="pb-4 font-bold text-xl font-mono">{{ props.note.title }}</h1>
        <p v-html="linkifiedContent" class="font-serif"></p>
        <div class="flex justify-between items-center pt-3 mt-auto">
            <p class="text-gray-500">{{ props.note.timeCreated }}</p>
            <button @click="onRemove" class="ml-auto mt-auto hover:bg-gray-200 rounded-full">
                <img src="@/assets/trash-icon.svg" class="p-1" alt="Remove" />
            </button>
        </div>    
    </li>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { Note } from '@/stores/ProductStore';

// Definovanie vstupnych parametrov komponentu
const props = defineProps({
    note: {
        type: Object as () => Note,
        required: true
    },
    index: Number,
    removeNote: Function
});

// Funkcia na konverziu URL v texte na klikateľné odkazy
const linkify = (text: string) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
        return `<a href="${url}" target="_blank" class="hover:underline">${url}</a>`;
    });
};

// Vypočítaná hodnota, ktorá používa funkciu linkify na obsah poznámky
const linkifiedContent = computed(() => linkify(props.note.content));

// Funkcia na odstránenie poznámky
const onRemove = () => {
    if (props.removeNote) {
        props.removeNote(props.index);
    }
};
</script>
