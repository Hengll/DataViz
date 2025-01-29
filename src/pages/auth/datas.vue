<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>資料集管理</h1>
      </v-col>
      <v-col cols="12">
        <v-data-table :items="items" :headers="headers" :search="search">
          <template #top>
            <v-toolbar>
              <v-btn class="border" @click="openDialog">{{ $t('dataSet.new') }}</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                class="mr-5 mt-2"
                prepend-inner-icon="mdi-magnify"
                variant="underlined"
              ></v-text-field>
            </v-toolbar>
          </template>
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.edit`]>
            <div class="d-flex justify-end">
              <v-btn class="border" variant="text">{{ $t('dataSet.edit') }}</v-btn>
              <v-btn class="border ms-1" variant="text">{{ $t('dataSet.delete') }}</v-btn>
            </div>
          </template>
        </v-data-table>
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
            accept="application/json"
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
import { computed, ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useI18n } from 'vue-i18n'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'

const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()

const search = ref('')
const items = ref([])
const headers = computed(() => {
  return [
    { title: t('dataSet.dataName'), key: 'dataName', sortable: true },
    { title: t('dataSet.dataInfo'), key: 'dataInfo', sortable: true },
    { title: t('dataSet.createdAt'), key: 'createdAt', sortable: true },
    { title: '', key: 'edit', sortable: false },
  ]
})

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
    const data = JSON.parse(fileReader.result)

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
</script>

<route lang="json">
{
  "meta": {
    "layout": "auth",
    "login": true,
    "admin": false,
    "title": "auth.datasetManagement"
  }
}
</route>
