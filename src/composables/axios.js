import axios from 'axios'
// import { useUserStorew } from '@/stores/user'

const api = axios.create({
  baseURL: import.meta.env.VITE_API,
})

export const useAxios = () => {
  return { api }
}
