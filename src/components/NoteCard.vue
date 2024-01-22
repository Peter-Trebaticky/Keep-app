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

// Definicia rozhrania pre note
interface Note {
    title: string;
    content: string;
    color: string;
    timeCreated: string;
}

const props = defineProps({
    note: {
        type: Object as () => Note,
        required: true
    },
    index: Number,
    removeNote: Function 
});
const linkify = (text: string) => {
    const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;
    return text.replace(urlRegex, function (url) {
        return `<a href="${url}" target="_blank" class="hover:underline">${url}</a>`;
    });
};
const linkifiedContent = computed(() => linkify(props.note.content));

const onRemove = () => {
    if (props.removeNote) {
        props.removeNote(props.index);
    }
};
</script>
