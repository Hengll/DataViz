<template>
  <v-card v-if="cardForm">
    <router-link
      :to="readOnly ? '/dashboard/' + _id : '/editor/dashboard/' + _id"
      class="dashboard-link"
    >
      <v-row>
        <v-col cols="12" class="pb-0">
          <v-img class="border ma-1 rounded-t" :src="image || whiteImg"></v-img>
        </v-col>
        <v-col cols="8" class="pt-0">
          <v-card-title :title="dashboardName">
            {{ dashboardName }}
          </v-card-title>
          <v-card-subtitle>
            <v-hover>
              <template #default="{ isHovering, props }">
                <router-link
                  v-if="readOnly"
                  :title="user.userName"
                  v-bind="props"
                  :to="'/author/' + user._id"
                  class="dashboard-link"
                  :class="{ 'text-primary': isHovering ? true : false }"
                >
                  {{ user.userName }}
                </router-link>
              </template>
            </v-hover>
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <template v-if="!readOnly">
                <v-col cols="12">
                  <span>{{
                    $t('dashboard.updatedAt') + ' : ' + new Date(updatedAt).toLocaleDateString()
                  }}</span>
                </v-col>
              </template>
              <template v-else>
                <v-col cols="6" class="d-flex align-end">
                  <v-icon class="me-2" icon="mdi-thumb-up-outline"></v-icon>
                  <span>{{ like }}</span>
                </v-col>
                <v-col cols="6" class="d-flex align-end">
                  <v-icon class="me-2" icon="mdi-eye-outline"></v-icon>
                  <span>{{ view }}</span>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
        </v-col>
        <v-col cols="4" class="pt-0">
          <v-card-actions class="d-flex flex-column align-end">
            <v-btn v-if="!readOnly" variant="outlined" color="primary" @click="$emit('edit')">{{
              $t('dashboard.edit')
            }}</v-btn>
            <v-btn v-if="!readOnly" variant="outlined" @click.prevent="$emit('delete')">{{
              $t('dashboard.delete')
            }}</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </router-link>
  </v-card>
  <v-card v-else>
    <router-link
      :to="readOnly ? '/dashboard/' + _id : '/editor/dashboard/' + _id"
      class="dashboard-link"
    >
      <v-row class="d-flex flex-nowrap flex-row pa-1 align-center">
        <v-col class="flex-0-0 d-flex align-center w-auto pe-0" :style="{ height: '125px' }">
          <img class="border rounded h-100" :src="image || whiteImg" />
        </v-col>
        <v-col class="flex-1-1 w-auto" :style="{ height: '125px', minWidth: 0 }">
          <v-card-title :title="dashboardName">
            {{ dashboardName }}
          </v-card-title>
          <v-card-subtitle v-if="readOnly">
            <v-hover>
              <template #default="{ isHovering, props }">
                <router-link
                  :title="user.userName"
                  v-bind="props"
                  :to="'/author/' + user._id"
                  class="dashboard-link"
                  :class="{ 'text-primary': isHovering ? true : false }"
                >
                  {{ user.userName }}
                </router-link>
              </template>
            </v-hover>
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <template v-if="!readOnly">
                <v-col cols="12">
                  <span class="overflow-x-hidden">{{
                    $t('dashboard.updatedAt') + ' : ' + new Date(updatedAt).toLocaleDateString()
                  }}</span>
                </v-col>
              </template>
              <template v-else>
                <v-col cols="6" class="d-flex align-end">
                  <v-icon class="me-2" icon="mdi-thumb-up-outline"></v-icon>
                  <span>{{ like }}</span>
                </v-col>
                <v-col cols="6" class="d-flex align-end">
                  <v-icon class="me-2" icon="mdi-eye-outline"></v-icon>
                  <span>{{ view }}</span>
                </v-col>
              </template>
            </v-row>
          </v-card-text>
        </v-col>
        <v-col class="flex-0-0 w-auto" :style="{ height: '125px' }">
          <v-card-actions class="d-flex flex-column align-end justify-center">
            <v-btn v-if="!readOnly" variant="outlined" color="primary" @click="$emit('edit')">{{
              $t('dashboard.edit')
            }}</v-btn>
            <v-btn v-if="!readOnly" variant="outlined" @click.prevent="$emit('delete')">{{
              $t('dashboard.delete')
            }}</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
    </router-link>
  </v-card>
</template>

<script setup>
const whiteImg = new URL('@/assets/white.png', import.meta.url).href
defineProps({
  // eslint-disable-next-line vue/prop-name-casing
  _id: {
    type: String,
    default: '',
  },
  dashboardName: {
    type: String,
    default: '',
  },
  user: {
    type: Object,
    default: () => {},
  },
  like: {
    type: Number,
    default: 0,
  },
  view: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
    default: '',
  },
  updatedAt: {
    type: String,
    default: '',
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  cardForm: {
    type: Boolean,
    default: true,
  },
})

defineEmits(['edit', 'delete'])
</script>

<style lang="scss" scoped>
.dashboard-link {
  color: rgba(var(--v-theme-on-surface), var(--v-high-emphasis-opacity));
  text-decoration: none;
}
</style>
