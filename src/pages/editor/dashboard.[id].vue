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

        <template v-if="nav.text !== 'textAndShape'">
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
                class="user-select-none"
                v-bind="props"
                @click="resetFormNewChart"
              >
                <template v-if="menu.icon" #prepend>
                  <v-icon :icon="menu.icon" color="primary"></v-icon>
                </template>
                <p :title="$t('editDashboard.' + menu.text)" style="white-space: nowrap">
                  {{ $t('editDashboard.' + menu.text) }}
                </p>
              </v-list-item>
            </template>

            <v-form
              :disabled="isSubmittingNewChart"
              @submit.prevent="newChart(menu.text, navIndex, menuIndex)"
            >
              <v-card width="300">
                <v-list>
                  <v-list-item
                    :title="$t('editDashboard.' + menu.text)"
                    :prepend-icon="menu.icon"
                  ></v-list-item>
                </v-list>
                <v-divider></v-divider>
                <v-card-text>
                  <v-text-field
                    v-model="chartTitle.value.value"
                    :label="$t('editDashboard.chartTitle')"
                    :error-messages="chartTitle.errorMessage.value"
                    variant="outlined"
                  ></v-text-field>
                  <v-select
                    v-for="i in menu.useVarsNum"
                    :key="i"
                    v-model="useVariables.value.value[i - 1]"
                    class="mb-3"
                    :hint="$t('editDashboard.' + menu.hint[i - 1])"
                    persistent-hint
                    :label="$t('editDashboard.' + menu.label[i - 1])"
                    :items="editor.dataVariables"
                    :error-messages="useVariables.errorMessage.value"
                    variant="outlined"
                  ></v-select>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn variant="text" @click="menu.isOpen = false">{{
                    $t('editDashboard.cancel')
                  }}</v-btn>
                  <v-btn
                    type="submit"
                    color="primary"
                    variant="flat"
                    :loading="isSubmittingNewChart"
                    >{{ $t('editDashboard.new') }}</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-form>
          </v-menu>
        </template>
        <template v-else>
          <v-list-item
            v-for="(menu, menuIndex) in nav.menus"
            :key="menuIndex"
            append-icon="mdi-plus"
            class="user-select-none"
            :disabled="isSubmittingNewChart"
            @click="newChart(menu.text, navIndex, menuIndex)"
          >
            <template #prepend>
              <v-icon :icon="menu.icon" color="primary"></v-icon>
            </template>
            <p :title="$t('editDashboard.' + menu.text)" style="white-space: nowrap">
              {{ $t('editDashboard.' + menu.text) }}
            </p>
          </v-list-item>
        </template>

        <v-divider></v-divider>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>

  <v-navigation-drawer
    v-model="editDrawer.isOpen"
    :permanent="xs ? false : true"
    location="right"
    width="300"
  >
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
      <v-col cols="5">
        <v-btn prepend-icon="mdi-pencil" @click="openDialog">{{ $t('editDashboard.edit') }}</v-btn>
      </v-col>
      <v-col cols="4" class="ms-auto d-flex justify-end align-center">
        <v-menu :close-on-content-click="false">
          <template #activator="{ props: prop }">
            <v-btn
              variant="flat"
              :color="editor.dashboard.backgroundColor"
              v-bind="prop"
              class="d-flex align-center justify-center"
              :style="{
                backgroundColor: editor.dashboard.backgroundColor,
                cursor: 'pointer',
                width: '120px',
                height: '36px',
                outline: '1px solid rgba(0, 0, 0, 0.12)',
                marginRight: '1rem',
                borderRadius: '2px',
                fontSize: '14px',
              }"
            >
              {{ $t('editDashboard.backgroundColor') }}
            </v-btn>
          </template>
          <v-color-picker
            v-model="editor.dashboard.backgroundColor"
            flat
            :modes="['rgb', 'hsl', 'hex']"
          ></v-color-picker>
        </v-menu>

        <v-btn color="primary" :loading="editor.saveLoading" @click="saveDashboard">{{
          $t('editDashboard.save')
        }}</v-btn>
      </v-col>
      <v-col cols="12" class="d-flex justify-end align-center">
        <span class="mx-1">{{ $t('explore.size') }} : </span>
        <v-btn class="mx-1" density="compact" icon="mdi-minus" @click="smallerArea"></v-btn>
        <v-btn class="mx-1" density="compact" icon="mdi-plus" @click="biggerArea"></v-btn>
      </v-col>
      <v-col cols="12">
        <div class="outer-area">
          <div id="area" ref="area" :style="{ backgroundColor: editor.dashboard.backgroundColor }">
            <DraggableResizable
              v-for="(chart, index) in editor.dashboard.charts"
              :key="chart"
              :container-width="areaWidth"
              :container-height="areaHeight"
              :index-of-chart="index"
              :grid-width="areaWidth / gridSizeDivisor.x"
              :grid-height="areaHeight / gridSizeDivisor.y"
              :read-only="false"
              @edit="openEditDrawer(index)"
              @delete="deleteChart(index)"
            ></DraggableResizable>
          </div>
        </div>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" width="600">
    <v-form :disabled="isSubmitting" @submit.prevent="submit">
      <v-card>
        <v-card-title class="d-flex align-center">
          <v-icon icon="mdi-pencil" class="me-1"></v-icon>
          <span>{{ $t('editDashboard.edit') }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="dashboardName.value.value"
            :error-messages="dashboardName.errorMessage.value"
            :label="$t('editDashboard.dashboardName')"
            variant="outlined"
          ></v-text-field>
          <v-textarea
            v-model="dashboardInfo.value.value"
            :error-messages="dashboardInfo.errorMessage.value"
            :label="$t('editDashboard.dashboardInfo')"
            variant="outlined"
          ></v-textarea>
          <v-switch
            v-model="dashboardPublic.value.value"
            color="primary"
            :label="$t('editDashboard.public')"
          ></v-switch>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="closeDialog">{{ $t('editDashboard.cancel') }}</v-btn>
          <v-btn color="primary" variant="flat" type="submit" :loading="isSubmitting">{{
            $t('editDashboard.save')
          }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { useAxios } from '@/composables/axios'
import { useI18n } from 'vue-i18n'
import { useSnackbar } from 'vuetify-use-dialog'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import DraggableResizable from '@/components/DraggableResizable.vue'
import EditorBar from '@/components/EditorBar.vue'
import html2canvas from 'html2canvas'
import { useDisplay } from 'vuetify'

const editor = useDashboardStore()
const { apiAuth } = useAxios()
const { t } = useI18n()
const createSnackbar = useSnackbar()
const { xs } = useDisplay()

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
        label: ['x-axis', 'y-axis'],
        hint: ['chooseCategorical', 'chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'histogram',
        icon: 'mdi-chart-histogram',
        useVarsNum: 2,
        label: ['x-axis', 'y-axis'],
        hint: ['chooseContinuous', 'chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'lineChart',
        icon: 'mdi-chart-line',
        useVarsNum: 2,
        label: ['x-axis', 'y-axis'],
        hint: ['chooseCategorical', 'chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'areaChart',
        icon: 'mdi-chart-areaspline-variant',
        useVarsNum: 2,
        label: ['x-axis', 'y-axis'],
        hint: ['chooseCategorical', 'chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'scatterChart',
        icon: 'mdi-chart-scatter-plot',
        useVarsNum: 2,
        label: ['x-axis', 'y-axis'],
        hint: ['chooseContinuous', 'chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'bubbleChart',
        icon: 'mdi-chart-bubble',
        useVarsNum: 3,
        label: ['x-axis', 'y-axis', 'size-value'],
        hint: ['chooseContinuous', 'chooseContinuous', 'chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'pieChart',
        icon: 'mdi-chart-pie',
        useVarsNum: 2,
        label: ['Group(Category)', 'Value(Sum)'],
        hint: ['chooseCategorical', 'chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'donutChart',
        icon: 'mdi-chart-donut',
        useVarsNum: 2,
        label: ['Group(Category)', 'Value(Sum)'],
        hint: ['chooseCategorical', 'chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'polarAreaChart',
        icon: 'mdi-chart-donut-variant',
        useVarsNum: 2,
        label: ['Group(Category)', 'Value(Sum)'],
        hint: ['chooseCategorical', 'chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'radarChart',
        icon: 'mdi-radar',
        useVarsNum: 2,
        label: ['Group(Category)', 'Value(Sum)'],
        hint: ['chooseCategorical', 'chooseContinuous'],
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
        label: ['no-label'],
        hint: ['chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'median',
        icon: '',
        useVarsNum: 1,
        label: ['no-label'],
        hint: ['chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'mode',
        icon: '',
        useVarsNum: 1,
        label: ['no-label'],
        hint: ['chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'range',
        icon: '',
        useVarsNum: 1,
        label: ['no-label'],
        hint: ['chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'IQR',
        icon: '',
        useVarsNum: 1,
        label: ['no-label'],
        hint: ['chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'variance',
        icon: '',
        useVarsNum: 1,
        label: ['no-label'],
        hint: ['chooseContinuous'],
      },
      {
        isOpen: false,
        text: 'standardDeviation',
        icon: '',
        useVarsNum: 1,
        label: ['no-label'],
        hint: ['chooseContinuous'],
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
        label: ['no-label'],
        hint: ['chooseCategorical'],
      },
      {
        isOpen: false,
        text: 'rangeFilter',
        icon: 'mdi-filter',
        useVarsNum: 1,
        label: ['no-label'],
        hint: ['chooseContinuous'],
      },
    ],
  },
  {
    text: 'textAndShape',
    menus: [
      {
        isOpen: false,
        text: 'textbox',
        icon: 'mdi-text',
        useVarsNum: 0,
      },
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
        'textbox',
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
      fd.append('backgroundColor', editor.dashboard.backgroundColor)
      fd.append('charts', JSON.stringify(editor.dashboard.charts))

      await apiAuth.patch(`/dashboard/${editor.dashboard._id}`, fd)
      createSnackbar({
        text: t('editDashboard.saveSuccess'),
        snackbarProps: {
          color: 'green',
        },
      })
      editor.chartsChanged = false
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

const biggerArea = () => {
  const width = area.value.offsetWidth + 200
  if (width > 2560) return
  area.value.style.width = width + 'px'
}

const smallerArea = () => {
  const width = area.value.offsetWidth - 200
  if (width < 200) return
  area.value.style.width = width + 'px'
}

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

.outer-area {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  overflow: auto;
}
</style>

<route lang="json">
{
  "meta": {
    "layout": "editor",
    "login": true,
    "title": "editor.editDashboard"
  }
}
</route>
