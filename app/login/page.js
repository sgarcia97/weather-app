'use client'
import PageTemplate from "../components/PageTemplate"
import Link from "next/link"
import { useState, useEffect } from "react"
import { auth } from "../lib/firebase"
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword} from "firebase/auth";
import { redirect } from "next/navigation"



const Login = () => {
    //const [email, setEmail] = useState("")
    //const [password, setPassword] = useState("")
 
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formdata = new FormData(e.target)
        const email = formdata.get('email')
        const password = formdata.get('password')
        try{
        const creds = await signInWithEmailAndPassword(auth, email, password)
        //alert(creds.user.uid)
        handleLogin()
        console.log(creds.user)
        }catch(error)
        {
            alert(error.message)
        }
        //console.log(creds)
    }

    const handleLogin = async () => {
        onAuthStateChanged(auth, user => {
            if(user){
                redirect('/')
            }
        })
    }

    
    

    return(
        <PageTemplate>
            <form className="login-wrapper" onSubmit={handleSubmit}>
                <h3>Login</h3>
                <p>Sign in for a ClimApp account</p>
                <div className="input-wrapper"><input type="email" placeholder="Email address" name="email" autoFocus required/></div>
                <div className="input-wrapper"><input type="password" placeholder="Password" name="password" required/></div>
                <button className="button-large">Login</button>
                <button className="button-large">Login with Google</button>
                <div>Don&apos;t have an account? <Link href="/signup" alt="">Sign up</Link></div>
            </form>
        </PageTemplate>
    )
}

export default Login