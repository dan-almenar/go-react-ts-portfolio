import React, { useContext } from 'react'
import BioSummary from '../components/home/BioSummary'
import ContactIcons from '../components/home/ContactIcons'
import ProfileCard from '../components/home/ProfileCard'
import { StoreContext } from '../customHooks/store/useStore'
import { socialMedia } from '../../customTypes/customTypes'

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
    <section className='hero is-fullheight home-hero-section'>
      <div className="hero-header">
        <ProfileCard />
        <BioSummary />
      </div>
    </section>
    <section className="section has-background-grey">
      <div className="box has-background-black">
        <p className="subtitle has-text-white">
          { lang === 'english' ?
          'You may also find me on the following platforms:'
          : 'Puedes encontrarme en las siguientes plataformas:'}
        </p>
        <ContactIcons brands={rrss} />
      </div>
    </section>
    </>
  )
}

export default HomePage