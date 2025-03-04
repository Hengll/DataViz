<template>editor</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
router.push('/')
</script>

<route lang="json">
{
  "meta": {
    "layout": "editor",
    "login": true,
    "title": "editor.linkData"
  }
}
</route>
