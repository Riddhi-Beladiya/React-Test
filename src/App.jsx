import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router";
import Seeker from './Seeker'
import Header from './Header';

function App() {
  const [count, setCount] = useState(0)

  return (
  <>
   <BrowserRouter>
    <Routes>
      <Route path="/" element={<Seeker />} />
      <Route path ="/header" element={<Header />} /> 
    </Routes>
  
   </BrowserRouter>
    
  </>
  )
}

export default App
