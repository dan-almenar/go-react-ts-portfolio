import React, { useContext, useEffect, useState } from 'react'
import { Err } from '../../../customTypes/customTypes'
import { useGet } from '../../customHooks/api/useAPI'
import { AuthContext } from '../../customHooks/auth/useAuth'
import { StoreContext } from '../../customHooks/store/useStore'
import Loading from '../layout/Loading'
import SingleComment from './SingleComment'

function DisplayComments() {
    const { lang } = useContext(StoreContext)
    const { user } = useContext(AuthContext)
    const comments = user.isUser ? useGet('/api/contact') : null

    // manejo de errores
    const [error, setError] = useState({} as Err)
    useEffect(() => {
        if (comments && comments.error) {
            setError({code: comments.error.code, message: {
                english: "An error has occurred, please try again later",
                spanish: "Ha ocurrido un error, por favor intente de nuevo más tarde"
            }})
        }
    })
  return (
    <>
    { comments && comments.loading && <Loading /> }
    { comments && comments.error &&
        <div className="hero-body">
            <div className="title is-size-2">
                Error: {error.code}
            </div>
            <div className="subtitle iss-size-4">
                { error.message[lang] }
            </div>
        </div>
    }

    {/* data recibida correctamente */}
    { comments && comments.data &&
        <div className="container is-max-desktop">
            <div className="columns is-multiline">
                {comments.data.map((comment: any) => {
                    return (
                        <div key={comment.id} className="column is-one-third" >
                            <SingleComment comment={comment.data} />
                        </div>
                    )
                    })
                }
            </div>
        </div>
    }
    </>
  )
}

export default DisplayComments