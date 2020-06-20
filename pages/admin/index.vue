<template>
  <v-row justify="center" align="center" class="fill-height">
    <v-col md="6">
      <v-card>
        <v-card-title class="headline pl-8">
          Login
        </v-card-title>
        <v-card-text>
          <v-text-field label="Email" solo></v-text-field>

          <v-text-field
            label="Password"
            solo
            :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPassword ? 'text' : 'password'"
            @click:append="showPassword = !showPassword"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pl-5 pb-5 flex justify-space-between">
          <v-btn color="primary">Login</v-btn>
          <v-btn text small>Forgot Password?</v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false
    }
  }
}
</script>
