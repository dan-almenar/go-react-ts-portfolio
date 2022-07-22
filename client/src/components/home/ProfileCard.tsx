import React, { useContext } from 'react'
import { StoreContext } from '../../customHooks/store/useStore'
import { useNavigate } from 'react-router-dom'

function ProfileCard() {
  const { lang } = useContext(StoreContext)
  const navigate = useNavigate()

  const handleClick = () => {
    navigate('/admin')
  }

  return (
    <div className='m-5'>
      <figure className='image is-128x128 m-5'>
        <img onClick={handleClick} className='' src=".//assets/dan_profile.png" alt="profile pic" />
      </figure>
      <p className="is-size-3 has-text-left has-text-grey-light mx-5">
        { lang === 'english' ? 'Hello, I am...' : 'Hola, soy...' }
      </p>
      <h1 className="title has-text-left has-text-white mx-5">
        Dan Almenar Williams
      </h1>
      <h2 className="subtitle has-text-left has-text-warning is-size-4 mx-5">
        Full Stack Web Developer
      </h2>
    </div>
  )
}

export default ProfileCard