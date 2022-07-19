import React, { useContext, useEffect, useState } from 'react'
import { StoreContext } from '../../customHooks/store/useStore'

function PortfolioAppDetails(props: {portfolio: any}) {
    const { lang } = useContext(StoreContext)
    const { portfolio } = props
    console.log(portfolio.project.data)

    const [imageAlt, setImageAlt] = useState('')
    useEffect(() => {
        lang === 'english' ? setImageAlt("Portfolio Project Architecture") : setImageAlt("Arquitectura del Proyecto de Portafolio")
    }, [lang])

    const [isModalOpen, setIsModalOpen] = useState(false)

    return (
        <>
            <div className='columns container is-half m-5 fade-in'>
                <div className="column container has-text-centered m-5">
                    <h1 className="title has-text-warning">
                        { lang === 'english' ? "Dan Almenar's Fullstack Portfolio App" : "Portafolio App Fullstack de Dan Almenar" }
                    </h1>
                    <figure onClick={() => setIsModalOpen(!isModalOpen)} className='container img-sixty'>
                        <img src={portfolio.project.data.image} alt={imageAlt} />
                    <p className="is-size-7 is-itallic is-warning has-text-centered">
                        { lang === 'english' ? "Click to enlarge" : "Haga click para ampliar" }
                    </p>                
                    </figure>
                </div>
                <div className="column container has-text-left m-5">
                    <p className="subtitle is-size-5">
                        { lang === 'english' ? "This is a fullstack portfolio app that I built using the following technologies:" : "Esta es una aplicación de portafolio fullstack que he construido usando las siguientes tecnologías:" }
                    </p>
                    <ul className="is-size-5">
                        {portfolio.project.data.langsAndTools.map((tool: string) => {
                            return  <li className='pl-5' key={tool}>
                                        <i className="material-icons pr-3">check</i>
                                        {tool}
                                    </li>
                        })} 
                    </ul>
                    <br />
                    <p className="subtitle is-size-5">
                        { lang === 'english' ? "The project's code is available on " : "El código del proyecto está disponible en " }
                        <a href={portfolio.project.data.Links.url} target="_blank" className="has-text-warning">
                            GitHub
                        </a>
                    </p>
                </div>
                {/* modal */}
                <div className={`container modal ${isModalOpen && 'is-active'}`}>
                    <div onClick={() => setIsModalOpen(!isModalOpen)} className="modal-background"></div>
                    <div className="modal-content">
                        <figure className="image">
                            <img src={portfolio.project.data.image} alt={imageAlt} />
                        </figure>
                    </div>
                </div>
            </div>
            <div className="container has-text-left m-5">
                { portfolio.project.data.architecture[lang].map((paragraph: any, index: number) => {
                    return (
                        <>
                        <p className='subtitle is-size-4 m-5' key={index}>
                            {paragraph}
                        </p>
                        </>
                    )}
                )}
            </div>            
        </>
  )
}

export default PortfolioAppDetails