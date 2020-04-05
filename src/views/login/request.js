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

  findAll(params) {
    return http.get('/users/all', {
      params: params
    })
  }

  update(id, params) {
    return http.patch('/users/' + id, params)
  }

  updatePassword(id, params) {
    return http.patch('/users/update-password/' + id, params)
  }

  delete(id) {
    return http.delete('/users/' + id)
  }

}

export default new User()