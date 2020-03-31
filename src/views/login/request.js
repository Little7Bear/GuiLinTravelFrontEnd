import http from '@/utils/http';

class User {
  register(params) {
    return http.post('/users', params)
  }

  login(params) {
    return http.post('/users/login', params)
  }

}

export default new User()