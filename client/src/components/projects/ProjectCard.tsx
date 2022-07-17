import React, { useContext } from 'react'
import { StoreContext } from '../../customHooks/store/useStore'

function ProjectCard(props: {project: any, getProjectId: Function}) {
    const { project, getProjectId } = props
    const { lang } = useContext(StoreContext)

  return (
    <div className="box has-background-black">
        <div className="card">
            <div className="card-image">
                <figure className='image is-5by3'>
                <img src={project.data.image} alt={`${project.data.project[lang].title} screenshot`} />
                </figure>
            </div>
            <div className="card-content has-background-dark has-text-left p-3">
                <a
                className='has-text-warning is-size-4'
                href={project.data.links.url}
                target="_blank"
                >
                    {project.data.project[lang].title}
                </a>
            </div>
            <div className="card-footer">
                <button onClick={() => getProjectId(project.id)} className="button">
                    <i className="material-icons-outlined">
                        info
                    </i>                    
                </button>
            </div>
        </div>
    </div>
)
}

export default ProjectCard