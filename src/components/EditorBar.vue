<template>
  <v-list>
    <v-list-item class="d-flex justify-end">
      <v-btn
        variant="text"
        icon="mdi-close"
        class="close-btn border"
        @click="$emit('close')"
      ></v-btn>
    </v-list-item>
    <v-list-item>
      <h3 class="mb-6">{{ $t('editDrawer.customOptions') }}</h3>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartTitle')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            density="compact"
            variant="outlined"
            :model-value="editor.dashboard.charts[indexOfChart].chartTitle"
            @change="editor.editChartTitle(indexOfChart, $event.target.value)"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartPosX')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            v-maska="customOptionsPosXMask"
            suffix="grid"
            density="compact"
            variant="outlined"
            placeholder="grid"
            :model-value="editor.dashboard.charts[indexOfChart].chartPosX"
            @change="
              editor.moveChart(
                indexOfChart,
                $event.target.value * 1,
                editor.dashboard.charts[indexOfChart].chartPosY,
              )
            "
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartPosY')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            v-maska="customOptionsPosYMask"
            density="compact"
            variant="outlined"
            placeholder="grid"
            suffix="grid"
            :model-value="editor.dashboard.charts[indexOfChart].chartPosY"
            @change="
              editor.moveChart(
                indexOfChart,
                editor.dashboard.charts[indexOfChart].chartPosX,
                $event.target.value * 1,
              )
            "
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartWidth')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            :key="editKey"
            v-maska="customOptionsWidthMask"
            density="compact"
            variant="outlined"
            placeholder="grid"
            suffix="grid"
            :model-value="editor.dashboard.charts[indexOfChart].chartWidth"
            @change="
              changeSize(
                indexOfChart,
                $event.target.value * 1,
                editor.dashboard.charts[indexOfChart].chartHeight,
              )
            "
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
          $t('editDrawer.chartHeight')
        }}</v-col>
        <v-col cols="7" class="py-0">
          <v-text-field
            :key="editKey"
            v-maska="customOptionsHeightMask"
            density="compact"
            variant="outlined"
            placeholder="grid"
            suffix="grid"
            :model-value="editor.dashboard.charts[indexOfChart].chartHeight"
            @change="
              changeSize(
                indexOfChart,
                editor.dashboard.charts[indexOfChart].chartWidth,
                $event.target.value * 1,
              )
            "
          ></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item
      v-for="(options, type) in editor.dashboard.charts[indexOfChart].chartOption"
      :key="type"
      class="border"
    >
      <h3 class="mb-6 mt-3">{{ $t(`editDrawer.${type}`) }}</h3>
      <v-row v-for="(optionValue, optionKey) in options" :key="optionKey">
        <!-- 不是物件或陣列 -->
        <template v-if="!(typeof optionValue === 'object')">
          <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
            $t(`editDrawer.${optionKey}`)
          }}</v-col>
          <v-col cols="7" class="py-0">
            <!-- 如果是布林值 -->
            <v-switch
              v-if="typeof optionValue === 'boolean'"
              v-model="options[optionKey]"
              color="primary"
              :label="`${options[optionKey]}`"
              hide-details
            ></v-switch>
            <!-- 如果是數字 -->
            <v-text-field
              v-else-if="typeof optionValue === 'number'"
              v-maska="numberMask"
              :model-value="options[optionKey]"
              density="compact"
              variant="outlined"
              placeholder="grid"
              @change="changeNumber(indexOfChart, type, optionKey, $event.target.value * 1)"
            ></v-text-field>
            <!-- 如果是顏色 -->
            <v-text-field
              v-else-if="optionValue[0] === '#'"
              :key="editKey"
              v-maska="colorMask"
              :model-value="options[optionKey]"
              class="pa-0 ma-0"
              variant="outlined"
              density="compact"
              placeholder="#00000000"
              @change="changeColor(indexOfChart, type, optionKey, $event.target.value)"
            >
              <template #append-inner>
                <v-menu :close-on-content-click="false">
                  <template #activator="{ props: prop }">
                    <div
                      :style="{
                        backgroundColor: options[optionKey],
                        cursor: 'pointer',
                        height: '1.5rem',
                        width: '1.5rem',
                      }"
                      v-bind="prop"
                    ></div>
                  </template>
                  <v-color-picker
                    v-model="options[optionKey]"
                    flat
                    :modes="['rgba', 'hsla', 'hexa']"
                  ></v-color-picker>
                </v-menu>
              </template>
            </v-text-field>
            <!-- 如果是文字不是顏色 -->
            <v-switch
              v-else-if="optionKey === 'indexAxis'"
              v-model="options[optionKey]"
              color="primary"
              :label="`${options[optionKey]}-axis`"
              true-value="x"
              false-value="y"
              hide-details
            ></v-switch>
            <v-select
              v-else-if="positionItems.includes(optionValue)"
              v-model="options[optionKey]"
              variant="outlined"
              density="compact"
              :items="positionItems"
            >
            </v-select>
            <v-select
              v-else-if="alignItems.includes(optionValue)"
              v-model="options[optionKey]"
              variant="outlined"
              density="compact"
              :items="alignItems"
            >
            </v-select>
            <v-textarea
              v-else-if="optionKey === 'innerText'"
              v-model="options[optionKey]"
              class="text-body border mb-7"
              spellcheck="false"
              variant="plain"
              auto-grow
              hide-details
            ></v-textarea>
          </v-col>
        </template>
        <!-- 是陣列(顏色) -->
        <template v-else-if="Array.isArray(optionValue)">
          <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
            $t(`editDrawer.${optionKey}`)
          }}</v-col>
          <v-col cols="7" class="py-0 d-flex">
            <v-text-field
              :key="editKey"
              v-maska="mixColorMask"
              density="compact"
              variant="outlined"
              :model-value="isAllSame(optionValue) ? Object.values(optionValue)[0] : 'mixed'"
              @change="changeInnerAllColor(indexOfChart, type, optionKey, $event.target.value)"
            >
              <template #append-inner>
                <v-menu :close-on-content-click="false" width="200">
                  <template #activator="{ props: prop }">
                    <v-btn
                      icon="mdi-arrow-expand-all"
                      variant="text"
                      v-bind="prop"
                      class="expend-btn border"
                    >
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title class="d-flex align-center justify-space-between">
                      {{ $t(`editDrawer.${optionKey}`) }}
                      <v-btn
                        class="expend-btn border"
                        variant="text"
                        icon="mdi-plus"
                        @click="editor.insertChartSubOption(indexOfChart, type, optionKey)"
                      ></v-btn>
                    </v-card-title>
                    <v-card-text>
                      <v-text-field
                        v-for="(subValue, subOptionKey) in optionValue"
                        :key="editKey + subOptionKey"
                        v-maska="colorMask"
                        :model-value="subValue"
                        class="pa-0 ma-0"
                        variant="outlined"
                        density="compact"
                        placeholder="#00000000"
                        @change="
                          changeInnerColor(
                            indexOfChart,
                            type,
                            optionKey,
                            subOptionKey,
                            $event.target.value,
                          )
                        "
                      >
                        <template #prepend-inner>
                          <v-btn
                            class="expend-btn border"
                            variant="text"
                            icon="mdi-minus"
                            @click="
                              editor.removeChartSubOption(
                                indexOfChart,
                                type,
                                optionKey,
                                subOptionKey,
                              )
                            "
                          ></v-btn>
                        </template>
                        <template #append-inner>
                          <v-menu :close-on-content-click="false">
                            <template #activator="{ props: prop }">
                              <div
                                :style="{
                                  backgroundColor: subValue,
                                  cursor: 'pointer',
                                  height: '1.5rem',
                                  width: '1.5rem',
                                }"
                                v-bind="prop"
                              ></div>
                            </template>
                            <v-color-picker
                              v-model="optionValue[subOptionKey]"
                              flat
                              :modes="['rgba', 'hsla', 'hexa']"
                            ></v-color-picker>
                          </v-menu>
                        </template>
                      </v-text-field>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
          </v-col>
        </template>
        <!-- 是物件 -->
        <template v-else>
          <v-col cols="5" class="d-flex justify-start align-center py-0 pe-0">{{
            $t(`editDrawer.${optionKey}`)
          }}</v-col>
          <v-col cols="7" class="py-0 d-flex">
            <v-text-field
              v-maska="mixNumberMask"
              density="compact"
              variant="outlined"
              :model-value="isAllSame(optionValue) ? Object.values(optionValue)[0] : 'mixed'"
              @change="changeInnerAllNumber(indexOfChart, type, optionKey, $event.target.value * 1)"
            >
              <template #append-inner>
                <v-menu :close-on-content-click="false">
                  <template #activator="{ props: prop }">
                    <v-btn
                      icon="mdi-arrow-expand-all"
                      variant="text"
                      v-bind="prop"
                      class="expend-btn border"
                    >
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>{{ $t(`editDrawer.${optionKey}`) }}</v-card-title>
                    <v-card-text class="d-flex">
                      <v-text-field
                        v-for="(subValue, subOptionKey) in optionValue"
                        :key="subValue"
                        v-maska="numberMask"
                        :model-value="subValue"
                        variant="outlined"
                        class="mx-1"
                        :label="$t(`editDrawer.${subOptionKey}`)"
                        density="compact"
                        @change="
                          changeInnerNumber(
                            indexOfChart,
                            type,
                            optionKey,
                            subOptionKey,
                            $event.target.value * 1,
                          )
                        "
                      ></v-text-field>
                    </v-card-text>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
          </v-col>
        </template>
      </v-row>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useDashboardStore } from '@/stores/dashboard'
