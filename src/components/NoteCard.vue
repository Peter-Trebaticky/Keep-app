<template>
    <li :style="{ backgroundColor: props.note.color }"  class="break-inside-avoid h-min border-2 mb-8 hover:shadow-2xl rounded-lg p-2 flex flex-col overflow-x-auto">
        <h1 class="pb-4 font-bold text-xl">{{ props.note.title }}</h1>
        <p>{{ props.note.content }}</p>
        <button @click="onRemove" class="ml-auto mt-auto">
            <img src="@/assets/trash-icon.svg" alt="Remove" />
        </button>
    </li>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

// Definicia rozhrania pre note
interface Note {
    title: string;
    content: string;
    color: string;
}

const props = defineProps({
    note: {
        type: Object as () => Note,
        required: true
    },
    index: Number,
    removeNote: Function 
});
const onRemove = () => {
    if (props.removeNote) {
        props.removeNote(props.index);
    }
};
</script>
<style>
.break-inside-avoid {
    break-inside: avoid;
}
</style>