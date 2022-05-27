import React from 'react'

const Footer = () => {
  return (
    <div className='p-3 has-background-dark is-info has-text-centered has-text-light'>
      &copy; {new Date().getFullYear()} Dan Almenar Williams
    </div>
  )
}

export default Footer