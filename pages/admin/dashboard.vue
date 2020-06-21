<template>
  <v-row>
    <v-col md="4">
      <v-card>
        <v-card-title class="headline">
          Posts
        </v-card-title>
        <v-card-text> 100 </v-card-text>
        <v-card-actions> </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'admin',

  middleware: 'auth'
}
</script>
