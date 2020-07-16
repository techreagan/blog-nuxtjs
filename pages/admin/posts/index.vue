<template>
  <div>
    <h1 class="mb-6">Posts</h1>
    <v-btn
      color="primary"
      to="/admin/posts/create-post"
      fab
      absolute
      bottom
      right
      ><v-icon>mdi-plus</v-icon></v-btn
    >
    <client-only>
      <v-data-table
        :headers="headers"
        :items="posts"
        item-key="_id"
        class="elevation-1"
        :search="search"
        :loading="loading"
      >
        <template v-slot:top>
          <v-text-field
            v-model="search"
            label="Search"
            class="mx-4"
          ></v-text-field>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editPost(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteBtn(item)">
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </client-only>
    <!-- <v-spacer></v-spacer> -->
    <v-dialog v-model="deleteDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Permanently delete this contact?</span>
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-card class="card" tile flat>
              <!-- <v-row no-gutters> -->
              <!-- <p><strong>title: </strong>{{ postToDelete.title }}</p> -->

              <!-- </v-row> -->
            </v-card>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteDialog = !deleteDialog"
            >Cancel</v-btn
          >

          <v-btn
            :loading="deleteBtnLoading"
            color="blue darken-1 white--text"
            @click="deletePost"
            >Delete Forever</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- <div class="text-center ma-2"> -->
    <v-snackbar v-model="snackbar">
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn dark text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  layout: 'admin',

  data() {
    return {
      search: '',
      loading: false,
      posts: [],
      // posts: [
      //   {
      //     id: 1,
      //     title: 'Hello World',
      //     createdAt: new Date().toDateString(),
      //     updatedAt: new Date().toDateString()
      //   },
      //   {
      //     id: 2,
      //     title: 'Javascript',
      //     createdAt: new Date().toDateString(),
      //     updatedAt: new Date().toDateString()
      //   },
      //   {
      //     id: 3,
      //     title: 'Hello World1',
      //     createdAt: new Date().toDateString(),
      //     updatedAt: new Date().toDateString()
      //   }
      // ],
      postToDelete: null,
      deleteDialog: false,
      deleteBtnLoading: false,
      snackbar: false,
      message: ''
    }
  },
  computed: {
    headers() {
      return [
        {
          text: 'Title',
          align: 'start',
          value: 'title'
        },
        {
          text: 'Date Created',
          align: 'Start',
          value: 'createdAt'
        },
        {
          text: 'Date Modified',
          align: 'Start',
          value: 'updatedAt'
        },

        { text: 'Actions', value: 'actions', sortable: false }
      ]
    }
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    async getPosts() {
      this.loading = true
      const { data } = await this.$api.posts
        .getPosts()
        .catch((err) => {
          this.loading = false
          // eslint-disable-next-line
          console.log(err)
        })
        .finally(() => {
          this.loading = false
        })

      if (!data) return

      this.posts = data.data
    },
    editPost(data) {
      this.$router.push(`/admin/posts/edit-post/${data.id}`)
    },
    deleteBtn(data) {
      this.postToDelete = data
      this.deleteDialog = true
    },
    deletePost(data) {
      // console.log(data)

      this.deleteBtnLoading = true
      this.posts = this.posts.filter((post) => this.postToDelete.id !== post.id)
      this.message = 'Post deleted successfully'
      this.snackbar = true
      this.deleteBtnLoading = false
      this.deleteDialog = false
    }
  }
}
</script>
