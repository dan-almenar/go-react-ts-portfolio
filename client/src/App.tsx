import './App.css'
import { useLocation } from 'react-router-dom'
import HomePage from './pages/home'
import AdminPage from './pages/admin'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

function App(props: any) {
  const location = useLocation()

  return (
    <div className="App">
      <Navbar />
      {location.pathname === '/' && <HomePage />}
      {location.pathname === '/admin' && <AdminPage />}
      <Footer />
    </div>
  )
}

export default App
