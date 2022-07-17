import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { StoreContext } from '../customHooks/store/useStore'

function ProjectDetailPage() {
    const { lang } = useContext(StoreContext)
    const location = useLocation()
    const project: any = location.state as any
  return (
    <div className='hero is-fullheight is-dark'>
        <div className="columns container m-5 fade-in">
            <div className="column container has-text-left m-5">
                <h1 className="title">
                    {project.project.data.project[lang].title}
                </h1>
                {project.project.data.image &&
                    <figure className='image is-5by3'>
                        <img src={project.project.data.image} alt={`${project.project.data.project[lang].title} screenshot`} />
                    </figure>
                }
            </div>            
            <div className="column container has-text-left m-5">
                <br /><br />
                <p className="is-size-5">
                    {project.project.data.project[lang].description}
                </p>
                <br />
                <p className="is-size-6">
                    { lang === 'english' ? 'Technologies used:' : 'Tecnologías usadas:' }
                </p>
                <ul className="is-size-6">
                    {project.project.data.langsAndTools.map((tool: string) => {
                        return <li className='pl-5' key={tool}>{tool}</li>
                    })}
                </ul>
                <br />
                <p className="is-size-6">
                    { lang === 'english' ? 'Link: ' : 'Enlace: ' }
                    <a className='is-link' target="_blank" href={project.project.data.links.url}>
                        {project.project.data.links.platform}
                    </a>
                </p>
            </div>
        </div>
    </div>
  )
}

export default ProjectDetailPage