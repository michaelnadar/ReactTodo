import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import PrivateRoute from './components/PrivateRoute';
import TodoList from './pages/TodoList';

function App() {
  

  return (
    <>
      <Router>
  <Routes>
        <Route path="/login"  element={<Login/>} />
        <Route path="/register"  element={<Register/>} />
       <Route path='/' element={ <TodoList />} />
       
  </Routes>
 </Router>
    </>
  )
}

export default App
