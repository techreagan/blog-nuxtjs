<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          @click="item.to === '' ? $auth.logout() : ''"
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <div v-if="$auth.loggedIn" class="mr-4">
        Hello Reagan
      </div>

      <!-- <v-btn color="red" class="ml-4">Logout</v-btn> -->

      <div>
        <v-switch v-model="$vuetify.theme.dark" hide-details inset></v-switch>
      </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer :fixed="fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/admin'
        },
        {
          icon: 'mdi-pencil',
          title: 'Posts',
          to: '/admin/posts'
        },
        {
          icon: 'mdi-home',
          title: 'Go Home',
          to: '/'
        },
        {
          icon: 'mdi-off',
          title: 'Log out',
          to: ''
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Tech Reagan Blog'
    }
  },
  mounted() {
    // console.log(this.$auth.loggedIn)
    // console.log(this.$auth)
  },
  head() {
    return {
      titleTemplate: '%s - Blog Admin',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'A worldclass software and network engineer, with alot of experience under my belt Welcome to my blog, this blog will be about software and network engineering.'
        }
      ]
    }
  }
}
</script>
