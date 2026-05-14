import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
})

export const searchDestinations = (params) => api.post('/search', params)
export const getDestination = (id) => api.get(`/destinations/${id}`)
export const compareDestinations = (ids, month) => api.get('/compare', { params: { ids, month } })
export const getStats = () => api.get('/stats')
export const recordVisit = () => api.post('/visit')