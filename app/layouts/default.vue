<template>
  <v-app>
    <v-app-bar height="80" app>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    

      <v-toolbar-title @click.prevent="$router.push('/')" class="logo">
        <v-img :src="$icon(64)" height="64" width="64"></v-img>
      </v-toolbar-title>


      <v-spacer></v-spacer>

      <v-btn @click.prevent="$router.push('/logout')" icon>
        <v-icon>mdi-logout</v-icon>
      </v-btn>

      <v-btn @click.prevent="$router.push('/favorits')" icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      

      <v-btn :title="$auth.$state.user.name" icon>
        <v-icon>
          mdi-account
        </v-icon>
      </v-btn>
      <!-- -->
    </v-app-bar>

    <!-- Sizes your content based upon application components -->
    <v-content>
      <!-- Provides the application the proper gutter -->
      <v-container fluid>
        <!-- If using vue-router -->
        <nuxt />
      </v-container>
      <div class="bottom-spacer"></div>
    </v-content>

    <v-footer height="auto" dark fixed>
      <v-layout justify-center row wrap>
        <v-flex color="indigo" dark py-3 text-xs-center white--text xs12>
          &copy;{{years}} —
          <strong>ShopZilla</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Welcome",
          to: "/"
        },
        {
          icon: "mdi-chart-bubble",
          title: "Inspire",
          to: "/inspire"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },
  methods: {
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    logout() {
      this.$auth.logout();
      this.$store.commit("clear");
    }
  },
  computed: {
    years() {
      return new Date().getFullYear();
    }
  }
};
</script>
<style scoped>
.logo {
  cursor: pointer;
}
.bottom-spacer {
  height: 3rem;
}
</style>