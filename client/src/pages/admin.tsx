import React from 'react'
import Footer from '../components/layout/Footer'
import Navbar from '../components/layout/Navbar'

function AdminPage() {
  return (
    <div className='has-background-info'>
      <Navbar />
      <div className='hero is-fullheight'>
          <div className="m-5">
              <div className="has-text-centered">
                  <h1 className='title'>Admin Page</h1>
              </div>
          </div>
      </div>
      <Footer />
    </div>
  )
}
export default AdminPage