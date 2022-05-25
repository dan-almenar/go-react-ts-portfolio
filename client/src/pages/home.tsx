import React, { useContext } from 'react'
import ProfileCard from '../components/home/ProfileCard'

const HomePage = (props: any) => {
  return (
    <section className='hero is-fullheight home-hero-section'>
      <ProfileCard />
    </section>
  )
}

export default HomePage