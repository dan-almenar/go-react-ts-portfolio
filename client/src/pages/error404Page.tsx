import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Err } from '../../customTypes/customTypes'
import { StoreContext } from '../customHooks/store/useStore'

function Error404Page() {
    const { lang } = useContext(StoreContext)

    const err: Err = {
        code: 404,
        message: {
          english: 'Page not found',
          spanish: 'Página no encontrada',
        }
    }

    const navigate = useNavigate()
    const [redirect, setRedirect] = useState(10)
    useEffect(() => {
      if (redirect > 0) {
        setTimeout(() => {
          setRedirect(redirect -1)
      }, 1000)
      } else {
        navigate('/')
      }
    })

    return (
      <div className='hero is-fullheight is-info'>
        <div className="container has-text-centered py-5">
          <div className="hero-title title is-size-1 pt-5">
            Error
          </div>
        </div>
        <div className="container">
          <div className="hero-body">
              <h1 className="is-size-1 title px-5">{ err.code }</h1>
              <p className="subtitle is-size-3">{ err.message[lang] }</p>
          </div>
        </div>
        <div className="container">
          <p className="hero-body is-size-3">
            { lang === 'english' ? 'You will be redirected to the home page in ' : 'Serás redirigido a la página principal en ' }
            { redirect }
            { lang === 'english' ? ' seconds' : ' segundos' }
          </p>
        </div>
      </div>
    )
  }

export default Error404Page