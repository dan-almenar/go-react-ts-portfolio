import React, { useContext } from 'react'
import BioSummary from '../components/home/BioSummary'
import ContactIcons from '../components/home/ContactIcons'
import ProfileCard from '../components/home/ProfileCard'

const HomePage = (props: any) => {
  const rrss: string[] = [
    'github',
    'twitter',
    'youtube',
    'medium'
  ] 

  return (
    <section className='hero is-fullheight home-hero-section'>
      <div className="hero-header">
        <ProfileCard />
        <BioSummary />
        <ContactIcons brands={rrss} />
      </div>
    </section>
  )
}

export default HomePage