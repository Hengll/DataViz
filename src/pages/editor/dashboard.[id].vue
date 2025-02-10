<template>
  <v-navigation-drawer v-model="editor.drawer" width="200" :permanent="false">
    <v-list>
      <v-list-item></v-list-item>
      <v-divider></v-divider>
      <v-list-group v-for="(nav, navIndex) in navs" :key="nav" class="text-center" fluid>
        <template #activator="{ props }">
          <v-list-item
            class="user-select-none"
            v-bind="props"
            :title="$t('editDashboard.' + nav.text)"
          ></v-list-item>
          <v-divider></v-divider>
        </template>

        <v-menu
          v-for="(menu, menuIndex) in nav.menus"
          :key="menu"
          v-model="menu.isOpen"
          :close-on-content-click="false"
          location="end"
        >
          <template #activator="{ props }">
            <v-list-item
              append-icon="mdi-plus"
              :prepend-icon="menu.icon"
              class="user-select-none"
              :title="$t('editDashboard.' + menu.text)"
              v-bind="props"
            ></v-list-item>
          </template>

          <v-form
            :disabled="isSubmittingNewChart"
            @submit.prevent="newChart(menu.text, navIndex, menuIndex)"
          >
            <v-card min-width="300">
              <v-list>
                <v-list-item :title="$t('editDashboard.' + menu.text)"></v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list>
                <v-list-item>
                  <v-text-field
                    v-model="chartTitle.value.value"
                    :label="$t('editDashboard.chartTitle')"
                    :error-messages="chartTitle.errorMessage.value"
                  ></v-text-field>
                </v-list-item>
                <v-list-item>
                  <v-select
                    v-model="useVariables.value.value[0]"
                    :items="editor.dataVariables"
                    :label="$t('editDashboard.variables1')"
                    :error-messages="useVariables.errorMessage.value"
                  ></v-select>
                </v-list-item>
                <v-list-item>
                  <v-select
                    v-model="useVariables.value.value[1]"
                    :items="editor.dataVariables"
                    :label="$t('editDashboard.variables2')"
                    :error-messages="useVariables.errorMessage.value"
                  ></v-select>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn variant="text" @click="menu.isOpen = false">取消</v-btn>
                <v-btn type="submit" color="primary" variant="text" :loading="isSubmittingNewChart"
                  >新增</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-form>
        </v-menu>

        <v-divider></v-divider>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer v-model="editDrawer.isOpen" :permanent="true" location="right" width="300">
    <!-- <v-color-picker></v-color-picker> -->
    <v-list>
      <v-list-item class="d-flex justify-end">
        <v-btn
          variant="text"
          icon="mdi-close"
          class="close-btn border"
          @click="closeEditDrawer"
        ></v-btn>
      </v-list-item>
      <v-list-item>
        <h3 class="mb-4">{{ $t('editDrawer.customOptions') }}</h3>
        <v-row>
          <v-col cols="6" class="d-flex justify-end align-center py-0"
            >{{ $t('editDrawer.chartTitle') }} :</v-col
          >
          <v-col cols="6" class="py-0">
            <v-text-field density="compact"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" class="d-flex justify-end align-center py-0"
            >{{ $t('editDrawer.chartPosX') }} :</v-col
          >
          <v-col cols="4" class="py-0">
            <v-text-field density="compact"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" class="d-flex justify-end align-center py-0"
            >{{ $t('editDrawer.chartPosY') }} :</v-col
          >
          <v-col cols="4" class="py-0">
            <v-text-field density="compact"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" class="d-flex justify-end align-center py-0"
            >{{ $t('editDrawer.chartWidth') }} :</v-col
          >
          <v-col cols="4" class="py-0">
            <v-text-field density="compact"></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="8" class="d-flex justify-end align-center py-0"
            >{{ $t('editDrawer.chartHeight') }} :</v-col
          >
          <v-col cols="4" class="py-0">
            <v-text-field density="compact"></v-text-field>
          </v-col>
        </v-row>
      </v-list-item>
      <v-list-item
        v-for="(values, kind) in editor.dashboard.charts[editDrawer.indexOfChart]?.chartOption"
        :key="kind"
        class="border"
      >
        <h3 class="mb-2">{{ $t(`editDrawer.${kind}`) }}</h3>
        <v-row v-for="(value, key) in values" :key="key">
          <template v-if="!(typeof value === 'object')">
            <v-col cols="8" class="d-flex justify-end align-center py-0"
              >{{ $t(`editDrawer.${key}`) }} :</v-col
            >
            <v-col cols="4" class="py-0">
              <v-text-field density="compact"></v-text-field>
            </v-col>
          </template>
        </v-row>
      </v-list-item>
    </v-list>
    <!-- 可抄 -->
    <!-- https://codepen.io/JamieCurnow/pen/KKPjraK -->
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
            v-for="(chart, index) in editor.dashboard.charts"
            :key="chart"
            :container-width="areaWidth"
            :container-height="areaHeight"
            :index-of-chart="index"
            @edit="openEditDrawer(index)"
            @delete="editor.deleteChart(index)"
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

