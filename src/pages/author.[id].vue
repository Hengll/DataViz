<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mt-16">
        <v-row>
          <v-col cols="12" class="front border border-opacity-50"></v-col>
          <v-col cols="12" class="user pa-16">
            <v-row>
              <v-col cols="12" class="mt-4">
                <v-avatar
                  v-if="!isUserPage"
                  class="border border-opacity-100 bg-orange avatar"
                  :image="dashboards[0]?.user?.avatar || userIcon"
                ></v-avatar>
                <v-hover v-else>
                  <template #default="{ isHovering, props }">
                    <div v-bind="props" class="avatar" @click="openDialog">
                      <v-icon
                        v-if="isHovering"
                        class="border border-opacity-100 opacity-50 bg-grey-lighten-3 avatar-edit"
                        icon="mdi-camera"
                      ></v-icon>
                      <v-avatar
                        class="border border-opacity-100 bg-orange w-100 h-100"
                        :image="dashboards[0]?.user?.avatar || userIcon"
                      ></v-avatar>
                    </div>
                  </template>
                </v-hover>
                <h2>{{ dashboards[0]?.user?.userName }}</h2>
              </v-col>
              <v-col cols="12">
                <p>{{ dashboards[0]?.user?.userInfo || '...' }}</p>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" class="pa-16">
        <v-row>
          <v-col
            v-for="dashboard in dashboards"
            :key="dashboard._id"
            class="v-col-12 v-col-sm-6 v-col-md-4 v-col-lg-3"
          >
            <dashboard-card v-bind="dashboard" :read-only="true"></dashboard-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" width="350">
    <v-card>
      <v-card-title>123</v-card-title>
      <v-card-text>123</v-card-text>
      <v-card-actions>
        <v-btn @click="closeDialog">取消</v-btn>
        <v-btn>上傳</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'

const userIcon = new URL('@/assets/Sample_User_Icon.png', import.meta.url).href

const user = useUserStore()
const route = useRoute()
const router = useRouter()
const { api } = useAxios()

const dialog = ref(false)
const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
}

const isUserPage = ref(false)
const dashboards = ref([])

const getAuthor = async () => {
  try {
    if (user.id === route.params.id) {
      isUserPage.value = true
    }

    const { data } = await api.get(`/dashboard/public/user/${route.params.id}`)
    dashboards.value = data.result
    document.title = dashboards.value[0].user.userName + ' | DataViz'
  } catch (err) {
    console.log(err)
    router.push('/')
  }
}
getAuthor()
</script>

<style lang="scss" scoped>
.front {
  height: 100px;
}

.user {
  height: 300px;
  position: relative;
}

.avatar {
  position: absolute;
  top: -50px;
  width: 100px;
  height: 100px;
}

.avatar-edit {
  position: absolute;
  border-radius: 100%;
  z-index: 20;
  width: 100%;
  height: 100%;
  cursor: pointer;
}
</style>

<route lang="json">
{
  "meta": {
    "login": false,
    "admin": false,
    "title": "nav.explore"
  }
}
</route>
