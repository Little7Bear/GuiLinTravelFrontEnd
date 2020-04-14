import http from '@/utils/http';

class Note {
  create(params) {
    return http.post('/notes', params)
  }

  findAll(params) {
    return http.get('/notes/all', {
      params: params
    })
  }

  findByUserID(userID) {
    return http.get(`/notes/user/${userID}`)
  }

  findByID(articleID) {
    return http.get(`/notes`, {
      params: {
        articleID,
      }
    })
  }

  delete(articleID) {
    return http.delete(`/notes/${articleID}`)
  }

  update(id, params) {
    return http.patch('/notes/' + id, params)
  }

  addComment(id, params) {
    return http.patch('/notes/comments/' + id, params)
  }

  findComments(id) {
    return http.get('/notes/comments/' + id)
  }

  deleteComment(id, params) {
    return http.delete(`/notes/comments/${id}`)
  }

}

export default new Note()