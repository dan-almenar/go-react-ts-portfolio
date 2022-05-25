import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPage from './pages/admin'
import ProjectsPage from './pages/projects'
import { StoreProvider } from './customHooks/store/useStore'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProvider>
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/projects' element={<ProjectsPage/>}>
          <Route path='/projects/:id' element={<ProjectsPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
  </StoreProvider>
)
