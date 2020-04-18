import http from '@/utils/http';

class Scenic {
  create(params) {
    return http.post('/scenics', params)
  }

  findAll(params) {
    return http.get('/scenics/all', {
      params: params
    })
  }

  findByID(id) {
    return http.get(`/scenics/${id}`)
  }

  delete(id) {
    return http.delete(`/scenics/${id}`)
  }

  update(id, params) {
    return http.patch(`/scenics/${id}`, params)
  }
}

export default new Scenic()