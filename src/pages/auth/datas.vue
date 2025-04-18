<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12">
        <h1>{{ $t('auth.myDataSets') }}</h1>
      </v-col>
      <v-divider></v-divider>
      <v-col cols="8" class="d-flex justify-space-between align-center">
        <v-btn prepend-icon="mdi-upload" variant="elevated" color="primary" @click="openDialog">{{
          $t('dataSet.new')
        }}</v-btn>
      </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="search"
          prepend-inner-icon="mdi-magnify"
          variant="outlined"
          density="compact"
          hide-details
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-data-table
          class="rounded"
          height="580"
          :items="items"
          :headers="headers"
          :search="search"
        >
          <template #[`item.createdAt`]="{ value }">
            {{ new Date(value).toLocaleString() }}
          </template>
          <template #[`item.edit`]="{ item }">
            <div class="d-flex justify-end">
              <v-btn
                color="primary"
                variant="outlined"
                @click="$router.push(`/auth/data/${item._id}`)"
                >{{ $t('dataSet.edit') }}</v-btn
              >
              <v-btn class="ms-1" variant="outlined" @click="openConfirmDialog(item._id)">{{
                $t('dataSet.delete')
              }}</v-btn>
            </div>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" width="600">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon icon="mdi-upload" class="me-1"></v-icon>
          <span>{{ $t('dataSet.new') }}</span>
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
          <v-btn color="primary" variant="flat" type="submit" :loading="isSubmitting">{{
            $t('dataSet.upload')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>

  <v-dialog
    v-model="confirmDialog.isOpen"
    class="w-250"
    @keydown.enter.once="deleteDataSet(confirmDialog.id)"
  >
    <v-card>
      <v-card-text class="text-center pa-10">{{ $t('dataSet.deleteConfirm') }}</v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-flex justify-center">
        <v-btn color="primary" variant="flat" @click="deleteDataSet(confirmDialog.id)">{{
          $t('dataSet.confirm')
        }}</v-btn>
        <v-btn variant="text" @click="closeConfirmDialog">{{ $t('dataSet.cancel') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useI18n } from 'vue-i18n'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { useSnackbar } from 'vuetify-use-dialog'
import Papa from 'papaparse'

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

const confirmDialog = ref({
  isOpen: false,
  id: '',
})
const openConfirmDialog = (id) => {
  confirmDialog.value.id = id
  confirmDialog.value.isOpen = true
}
const closeConfirmDialog = () => {
  confirmDialog.value.id = ''
  confirmDialog.value.isOpen = false
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

const deleteDataSet = async (id) => {
  try {
    await apiAuth.delete(`/dataSet/${id}`)

    getDataSets()
    createSnackbar({
      text: t('dataSet.deleteSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
    closeConfirmDialog()
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
.w-250 {
  width: 250px;
}
</style>

<route lang="json">
{
  "meta": {
    "layout": "auth",
    "login": true,
    "title": "auth.myDataSets"
  }
}
</route>
