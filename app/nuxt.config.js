import colors from "vuetify/es5/util/colors"
import path from 'path'
import fs from 'fs'

const env = require("dotenv").config()

export default {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "red" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    // "@nuxtjs/eslint-module",
    "@nuxtjs/vuetify",
    "@nuxt/typescript-build"
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    "@nuxtjs/axios",
    "@nuxtjs/pwa",
    // Doc: https://github.com/nuxt-community/dotenv-module
    "@nuxtjs/dotenv",
    "@nuxtjs/proxy",
    "@nuxtjs/auth"
  ],
  proxy: {
    "/api": {
      target: process.env.LARAVEL_ENDPOINT,
    },
    "/oauth": {
      target: process.env.LARAVEL_ENDPOINT
    }
  },
  env: env.parsed,
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) { }
  },

  /** Авторизация */
  auth: {
    redirect: {
      login: "/login",
      logout: "/",
      callback: "/login",
      user: "/"
    },
    strategies: {
      password_grant_custom: {
        _scheme: "~/auth/schemes/PassportPasswordScheme.js",
        client_id: process.env.PASSPORT_PASSWORD_GRANT_ID,
        client_secret: process.env.PASSPORT_PASSWORD_GRANT_SECRET,
        endpoints: {
          login: {
            url: "/oauth/token",
            method: "post",
            propertyName: "access_token"
          },
          logout: false,
          user: {
            url: "/api/user"
          }
        }
      },
    }
  },
  server: {
    // port: 8081, // default: 3000
    // host: '0.0.0.0', // default: localhost
    // https: {
    //   key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    // }
  },
  pwa: {
    manifest: {
      "name": "ShopZilla - агрегатор скидок",
      "short_name": "ShopZilla",
      "theme_color": "#1e5786",
      "background_color": "#cccccc",
      "display": "fullscreen",
      "orientation": "portrait",
      "scope": "/",
      "start_url": "/",
    },
    workbox:{
      dev: true,
      cachingExtensions: ["workbox-images-cache.js"]
    }
  }
}
