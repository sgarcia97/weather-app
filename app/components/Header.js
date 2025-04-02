"use client"
import next from "../../public/next.svg"
import Link from "next/link"
import Home from "../../public/house-blank.svg"
import Setting from "../../public/user-gear.svg"
import Heart from "../../public/heart.svg"
import Image from "next/image"
import { useRouter, redirect } from "next/navigation"
import { auth } from "../lib/firebase"
import { signOut, onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from 'react'

const Header = () => {
    const router = useRouter()
    const [usr, setUsr] = useState(null)
    useEffect(()=>{
        const monitorAuthChange = async () => {
            onAuthStateChanged(auth, user=>{
                if(user){
                    setUsr(user)
                }
            })
        }
        monitorAuthChange()
    },[])

    const handleLogout = async () => {
        signOut(auth)
        alert('You are logged out')
        redirect('/')
    }
    console.log(usr)
    
    return(
        <header>
            <nav>
                <div className="logo">ClimApp {usr && usr.uid}</div>
                <div className="links">
                    <Link href="/"><Image className="nav-link" alt ="" src={Home} width={20}/></Link>
                    <Link href="/favourites"><Image className="nav-link" alt ="" src={Heart} width={20}/></Link>
                    { usr &&
                    <Link href="/settings"><Image className="nav-link" alt ="" src={Setting} width={20}/></Link>
}
                </div>
                { usr ? <button className="button-small" onClick={handleLogout}>Logout</button> : <button className="button-small" onClick={()=>{router.push('/login')}}>Login</button>
                
                }
            </nav>
        </header>
    )
}

export default Header