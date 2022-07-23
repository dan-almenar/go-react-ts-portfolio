import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Comment, socialMedia } from '../../customTypes/customTypes'
import ContactIcons from '../components/contact/ContactIcons'
import { StoreContext } from '../customHooks/store/useStore'

function ContactPage() {
    const { lang } = useContext(StoreContext)

    const [remainingCharacters, setRemainingCharacters] = useState(600)
    const getMessage = (e: any) => {
        setRemainingCharacters(600 - e.target.value.length)
    }

    const rrss: socialMedia[] = [
        {
            name: 'LinkedIn',
            link: 'https://www.linkedin.com/in/daniel-almenar-williams/'
        },
        {
          name: 'Github',
          link: 'https://github.com/dan-almenar'
        },
        // {
        //   name: 'Twitter',
        //   link: 'https://twitter.com/????????' // to be created
        // },
        {
          name: 'Youtube',
          link: 'https://www.youtube.com/c/DanAlmenar'
        },
        {
          name: 'Medium',
          link: 'https://medium.com/@danielalmenar'
        }
      ]

    // manejo de redireccionamiento a Home
    const navigate = useNavigate()
    const [isSuccess, setIsSuccess] = useState(false)
    const [redirectTimeout, setRedirectTimeout] = useState(10)
    useEffect(() => {
        isSuccess && redirectTimeout > 0 && setInterval(() => setRedirectTimeout(redirectTimeout - 1), 1000)
        redirectTimeout === 0 && navigate('/')
    }, [isSuccess, redirectTimeout])
    const cancelRedirect = () => {
        setIsSuccess(false)
        setRedirectTimeout(10)
    }

    // form submit handler
    const submit = async (e: any) => {
        e.preventDefault()
        const formData: Comment = {
            firstName: e.target.firstName.value,
            email: e.target.email.value,
            subject: e.target.subject.value,
            message: e.target.message.value,
            date: Date.now(),
        }
        // añadimos el apellido si fue ingresado
        e.target.lastName.value.length > 0 && (formData.lastName = e.target.lastName.value)
        try {
            const response = await fetch('/api/contact',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            if (response.status === 200) {
                // clear form
                e.target.reset()
                setIsSuccess(true)
            }
        } catch (error) {
            console.log(error)
        }
        return
    }
    // form cancel handler
    const clearForm = () => {
        const form = document.getElementById('contact-form') as HTMLFormElement
        form.reset()
        setRemainingCharacters(600)
    }

  return (
    <>
    <div className="hero is-fullheight is-info fade-in">
        { !isSuccess && (
        <div className="hero-header">
        <div className="container m-5">
            <h1 className="container title has-text-centered m-5">
                { lang === 'english' ? 'Contact' : 'Contacto' }
            </h1>
            <p className="container subtitle is-size-4 has-text-centered mx-5">
                { lang === 'english' ? 'Please feel free to leave me a message' : 'Si lo desea, puede dejarme un mensaje' }
            </p>
        </div>
        <br />
        <div className="container box has-background-info-light mx-5">
            <form id='contact-form' onSubmit={(e) => submit(e) } action="submit" method="post">
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">
                            { lang === 'english' ? 'Personal Information' : 'Información Personal' }
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <input type="text" name="firstName" className="input" required
                                placeholder={lang === 'english' ? 'First Name' : 'Nombre' } />
                                <span className="icon is-small is-left">
                                    <i className="material-icons-outlined pl-5">person_outlined</i>
                                </span>
                            </p>
                        </div>
                        <div className="field">
                            <p className="control is-expanded">
                                <input type="text" name="lastName" className='input'
                                    placeholder={ lang === 'english' ? 'Last Name' : 'Apellido' } />
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label"></div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <input type="email" name="email" className="input" required
                                    placeholder='email' />
                                <span className="icon is-small is-left">
                                    <i className="material-icons">email</i>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">
                            { lang === 'english' ? 'Subject' : 'Asunto' }
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <input type="text" name="subject" className="input" maxLength={50} required
                                    placeholder={ lang === 'english' ? 'Brief introduction' : 'Breve introducción'} />
                                <span className="icon is-small is-left">
                                    <i className="material-icons">title</i>
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal">
                    <div className="field-label is-normal">
                        <label className="label">
                            { lang === 'english' ? 'Message' : 'Mensaje' }
                        </label>
                    </div>
                    <div className="field-body">
                        <div className="field">
                            <p className="control is-expanded has-icons-left">
                                <textarea onInput={(e) => getMessage(e)} name="message" className="textarea" maxLength={600} required
                                    placeholder={ lang === 'english' ? 'Your message' : 'Su mensaje'} />
                            </p>
                            <p className={`help has-text-right ${remainingCharacters <= 100 && 'is-danger is-size-6'}`}>
                                { lang === 'english' ? 'Remaining Characters: ' : 'Caracteres restantes: ' }
                                <span id="charactersLeft">{ remainingCharacters }</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="field is-horizontal is-grouped">
                    <div className="field-label"></div>
                    <div className="field-body">
                        {/* submit */}
                        <p className="control">
                            <button type='submit' className="button is-link">
                                { lang === 'english' ? 'Send' : 'Enviar' }
                            </button>
                        </p>
                        {/* clear form */}
                        <p className="control">
                            <button onClick={() => clearForm()} className="button is-light">
                                { lang === 'english' ? 'Cancel' : 'Cancelar' }
                            </button>
                        </p>
                    </div>
                </div>
            </form>
        </div>
        <section className="section has-background-info">
        <p className="container subtitle is-size-4 has-text-centered">
            { lang === 'english' ?
            'You may also find me on the following platforms:'
            : 'Puede encontrarme en las siguientes plataformas:'}
        </p>
        <div className="box has-background-info-light">
            <ContactIcons brands={rrss} />
        </div>
        </section>

        </div>        
        )}
        { isSuccess && (
            <div className='hero-body'>
                <div className="container has-text-centered">
                    <p className="is-size-3">
                        { lang === 'english' ? 'Your message has been sent successfully' : 'Su mensaje ha sido enviado con éxito' }
                    </p>
                    <br />
                    <p className="is-size-5">
                        { lang === 'english' ? `You will be redirected to the home page in ${redirectTimeout} ${redirectTimeout <= 1 ? "seconds" : "second"}`
                        : `Se le redirigirá a la página principal en ${redirectTimeout} ${redirectTimeout <= 1 ? "segundos" : "segundo"}` }    
                    </p>
                    <button onClick={() => cancelRedirect()} className="button m-5">
                        { lang === 'english' ? 'Cancel' : 'Cancelar' }
                    </button>
                </div>
            </div>
        )}
    </div>
    </>
  )
}

export default ContactPage