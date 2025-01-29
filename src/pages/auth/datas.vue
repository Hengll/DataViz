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
    <v-form>
      <v-card>
        <v-card-title>{{ $t('dataSet.new') }}</v-card-title>
        <v-card-text>
          <v-text-field :label="$t('dataSet.dataName')"></v-text-field>
          <v-textarea :label="$t('dataSet.dataInfo')"></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn class="border" @click="closeDialo">{{ $t('dataSet.cancel') }}</v-btn>
          <v-btn class="border">{{ $t('dataSet.upload') }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useAxios } from '@/composables/axios'
import { useI18n } from 'vue-i18n'

const { apiAuth } = useAxios()
const { t } = useI18n()

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
const closeDialo = () => {
  dialog.value = false
}

const getDataSets = async () => {
  try {
    const { data } = await apiAuth.get('/dataSet/names')
    items.value = data.result
  } catch (err) {
    console.log(err)
  }
}
getDataSets()
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
