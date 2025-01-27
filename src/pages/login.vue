<template>
  <v-container class="d-flex justify-center">
    <div class="user-container">
      <v-row>
        <v-col cols="12">
          <h1 class="text-center">{{ $t('nav.login') }}</h1>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-form :disabled="isSubmitting" @submit.prevent="submit">
            <v-text-field
              v-model="account.value.value"
              :error-messages="account.errorMessage.value"
              :label="$t('user.account')"
              counter
              minlength="4"
              maxlength="20"
            ></v-text-field>
            <v-text-field
              v-model="password.value.value"
              type="password"
              autocomplete
              :error-messages="password.errorMessage.value"
              :label="$t('user.password')"
              counter
              minlength="4"
              maxlength="20"
            ></v-text-field>
            <div class="d-flex justify-center mt-10">
              <v-btn :loading="isSubmitting" type="submit" color="promary">{{
                $t('login.login')
              }}</v-btn>
            </div>
          </v-form>
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
  margin-top: 2rem;
}
</style>

<route lang="json">
{
  "meta": {
    "layout": "login",
    "login": false,
    "admin": false,
    "title": "nav.login"
  }
}
</route>
