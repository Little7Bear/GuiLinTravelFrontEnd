import http from '@/utils/http';

class Note {
  create(params) {
    return http.post('/notes', params)
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

}

export default new Note()