<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar flat light>
              <v-toolbar-title>Вход в приложение</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field label="Email" name="email" type="email" v-model="email"></v-text-field>
                <v-text-field
                  id="password"
                  label="Пароль"
                  name="password"
                  type="password"
                  v-model="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="login">Вход</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    async login() {
      await this.$auth.loginWith("password_grant_custom", {
        data: {
          username: this.email,
          password: this.password
        }
      });
    }
  }
};
</script>

<style>
</style>