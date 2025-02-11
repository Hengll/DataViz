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
      <h3 class="mb-4">{{ $t('editDrawer.customOptions') }}</h3>
      <v-row>
        <v-col cols="6" class="d-flex justify-start align-center py-0">{{
          $t('editDrawer.chartTitle')
        }}</v-col>
        <v-col cols="6" class="py-0">
          <v-text-field density="compact" variant="outlined"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex justify-start align-center py-0">{{
          $t('editDrawer.chartPosX')
        }}</v-col>
        <v-col cols="6" class="py-0">
          <v-text-field
            v-model="editor.dashboard.charts[indexOfChart].chartPosX"
            v-maska="customOptionsMask"
            density="compact"
            variant="outlined"
            placeholder="grid"
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex justify-start align-center py-0">{{
          $t('editDrawer.chartPosY')
        }}</v-col>
        <v-col cols="6" class="py-0">
          <v-text-field density="compact" variant="outlined" placeholder="grid"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex justify-start align-center py-0">{{
          $t('editDrawer.chartWidth')
        }}</v-col>
        <v-col cols="6" class="py-0">
          <v-text-field density="compact" variant="outlined" placeholder="grid"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="6" class="d-flex justify-start align-center py-0">{{
          $t('editDrawer.chartHeight')
        }}</v-col>
        <v-col cols="6" class="py-0">
          <v-text-field density="compact" variant="outlined" placeholder="grid"></v-text-field>
        </v-col>
      </v-row>
    </v-list-item>
    <v-list-item
      v-for="(options, type) in editor.dashboard.charts[indexOfChart]?.chartOption"
      :key="type"
      class="border"
    >
      <h3 class="mb-2">{{ $t(`editDrawer.${type}`) }}</h3>
      <v-row v-for="(optionValue, optionKey) in options" :key="optionKey">
        <!-- 不是物件或陣列 -->
        <template v-if="!(typeof optionValue === 'object')">
          <v-col cols="6" class="d-flex justify-start align-center py-0">{{
            $t(`editDrawer.${optionKey}`)
          }}</v-col>
          <v-col cols="6" class="py-0">
            <!-- 如果是布林值 -->
            <v-switch v-if="typeof optionValue === 'boolean'" hide-details></v-switch>
            <!-- 如果是數字 -->
            <v-text-field
              v-else-if="typeof optionValue === 'number'"
              density="compact"
              variant="outlined"
              placeholder="grid"
            ></v-text-field>
            <!-- 如果是顏色 -->
            <v-text-field
              v-else-if="optionValue[0] === '#'"
              class="pa-0 ma-0"
              variant="outlined"
              density="compact"
              placeholder="#000000"
            >
              <template #append-inner>
                <v-menu :close-on-content-click="false">
                  <template #activator="{ props: prop }">
                    <div :style="swatchStyle" v-bind="prop"></div>
                  </template>
                  <v-color-picker flat :modes="['rgba', 'hsla', 'hexa']"></v-color-picker>
                </v-menu>
              </template>
            </v-text-field>
            <!-- 如果是文字不是顏色 -->
            <v-select
              v-else-if="positionItems.includes(optionValue)"
              variant="outlined"
              density="compact"
              :items="positionItems"
            >
            </v-select>
            <v-select
              v-else-if="alignItems.includes(optionValue)"
              variant="outlined"
              density="compact"
              :items="alignItems"
            >
            </v-select>
          </v-col>
        </template>
        <!-- 是物件或陣列 -->
        <template v-else>
          <v-col cols="6" class="d-flex justify-start align-center py-0">{{
            $t(`editDrawer.${optionKey}`)
          }}</v-col>
          <v-col cols="6" class="py-0 d-flex">
            <!-- 如果是陣列(顏色) -->
            <v-text-field
              v-if="Array.isArray(optionValue)"
              class="pa-0 ma-0"
              variant="outlined"
              density="compact"
              placeholder="#000000"
            >
              <template #append-inner>
                <v-menu :close-on-content-click="false">
                  <template #activator="{ props: prop }">
                    <div :style="swatchStyle" v-bind="prop"></div>
                  </template>
                  <v-card>
                    <v-color-picker flat :modes="['rgba', 'hsla', 'hexa']"></v-color-picker>
                    <v-card-actions>
                      <div class="d-flex ms-auto">
                        <v-btn class="border" variant="text" @click="console.log('新增顏色')"
                          >append color</v-btn
                        >
                      </div>
                    </v-card-actions>
                  </v-card>
                </v-menu>
              </template>
            </v-text-field>
            <!-- 如果是物件 -->
            <v-text-field v-else density="compact" variant="outlined">
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
                        :key="subOptionKey"
                        variant="outlined"
                        class="mx-1"
                        :label="$t(`editDrawer.${subOptionKey}`)"
                        density="compact"
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
import { useEditorStore } from '@/stores/editor'
import { vMaska } from 'maska/vue'

const editor = useEditorStore()

defineProps({
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
})
defineEmits(['close'])

const customOptionsMask = () => {}

const positionItems = ['top', 'left', 'bottom', 'right']
const alignItems = ['start', 'center', 'end']

// 檢色器樣式
const swatchStyle = computed(() => {
  return {
    backgroundColor: '#000000',
    cursor: 'pointer',
    height: '1.5rem',
    width: '1.5rem',
    // borderRadius: menu ? '50%' : '4px',
    transition: 'border-radius 200ms ease-in-out',
  }
})
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
</style>
