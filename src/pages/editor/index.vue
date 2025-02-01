<template>...</template>

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
    "admin": false,
    "title": "editor.linkData"
  }
}
</route>
