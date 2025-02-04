<template>
  <v-app-bar :location="mobile ? 'top' : 'bottom'" height="40">
    <v-container fluid class="d-flex align-center">
      <v-btn
        class="border-radius-none pa-1 h-25 me-1"
        icon="mdi-menu"
        variant="text"
        @click="editor.drawer = !editor.drawer"
      ></v-btn>
      <v-btn class="pa-1 h-25 me-1 border" :to="'/editor/data/' + $route.params.id">{{
        $t('nav.linkData')
      }}</v-btn>
      <v-btn class="pa-1 h-25 me-1 border" :to="'/editor/dashboard/' + $route.params.id">{{
        $t('nav.editDashboard')
      }}</v-btn>
      <v-btn class="pa-1 h-25 me-1 border" :to="'/editor/preview/' + $route.params.id">{{
        $t('nav.previewDashboard')
      }}</v-btn>
      <v-btn class="pa-1 h-25 border ms-auto bg-primary" @click="saveAndBack">{{
        $t('nav.saveAndBack')
      }}</v-btn>
    </v-container>
  </v-app-bar>
  <v-main>
    <router-view></router-view>
  </v-main>
</template>

<script setup>
import { useEditorStore } from '@/stores/editor'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'

const editor = useEditorStore()
const { mobile } = useDisplay()
const router = useRouter()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const { t } = useI18n()

editor.drawer = !mobile.value

const saveAndBack = async () => {
  try {
    await apiAuth.patch(`/dashboard/${editor.dashboard._id}`, editor.dashboard)
    router.push('/auth')
  } catch (err) {
    console.log(err)
    createSnackbar({
      text: t('api.' + err?.response?.data?.message || 'unknownError'),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}
</script>

<style lang="scss" scoped>
.border-radius-none {
  border-radius: 0;
}
</style>
