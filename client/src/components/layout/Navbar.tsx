import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../../customHooks/store/useStore'

const Navbar = () => {
  const [isActive, setIsActive] = useState(false)
  const { lang, switchLang } = useContext(StoreContext)
  
  return (
    <div className="navbar is-dark" role="navigation" aria-label="main navigation" >
        <div className="navbar-brand  has-text-weight-bold">
          <div className="navbar-item">
            <span className='ml-3 has-text-danger is-size-5'>D</span>
            <span className='has-text-white is-size-5'>A</span>
            <span className='has-text-info is-size-5'>W</span>
          </div>
          <div className="navbar-item">
            <a onClick={ switchLang } type='button' className='navbar-item has-text-white'>
              <i className='material-icons-outlined pr-3'>translate</i>
              { lang === 'english' ? 'Español' : 'English' }              
            </a>
          </div>
          <a role="button" onClick={() => setIsActive(!isActive)} className={`navbar-burger ${isActive ? 'is-active' : ''}`} aria-label="menu" aria-expanded="false" data-target="navbarMenu">
            <span></span>
            <span></span>
            <span></span>
          </a>
        </div>
        <div className={`navbar-menu ${isActive ? 'is-active has-background-grey-light' : ''}`} id='navbarMenu'>
          <div className="navbar-start"></div>
          <div className="navbar-end has-text-right mx-5 is-justify-content-center">
            <Link to={'/'} className='navbar-item' >
            { lang === 'english' ? 'Home' : 'Inicio' }
              <i className='material-icons-outlined pl-3'>home</i>
            </Link>
            <Link to={'/bio'} className='navbar-item'>
            Bio
              <i className='material-icons-outlined pl-3'>fingerprint</i>
            </Link>
            <Link to={'/projects'} className='navbar-item'>
            { lang === 'english' ? 'Projects' : 'Proyectos' }
              <i className='material-icons-outlined pl-3'>code</i>
            </Link>                                                
            <Link to={'/blog'} className='navbar-item'>
            Blog
              <i className='material-icons-outlined pl-3'>article</i>
            </Link>
            <Link to={'/contact'} className='navbar-item'>
            { lang === 'english' ? 'Contact' : 'Contacto' }
              <i className='material-icons-outlined pl-3'>email</i>
            </Link>
          </div>
        </div>
    </div>
  )
}

export default Navbar 