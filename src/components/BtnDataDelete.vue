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
import { useDashboardStore } from '@/stores/dashboard'

const editor = useDashboardStore()

defineProps({
  params: {
    type: Object,
    default: () => {},
  },
})

defineEmits(['delete'])
</script>
