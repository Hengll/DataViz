<template>
  <v-container class="d-flex justify-center">
    <div class="user-container">
      <v-row>
        <v-col cols="12">
          <h1 class="text-center">{{ $t('nav.register') }}</h1>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-form>
            <v-text-field></v-text-field>
            <v-text-field></v-text-field>
            <v-text-field></v-text-field>
            <v-text-field></v-text-field>
            <v-text-field></v-text-field>
            <div class="d-flex justify-center mt-10">
              <v-btn>{{ $t('register.register') }}</v-btn>
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

const { t } = useI18n()

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
    "title": "nav.register"
  }
}
</route>
