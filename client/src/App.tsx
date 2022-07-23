import './App.css'
import { useLocation, Outlet } from 'react-router-dom'
import HomePage from './pages/home'
import AdminPage from './pages/admin'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import BioPage from './pages/bioPage'
import ProjectsPage from './pages/projects'
import ContactPage from './pages/contactPage'
import BlogPage from './pages/blogPage'

function App(props: any) {
  const location = useLocation()

  return (
    <div className="App">
      <Navbar />
      {location.pathname === '/' && <HomePage />}
      {location.pathname === '/admin' && <AdminPage />}
      {location.pathname === '/bio' && <BioPage />}
      {location.pathname === '/blog' && <BlogPage />}
      {location.pathname === '/contact' && <ContactPage />}
      {location.pathname === '/projects' && <ProjectsPage />}
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
