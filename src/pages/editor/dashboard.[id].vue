<template>
  <v-navigation-drawer v-model="editor.drawer" width="200" :permanent="false">
    <v-list>
      <v-list-item></v-list-item>
      <v-divider></v-divider>
    </v-list>
  </v-navigation-drawer>

  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('editor.editDashboard') }}</h1>
      </v-col>
      <v-col cols="4">
        <v-btn @click="openDialog">{{ $t('editDashboard.edit') }}</v-btn>
      </v-col>
      <v-col cols="2" class="ms-auto d-flex justify-end">
        <v-btn @click="saveDashboard">{{ $t('editDashboard.save') }}</v-btn>
      </v-col>
      <v-col cols="12">
        <div id="area" ref="area">
          <DraggableResizable
            :container-width="areaWidth"
            :container-height="areaHeight"
          ></DraggableResizable>
          <DraggableResizable
            :container-width="areaWidth"
            :container-height="areaHeight"
          ></DraggableResizable>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" persistent class="w-50">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ $t('editDashboard.edit') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="dashboardName.value.value"
            :error-messages="dashboardName.errorMessage.value"
            :label="$t('editDashboard.dashboardName')"
          ></v-text-field>
          <v-textarea
            v-model="dashboardInfo.value.value"
            :error-messages="dashboardInfo.errorMessage.value"
            :label="$t('editDashboard.dashboardInfo')"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn class="border" @click="closeDialog">{{ $t('editDashboard.cancel') }}</v-btn>
          <v-btn class="border" type="submit" :loading="isSubmitting">{{
            $t('editDashboard.save')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useAxios } from '@/composables/axios'
import { useI18n } from 'vue-i18n'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import DraggableResizable from '@/components/DraggableResizable.vue'

const editor = useEditorStore()
const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()

const dialog = ref(false)
const openDialog = () => {
  dashboardName.value.value = editor.dashboard.dashboardName
  dashboardInfo.value.value = editor.dashboard.dashboardInfo
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  resetForm()
}

const schema = yup.object({
  dashboardName: yup.string().required(t('api.dashboardNameRequired')),
  dashboardInfo: yup.string(),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})
const dashboardName = useField('dashboardName')
const dashboardInfo = useField('dashboardInfo')

const submit = handleSubmit(async (values) => {
  try {
    await apiAuth.patch(`/dashboard/${editor.dashboard._id}`, {
      dashboardName: values.dashboardName,
      dashboardInfo: values.dashboardInfo,
    })
    await editor.getDashboardWithAPI(editor.dashboard._id)
    createSnackbar({
      text: t('editDashboard.saveSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
    closeDialog()
  } catch (err) {
    console.log(err)
    createSnackbar({
      text: t('api.' + err?.response?.data?.message || 'unknownError'),
      snackbarProps: {
        color: 'red',
      },
    })
  }
})

const saveDashboard = async () => {
  try {
    await apiAuth.patch(`/dashboard/${editor.dashboard._id}`, editor.dashboard)
    await editor.getDashboardWithAPI(editor.dashboard._id)
    createSnackbar({
      text: t('editDashboard.saveSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
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

// area尺寸
const area = ref(null)
const areaWidth = ref(0)
const areaHeight = ref(0)
const observer = new ResizeObserver((mutations) => {
  for (const mutation of mutations) {
    areaWidth.value = mutation.contentBoxSize[0].inlineSize
    areaHeight.value = mutation.contentBoxSize[0].blockSize
  }
})

onMounted(() => {
  observer.observe(area.value, {
    box: 'content-box',
  })
})
</script>

<style lang="scss" scoped>
#area {
  width: 100%;
  aspect-ratio: 16 / 9;
  outline: 1px solid rgba(0, 0, 0, 0.12);
  background: white;
}

.grid-snap {
  background: red;
}
</style>

<route lang="json">
{
  "meta": {
    "layout": "editor",
    "login": true,
    "admin": false,
    "title": "editor.editDashboard"
  }
}
</route>
