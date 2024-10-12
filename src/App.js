import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Pages/Signup'
import './App.css';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create'
import View from './Pages/ViewPost'
import {Post} from './contexts/PostContext';

function App() {
  return (
    <Post>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create" element={<Create/>} />
          <Route path="/view" element={<View/>} />
        </Routes>
      </Router>
    </Post>
  );
}

export default App;
