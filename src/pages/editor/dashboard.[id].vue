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
              @click="resetFormNewChart"
            ></v-list-item>
          </template>

          <v-form
            :disabled="isSubmittingNewChart"
            @submit.prevent="newChart(menu.text, navIndex, menuIndex)"
          >
            <v-card min-width="300">
              <v-list>
                <v-list-item
                  :title="$t('editDashboard.' + menu.text)"
                  :prepend-icon="menu.icon"
                ></v-list-item>
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
                <v-list-item v-for="i in menu.useVarsNum" :key="i">
                  <v-select
                    v-model="useVariables.value.value[i - 1]"
                    :items="editor.dataVariables"
                    :label="$t(`editDashboard.variables${i}`)"
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
    <EditorBar
      v-if="editDrawer.isOpen && editor.dashboard.charts"
      :index-of-chart="editDrawer.indexOfChart"
      :grid-width="areaWidth / gridSizeDivisor.x"
      :grid-height="areaHeight / gridSizeDivisor.y"
      :grid-size-divisor-x="gridSizeDivisor.x"
      :grid-size-divisor-y="gridSizeDivisor.y"
      @close="closeEditDrawer"
    ></EditorBar>
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
        <v-btn :loading="editor.saveLoading" @click="saveDashboard">{{
          $t('editDashboard.save')
        }}</v-btn>
      </v-col>
      <v-col cols="12">
        <div id="area" ref="area">
          <DraggableResizable
            v-for="(chart, index) in editor.dashboard.charts"
            :key="chart"
            :container-width="areaWidth"
            :container-height="areaHeight"
            :index-of-chart="index"
            :grid-width="areaWidth / gridSizeDivisor.x"
            :grid-height="areaHeight / gridSizeDivisor.y"
            @edit="openEditDrawer(index)"
            @delete="deleteChart(index)"
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
          <v-switch
            v-model="dashboardPublic.value.value"
            color="primary"
            :label="$t('editDashboard.public')"
          ></v-switch>
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
import EditorBar from '@/components/EditorBar.vue'
import html2canvas from 'html2canvas'

const editor = useEditorStore()
const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()

// 右側 navbar 開關
const editDrawer = ref({
  indexOfChart: null,
  isOpen: false,
})
const openEditDrawer = (index) => {
  editDrawer.value.indexOfChart = index
  editDrawer.value.isOpen = true
}
const closeEditDrawer = () => {
  editDrawer.value.isOpen = false
  editDrawer.value.indexOfChart = null
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
        useVarsNum: 2,
      },
      {
        isOpen: false,
        text: 'histogram',
        icon: 'mdi-chart-histogram',
        useVarsNum: 2,
      },
      {
        isOpen: false,
        text: 'lineChart',
        icon: 'mdi-chart-line',
        useVarsNum: 2,
      },
      {
        isOpen: false,
        text: 'areaChart',
        icon: 'mdi-chart-areaspline-variant',
        useVarsNum: 2,
      },
      {
        isOpen: false,
        text: 'scatterChart',
        icon: 'mdi-chart-scatter-plot',
        useVarsNum: 2,
      },
      {
        isOpen: false,
        text: 'bubbleChart',
        icon: 'mdi-chart-bubble',
        useVarsNum: 3,
      },
      {
        isOpen: false,
        text: 'pieChart',
        icon: 'mdi-chart-pie',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'donutChart',
        icon: 'mdi-chart-donut',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'polarAreaChart',
        icon: 'mdi-chart-donut-variant',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'radarChart',
        icon: 'mdi-radar',
        useVarsNum: 2,
      },
    ],
  },
  {
    text: 'statistics',
    menus: [
      {
        isOpen: false,
        text: 'mean',
        icon: '',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'median',
        icon: '',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'mode',
        icon: '',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'range',
        icon: '',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'IQR',
        icon: '',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'variance',
        icon: '',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'standardDeviation',
        icon: '',
        useVarsNum: 1,
      },
    ],
  },
  {
    text: 'dataFilter',
    menus: [
      {
        isOpen: false,
        text: 'categoryFilter',
        icon: 'mdi-filter-settings',
        useVarsNum: 1,
      },
      {
        isOpen: false,
        text: 'rangeFilter',
        icon: 'mdi-filter',
        useVarsNum: 1,
      },
    ],
  },
  {
    text: 'textBox',
    menus: [
      {
        isOpen: false,
        text: 'rectangle',
        icon: 'mdi-rectangle',
        useVarsNum: 0,
      },
      {
        isOpen: false,
        text: 'circle',
        icon: 'mdi-circle',
        useVarsNum: 0,
      },
      {
        isOpen: false,
        text: 'triangle',
        icon: 'mdi-triangle',
        useVarsNum: 0,
      },
    ],
  },
])

// 編輯儀錶板資訊對話框
const dialog = ref(false)
const openDialog = () => {
  dashboardName.value.value = editor.dashboard.dashboardName
  dashboardInfo.value.value = editor.dashboard.dashboardInfo
  dashboardPublic.value.value = editor.dashboard.public
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
  public: yup.boolean(),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})
const dashboardName = useField('dashboardName')
const dashboardInfo = useField('dashboardInfo')
const dashboardPublic = useField('public')

const submit = handleSubmit(async (values) => {
  try {
    const fd = new FormData()

    fd.append('dashboardName', values.dashboardName)
    fd.append('dashboardInfo', values.dashboardInfo)
    fd.append('public', values.public)

    await apiAuth.patch(`/dashboard/${editor.dashboard._id}`, fd)
    editor.dashboard.dashboardName = values.dashboardName
    editor.dashboard.dashboardInfo = values.dashboardInfo
    editor.dashboard.public = values.public

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
    .oneOf(
      [
        'barChart',
        'histogram',
        'lineChart',
        'areaChart',
        'scatterChart',
        'bubbleChart',
        'pieChart',
        'donutChart',
        'polarAreaChart',
        'radarChart',
        'mean',
        'median',
        'mode',
        'range',
        'IQR',
        'variance',
        'standardDeviation',
        'categoryFilter',
        'rangeFilter',
        'rectangle',
        'circle',
        'triangle',
      ],
      t('api.chartCategoryInvalid'),
    ),
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
    useVariables: ['', '', ''],
  },
})

const category = useField('category')
const chartTitle = useField('chartTitle')
const useVariables = useField('useVariables')

const newChart = async (categoryValue, navIndex, menuIndex) => {
  category.value.value = categoryValue

  for (
    let i = navs.value[navIndex].menus[menuIndex].useVarsNum;
    i < useVariables.value.value.length;
    i++
  ) {
    useVariables.value.value[i] = 'notUse'
  }

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
        chartWidth: gridSizeDivisor.x / 2,
        chartHeight: gridSizeDivisor.y / 2,
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
  editor.saveLoading = true
  try {
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
      createSnackbar({
        text: t('editDashboard.saveSuccess'),
        snackbarProps: {
          color: 'green',
        },
      })
      editor.saveLoading = false
    })
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

// 刪除chart
const deleteChart = (index) => {
  closeEditDrawer()
  editor.deleteChart(index)
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

// 網格數
const gridSizeDivisor = {
  x: 96,
  y: 54,
}

defineExpose({
  area,
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
