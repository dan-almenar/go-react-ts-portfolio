import React from 'react'
import { socialMedia } from '../../../customTypes/customTypes'

function ContactIcons(props: { brands: socialMedia[] }) {
    const { brands } = props
  return (
    <div className='px-5'>
        <div className="level has-text-white is-flex">
            { brands.map((brand: socialMedia) => <i onClick={() => window.open(brand.link, "_blank")} key={brand.name} className={`level-item fa-brands fa-${brand.name.toLocaleLowerCase()} m-5`} />)}
        </div>
    </div>
  )
}

export default ContactIcons