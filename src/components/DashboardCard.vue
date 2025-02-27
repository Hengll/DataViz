<template>
  <v-card>
    <v-img class="border ma-1 rounded-t" :src="image || whiteImg"></v-img>
    <v-row>
      <v-col cols="8">
        <v-card-title>
          <router-link
            :to="readOnly ? '/dashboard/' + _id : '/editor/dashboard/' + _id"
            class="text-decoration-none"
            >{{ dashboardName }}</router-link
          >
        </v-card-title>
        <v-card-subtitle>
          <router-link v-if="readOnly" :to="'/author/' + user._id" class="text-decoration-none">
            {{ user.userName }}
          </router-link>
          <p v-else>{{ user.userName }}</p>
        </v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col cols="6" class="d-flex align-end">
              <v-icon class="me-2" icon="mdi-thumb-up-outline"></v-icon>
              <span>{{ like }}</span>
            </v-col>
            <v-col cols="6" class="d-flex align-end">
              <v-icon class="me-2" icon="mdi-eye-outline"></v-icon>
              <span>{{ view }}</span>
            </v-col>
          </v-row>
        </v-card-text>
      </v-col>
      <v-col cols="4" class="pe-5">
        <v-card-actions class="d-flex flex-column">
          <v-btn v-if="!readOnly" class="border" @click="$emit('edit')">{{
            $t('dashboard.edit')
          }}</v-btn>
          <v-btn v-if="!readOnly" class="border" @click="$emit('delete')">{{
            $t('dashboard.delete')
          }}</v-btn>
        </v-card-actions>
      </v-col>
    </v-row>
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
  readOnly: {
    type: Boolean,
    default: false,
  },
})

defineEmits(['edit', 'delete'])
</script>
