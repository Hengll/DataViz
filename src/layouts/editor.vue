<template>
  <v-app-bar :location="mobile ? 'top' : 'bottom'" height="40">
    <v-container fluid class="d-flex align-center">
      <v-btn
        :style="{ visibility: $route.name === '/editor/dashboard.[id]' ? 'visible' : 'hidden' }"
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
      <v-btn
        class="pa-1 h-25 border ms-auto bg-primary"
        :loading="editor.saveLoading"
        @click="saveAndBack"
        >{{ $t('nav.saveAndBack') }}</v-btn
      >
    </v-container>
  </v-app-bar>
  <v-main ref="captureArea">
    <router-view v-slot="{ Component }">
      <component :is="Component" ref="childComponent"></component>
    </router-view>
  </v-main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import html2canvas from 'html2canvas'
import { useUserStore } from '@/stores/user'
import { useTheme } from 'vuetify'

const editor = useEditorStore()
const { mobile } = useDisplay()
const router = useRouter()
const { apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const { t } = useI18n()
const user = useUserStore()
const theme = useTheme()

theme.global.name.value = user.theme

const childComponent = ref(null)
const area = ref(null)

onMounted(() => {
  area.value = childComponent.value.area
})

editor.drawer = !mobile.value

const saveAndBack = async () => {
  try {
    editor.saveLoading = true
    if (area.value) {
      const canvas = await html2canvas(area.value, {
        allowTaint: true,
        logging: false,
        scale: 1,
      })

      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'thumbnail.png', { type: 'image/png' })
        const fd = new FormData()

        fd.append('image', file)
        fd.append('charts', JSON.stringify(editor.dashboard.charts))

        await apiAuth.patch(`/dashboard/${editor.dashboard._id}`, fd)
        await editor.saveDataWithApi()
        editor.saveLoading = false
        editor.clearDashboard()
        router.push('/auth')
      })
    } else {
      const fd = new FormData()

      fd.append('charts', JSON.stringify(editor.dashboard.charts))

      await apiAuth.patch(`/dashboard/${editor.dashboard._id}`, fd)
      await editor.saveDataWithApi()
      editor.saveLoading = false
      editor.clearDashboard()
      router.push('/auth')
    }
  } catch (err) {
    console.log(err)
    createSnackbar({
      text: t('api.' + err?.response?.data?.message || 'unknownError'),
      snackbarProps: {
        color: 'red',
      },
    })
    editor.saveLoading = false
  }
}
</script>

<style lang="scss" scoped>
.border-radius-none {
  border-radius: 0;
}
</style>
