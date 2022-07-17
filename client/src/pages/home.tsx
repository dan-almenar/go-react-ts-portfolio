import React, { useContext } from 'react'
import BioSummary from '../components/home/BioSummary'
import ContactIcons from '../components/home/ContactIcons'
import ProfileCard from '../components/home/ProfileCard'
import { StoreContext } from '../customHooks/store/useStore'
import { socialMedia } from '../../customTypes/customTypes'
import { Link } from 'react-router-dom'

const HomePage = (props: any) => {
  const { lang } = useContext(StoreContext)
  const rrss: socialMedia[] = [
    {
      name: 'Github',
      link: 'https://github.com/dan-almenar'
    },
    {
      name: 'Twitter',
      link: 'https://twitter.com/schongesagt' // to be created
    },
    {
      name: 'Youtube',
      link: 'https://www.youtube.com/c/DanAlmenar'
    },
    {
      name: 'Medium',
      link: 'https://medium.com/@danielalmenar'
    }
  ]

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
    <section className="section has-background-grey">
      <div className="box has-background-warning">
        <ContactIcons brands={rrss} />
      </div>
    </section>
    </>
  )
}

export default HomePage