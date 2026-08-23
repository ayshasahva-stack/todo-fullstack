import { useState } from 'react'
import { registerUser } from '../services/auth.api'


const Register = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })
  const [message, setMessage] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })


  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);

      setFormData({
        name: "",
        email: "",
        password: ""
      });

      setMessage(response.message);

    } catch (error) {
      setMessage(error.response?.data?.message || "Registration failed");
    }
  };


  return (
    <div>
      <h1>Reister</h1>
      {message && <p>{message}</p>}


      <form onSubmit={handleSubmit}>
        <input type="text"
          placeholder='enter  your name'
          name='name'
          value={formData.name}
          onChange={handleChange} />

        <input type="email"
          placeholder='enter  your email'
          name='email'
          value={formData.email}
          onChange={handleChange} />

        <input type="password"
          placeholder='enter  your password'
          name='password'
          value={formData.password}
          onChange={handleChange} />

        <button type='submit'>Register</button>

      </form>


    </div>
  )
}

export default Register
