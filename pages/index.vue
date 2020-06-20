<template>
  <v-layout column justify-center align-center>
    <v-flex>
      <div class="text-center">
        <v-avatar size="120">
          <img src="/tech-reagan-avatar.jpg" alt="Tech Reagan Avatar" />
        </v-avatar>
        <h1>Hello, I'm Reagan Ekhameye</h1>

        <p>
          A worldclass software and network engineer, with alot of experience
          under my belt.<br />
          Welcome to my blog, this blog will be about software and network
          engineering.
        </p>
      </div>
      <div class="mt-15">
        <v-card v-for="n in 6" :key="n" class="mb-7" :to="`/posts/${n}`">
          <v-card-title class="headline">
            Welcome to tech reagan blog
          </v-card-title>
          <v-card-text>
            <p>
              Vuetify is a progressive Material Design component framework for
              Vue.js. It was designed to empower developers to create amazing
              applications.
            </p>
            <div class="text-xs-right">
              <em><small>&mdash; Tech Reagan</small></em>
            </div>
          </v-card-text>
        </v-card>
      </div>
      <div>
        <v-pagination v-model="page" :length="6"></v-pagination>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      page: 1
    }
  }
}
</script>
