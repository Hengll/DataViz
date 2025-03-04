<template>
  <v-container class="d-flex justify-center">
    <div class="user-container">
      <v-row>
        <v-col cols="12" class="pa-0">
          <v-img :src="user.theme === 'lightTheme' ? logo : logoDark"></v-img>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12">
          <h1 class="text-center">{{ $t('nav.login') }}</h1>
        </v-col>
        <v-col cols="12">
          <v-form :disabled="isSubmitting" @submit.prevent="submit">
            <v-text-field
              v-model="account.value.value"
              variant="outlined"
              :error-messages="account.errorMessage.value"
              :label="$t('user.account')"
              counter
              minlength="4"
              maxlength="20"
            ></v-text-field>
            <v-text-field
              v-model="password.value.value"
              variant="outlined"
              type="password"
              autocomplete
              :error-messages="password.errorMessage.value"
              :label="$t('user.password')"
              counter
              minlength="4"
              maxlength="20"
            ></v-text-field>
            <div class="d-flex justify-center mt-10">
              <v-btn variant="outlined" :loading="isSubmitting" type="submit" color="primary">{{
                $t('login.login')
              }}</v-btn>
            </div>
          </v-form>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12">
          <p class="text-center">
            <span>{{ $t('login.firstUse') }}</span>
            <router-link to="/register" class="link-register">{{
              $t('login.register')
            }}</router-link>
          </p>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import validator from 'validator'
import { useI18n } from 'vue-i18n'
import { useSnackbar } from 'vuetify-use-dialog'
import { useAxios } from '@/composables/axios'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const logo = new URL('@/assets/logo.png', import.meta.url).href
const logoDark = new URL('@/assets/logo_dark.png', import.meta.url).href

const { t } = useI18n()
const createSnackbar = useSnackbar()
const { api } = useAxios()
const router = useRouter()
const user = useUserStore()

const schema = yup.object({
  account: yup
    .string()
    .required(t('api.userAccountRequired'))
    .min(4, t('api.userAccountTooShort'))
    .max(20, t('api.userAccountTooLong'))
    .test('isAlphanumeric', t('api.userAccountInvalid'), (value) =>
      validator.isAlphanumeric(value),
    ),
  password: yup
    .string()
    .required(t('api.userPasswordRequired'))
    .min(4, t('api.userPasswordTooShort'))
    .max(20, t('api.userPasswordTooLong')),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

const account = useField('account')
const password = useField('password')

const submit = handleSubmit(async (values) => {
  try {
    const { data } = await api.post('/user/login', {
      account: values.account,
      password: values.password,
    })
    user.login(data.result)
    createSnackbar({
      text: t('login.success'),
      snackbarProps: {
        color: 'green',
      },
    })
    router.push('/')
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
.user-container {
  width: 410px;
}

.link-register {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>

<route lang="json">
{
  "meta": {
    "layout": "login",
    "login": false,
    "title": "nav.login"
  }
}
</route>
