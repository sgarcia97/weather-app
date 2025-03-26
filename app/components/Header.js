import next from "../../public/next.svg"
import Link from "next/link"

const Header = () => {
    return(
        <header>
            <nav>
                <div className="logo"></div>
                <Link href="/">Home</Link>
                <Link href="/favourites">Favorites</Link>
                <Link href="/settings">Settings</Link>
            </nav>
        </header>
    )
}

export default Header