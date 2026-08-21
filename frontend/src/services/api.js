import axios from 'axios'

const api=axios.create({
    baseURL:"http://localhost:3000/api/todo"
})

export const getTodos=async()=>{
    const response=await api.get('/')
    return response.data
}