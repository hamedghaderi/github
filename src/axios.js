import axios from 'axios'

export const Axios = axios.create({
  baseURL: import.meta.env.VITE_GITHUB_API,
})
