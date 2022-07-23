import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from './customHooks/store/useStore'
import { AuthProvider } from './customHooks/auth/useAuth'
import Error404Page from './pages/error404Page'
import ErrorPage from './pages/errorPage'
import ProjectDetailPage from './pages/projectDetailPage'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProvider>
  <AuthProvider>
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path='/admin' element={<App />} />
          <Route path='/bio' element={<App />} />
          <Route path='/blog' element={<App />} />
          <Route path='/contact' element={<App />} />
          <Route path='/error' element={<ErrorPage />} />
          <Route path='/projects' element={<App/>}>
            <Route path=':id' element={<ProjectDetailPage/>} />
          </Route>
          <Route path="*" element={<Error404Page />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>
  </AuthProvider>
  </StoreProvider>
)
