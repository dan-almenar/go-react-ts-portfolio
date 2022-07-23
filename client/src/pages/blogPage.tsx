import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../customHooks/store/useStore'

function BlogPage() {
    const { lang } = useContext(StoreContext)

    const [onDevelopment, setOnDevelopment] = useState('')
    useEffect(() => {
        const message = {
            english: "The blog is still on development and will be available soon.",
            spanish: "El blog está aún en desarrollo y estará disponible pronto."
        }
        setOnDevelopment(message[lang])
    }, [lang])
    
  return (
    <div className='hero is-fullheight is-link fade-in'>
        <div className="hero-header m-5">
            <div className="container m-5">
                <h1 className="title m-5">
                    Blog
                </h1>
            </div>
        </div>
        <div className="hero-body">
            <p className="container subtitle">
                { onDevelopment }
            </p>
        </div>
    </div>
  )
}

export default BlogPage