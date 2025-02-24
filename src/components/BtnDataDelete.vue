<template>
  <v-btn
    class="border"
    :style="{ width: '30px', height: '30px', borderRadius: 0 }"
    variant="text"
    icon="mdi-close"
    @click="editor.deleteRowData(params.node.id)"
  ></v-btn>
</template>

<script setup>
import { useEditorStore } from '@/stores/editor'

const editor = useEditorStore()

defineProps({
  params: {
    type: Object,
    default: () => {},
  },
})

defineEmits(['delete'])
</script>
