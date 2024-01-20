<template>
    <div>
        <h1 class="pb-4 font-bold text-xl">{{ title }}</h1>
        <p>{{ content }}</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

// Definicia props s typom String
const props = defineProps({
    note: String,
});

// Výpočtove property pre získanie mena z poznámky
const title = computed(() => {
    // Rozdelenie poznámky podľa dvojbodky, odstránenie bielych znakov
    return (props.note ?? '').split(':')[0].trim();
});

// Výpočtovej property pre získanie obsahu z poznámky
const content = computed(() => {
    // Rozdelenie poznámky podľa dvojbodky, odstránenie bielych znakov
    const parts = (props.note ?? '').split(':');
    return parts.length > 1 ? parts[1].trim() : '';
});
</script>
