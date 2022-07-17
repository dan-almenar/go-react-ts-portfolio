import React,  { useContext } from 'react'
import { socialMedia } from '../../../customTypes/customTypes'
import { StoreContext } from '../../customHooks/store/useStore'

function ContactIcons(props: { brands: socialMedia[] }) {
    const { brands } = props
    const { lang } = useContext(StoreContext)
  return (
    <>
      <p className="subtitle has-text-grey">
        { lang === 'english' ?
        'You may also find me on the following platforms:'
        : 'Puedes encontrarme en las siguientes plataformas:'}
      </p>
      <div className='px-5'>      
          <div className="level has-text-grey is-flex">
              { brands.map((brand: socialMedia) => <i onClick={() => window.open(brand.link, "_blank")} key={brand.name} className={`level-item fa-brands fa-${brand.name.toLocaleLowerCase()} m-5`} />)}
          </div>
      </div>
    </>
  )
}

export default ContactIcons