import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/layout/Loading'
import ProjectCard from '../components/projects/ProjectCard'
import { useGet } from '../customHooks/api/useAPI'
import { StoreContext } from '../customHooks/store/useStore'


function ProjectsPage() {
  const { lang } = useContext(StoreContext)

  // contenido estático de la página
  const [pageDescription, setPageDescription] = useState('')
  useEffect(() => {
    if (lang === 'english') {
      setPageDescription(
        "This page showcases a few of my projects. "
        + "It is not ment to be an exhaustive list of my work, "
        + "but rather a selection of projects I have worked on."
      )
    } else {
      setPageDescription(
        "Esta página muestra algunos de mis proyectos. "
        + "No es una lista exhaustiva de mis trabajos, "
        + "sino una selección de proyectos en los que he trabajado."
      )
    }
  }, [lang])
  
  // funcionalidad relacionada a la data
  const projectsData = useGet("/api/projects")
  const splitProjects = () => {
    let projectsWithImages = []
    let projectsWithoutImages = []
    if (projectsData.data) {
      for (let project of projectsData.data) {
        project.data.image != null ? projectsWithImages.push(project) : projectsWithoutImages.push(project)
      }
    }
    return { projectsWithImages, projectsWithoutImages }
  }
  const { projectsWithImages, projectsWithoutImages } = splitProjects()

  // manejo de errores al cargar la data
  const navigate = useNavigate()
  projectsData.error != null && navigate(
    '/error',
    {state:
      {
        code: projectsData.error.code,
        message: {
          english: "Something weng wrong...",
          spanish: "Algo salió mal..."
        }
      }
    }
  )

  // redireccionamiento a la página del proyecto seleccionado
  const [selectedProject, setSelectedProject] = useState('')
  const getProject = (id: string): any => {
    return projectsData.data.find((project: any) => project.id === id)
  }
  const getProjectId = (id: string) => {
    setSelectedProject(id)
  }
  useEffect(() => {
    if (selectedProject != '') {
      const project: any = getProject(selectedProject)
      navigate(`/projects/${selectedProject}`, {state: {project}})
    }
  }, [selectedProject])

  return (
    <>
    <div className='hero is-fullheight is-dark'>    
    {/* handle loading */}
    { projectsData.loading &&
      <Loading />
    }
    
    {/* handle data */}
    { projectsData.data &&
    <>
      <div className="container m-5 has-text-centered fade-in">
        <h1 className="title is-size-2 has-text-warning m-5"> 
          { lang === 'english' ? 'Projects' : 'Proyectos' }
        </h1>
        <p className="subtitle is-size-5 has-text-left m-5">
          { pageDescription }
        </p>
      </div>
      <div className="container columns m-5 is-multiline is-justify-content-center">
        { projectsWithImages.map((project, index) => {
          return (
            <div className="column container is-one-third" key={index}>
              <ProjectCard project={project} getProjectId={getProjectId} />
            </div>
          )
        })}
      </div>
      {/* { selectedProject != '' && isModalOpen && <ProjectDetailsModal project={projectsData.data.find((project: any) => project.id === selectedProject)} toggleModal={toggleModal} /> }       */}
    </>
    }
    </div>    
    </>
  )
}

export default ProjectsPage