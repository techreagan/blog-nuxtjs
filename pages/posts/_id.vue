<template>
  <v-layout>
    <v-flex>
      <v-btn class="mb-10" to="/" color="primary">back</v-btn>
      <h1 class="mb-5">{{ title }}</h1>
      <client-only>
        <div class="output ql-snow">
          <!-- eslint-disable -->
          <div class="ql-editor" v-html="htmlBody"></div>
        </div>
      </client-only>
    </v-flex>
  </v-layout>
</template>

<script>
// import dedent from 'dedent'
// import hljs from 'highlight.js'
// import debounce from 'lodash/debounce'

// highlight.js style
// import 'highlight.js/styles/tomorrow.css'
export default {
  auth: false,
  async asyncData({ $axios, error, $htmlDecode, $api, params }) {
    const { data } = await $api.posts.getPost(params.id).catch((e) => {
      error({
        status: 503,
        message: 'Unable to fetch events at this time. Please try again.'
      })
    })
    if (!data) return

    return {
      id: data.data._id,
      title: data.data.title,
      body: data.data.body
    }
  },
  computed: {
    htmlBody() {
      return this.htmlDecode(this.body)
    }
  },
  methods: {
    htmlDecode(input) {
      if (!process.client) return
      const e = document.createElement('div')
      e.innerHTML = input
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
  }
}
</script>
