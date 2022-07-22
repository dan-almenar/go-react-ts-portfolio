import React, { useContext } from 'react'
import BioSummary from '../components/home/BioSummary'
import ProfileCard from '../components/home/ProfileCard'
import { StoreContext } from '../customHooks/store/useStore'
import { Link } from 'react-router-dom'

const HomePage = (props: any) => {
  const { lang } = useContext(StoreContext)

  return (
    <>
    <section className='hero is-fullheight home-hero-section fade-in'>
      <div className="hero-header">
        <ProfileCard />
        <BioSummary />
        <div className="has-text-left m-5">
        <p className="subtitle is-size-4 has-text-white m-5">
          { lang === 'english' ? 'Go to my ' : 'Ir a mi ' }
          <Link className='has-text-warning' to={'/bio'}>Bio </Link>
        </p>
      </div>        
      </div>
    </section>
    </>
  )
}

export default HomePage