import React, { useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { StoreContext } from '../customHooks/store/useStore'

function ProjectDetailPage() {
    const { lang } = useContext(StoreContext)
    const location = useLocation()
    const project: any = location.state as any
    project && console.log("project", project)
  return (
    <div className='hero is-fullheight is-dark fade-in'>
        <h1 className="container title m-5 is-warning">
            {project.project.data.project[lang].title}
        </h1>
    </div>
  )
}

export default ProjectDetailPage