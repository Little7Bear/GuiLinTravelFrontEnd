import http from '@/utils/http';

class Note {
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

}

export default new Note()