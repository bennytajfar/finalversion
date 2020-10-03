import React, { useState } from 'react'
import { auth, firestore } from './config.js'
import { Redirect } from 'react-router-dom'

const Signin = () => {

    const [email, setEmail] = useState(null)
    const [pass, setPass] = useState(null)
    const [msg, setMsg] = useState(null)
    const [done, setDone] = useState(false)
    
    const handlemail = (e) => {
        setEmail(e.target.value)
    }

    const handlepassword = (e) => {
        setPass(e.target.value)
    }

    const signup = () => {
        auth.createUserWithEmailAndPassword(email, pass).then(
            cred => {
                firestore.collection(`users`).doc(cred.user.id).set({
                    email: cred.user.email,
                    uid :cred.user.uid
                })
            })
            .catch(err => { console.log(err.message) })
        setMsg('Now you could log in')
    }
    const login = () => {
        auth.signInWithEmailAndPassword(email, pass)
            .catch(err => { setMsg(err.message) })
            .then(cred => {
                setDone(true)
            })
    }

    return (
        <>
            {(!done) && <div className='signin'>
                <div className='signinform'>
                    <input type='email' className='inputemail' placeholder='Email' onChange={handlemail} />
                    <input type='password' className='inputpassword' placeholder='Password' onChange={handlepassword} />
                    <div className='login' onClick={login}>Log In</div>
                </div>
                {!msg && <div className='button' onClick={signup}>
                    Sign Up
            </div>}
                {msg && <div className='msg'>
                    {msg}
                </div>}
            </div>}
            {done && <Redirect to='/home' />}
        </>
    )
}

export default Signin
