import React, { useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { validateForm } from './common/validation'

const Reset = () => {
    const password = useRef(null);
    const confirmPassword = useRef(null);
    const [errorMessage, setErrorMessage] = useState(null)
    const { id } = useParams()
    const resetPassword = async () => {
        setErrorMessage(validateForm(undefined, password.current.value, confirmPassword.current.value))
        if (!validateForm(undefined, password.current.value, confirmPassword.current.value)) {
            console.log(`http://localhost:5000/reset/${id}`)
            await fetch(`http://localhost:5000/reset/${id}`, {
                method: 'PATCH',
                body: JSON.stringify({ password: password.current.value }),
                headers: {
                    'content-Type': 'application/json'
                },
            }).catch((error) => { console.log(error) });
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
                            <p className='f-s-xxl f-w-500'>Reset Password</p>

                        </div>


                        <div>
                            <form onSubmit={(e => e.preventDefault())} className='p-hor-15'>

                                <input ref={password} className='w-100' type="password" placeholder='Enter New Password'>
                                </input>
                                <input ref={confirmPassword} className='w-100' type="password" placeholder='Re-Enter New Password'>
                                </input>
                                <p className='align-left color-red'>{errorMessage} </p>
                                <button onClick={() => { resetPassword() }} >Reset My Password</button>
                                =
                            </form>

                        </div>
                    </div>
                </div>

            </div>

        </div >
    )
}

export default Reset
