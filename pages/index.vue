<template>
  <!-- <v-layout column justify-center align-center> -->
  <!-- <v-flex> -->
  <div>
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
      <!-- <div v-html="posts[0].body"></div> -->
    </div>
    <div class="mt-15">
      <div v-if="loading">
        <v-skeleton-loader
          v-for="i in 7"
          :key="i"
          type="article"
          :loading="loading"
          class="mb-7"
        ></v-skeleton-loader>
      </div>
      <article v-else>
        <v-card
          v-for="post in posts.data"
          :key="post._id"
          class="mb-7"
          :to="`/posts/${post._id}`"
        >
          <v-card-title class="headline">
            {{ post.title }}
          </v-card-title>
          <v-card-text>
            <!-- eslint-disable -->
            <div
              v-html="$htmlDecode(truncateText(post.body.trim(), 100))"
            ></div>
            <div class="text-xs-right">
              <em
                ><small
                  >&mdash; {{ post.user.firstName }}
                  {{ post.user.lastName }}</small
                ></em
              >
            </div>
          </v-card-text>
        </v-card>
      </article>
    </div>
    <div>
      <v-pagination
        :disabled="loading"
        v-model="page"
        :length="posts.totalPage"
      ></v-pagination>
    </div>
  </div>
  <!-- </v-flex> -->
  <!-- </v-layout> -->
</template>

<script>
export default {
  auth: false,
  data() {
    return {
      page: 1,
      posts: [],
      loading: true
    }
  },
  watch: {
    page(value) {
      this.getPosts(value)
    }
  },
  mounted() {
    this.getPosts()
  },

  methods: {
    async getPosts(page) {
      this.loading = true
      const { data } = await this.$api.posts
        .getPosts({ limit: 7, page })
        .catch((err) => {
          this.loading = false
          // eslint-disable-next-line
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })

      if (!data) return

      this.posts = data
    },
    truncateText(string = '', num) {
      if (string.length <= num) {
        return string
      }
      return string.slice(0, num) + '....'
    },
    htmlDecode(input) {
      const e = document.createElement('div')
      e.innerHTML = input
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    }
  }
}
</script>
