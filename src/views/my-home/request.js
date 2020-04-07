import http from '@/utils/http';

class Note {
  create(params) {
    return http.post('/notes', params)
  }

  findByUserID(userID) {
    return http.get(`/notes/user/${userID}`)
  }
}

export default new Note()