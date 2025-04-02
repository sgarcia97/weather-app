'use client'
import PageTemplate from "../components/PageTemplate"
import Link from "next/link"
import { useState } from "react"
import { auth } from "../lib/firebase"
import { getAuth, createUserWithEmailAndPassword} from "firebase/auth";



const Login = () => {
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const email = formdata.get('email')
        const password = formdata.get('password')
        try{
        const creds = await createUserWithEmailAndPassword(auth, email, password)
        alert(creds.user)
        }catch(error)
        {
            alert(error.message)
        }
        //console.log(creds)
    }

    return(
        <PageTemplate>
            <form className="login-wrapper" onSubmit={handleSubmit}>
                <h3>Sign Up</h3>
                <p>Sign up for a ClimApp account</p>
                <div className="input-wrapper"><input type="email" placeholder="Email address" name="email" autoFocus required/></div>
                <div className="input-wrapper"><input type="password" placeholder="Password" name="password" required/></div>
                <button className="button-large">Sign up</button>
                <div>Do you have an account? <Link href="login" alt="">Sign in</Link></div>
            </form>
        </PageTemplate>
    )
}

export default Login