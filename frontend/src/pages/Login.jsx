import React, { useState } from 'react'
import { loginUser } from '../services/auth.api'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData, [name]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser(formData)
      localStorage.setItem("token",response.data.token)
      setFormData({
        email: "",
        password: ""
      })
      console.log(response)

      setMessage(response.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'login failed')

    }
  }


  return (
    <div>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email"
          placeholder='enter your name'
          name='email'
          value={formData.email}
          onChange={handleChange} /> <br /><br />
        <input type="password"
          placeholder='enter your password'
          name='password'
          value={formData.password}
          onChange={handleChange} /> <br /><br />

        <button>Login</button>
      </form>

    </div>
  )
}

export default Login
