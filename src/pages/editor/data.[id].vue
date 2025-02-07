<template>
  <v-navigation-drawer v-model="editor.drawer" width="200" :permanent="false">
    <v-list>
      <v-list-item></v-list-item>
      <v-divider></v-divider>
      <v-list-item
        class="d-flex align-center border-b"
        :title="$t('linkData.newRow')"
        prepend-icon="mdi-plus"
        @click="console.log(1)"
      ></v-list-item>
      <v-list-item
        class="d-flex align-center border-b"
        :title="$t('linkData.newCol')"
        prepend-icon="mdi-plus"
        @click="console.log(1)"
      ></v-list-item>
      <v-list-item
        class="d-flex align-center border-b"
        :title="$t('linkData.editName')"
        prepend-icon="mdi-pencil"
        @click="console.log(1)"
      ></v-list-item>
      <v-list-item
        class="d-flex align-center border-b"
        :title="$t('linkData.editInfo')"
        prepend-icon="mdi-pencil"
        @click="console.log(1)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">{{ $t('editor.linkData') }}</h1>
      </v-col>
      <v-col cols="3">
        <v-btn @click="openDialog">{{ $t('linkData.new') }}</v-btn>
      </v-col>
      <v-col cols="6">
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
        <v-btn>{{ $t('linkData.save') }}</v-btn>
      </v-col>
      <v-col cols="12">
        <v-data-table :items="editor.dashboard.dataSet?.data"></v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" persistent class="w-50">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title>{{ $t('dataSet.new') }}</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="dataName.value.value"
            :error-messages="dataName.errorMessage.value"
            :label="$t('dataSet.dataName')"
          ></v-text-field>
          <v-textarea
            v-model="dataInfo.value.value"
            :error-messages="dataInfo.errorMessage.value"
            :label="$t('dataSet.dataInfo')"
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
          <v-btn class="border" @click="closeDialog">{{ $t('dataSet.cancel') }}</v-btn>
          <v-btn class="border" type="submit" :loading="isSubmitting">{{
            $t('dataSet.upload')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useEditorStore } from '@/stores/editor'
import { useAxios } from '@/composables/axios'
import { useI18n } from 'vue-i18n'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'
import Papa from 'papaparse'

const editor = useEditorStore()
const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()

const items = ref([])
const select = ref(editor.dashboard?.dataSet?.dataName || '')

const dialog = ref(false)
const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  resetForm()
  fileAgent.value.deleteFileRecord()
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

      getDataSets()
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
