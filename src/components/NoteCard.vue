<template>
    <div :style="{ backgroundColor: props.note.color }" class="rounded-lg p-2">
        <h1 class="pb-4 font-bold text-xl">{{ props.note.title }}</h1>
        <p>{{ props.note.content }}</p>
        <button @click="onRemove">Remove</button>
    </div>
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