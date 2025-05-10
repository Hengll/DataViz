<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('editor.linkData') }}</h1>
      </v-col>
      <v-col cols="4">
        <v-btn prepend-icon="mdi-upload" @click="openDialog">{{ $t('linkData.new') }}</v-btn>
      </v-col>
      <v-col cols="5">
        <v-select
          v-model="select"
          density="compact"
          variant="outlined"
          :label="$t('linkData.linkDataSelect')"
          :items="items"
          item-title="dataName"
          item-value="_id"
          @update:model-value="linkData(select)"
        ></v-select>
      </v-col>
      <v-col cols="2" class="ms-auto d-flex justify-end">
        <v-btn color="primary" @click="saveData">{{ $t('linkData.save') }}</v-btn>
      </v-col>
      <v-col cols="6">
        <v-btn
          prepend-icon="mdi-plus"
          :disabled="!editor.dashboard.dataSet?.data"
          @click="editor.insertRowData"
          >{{ $t('linkData.newRow') }}</v-btn
        >
      </v-col>
      <v-col cols="6" class="d-flex justify-end">
        <v-btn
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

  <v-dialog v-model="dialog" width="600">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon icon="mdi-upload" class="me-1"></v-icon>
          <span>{{ $t('linkData.editDataInfo') }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="dataName.value.value"
            :error-messages="dataName.errorMessage.value"
            :label="$t('dataSet.dataName')"
            variant="outlined"
          ></v-text-field>
          <v-textarea
            v-model="dataInfo.value.value"
            :error-messages="dataInfo.errorMessage.value"
            :label="$t('dataSet.dataInfo')"
            variant="outlined"
          ></v-textarea>
          <VueFileAgent
            ref="fileAgent"
            v-model="fileRecords"
            v-model:raw-model-value="rawFileRecords"
            accept="application/json,text/csv"
            deletable
            max-size="3MB"
            :help-text="$t('fileAgent.helpText')"
            :error-text="{ type: $t('fileAgent.errorType'), size: $t('fileAgent.errorSize') }"
          ></VueFileAgent>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">{{ $t('dataSet.cancel') }}</v-btn>
          <v-btn variant="flat" color="primary" type="submit" :loading="isSubmitting">{{
            $t('dataSet.upload')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

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
import Papa from 'papaparse'
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  colorSchemeDark,
  colorSchemeLight,
} from 'ag-grid-community'
import { AgGridVue } from 'ag-grid-vue3'

const editor = useDashboardStore()
const user = useUserStore()
const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()

const items = ref([])
const select = ref(editor.dashboard?.dataSet?._id || '')

const dialog = ref(false)
const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
}

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

const fileRecords = ref([])
const rawFileRecords = ref([])
const fileAgent = ref(null)

const getDataSets = async () => {
  try {
    const { data } = await apiAuth.get('/dataSet/names')
    items.value = data.result
  } catch (err) {
    console.log(err)
  }
}
getDataSets()

const schema = yup.object({
  dataName: yup.string().required(t('api.dataNameRequired')),
  dataInfo: yup.string(),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})
const dataName = useField('dataName')
const dataInfo = useField('dataInfo')

const submit = handleSubmit(async (values) => {
  if (fileRecords.value[0]?.error) return
  if (fileRecords.value.length === 0) {
    createSnackbar({
      text: t('api.dataRequired'),
      snackbarProps: {
        color: 'red',
      },
    })
    return
  }

  const fileReader = new FileReader()
  fileReader.readAsText(fileRecords.value[0].file)

  fileReader.onload = async function () {
    let data
    if (fileRecords.value[0].file.type === 'text/csv') {
      data = Papa.parse(fileReader.result, { header: true, skipEmptyLines: true }).data
    } else if (fileRecords.value[0].file.type === 'application/json') {
      data = JSON.parse(fileReader.result)

      // 檢查JSON格式
      if (!Array.isArray(data)) {
        createSnackbar({
          text: t('fileReader.array'),
          snackbarProps: {
            color: 'red',
          },
        })
        return
      }
      for (const item of data) {
        if (typeof item !== 'object' || item === null || Array.isArray(item)) {
          createSnackbar({
            text: t('fileReader.object'),
            snackbarProps: {
              color: 'red',
            },
          })
          return
        }

        for (const key in item) {
          if (typeof item[key] === 'object' && item[key] !== null) {
            createSnackbar({
              text: t('fileReader.nested'),
              snackbarProps: {
                color: 'red',
              },
            })
            return
          }
        }
      }
    } else {
      return
    }

    try {
      await apiAuth.post('/dataSet', {
        dataName: values.dataName,
        dataInfo: values.dataInfo,
        data: data,
      })

      await getDataSets()
      await linkData(items.value[items.value.length - 1]._id)
      select.value = editor.dashboard.dataSet._id

      createSnackbar({
        text: t('dataSet.uploadSuccess'),
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
  }

  fileReader.onerror = function () {
    createSnackbar({
      text: t('fileReader.fail'),
      snackbarProps: {
        color: 'red',
      },
    })
  }
})

const linkData = async (dataId) => {
  try {
    await apiAuth.patch(`/dashboard/${editor.dashboard._id}`, { dataSet: dataId })
    await editor.getDashboardWithAPI(editor.dashboard._id)
    createSnackbar({
      text: t('linkData.linkDataSuccess'),
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
    "layout": "editor",
    "login": true,
    "title": "editor.linkData"
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
