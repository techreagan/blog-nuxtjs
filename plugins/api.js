import PostService from '../services/PostServices'

export default ({ $axios }, inject) => {
  const api = {
    posts: PostService($axios)
  }

  inject('api', api)
}