import { vMaska } from 'maska/vue'

const editor = useDashboardStore()

const props = defineProps({
  indexOfChart: {
    type: Number,
    default: 0,
  },
  gridWidth: {
    type: Number,
    default: 0,
  },
  gridHight: {
    type: Number,
    default: 0,
  },
  gridSizeDivisorX: {
    type: Number,
    default: 0,
  },
  gridSizeDivisorY: {
    type: Number,
    default: 0,
  },
})
defineEmits(['close'])

const customOptionsPosXMask = computed(() => {
  return {
    mask: '##',
    eager: true,
    preProcess: (val) => {
      const num = parseInt(val, 10)

      if (isNaN(num)) return 0
      if (num > props.gridSizeDivisorX - editor.dashboard.charts[props.indexOfChart].chartWidth)
        return props.gridSizeDivisorX - editor.dashboard.charts[props.indexOfChart].chartWidth
      if (num < 0) return 0

      return num
    },
  }
})

const customOptionsPosYMask = computed(() => {
  return {
    mask: '##',
    eager: true,
    preProcess: (val) => {
      const num = parseInt(val, 10)

      if (isNaN(num)) return 0
      if (num > props.gridSizeDivisorY - editor.dashboard.charts[props.indexOfChart].chartHeight)
        return props.gridSizeDivisorY - editor.dashboard.charts[props.indexOfChart].chartHeight
      if (num < 0) return 0

      return num
    },
  }
})

