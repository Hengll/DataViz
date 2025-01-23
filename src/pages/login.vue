<template>
  <v-container class="d-flex justify-center">
    <div class="user-container">
      <v-row>
        <v-col cols="12">
          <h1 class="text-center">{{ $t('nav.login') }}</h1>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <v-form>
            <v-text-field></v-text-field>
            <v-text-field></v-text-field>
            <div class="d-flex justify-center mt-10">
              <v-btn>{{ $t('login.login') }}</v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

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
