<template>
  <v-container class="d-flex justify-center">
    <div class="user-container">
      <v-row>
        <v-col cols="12" class="pa-0">
          <v-img :src="user.theme === 'lightTheme' ? logo : logoDark"></v-img>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12">
          <h1 class="text-center">{{ $t('nav.register') }}</h1>
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
              v-model="userName.value.value"
              variant="outlined"
              :error-messages="userName.errorMessage.value"
              :label="$t('user.userName')"
            ></v-text-field>
            <v-text-field
              v-model="email.value.value"
              variant="outlined"
              :error-messages="email.errorMessage.value"
              :label="$t('user.email')"
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
            <v-text-field
              v-model="passwordConfirm.value.value"
              variant="outlined"
              type="password"
              autocomplete
              :error-messages="passwordConfirm.errorMessage.value"
              :label="$t('user.passwordConfirm')"
              counter
              minlength="4"
              maxlength="20"
            ></v-text-field>
            <div class="d-flex justify-center mt-10">
              <v-btn :loading="isSubmitting" variant="outlined" type="submit" color="primary">{{
                $t('register.register')
              }}</v-btn>
            </div>
          </v-form>
        </v-col>
        <v-col cols="12"></v-col>
        <v-col cols="12">
          <p class="text-center">
            <span>{{ $t('register.notFirstUse') }}</span>
            <router-link to="/login" class="link-login">{{ $t('register.login') }}</router-link>
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
import { useAxios } from '@/composables/axios'
import { useSnackbar } from 'vuetify-use-dialog'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const logo = new URL('@/assets/logo.png', import.meta.url).href
const logoDark = new URL('@/assets/logo_dark.png', import.meta.url).href

const { t } = useI18n()
const { api } = useAxios()
const createSnackbar = useSnackbar()
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
  userName: yup.string().required(t('api.userUserNameRequired')),
  email: yup
    .string()
    .required(t('api.userEmailRequired'))
    .test('isEmail', t('api.userEmailInvalid'), (value) => validator.isEmail(value)),
  password: yup
    .string()
    .required(t('api.userPasswordRequired'))
    .min(4, t('api.userPasswordTooShort'))
    .max(20, t('api.userPasswordTooLong')),
  passwordConfirm: yup.string().oneOf([yup.ref('password')], t('api.userPasswordNotMatch')),
})

const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema,
})

const account = useField('account')
const userName = useField('userName')
const email = useField('email')
const password = useField('password')
const passwordConfirm = useField('passwordConfirm')

const submit = handleSubmit(async (value) => {
  try {
    await api.post('/user', {
      account: value.account,
      userName: value.userName,
      email: value.email,
      password: value.password,
    })
    createSnackbar({
      text: t('register.success'),
      snackbarProps: {
        color: 'green',
      },
    })
    router.push('/login')
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

.link-login {
  color: rgba(var(--v-theme-on-background), var(--v-high-emphasis-opacity));
}
</style>

<route lang="json">
{
  "meta": {
    "layout": "login",
    "login": false,
    "title": "nav.register"
  }
}
</route>
