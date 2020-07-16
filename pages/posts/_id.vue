<template>
  <v-layout>
    <v-flex>
      <v-btn class="mb-10" fab small to="/" color="primary"
        ><v-icon>mdi-chevron-left</v-icon></v-btn
      >

      <v-alert v-if="errored" prominent type="error">
        <v-row align="center">
          <v-col class="grow">
            <div class="title">Error!</div>
            <div>
              Something went wrong, but don’t fret — let’s give it another shot.
            </div>
          </v-col>
          <v-col class="shrink">
            <v-btn @click="getPost">Take action</v-btn>
          </v-col>
        </v-row>
      </v-alert>

      <main v-else>
        <div v-if="loading">
          <v-skeleton-loader type="heading"></v-skeleton-loader>
          <br />
          <v-skeleton-loader
            type="paragraph"
            :loading="loading"
          ></v-skeleton-loader>
          <v-skeleton-loader
            type="paragraph"
            :loading="loading"
          ></v-skeleton-loader>
          <v-skeleton-loader
            type="paragraph"
            :loading="loading"
          ></v-skeleton-loader>
        </div>
        <article v-else>
          <h1 class="mb-5">{{ title }}</h1>
          <div class="output ql-snow">
            <!-- eslint-disable -->
            <div class="ql-editor pl-0" v-html="htmlBody"></div>
          </div>
        </article>
      </main>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  auth: false,

  data() {
    return {
      loading: true,
      errored: false,
      title: '',
      body: ''
    }
  },
  computed: {
    htmlBody() {
      return this.htmlDecode(this.body)
    }
  },
  mounted() {
    this.getPost()
  },
  methods: {
    async getPost() {
      this.loading = true
      this.errored = false
      const { data } = await this.$api.posts
        .getPost(this.$route.params.id)
        .catch((e) => {
          // eslint-disable-next-line
          console.log(e)
          this.errored = true
          // error({
          //   status: 503,
          //   message: 'Unable to fetch events at this time. Please try again.'
          // })
        })
        .finally(() => {
          this.loading = false
        })

      if (!data) return

      // return {
      // id: data.data._id,
      this.title = data.data.title
      this.body = data.data.body
      // }
    },
    htmlDecode(input) {
      if (!process.client) return
      const e = document.createElement('div')
      e.innerHTML = input
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
  },

  head() {
    return {
      title: this.title
    }
  }
}
</script>
