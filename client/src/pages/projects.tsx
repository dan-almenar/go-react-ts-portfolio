import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Loading from '../components/layout/Loading'
import ProjectCard from '../components/projects/ProjectCard'
import { useGet } from '../customHooks/api/useAPI'
import { StoreContext } from '../customHooks/store/useStore'


function ProjectsPage() {
  const { lang } = useContext(StoreContext)

  // contenido estático de la página
  const [pageDescription, setPageDescription] = useState('')
  const [portfolioDescription, setPortfolioDescription] = useState('')
  useEffect(() => {
    if (lang === 'english') {
      setPageDescription(
        "This page showcases a few of my projects. "
        + "It is not ment to be an exhaustive list of my work, "
        + "but rather a selection of projects I have worked on."
      )
      setPortfolioDescription(
        "The first project I'd like to refer to is this very website. "
        + "Even thought it may seem like a regular profile page, "
        + "it was created as a Fullstack project that implements "
        + "a wide range of technologies."
      )
    } else {
      setPageDescription(
        "Esta página muestra algunos de mis proyectos. "
        + "No es una lista exhaustiva de mis trabajos, "
        + "sino una selección de proyectos en los que he trabajado."
      )
      setPortfolioDescription(
        "El primer proyecto al que quiero referirme es este mismo sitio web. "
        + "Aunque pueda parecer una página de perfil común, "
        + "fue creado como un proyecto Fullstack que implementa "
        + "una amplia gama de tecnologías."
      )
    }
  }, [lang])
  
  // funcionalidad relacionada a la data
  const projectsData = useGet("/api/projects")
  const splitProjects = () => {
    let projectsWithImages = []
    let projectsWithoutImages = []
    let portfolioApp: any = {}
    if (projectsData.data) {
      for (let project of projectsData.data) {
        if (project.id !== 'profile_app') {
          project.data.image != null && project.id != 'profile_app' ? projectsWithImages.push(project) : projectsWithoutImages.push(project)
        } else {
          portfolioApp = project
        }
      }
    }
    return { projectsWithImages, projectsWithoutImages, portfolioApp }
  }
  const { projectsWithImages, projectsWithoutImages, portfolioApp } = splitProjects()

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
        <p className="subtitle is-size-5 has-text-left m-5">
          { portfolioDescription }
        </p>
        <p className="subtitle is-size-5 has-text-left m-5">
          { lang === 'english' ? "To see more details about this website, click "
          : "Para ver más detalles sobre este sitio web, haga click "
          }
          <button onClick={() => getProjectId(portfolioApp.id)}
          className="btn-as-link subtitle is-size-5 has-text-warning">
            { lang === 'english' ? "here" : "aquí" }
          </button>
        </p>
      </div>
      <div>
        <p className="subtitle is-size-3 has-text-warning has-text-centered m-5">
          { lang === 'english' ? "Featured Projects" : "Proyectos Destacados" }
        </p>
        <div className="container columns m-5 is-multiline is-justify-content-center">
          { projectsWithImages.map((project, index) => {
            return (
              <div className="column container is-one-third" key={index}>
                <ProjectCard project={project} getProjectId={getProjectId} bgColor="grey-lighter" fontColor='warning' />
              </div>
            )
          })}
        </div>                
      </div>
      <div>
        <p className="subtitle is-size-3 has-text-warning has-text-centered m-5">
          { lang === 'english' ? "Other projects" : "Otros proyectos" }
        </p>
        <div className='container columns m-5 is-multiline is-justify-content-center'>
          { projectsWithoutImages.map((project, index) => {
            return (
              <div className="column container is-one-third" key={index}>
                <ProjectCard project={project} getProjectId={getProjectId} bgColor="none" fontColor='white' />
              </div>
            )
          })}
        </div>
      </div>
    </>
    }
    </div>    
    </>
  )
}

export default ProjectsPage