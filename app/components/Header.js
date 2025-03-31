"use client"
import next from "../../public/next.svg"
import Link from "next/link"
import Home from "../../public/house-blank.svg"
import Setting from "../../public/customize.svg"
import Heart from "../../public/heart.svg"
import Image from "next/image"


const Header = () => {

    return(
        <header>
            <nav>
                <div className="logo">ClimApp</div>
                <div className="links">
                    <Link href="/"><Image alt ="" src={Home} width={20}/></Link>
                    <Link href="/favourites"><Image alt ="" src={Heart} width={20}/></Link>
                    <Link href="/settings"><Image alt ="" src={Setting} width={20}/></Link>
                </div>
                <button className="button-small" >Login</button>
            </nav>
        </header>
    )
}

export default Header