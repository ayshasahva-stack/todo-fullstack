import React, { useState } from 'react'
import { loginUser } from '../services/auth.api'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [message, setMessage] = useState(null)
  const navigate=useNavigate()

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
      localStorage.setItem("token", response.data.token)
      setFormData({
        email: "",
        password: ""
      })
      navigate('/view-todo')

      setMessage(response.message)
    } catch (error) {
      setMessage(error.response?.data?.message || 'login failed')

    }
  }


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Login
        </h1>

        {message && (
          <p className="text-center text-red-500 mb-4">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login
