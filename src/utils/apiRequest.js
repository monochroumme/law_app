import axios from 'axios'

function headers () {
  return {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}

function headersWithoutAuth () {
  return {
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    }
  }
}

function headersFormData () {
  return {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  }
}

const request = (callback) => {
  return new Promise((resolve, reject) => {
    callback
      .then(data => resolve(data))
      .catch(e => reject(handleError(e)))
  })
}

const handleError = (e) => {
  // console.error(e)
  return e
}

export default class apiRequest {
  static get (path) {
    return request(axios.get(path, headers()))
  }

  static getWithParams (path, params) {
    return request(axios.get(path, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      params
    }))
  }

  static post (path, data) {
    return request(axios.post(path, data, headers()))
  }

  static put (path, data) {
    return request(axios.put(path, data, headers()))
  }

  static delete (path) {
    return request(axios.delete(path, headers()))
  }

  static postFormData (path, data) {
    return request(axios.post(path, data, headersFormData()))
  }

  static postWithoutAuth (path, data) {
    return request(axios.post(path, data, headersWithoutAuth()))
  }

  static getWithoutAuth (path) {
    return request(axios.get(path, headersWithoutAuth()))
  }
}
