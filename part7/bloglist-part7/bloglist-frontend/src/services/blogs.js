import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject)
  return request.data
}

const addComment = async (id, newObject) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, newObject)
  return request.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

export default { getAll, create, update, setToken, remove, addComment }
