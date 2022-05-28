import React, { useContext } from 'react'
import { StoreContext } from '../../customHooks/store/useStore'

function BioSummary() {
    const { lang } = useContext(StoreContext)
  return (
    <div className="has-text-light has-text-left m-5 px-5 is-size-5">
        
    { lang === 'english' &&
    <>
    <p>
        I'm a self-taught software developer with a passion for learning new technologies and building things that help people.
    </p>
    <p>
        I'm currently working at <a className='has-text-warning' target="_blank" href="https://www.epam.com/">EPAM </a>
        as a Frontend Engineer involved in large scale projects for high profile international clients.
    </p>    
    </>
    }

    { lang === 'spanish' &&
    <>
    <p>
        Soy un desarrollador de software autodidacta con una pasión por aprender nuevas tecnologías y construir cosas que ayuden a la gente.
    </p>
    <p>
        Actualmente trabajo en <a className='has-text-warning' target="_blank" href="https://www.epam.com/">EPAM </a>
        como desarrollador Frontend en proyectos de gran escala para clientes internacionales de alto perfil.
    </p>
    </>
    }
    </div>
)
}

export default BioSummary