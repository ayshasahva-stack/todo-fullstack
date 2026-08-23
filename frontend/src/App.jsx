import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AddTodo from "./pages/AddTodo";
import TodoDetails from "./pages/TodoDetails";
import EditTodo from "./pages/EditTodo";
const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/todo/:id" element={<TodoDetails />} />
        <Route path="/todo/:id/edit" element={<EditTodo />} />
      </Routes>

    </div>
  )
}

export default App
