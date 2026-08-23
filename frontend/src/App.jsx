import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Register from './pages/Register'
import Login from './pages/Login'
import AddTodo from "./pages/AddTodo";
import EditTodo from "./pages/EditTodo";
import TodoList from './pages/TodoList';
import Navbar from './components/Navbar';
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/add-todo" element={<AddTodo />} />
        <Route path="/view-todo" element={<TodoList />} />
        <Route path="/todo/:id/edit" element={<EditTodo />} />
      </Routes>

    </div>
  )
}

export default App
