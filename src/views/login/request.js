import http from '@/utils/http';

class User {
  register(params) {
    return http.post('/users', params)
  }

  login(params) {
    return http.post('/users/login', params)
  }


  findById(id) {
    return http.get('/users/' + id)
  }

  update(id, params) {
    return http.patch('/users/' + id, params)
  }

  updatePassword(id, params) {
    return http.patch('/users/update-password/' + id, params)
  }

}

export default new User()