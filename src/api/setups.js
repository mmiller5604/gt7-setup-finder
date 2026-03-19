import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 120000, // 120s — scraping + Claude generation can take 60-90s on first request
})

export async function fetchSetups(car, track, force = false) {
  const params = { car, track }
  if (force) params.force = 'true'
  const { data } = await api.get('/setups', { params })
  return data
}
