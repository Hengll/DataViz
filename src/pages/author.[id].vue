<template>
  <v-container>
    <v-row>
      <v-col cols="12" class="mt-16">
        <v-row>
          <v-col cols="12" class="front border border-opacity-50"></v-col>
          <v-col cols="12" class="user pa-16">
            <v-row>
              <v-col cols="12" class="mt-4 d-flex justify-space-between">
                <v-avatar
                  v-if="!isUserPage"
                  class="border border-opacity-100 bg-orange avatar"
                  :image="author.avatar || userIcon"
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
                        :image="author.avatar || userIcon"
                      ></v-avatar>
                    </div>
                  </template>
                </v-hover>
                <h2>{{ author.userName }}</h2>
                <v-btn
                  v-if="isUserPage"
                  prepend-icon="mdi-pencil"
                  color="primary"
                  @click="openInfoDialog"
                  >{{ $t('userPage.userEdit') }}</v-btn
                >
              </v-col>
              <v-col cols="12">
                <p>{{ author.userInfo || '...' }}</p>
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
            <v-hover>
              <template #default="{ isHovering, props }">
                <div v-bind="props" class="bg-secondary rounded">
                  <v-skeleton-loader v-if="isLoading" type="image, article"></v-skeleton-loader>
                  <dashboard-card
                    v-else
                    v-bind="dashboard"
                    :read-only="true"
                    :class="{ 'dashboard-hover': isHovering ? true : false }"
                    :style="{ transition: '0.2s' }"
                  ></dashboard-card>
                </div>
              </template>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>

  <v-dialog v-model="dialog" width="350">
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-upload" class="me-1"></v-icon>
        <span>{{ $t('userPage.uploadAvatar') }}</span>
      </v-card-title>
      <v-card-text>
        <VueFileAgent
          ref="fileAgent"
          v-model="fileRecords"
          v-model:raw-model-value="rawFileRecords"
          accept="image/jpeg,image/png"
          deletable
          max-size="1MB"
          :help-text="$t('userPage.helpText')"
          :error-text="{ type: $t('fileAgent.errorType'), size: $t('fileAgent.errorSize') }"
        ></VueFileAgent>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeDialog">{{ $t('userPage.cancel') }}</v-btn>
        <v-btn variant="flat" color="primary" :loading="isUpload" @click="upload">{{
          $t('userPage.upload')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>

  <v-dialog v-model="infoDialog" width="600">
    <v-card>
      <v-card-title class="d-flex align-center">
        <v-icon icon="mdi-pencil" class="me-1"></v-icon>
        <span>{{ $t('userPage.userEdit') }}</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="userName.value.value"
          :error-messages="userName.errorMessage.value"
          :label="$t('userPage.userName')"
          variant="outlined"
        ></v-text-field>
        <v-textarea
          v-model="userInfo.value.value"
          :error-messages="userInfo.errorMessage.value"
          :label="$t('userPage.userInfo')"
          variant="outlined"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="closeInfoDialog">{{ $t('userPage.cancel') }}</v-btn>
        <v-btn variant="flat" color="primary" :loading="isSubmitting" @click="submit">{{
          $t('userPage.confirm')
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores/user'
import { useRoute, useRouter } from 'vue-router'
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useI18n } from 'vue-i18n'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'

const userIcon = new URL('@/assets/Sample_User_Icon.png', import.meta.url).href

const user = useUserStore()
const route = useRoute()
const router = useRouter()
const { api, apiAuth } = useAxios()
const createSnackbar = useSnackbar()
const { t } = useI18n()

const dialog = ref(false)
const openDialog = () => {
  dialog.value = true
}
const closeDialog = () => {
  dialog.value = false
  fileAgent.value.deleteFileRecord()
}

const infoDialog = ref(false)
const openInfoDialog = () => {
  userName.value.value = user.userName
  userInfo.value.value = user.userInfo
  infoDialog.value = true
}
const closeInfoDialog = () => {
  infoDialog.value = false
  resetForm()
}

const isUserPage = ref(false)
const isLoading = ref(true)
const dashboards = ref([])
const author = ref({})

const fileRecords = ref([])
const rawFileRecords = ref([])
const fileAgent = ref(null)

const getAuthor = async () => {
  try {
    if (user.id === route.params.id) {
      isUserPage.value = true
      author.value = user
    } else {
      const { data } = await api.get(`/user/profile/public/${route.params.id}`)
      author.value = data.result
    }

    document.title = author.value.userName + ' - DataViz'
    const { data } = await api.get(`/dashboard/public/user/${route.params.id}`)
    dashboards.value = data.result
    isLoading.value = false
  } catch (err) {
    console.log(err)
    router.push('/')
  }
}
getAuthor()

// 上傳頭像
const isUpload = ref(false)
const upload = async () => {
  isUpload.value = true
  if (fileRecords.value[0]?.error) return
  if (fileRecords.value.length === 0) {
    createSnackbar({
      text: t('userPage.avatar'),
      snackbarProps: {
        color: 'red',
      },
    })
    return
  }

  try {
    const fd = new FormData()

    fd.append('userName', user.userName)
    fd.append('userInfo', user.userInfo)
    fd.append('avatar', fileRecords.value[0].file)

    const { data } = await apiAuth.patch('/user/profile', fd)
    user.login(data.result)
    closeDialog()
    isUpload.value = false
    createSnackbar({
      text: t('userPage.uplaodSuccess'),
      snackbarProps: {
        color: 'green',
      },
    })
  } catch (err) {
    console.log(err)
    isUpload.value = false
    createSnackbar({
      text: t('api.' + err?.response?.data?.message || 'unknownError'),
      snackbarProps: {
        color: 'red',
      },
    })
  }
}

// 編輯個人資訊
const schema = yup.object({
  userName: yup.string().required(t('api.userUserNameRequired')),
  userInfo: yup.string(),
})

const { handleSubmit, isSubmitting, resetForm } = useForm({
  validationSchema: schema,
})
const userName = useField('userName')
const userInfo = useField('userInfo')

const submit = handleSubmit(async (value) => {
  try {
    const { data } = await apiAuth.patch('/user/profile', {
      userName: value.userName,
      userInfo: value.userInfo,
    })
    user.login(data.result)
    closeInfoDialog()
    createSnackbar({
      text: t('userPage.editSuccess'),
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
})
</script>

<style lang="scss" scoped>
.front {
  height: 100px;
  background-color: rgb(var(--v-theme-secondary));
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

.dashboard-hover {
  transform: translate(5px, -5px);
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
