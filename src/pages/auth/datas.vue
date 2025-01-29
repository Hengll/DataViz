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
              <v-btn class="border">{{ $t('dataSet.new') }}</v-btn>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="search"
                prepend-inner-icon="mdi-magnify"
                variant="underlined"
              ></v-text-field>
            </v-toolbar>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
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
  ]
})

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
