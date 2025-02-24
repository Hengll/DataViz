<template>author/id</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'

const user = useUserStore()
const route = useRoute()
const router = useRouter()
const { api } = useAxios()

const isUserPage = ref(false)
const dashboards = ref([])

const getAuthor = async () => {
  try {
    if (user.id === route.params.id) {
      isUserPage.value = true
    }

    const { data } = await api.get(`/public/user/${route.params.id}`)
    dashboards.value = data.result
    console.log(dashboards.value)
  } catch (err) {
    console.log(err)
    router.push('/')
  }
}
getAuthor()
</script>

<route lang="json">
{
  "meta": {
    "login": false,
    "admin": false,
    "title": "nav.explore"
  }
}
</route>
