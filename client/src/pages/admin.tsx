import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/layout/Loading'
import { useGet } from '../customHooks/api/useAPI'
import { AuthContext } from '../customHooks/auth/useAuth'
import { StoreContext } from '../customHooks/store/useStore'
import { fetchedData } from '../../customTypes/customTypes'
import DisplayComments from '../components/admin/DisplayComments'

function AdminPage() {
    const { lang } = useContext(StoreContext)
    const { user, logInUser, getUser } = useContext(AuthContext)
    const navigate = useNavigate()

    // manejo de formulario
    const [isLoading, setIsLoading] = useState(false)
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const email = e.currentTarget.email.value
        const password = e.currentTarget.password.value
        e.currentTarget.reset()
        setIsLoading(true)
        logInUser(email, password)
    }

    // funcionalidad para usuario verificado
    useEffect(() => {
        user.isUser && setIsLoading(false)
    })
    const [loadComments, setLoadComments] = useState(false)

  return (
      <div className='hero is-fullheight is-dark fade-in'>
          <div className="m-5 has-text-centered">
              <h1 className='title'>
                { lang === 'english' ? 'Admin Dashboard' : 'Panel de Administración' }
              </h1>
                { !user.isUser && !isLoading &&
                <>
                    <p className="subtitle m-5">
                        { lang === 'english' ? 'Please login to continue...' : 'Por favor, inicie sesión para continuar...' }
                    </p>
                    <div className="container is-max-desktop">
                        <div className='box has-background-info-light m-5'>
                        <form onSubmit={(e) => handleSubmit(e)} action="submit" method='post' id="login-form" className="container">
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input type="email" name="email"
                                    className="input" placeholder='email' required />
                                        <span className="icon is-small is-left">
                                            <i className="material-icons-outlined">email</i>
                                        </span>
                                </p>
                            </div>
                            <div className="field">
                                <p className="control is-expanded has-icons-left">
                                    <input type="password" name="password"
                                    className="input" placeholder='password' required />
                                        <span className="icon is-small is-left">
                                            <i className="material-icons-outlined">lock</i>
                                        </span>
                                </p>
                            </div>
                            <div className="field">
                                <div className="control">
                                    <button type='submit' className="button">
                                        { lang === 'english' ? 'Login' : 'Iniciar sesión' }
                                    </button>
                                </div>
                            </div>
                        </form>
                        </div>
                    </div>
                </>
                }
                { user.userData &&
                <>
                <p className="subtitle m-5">
                    { lang === 'english' ? 'Welcome back, ' : 'Bienvenido, ' }
                    { user.userData.email }
                </p>
                { loadComments &&
                    <div className="m-5">
                        <DisplayComments />
                    </div>
                }
                <div className="m-5">
                    <button onClick={() => setLoadComments(!loadComments)} className="button">
                        { lang === 'english' && loadComments && 'Hide comments' }
                        { lang === 'spanish' && loadComments && 'Ocultar comentarios' }
                        { lang === 'english' && !loadComments && 'Show comments' }
                        { lang === 'spanish' && !loadComments && 'Mostrar comentarios' }
                    </button>
                </div>
                </>
                }
                { isLoading &&
                    <Loading />
                }
          </div>
      </div>
  )
}
export default AdminPage