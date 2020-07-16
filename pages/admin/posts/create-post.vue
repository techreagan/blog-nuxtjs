<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12" md="8" lg="8" xl="8">
        <v-btn class="mb-5" fab small to="/admin/posts" color="primary"
          ><v-icon>mdi-chevron-left</v-icon></v-btn
        >
        <h1>Create Post</h1>
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
                rules="required|min:6"
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
              <v-btn
                :loading="loading"
                color="blue darken-1 white--text"
                type="submit"
                >Create</v-btn
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
// import 'highlight.js/styles/atom-one-dark.css'

export default {
  layout: 'admin',
  data() {
    return {
      title: '',
      body: dedent`<p>Example of a very good blog post</p>`,
      loading: false,
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
  mounted() {
    // eslint-disable-next-line
    console.log('App inited, the Quill instance object is:', this.$refs.editor)
  },
  methods: {
    async save() {
      if (this.body.length <= 3) {
        return false
      }
      this.loading = true
      await this.$api.posts
        .createPost({ title: this.title, body: this.body })
        .catch((err) => {
          // eslint-disable-next-line
          console.log(err)
          this.$refs.form.setErrors({
            Title: ['Title is invalid'],
            Body: ['Body is invalid']
          })
        })
        .finally(() => {
          this.loading = false
          this.$router.push('/admin/posts')
        })
    },
    onEditorChange: debounce(function (value) {
      this.body = value.html
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
  }
}
</script>

<style></style>
