import { useState } from 'react'
import './App.css'
import { Link } from 'react-router-dom'
import HomePage from './pages/home'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App(props: any) {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Navbar />
      <HomePage />
      <Link to={'/admin'} >To Admin</Link>
      <Footer />
    </div>
  )
}

export default App
