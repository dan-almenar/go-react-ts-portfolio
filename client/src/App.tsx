import './App.css'
import { useLocation, Outlet } from 'react-router-dom'
import HomePage from './pages/home'
import AdminPage from './pages/admin'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BioPage from './pages/bioPage'
import ProjectsPage from './pages/projects'
import ProjectDetailPage from './pages/projectDetailPage'
import ContactPage from './pages/contactPage'

function App(props: any) {
  const location = useLocation()

  return (
    <div className="App">
      <Navbar />
      {location.pathname === '/' && <HomePage />}
      {location.pathname === '/admin' && <AdminPage />}
      {location.pathname === '/bio' && <BioPage />}
      {location.pathname === '/contact' && <ContactPage />}
      {location.pathname === '/projects' && <ProjectsPage />}
      {location.pathname === 'project/:id' && <ProjectDetailPage />}
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
