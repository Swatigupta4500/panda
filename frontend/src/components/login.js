import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { validateForm } from './common/validation';

const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setconfirmPasswordVisible] = useState(false);
    const [isSignin, setSigin] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const email = useRef(null);
    const password = useRef(null);
    const confirmPassword = useRef(null);

    const validateFormData = () => {
        setErrorMessage(validateForm(email.current.value, password.current.value, confirmPassword.current.value));
        if (!validateForm(email.current.value, password.current.value, confirmPassword.current.value)) {
            isSignin ? collectDataSignIn() : collectDataSignUp();
        }
    };
    const navigation = useNavigate();
    const collectDataSignUp = async () => {
        await fetch('http://localhost:5000/joinpanda', {
            method: 'post',
            body: JSON.stringify({
                email: email.current.value,
                password: password.current.value,
            }),
            headers: {
                'content-Type': 'application/json',
            },
        })
            .then((data) => data.json())
            .then((data) => {
                if (data.status) {
                    navigation('/dashboard');
                } else {
                    setErrorMessage(data.message);
                }
            });
    };
    const collectDataSignIn = async () => {
        let result = await fetch('http://localhost:5000/login', {
            method: 'post',
            body: JSON.stringify({
                email: email.current.value,
                password: password.current.value,
            }),
            headers: {
                'content-Type': 'application/json',
            },
        });
        result = await result.json();
        console.log(JSON.stringify(result));
        if (result.email) {
        } else {
            alert('please enter correct detials');
        }
    };

    return (
        <div className="flex w-100">
            <div className="pos-rel w-60">
                <div>
                    <img className="w-100 vh" src={require('../images/panda.png')} alt="panda"></img>
                </div>
                <div className="f-s-xxl pos-abs">Welcome To Panda</div>
            </div>

            <div className="w-40">
                <div className="p-5">
                    <div className="p-25-l-r">
                        <div className="flex justify-center-space-between border-bottom">
                            <div className={isSignin ? 'cursor' : 'border-bottom-select cursor'} onClick={() => setSigin(false)}>
                                Join PANDA
                            </div>
                            <div>or</div>
                            <div className={isSignin ? 'border-bottom-select cursor' : 'cursor'} onClick={() => setSigin(true)}>
                                Sign in
                            </div>
                        </div>
                    </div>

                    <div className="round-box">
                        <div>
                            <p className="f-w-500"> *</p>
                            <p className="f-s-xxl f-w-500">{isSignin ? 'Sign In' : 'Create your free account'}</p>
                            <p className={isSignin ? 'none' : 'f-s-l f-w-500 '}>
                                Takes less than <span className="color-mh">5 minutes . . .</span>
                            </p>
                        </div>

                        <div>
                            <form onSubmit={(e) => e.preventDefault()} className="p-hor-15">
                                <input ref={email} className="w-100" type="text" placeholder="Email address"></input>

                                <div className="pos-rel">
                                    <input className="w-100 color-mh" ref={password} type={passwordVisible ? 'text' : 'password'} placeholder="Password"></input>
                                    <span
                                        className="show cursor color-mh"
                                        onClick={() => {
                                            setPasswordVisible(!passwordVisible);
                                        }}
                                    >
                                        show
                                    </span>
                                </div>

                                <div className={isSignin ? 'none' : 'pos-rel m-bottom-25px'}>
                                    <input className="w-100 color-mh" ref={confirmPassword} type={confirmPasswordVisible ? 'text' : 'password'} placeholder="Confirm password"></input>
                                    <span
                                        className="show cursor color-mh"
                                        onClick={() => {
                                            setconfirmPasswordVisible(!confirmPasswordVisible);
                                        }}
                                    >
                                        show
                                    </span>
                                </div>

                                <p className="align-left color-red"> {errorMessage}</p>
                                <Link to={'/forgotPassword'}>
                                    <div className={isSignin ? 'align-left f-w-500 m-top-25px  ' : 'none'}>Forgot password?</div>
                                </Link>
                                <button onClick={() => validateFormData()}>{isSignin ? 'Sign in' : 'Join Panda'}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
