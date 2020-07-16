<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-container>
        <v-row class="justify-center">
          <v-col md="8" class="flex flex-row">
            <v-row class="justify-space-between align-center">
              <v-btn x-large text link active-class="transparent" to="/" nuxt
                >Tech Reagan</v-btn
              >
              <v-spacer></v-spacer>

              <div>
                <v-switch
                  v-model="$vuetify.theme.dark"
                  hide-details
                  inset
                ></v-switch>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <v-container class="fill-height">
        <v-row class="justify-center align-self-start">
          <v-col md="8">
            <nuxt />
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer app>
      <div class="text-center">
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import 'highlight.js/styles/atom-one-dark.css'
export default {
  auth: false,
  head() {
    return {
      titleTemplate: "%s - Tech Reagan's Blog",
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A worldclass software and network engineer, with alot of experience under my belt Welcome to my blog, this blog will be about software and network engineering.'
        }
      ]
    }
  }
}
</script>

<style>
.transparent.v-btn:before {
  background-color: transparent;
}
</style>
