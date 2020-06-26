export default (axios) => ({
  getPosts() {
    return axios.get('posts')
  },
  getPost(id) {
    return axios.get(`posts/${id}`)
  },
  updatePost(id, data) {
    return axios.put(`posts/${id}`, data)
  },
  createPost(data) {
    return axios.post('posts', data)
  },
  deletePost(id) {
    return axios.delete(`posts/${id}`)
  }
})
