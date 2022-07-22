import React,  { useContext } from 'react'
import { socialMedia } from '../../../customTypes/customTypes'
import { StoreContext } from '../../customHooks/store/useStore'

function ContactIcons(props: { brands: socialMedia[] }) {
    const { brands } = props
    const { lang } = useContext(StoreContext)
  return (
    <>
      <p className="subtitle has-text-black">
        { lang === 'english' ?
        'You may also find me on the following platforms:'
        : 'Puedes encontrarme en las siguientes plataformas:'}
      </p>
      <div className=''>
          <div className="level is-flex">
              { brands.map((brand: socialMedia) => <i onClick={() => window.open(brand.link, "_blank")} key={brand.name} className={`level-item fa-brands fa-${brand.name.toLocaleLowerCase()} fa-2xl m-5 clickable`} />)}
          </div>
      </div>
    </>
  )
}

export default ContactIcons