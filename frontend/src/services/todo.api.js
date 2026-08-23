import api from './api'

export const getTodos=async()=>{
    const response=await api.get('/todo')
    return response.data
}