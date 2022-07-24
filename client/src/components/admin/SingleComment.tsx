import React, { useContext } from 'react'
import { StoreContext } from '../../customHooks/store/useStore'

function SingleComment(props: {comment: any}) {
    const { comment } = props
    const { lang } = useContext(StoreContext)
    console.log("comment", comment)
  return (
    <div className='container'>
        <div className="box has-background-warning-light has-text-left">
        <p className="subtitle has-text-dark is-size-5">
            { lang === 'english' ? 'From: ' : 'De: ' }
            { comment.FirstName } { comment.LastName != '' && comment.LastName }
            <br /><span className="subtitle has-text-dark is-size-6">
                Email: { comment.Email }
            </span>
            <br /><span className="subtitle has-text-dark is-size-7">
                Date: { new Date(comment.Date).toLocaleDateString() }
            </span>
        </p>
        <p className="subtitle has-text-dark is-size-5">
            { lang === 'english' ? 'Subject: ' : 'Asunto: ' }
            { comment.Subject }
        </p>
        <p className="subtitle has-text-dark is-size-5">
            { lang === 'english' ? 'Message: ' : 'Mensaje: ' }
            { comment.Message }
        </p>
        </div>
    </div>
  )
}

/*
TODO: Add delete comment button and functionality
*/

export default SingleComment