import React, { useContext } from 'react'
import { StoreContext } from '../../customHooks/store/useStore'

function ProjectCard(props: {project: any, getProjectId: Function, bgColor: string, fontColor: string}) {
    const { project, getProjectId, bgColor, fontColor } = props
    const { lang } = useContext(StoreContext)

  return (
    <div className={bgColor !='none' ? `box has-background-${bgColor}` : 'white-border'}>
        <div className="card">
            {project.data.image &&
                <div className="card-image">
                <figure className='image is-5by3'>
                <img src={project.data.image} alt={`${project.data.project[lang].title} screenshot`} />
                </figure>
            </div>            
            }
            <div className={`card-content has-background-dark ${project.data.image ? 'is-flex is-justify-content-space-between' : 'has-text-centered'} `}>
                <a
                className={`has-text-${fontColor} is-size-6`}
                href={project.data.links.url}
                target="_blank"
                >
                    {project.data.project[lang].title}
                </a>
                { project.data.image &&
                    <i onClick={() => getProjectId(project.id)} className={`material-icons-outlined has-text-${fontColor} btn`}>
                        info
                    </i>                
                }
            </div>
        </div>
    </div>
)
}

export default ProjectCard