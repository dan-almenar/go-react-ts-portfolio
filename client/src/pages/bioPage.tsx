import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/layout/Loading'
import { useGet } from '../customHooks/api/useAPI'
import { StoreContext } from '../customHooks/store/useStore'
import { getStorageFile } from '../utils/firebaseUtils/storageUtils'

function BioPage() {
  const { lang } = useContext(StoreContext)
  const langCapitalized = lang.charAt(0).toUpperCase() + lang.slice(1)
  const bioData = useGet("/api/bio")
  const resume = `/Dan Almenar Williams - CV - ${lang}.pdf`

  const navigate = useNavigate()
  bioData.error != null && navigate(
    '/error',
    {state:
      {
        code: bioData.error.code,
        message: {
          english: "Something weng wrong...",
          spanish: "Algo salió mal..."
        }
      }
    }
  )

  return (
    <>
    <div className="hero is-fullheight is-dark">
    {
      bioData.loading &&
      <Loading />
    }

    {
      bioData.data &&
      <>
      <div className="columns container m-5 fade-in">
        <div className='column has-text-left m-5'>
          <h1 className="title is-size-3 has-text-warning">
            Dan Almenar Williams
          </h1>
          <h2 className='subtitle is-size-5'>
            {bioData.data[langCapitalized].title}
          </h2>
          <p className="subtitle is-size-6">
            {bioData.data[langCapitalized].subtitle}
          </p>
        </div>
        <div className="column container has-text-left m-5">
          <p className="is-size-6">
            {bioData.data[langCapitalized].shortDescription}
          </p><br/>
          <p className="is-size-6">
            {bioData.data[langCapitalized].path}
          </p><br/>
          <p className="is-size-6">
            {bioData.data[langCapitalized].lastAchievement}
          </p><br/>
          <p className="is-size-6">
            {bioData.data[langCapitalized].professionalGoals}
          </p><br/>
        </div>
      </div>
        <div className="container has-text-centered">
          { lang === 'english' ?
          <p className="is-size-5">
            You may read and download my resume 
            <button onClick={() => getStorageFile(resume)} className="btn-as-link">here</button>
          </p> :
          <p className="is-size-5">
            Puedes leer y descargar mi curriculum 
            <button
            onClick={() => getStorageFile(resume)}
            className="btn-as-link has-text-warning is-size-5 pl-2">
              aquí
            </button>
          </p>
          }
        </div>      
      </>
    }
    </div>
    </>
  )
}

export default BioPage