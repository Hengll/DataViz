<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>
          {{
            $t('auth.myDataSets') +
            ' --- ' +
            (editor.dashboard?.dataSet?.dataName ? editor.dashboard.dataSet.dataName : '')
          }}
        </h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="3"> </v-col>
      <v-col cols="6"> </v-col>
      <v-col cols="2" class="ms-auto d-flex justify-end">
        <v-btn variant="elevated" color="primary" @click="saveData">{{
          $t('linkData.save')
        }}</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          variant="outlined"
          color="primary"
          prepend-icon="mdi-plus"
          :disabled="!editor.dashboard.dataSet?.data"
          @click="editor.insertRowData"
          >{{ $t('linkData.newRow') }}</v-btn
        >
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn
          variant="outlined"
          color="primary"
          prepend-icon="mdi-pencil"
          :disabled="!editor.dashboard.dataSet?.data"
          @click="openDialogEdit"
          >{{ $t('linkData.editDataInfo') }}</v-btn
        >
      </v-col>
      <v-col cols="12">
        <ag-grid-vue
          :suppress-drag-leave-hides-columns="true"
          :row-data="rowData"
          :column-defs="colDefs"
          style="height: 600px"
          :pagination="true"
          :theme="myTheme"
          @cell-value-changed="
            editor.editData($event.node.id * 1, $event.colDef.field, $event.newValue)
          "
        >
        </ag-grid-vue>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialogEdit" width="600">
    <v-form :disabled="isSubmittingEdit" @submit.prevent="submitEdit">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon icon="mdi-pencil" class="me-1"></v-icon>
          <span>{{ $t('linkData.editDataInfo') }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="dataNameEdit.value.value"
            :error-messages="dataNameEdit.errorMessage.value"
            :label="$t('dataSet.dataName')"
            variant="outlined"
          ></v-text-field>
          <v-textarea
            v-model="dataInfoEdit.value.value"
            :error-messages="dataInfoEdit.errorMessage.value"
            :label="$t('dataSet.dataInfo')"
            variant="outlined"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialogEdit">{{ $t('dataSet.cancel') }}</v-btn>
          <v-btn variant="flat" color="primary" type="submit" :loading="isSubmittingEdit">{{
            $t('linkData.edit')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useUserStore } from '@/stores/user'
import { useAxios } from '@/composables/axios'
import { useI18n } from 'vue-i18n'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  colorSchemeDark,
  colorSchemeLight,
} from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'
import { useRoute, useRouter } from 'vue-router'

const editor = useDashboardStore()
const user = useUserStore()
const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()
const route = useRoute()
const router = useRouter()

const dialogEdit = ref(false)
const openDialogEdit = () => {
  dataNameEdit.value.value = editor.dashboard.dataSet.dataName
  dataInfoEdit.value.value = editor.dashboard.dataSet.dataInfo
  dialogEdit.value = true
}
const closeDialogEdit = () => {
  dialogEdit.value = false
  resetFormEdit()
}

const getData = async () => {
  try {
    const { data } = await apiAuth.get(`/dataSet/${route.params.id}`)
    editor.dashboard.dataSet = data.result
  } catch (err) {
    console.log(err)
    router.push('/')
  }
}
getData()

const schema = yup.object({
  dataName: yup.string().required(t('api.dataNameRequired')),
  dataInfo: yup.string(),
})

// 編輯資料集資訊
const {
  handleSubmit: handleSubmitEdit,
  isSubmitting: isSubmittingEdit,
  resetForm: resetFormEdit,
} = useForm({
  validationSchema: schema,
})
const dataNameEdit = useField('dataName')
const dataInfoEdit = useField('dataInfo')

const submitEdit = handleSubmitEdit(async (value) => {
  try {
    await apiAuth.patch(`/dataSet/${editor.dashboard.dataSet._id}`, {
      dataName: value.dataName,
      data: editor.dashboard.dataSet.data,
      dataInfo: value.dataInfo,
    })
    editor.dashboard.dataSet.dataName = value.dataName
    editor.dashboard.dataSet.dataInfo = value.dataInfo
    createSnackbar({
      text: t('linkData.editSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
    closeDialogEdit()
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

ModuleRegistry.registerModules([AllCommunityModule])

const myTheme = themeQuartz.withPart(
  user.theme === 'lightTheme' ? colorSchemeLight : colorSchemeDark,
)

const rowData = computed(() => {
  if (editor.dashboard.dataSet?.data) {
    return editor.dashboard.dataSet.data
  } else {
    return []
  }
})

import BtnDataDelete from '@/components/BtnDataDelete.vue'

const colDefs = computed(() => {
  if (editor.dashboard.dataSet?.data) {
    return [
      ...Object.keys(editor.dashboard.dataSet?.data[0]).map((value) => {
        return { field: value, editable: true }
      }),
      {
        headerName: 'Actions',
        cellRenderer: BtnDataDelete,
      },
    ]
  } else {
    return []
  }
})

const saveData = async () => {
  try {
    editor.saveDataWithApi()
    createSnackbar({
      text: t('linkData.saveDataSuccess'),
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
</script>

<route lang="json">
{
  "meta": {
    "layout": "auth",
    "login": true,
    "title": "auth.myDataSets"
  }
}
</route>

<style scoped lang="scss">
:deep(.ag-paging-panel) {
  font-size: 0.6rem;
  height: auto;
}

@media (min-width: 600px) {
  :deep(.ag-paging-panel) {
    font-size: 1rem;
  }
}
</style>
