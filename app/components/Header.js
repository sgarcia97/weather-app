import next from "../../public/next.svg"
import Link from "next/link"

const Header = () => {
    return(
        <header>
            <nav>
                <div className="logo">ClimApp</div>
                <div>
                    <Link href="/">Home</Link>
                    <Link href="/favourites">Favorites</Link>
                    <Link href="/settings">Settings</Link>
                </div>
            </nav>
        </header>
    )
}

export default Header