// 右側 navbar 開關
const editDrawer = ref({
  indexOfChart: 0,
  isOpen: false,
})
const openEditDrawer = (index) => {
  editDrawer.value.indexOfChart = index
  editDrawer.value.isOpen = true
}
const closeEditDrawer = () => {
  editDrawer.value.isOpen = false
}

// 左側 navbar 資訊
const navs = ref([
  {
    text: 'dataChart',
    menus: [
      {
        isOpen: false,
        text: 'barChart',
        icon: 'mdi-chart-bar',
      },
      {
        isOpen: false,
        text: 'lineChart',
        icon: 'mdi-chart-line',
      },
    ],
  },
  {
    text: 'statistics',
    menus: [],
  },
  {
    text: 'dataFilter',
    menus: [],
  },
])

// 編輯儀錶板資訊對話框
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

// 編輯儀錶板資訊表單
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

// 新增chart表單
const schemaNewChart = yup.object({
  category: yup
    .string()
    .required(t('api.chartCategoryRequired'))
    .oneOf(['barChart', 'lineChart'], t('api.chartCategoryInvalid')),
  chartTitle: yup.string(),
  useVariables: yup.array().of(yup.string().notOneOf([''], t('api.useVariablesRequired'))),
})

const {
  handleSubmit: handleSubmitNewChart,
  isSubmitting: isSubmittingNewChart,
  resetForm: resetFormNewChart,
} = useForm({
  validationSchema: schemaNewChart,
  initialValues: {
    useVariables: ['', ''],
  },
})

const category = useField('category')
const chartTitle = useField('chartTitle')
const useVariables = useField('useVariables')

const newChart = async (categoryValue, navIndex, menuIndex) => {
  category.value.value = categoryValue
  if (!chartTitle.value.value) {
    chartTitle.value.value = categoryValue
  }
  try {
    await handleSubmitNewChart((value) => {
      const chart = {
        category: value.category,
        chartTitle: value.chartTitle,
        chartPosX: 0,
        chartPosY: 0,
        chartWidth: 0.5,
        chartHeight: 0.5,
        useVariables: [].concat(value.useVariables),
      }

      editor.newChart(chart)

      navs.value[navIndex].menus[menuIndex].isOpen = false
      resetFormNewChart()
    })()
  } catch (err) {
    console.log(err)
  }
}

// 保存dashboard
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

// 畫布尺寸
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

.user-select-none {
  user-select: none;
}

::v-deep(.v-navigation-drawer__content) {
  --sb-thumb-color: #d2d2d2;
  --sb-size: 5px;

  &::-webkit-scrollbar {
    width: var(--sb-size);
  }

  &::-webkit-scrollbar-track {
    border-radius: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--sb-thumb-color);
    border-radius: 5px;
  }
}

.close-btn {
  border-radius: 5px;
  width: 30px;
  height: 30px;
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
