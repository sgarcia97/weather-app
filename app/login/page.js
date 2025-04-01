'use client'
import PageTemplate from "../components/PageTemplate"
import Link from "next/link"
import { useState } from "react"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = () => {

    }
    
    return(
        <PageTemplate>
            <div className="login-wrapper">
                <h1>Login</h1>
                <div className="input-wrapper"><input/></div>
                <div className="input-wrapper"><input/></div>
                <button className="button-large">Login</button>
                <div>Don&apos;t have an account? <Link href="" alt="">Sign up</Link></div>
            </div>
        </PageTemplate>
    )
}

export default Login