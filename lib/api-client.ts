import axios from 'axios'

const RAW_API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL || 'http://192.168.1.212:5000').trim()

function toAbsoluteBaseUrl(value: string) {
  const withProtocol = /^https?:\/\//i.test(value) ? value : `http://${value}`
  return withProtocol.replace(/\/$/, '')
}

const API_BASE_URL = toAbsoluteBaseUrl(RAW_API_BASE_URL)

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }

  return config
})