const customOptionsWidthMask = computed(() => {
  return {
    mask: '##',
    eager: true,
    preProcess: (val) => {
      const num = parseInt(val, 10)

      if (isNaN(num)) return 0
      if (num > props.gridSizeDivisorX - editor.dashboard.charts[props.indexOfChart].chartPosX)
        return props.gridSizeDivisorX - editor.dashboard.charts[props.indexOfChart].chartPosX
      if (num < 0) return 0

      return num
    },
  }
})

const customOptionsHeightMask = computed(() => {
  return {
    mask: '##',
    eager: true,
    preProcess: (val) => {
      const num = parseInt(val, 10)

      if (isNaN(num)) return 0
      if (num > props.gridSizeDivisorY - editor.dashboard.charts[props.indexOfChart].chartPosY)
        return props.gridSizeDivisorY - editor.dashboard.charts[props.indexOfChart].chartPosY
      if (num < 0) return 0

      return num
    },
  }
})

const numberMask = computed(() => {
  return {
    mask: 'XDX',

    eager: true,
    tokens: {
      X: {
        pattern: /[0-9]/,
        multiple: true,
      },
      D: {
        pattern: /[.]/,
      },
    },
  }
})

const mixNumberMask = computed(() => {
  return {
    mask: (value) => {
      return value === 'mixed' ? 'MMMMM' : 'XDX'
    },
    eager: true,
    tokens: {
      X: {
        pattern: /[0-9]/,
        multiple: true,
      },
      D: {
        pattern: /[.]/,
      },
      M: {
        pattern: /[a-zA-Z]/,
      },
    },
  }
})

