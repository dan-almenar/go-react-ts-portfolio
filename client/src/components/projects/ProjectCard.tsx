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
            <div className="card-content has-background-dark is-flex is-justify-content-space-between"> {/*has-text-left p-6*/}
                <a
                className='has-text-warning is-size-6'
                href={project.data.links.url}
                target="_blank"
                >
                    {project.data.project[lang].title}
                </a>
                <i onClick={() => getProjectId(project.id)} className="material-icons-outlined has-text-warning btn">
                    info
                </i>
            </div>
            <div className="card-footer">

            </div>
        </div>
    </div>
)
}

export default ProjectCard