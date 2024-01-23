import React, { useState } from 'react'

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const collectData =()=> {
        console.log(email, password)
    }

    return (
        <div className="register">
            <h1>Register</h1>

            <input className="inputBox" type="text" value={email}
                onChange={(e) => setEmail(e.target.value)} placeholder="Enter Email"></input>

            <input className="inputBox" type="password" value={password}
                onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password"></input>

            <button onClick={collectData} className="appButton" type="button">sign up</button>
        </div>
    )
}

export default SignUp;