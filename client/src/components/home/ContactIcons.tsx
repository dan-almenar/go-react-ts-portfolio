import React from 'react'

function ContactIcons(props: { brands: string[] }) {
    const { brands } = props
  return (
    <div className='is-flex px-5'>
        <div className="level has-text-light is-flex">
            { brands.map((brand: string) => <i key={brand} className={`level-item fa-brands fa-${brand} m-5`} />)}
        </div>
    </div>
  )
}

export default ContactIcons