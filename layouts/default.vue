<template>
  <v-app dark style="border: 8px solid #2b81d6;">
    <v-app-bar fixed app>
      <v-container>
        <v-row class="justify-center">
          <v-col md="8" class="flex flex-row">
            <v-row class="justify-space-between align-center">
              <v-btn x-large text>Tech Reagan</v-btn>
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
        <v-row class="justify-center">
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
export default {
  data() {
    return {}
  }
}
</script>
