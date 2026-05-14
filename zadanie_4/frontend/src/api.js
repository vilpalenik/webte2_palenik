import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.PROD 
    ? 'https://node75.webte.fei.stuba.sk/zadanie_4/api'
    : '/api',
})

export const searchDestinations = (params) => api.post('/search', params)
export const getDestination = (id) => api.get(`/destinations/${id}`)
export const compareDestinations = (ids, month) => api.get('/compare', { params: { ids, month } })
export const getStats = () => api.get('/stats')
export const recordVisit = () => api.post('/visit')