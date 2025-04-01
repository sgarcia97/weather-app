"use client"
import next from "../../public/next.svg"
import Link from "next/link"
import Home from "../../public/house-blank.svg"
import Setting from "../../public/user-gear.svg"
import Heart from "../../public/heart.svg"
import Image from "next/image"
import { useRouter } from "next/navigation"

const Header = () => {
    const router = useRouter()
    return(
        <header>
            <nav>
                <div className="logo">ClimApp</div>
                <div className="links">
                    <Link href="/"><Image className="nav-link" alt ="" src={Home} width={20}/></Link>
                    <Link href="/favourites"><Image className="nav-link" alt ="" src={Heart} width={20}/></Link>
                    <Link href="/settings"><Image className="nav-link" alt ="" src={Setting} width={20}/></Link>
                </div>
                <button className="button-small" onClick={()=>{router.push('/login')}}>Login</button>
            </nav>
        </header>
    )
}

export default Header