const colorMask = computed(() => {
  return {
    mask: '!#HHHHHHHH',
    eager: true,
    tokens: {
      H: {
        pattern: /[0-9a-fA-F]/,
      },
    },
    preProcess: (val) => {
      if (val === '') return '#'
      return val
    },
  }
})

const mixColorMask = computed(() => {
  return {
    mask: (value) => {
      return value === 'mixed' ? 'MMMMM' : '!#HHHHHHHH'
    },
    eager: true,
    tokens: {
      H: {
        pattern: /[0-9a-fA-F]/,
      },
      M: {
        pattern: /[a-zA-Z]/,
      },
    },
    preProcess: (val) => {
      if (val === '') return '#'
      return val
    },
  }
})

// 渲染參數
const editKey = ref(0)

const changeSize = (index, chartWidth, chartHeight) => {
  editor.resizeChart(index, chartWidth > 10 ? chartWidth : 10, chartHeight > 10 ? chartHeight : 10)
  editKey.value++
}

const changeNumber = (index, type, key, value) => {
  if (value < 0) editor.editChartOption(index, type, key, 0)
  else if (value > 1000) editor.editChartOption(index, type, key, 1000)
  else editor.editChartOption(index, type, key, value)
  editKey.value++
}

const changeColor = (index, type, key, value) => {
  if (value.length === 7 || value.length === 9) {
    editor.editChartOption(index, type, key, value)
  }
  editKey.value++
}

const changeInnerNumber = (index, type, key, subkey, value) => {
  if (value < 0) editor.editChartSubOption(index, type, key, subkey, 0)
  else if (value > 1000) editor.editChartSubOption(index, type, key, subkey, 1000)
  else editor.editChartSubOption(index, type, key, subkey, value)
  editKey.value++
}

const changeInnerAllNumber = (index, type, key, value) => {
  const keys = Object.keys(editor.dashboard.charts[props.indexOfChart].chartOption[type][key])

  if (value < 0) {
    for (let i = 0; i < keys.length; i++) {
      editor.editChartSubOption(index, type, key, keys[i], 0)
    }
  } else if (value > 1000) {
    for (let i = 0; i < keys.length; i++) {
      editor.editChartSubOption(index, type, key, keys[i], 1000)
    }
  } else {
    for (let i = 0; i < keys.length; i++) {
      editor.editChartSubOption(index, type, key, keys[i], value)
    }
  }
  editKey.value++
}

const changeInnerColor = (index, type, key, subkey, value) => {
  if (value.length === 7 || value.length === 9) {
    editor.editChartSubOption(index, type, key, subkey, value)
  }
  editKey.value++
}

const changeInnerAllColor = (index, type, key, value) => {
  const keys = Object.keys(editor.dashboard.charts[props.indexOfChart].chartOption[type][key])

  if (value.length === 7 || value.length === 9) {
    for (let i = 0; i < keys.length; i++) {
      editor.editChartSubOption(index, type, key, keys[i], value)
    }
  }
  editKey.value++
}

const positionItems = ['top', 'left', 'bottom', 'right']
const alignItems = ['start', 'center', 'end']

const isAllSame = (obj) => {
  return new Set(Object.values(obj)).size === 1
}
</script>

<style lang="scss" scoped>
.close-btn {
  border-radius: 5px;
  width: 30px;
  height: 30px;
}

.expend-btn {
  border-radius: 5px;
  width: 25px;
  height: 25px;
}

.text-body {
  height: 200px;
  overflow-x: hidden;
  overflow-y: scroll;
}

::v-deep(.text-body) {
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
