<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <v-btn class="mb-5" fab small to="/admin/posts" color="primary"
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
        <h1>Edit Post</h1>
        <ValidationObserver v-slot="{ handleSubmit, reset }">
          <form
            ref="form"
            @submit.prevent="handleSubmit(save)"
            @reset.prevent="reset"
          >
            <v-card-text class="pl-0">
              <ValidationProvider
                v-slot="{ errors }"
                name="Title"
                rules="required|min:3"
              >
                <v-text-field
                  v-model="title"
                  :error-messages="errors"
                  label="Title"
                ></v-text-field>
              </ValidationProvider>
              <client-only>
                <quill-editor
                  ref="editor"
                  v-model="body"
                  class="mt-5"
                  :options="editorOption"
                  @blur="onEditorBlur($event)"
                  @focus="onEditorFocus($event)"
                  @ready="onEditorReady($event)"
                />
              </client-only>
            </v-card-text>
            <v-card-actions class="pl-0">
              <v-btn color="blue darken-1 white--text" type="submit"
                >Edit</v-btn
              >
            </v-card-actions>
          </form>
        </ValidationObserver>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import dedent from 'dedent'
import hljs from 'highlight.js'
import debounce from 'lodash/debounce'

// highlight.js style
import 'highlight.js/styles/tomorrow.css'

export default {
  layout: 'admin',
  data() {
    return {
      title: '',
      body: '',
      id: null,
      editorOption: {
        // Some Quill options...
        theme: 'snow',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            [{ font: [] }],
            [{ color: [] }, { background: [] }],
            [{ align: [] }],
            ['clean'],
            ['link', 'image', 'video']
          ],
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value
          }
        }
      }
    }
  },
  // async asyncData({ $axios, error, $api, params }) {
  //   const { data } = await $api.posts.getPost(params.id).catch((e) => {
  //     error({
  //       status: 503,
  //       message: 'Unable to fetch events at this time. Please try again.'
  //     })
  //   })
  //   if (!data) return

  //   return {
  //     id: data.data._id,
  //     title: data.data.title,
  //     body: dedent`${this.htmlDecode(data.data.body)}`
  //   }
  // },
  mounted() {
    if (!this.$route.params.id) this.$router.push('/admin/posts')
    this.getPost()
    // eslint-disable-next-line
    console.log('App inited, the Quill instance object is:', this.$refs.editor)
  },
  methods: {
    async save() {
      if (this.body.length <= 3) {
        return false
      }
      await this.$api.posts
        .updatePost(this.id, { title: this.title, body: `${this.body}` })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
          this.$refs.form.setErrors({
            Title: ['Title is invalid'],
            Body: ['Body is invalid']
          })
        })
        .finally(() => {
          this.$router.push('/admin/posts')
        })
      // console.log(this.body)
      // console.log('hello world')
    },
    async getPost() {
      const { data } = await this.$api.posts
        .getPost(this.$route.params.id)
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
          this.$router.push('/admin/posts')
        })
      if (!data) return

      this.id = data.data._id
      this.title = data.data.title
      // console.log(this.htmlDecode(data.data.body))
      this.body = dedent`${this.htmlDecode(data.data.body)}`
    },
    htmlDecode(input) {
      const e = document.createElement('div')
      e.innerHTML = input
      return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue
    },
    onEditorChange: debounce(function (value) {
      this.body = value.html
      // eslint-disable-next-line
      console.log(this.body)
    }, 466),
    onEditorBlur(editor) {
      // eslint-disable-next-line
      console.log('editor blur!', editor)
    },
    onEditorFocus(editor) {
      // eslint-disable-next-line
      console.log('editor focus!', editor)
    },
    onEditorReady(editor) {
      // eslint-disable-next-line
      console.log('editor ready!', editor)
    }
    // onEditorChange({ quill, html, text }) {
    //   console.log('editor change!', quill, html, text)
    //   this.content = html
    // }
  }
}
</script>

<style></style>
