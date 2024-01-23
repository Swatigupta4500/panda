import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { validateForm } from './common/validation'
const ForgotPassword = () => {
    const email = useRef(null);

    const [errorMessage, setErrorMessage] = useState(null)
    const sendMail = async () => {
        setErrorMessage(validateForm(email.current.value))
        if (!validateForm(email.current.value)) {
            await fetch('http://localhost:5000/forgotp', {
                method: 'post',
                body: JSON.stringify({ email: email.current.value }),
                headers: {
                    'content-Type': 'application/json'
                },
            });
        }
    }
    return (
        <div className='flex w-100'>

            <div className='w-60'>
                <img className='w-100'
                    src={require('../images/panda.png')}
                    alt="panda">
                </img>
            </div>


            <div className='w-40'>
                <div className='p-5'>
                    <div className='p-25-l-r' >
                        <div className='flex justify-center-space-between border-bottom'>
                            <Link to="/" ><div >Join PANDA</div></Link>
                            <div>or</div>
                            <Link to="/" > <div>Sign in</div></Link>
                        </div>
                    </div>

                    <div className='round-box'>
                        <div>
                            <p className='f-w-500'> *</p>
                            <p className='f-s-xxl f-w-500'>"Forgot Password"</p>

                        </div>


                        <div>
                            <form onSubmit={(e => e.preventDefault())} className='p-hor-15'>

                                <input ref={email} className='w-100' type="text" placeholder='Email address'>
                                </input>
                                <p className='color-grey align-left'>Please enter your login email address to receive your password resent link</p>
                                <p className='align-left color-red'>{errorMessage} </p>
                                <button onClick={() => sendMail()} >Get the link</button>

                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default ForgotPassword
